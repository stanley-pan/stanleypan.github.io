"use client";

import { useEffect, useRef } from "react";

interface Dot {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  vx: number;
  vy: number;
  r: number;
  g: number;
  b: number;
  tr: number;
  tg: number;
  tb: number;
}

const SPACING = 48;
const REPULSION_RADIUS = 75;
const REPULSION_STRENGTH = 5;
const SPRING = 0.08;
const DAMPING = 0.82;
const COLOR_LERP = 0.25;
const REST_EPSILON = 0.01;
const POSITION_EPSILON = 0.05;
const MAX_FPS = 60;
const MAX_DPR = 1.25;

function shouldUseLightMode() {
  if (typeof window === "undefined") return false;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lowCpu = navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4;
  const lowMemory =
    "deviceMemory" in navigator &&
    typeof navigator.deviceMemory === "number" &&
    navigator.deviceMemory <= 4;

  return prefersReducedMotion || lowCpu || lowMemory;
}

function randomVividColor() {
  const hue = Math.random() * 360;
  const s = 90 + Math.random() * 10;
  const l = 55 + Math.random() * 15;
  // HSL to RGB
  const a = (s * Math.min(l, 100 - l)) / 10000;
  const f = (n: number) => {
    const k = (n + hue / 30) % 12;
    return l / 100 - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  return { r: Math.round(f(0) * 255), g: Math.round(f(8) * 255), b: Math.round(f(4) * 255) };
}

export default function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const pointerActive = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let dots: Dot[] = [];
    let viewportWidth = 0;
    let viewportHeight = 0;
    let lastFrameTime = 0;
    let visible = true;
    const lightMode = shouldUseLightMode();
    const spacing = lightMode ? SPACING * 1.35 : SPACING;
    const repulsionRadius = lightMode ? REPULSION_RADIUS * 0.85 : REPULSION_RADIUS;
    const repulsionRadiusSq = repulsionRadius * repulsionRadius;
    const shadowBlur = lightMode ? 0 : 10;
    const dotRadius = lightMode ? 1.6 : 2;
    const whiteDotRadius = lightMode ? 1 : 1.2;
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);

    const setCanvasSize = () => {
      viewportWidth = window.innerWidth;
      viewportHeight = window.innerHeight;
      canvas.width = Math.floor(viewportWidth * dpr);
      canvas.height = Math.floor(viewportHeight * dpr);
      canvas.style.width = `${viewportWidth}px`;
      canvas.style.height = `${viewportHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const buildGrid = () => {
      dots = [];
      const cols = Math.ceil(viewportWidth / spacing) + 1;
      const rows = Math.ceil(viewportHeight / spacing) + 1;
      const offsetX = (viewportWidth % spacing) / 2;
      const offsetY = (viewportHeight % spacing) / 2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const hx = offsetX + c * spacing;
          const hy = offsetY + r * spacing;
          dots.push({ x: hx, y: hy, homeX: hx, homeY: hy, vx: 0, vy: 0, r: 255, g: 255, b: 255, tr: 255, tg: 255, tb: 255 });
        }
      }
    };

    const resize = () => {
      setCanvasSize();
      buildGrid();
    };

    const draw = (time: number) => {
      animId = requestAnimationFrame(draw);

      if (time - lastFrameTime < 1000 / MAX_FPS) return;
      lastFrameTime = time;

      if (document.hidden || !visible) return;

      ctx.clearRect(0, 0, viewportWidth, viewportHeight);

      const mx = mouse.current.x;
      const my = mouse.current.y;
      let hasActiveMotion = false;

      // Group dots by color to minimize fillStyle changes
      const byColor = new Map<string, Dot[]>();

      for (const dot of dots) {
        const dx = dot.x - mx;
        const dy = dot.y - my;
        const distSq = dx * dx + dy * dy;
        const inRange = pointerActive.current && distSq < repulsionRadiusSq;

        if (inRange) {
          const dist = Math.sqrt(distSq);
          if (dist > 0) {
            const force = (1 - dist / repulsionRadius) * REPULSION_STRENGTH;
            dot.vx += (dx / dist) * force;
            dot.vy += (dy / dist) * force;
          }

          // Assign a random target color if not already colored
          if (dot.tr === 255 && dot.tg === 255 && dot.tb === 255) {
            const c = randomVividColor();
            dot.tr = c.r; dot.tg = c.g; dot.tb = c.b;
          }
        } else {
          // Fade target back to white as soon as mouse leaves
          dot.tr = 255; dot.tg = 255; dot.tb = 255;
        }

        // Lerp current color towards target
        dot.r += (dot.tr - dot.r) * COLOR_LERP;
        dot.g += (dot.tg - dot.g) * COLOR_LERP;
        dot.b += (dot.tb - dot.b) * COLOR_LERP;

        if (dot.vx !== 0 || dot.vy !== 0) {
          dot.vx += (dot.homeX - dot.x) * SPRING;
          dot.vy += (dot.homeY - dot.y) * SPRING;
          dot.vx *= DAMPING;
          dot.vy *= DAMPING;
          dot.x += dot.vx;
          dot.y += dot.vy;

          if (
            Math.abs(dot.vx) < REST_EPSILON && Math.abs(dot.vy) < REST_EPSILON &&
            Math.abs(dot.x - dot.homeX) < POSITION_EPSILON && Math.abs(dot.y - dot.homeY) < POSITION_EPSILON
          ) {
            dot.x = dot.homeX; dot.y = dot.homeY;
            dot.vx = 0; dot.vy = 0;
          }
        }

        if (
          dot.vx !== 0 ||
          dot.vy !== 0 ||
          dot.tr !== 255 ||
          dot.tg !== 255 ||
          dot.tb !== 255 ||
          Math.abs(dot.r - 255) > 1 ||
          Math.abs(dot.g - 255) > 1 ||
          Math.abs(dot.b - 255) > 1
        ) {
          hasActiveMotion = true;
        }

        const key = `${Math.round(dot.r)},${Math.round(dot.g)},${Math.round(dot.b)}`;
        if (!byColor.has(key)) byColor.set(key, []);
        byColor.get(key)!.push(dot);
      }

      // Draw each color group in one pass
      byColor.forEach((group, key) => {
        const [rr, gg, bb] = key.split(",").map(Number);
        const isWhite = rr > 240 && gg > 240 && bb > 240;
        ctx.fillStyle = `rgba(${key},${isWhite ? 0.35 : 0.9})`;
        if (!isWhite && shadowBlur > 0) {
          ctx.shadowColor = `rgb(${key})`;
          ctx.shadowBlur = shadowBlur;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.beginPath();
        for (const dot of group) {
          const r = isWhite ? whiteDotRadius : dotRadius;
          ctx.moveTo(dot.x + r, dot.y);
          ctx.arc(dot.x, dot.y, r, 0, Math.PI * 2);
        }
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      if (!hasActiveMotion && !pointerActive.current) {
        lastFrameTime = 0;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const pageY = e.clientY + window.scrollY;
      if (pageY < viewportHeight) {
        pointerActive.current = true;
        mouse.current = { x: e.clientX, y: pageY };
      } else {
        pointerActive.current = false;
        mouse.current = { x: -9999, y: -9999 };
      }
    };
    const onMouseLeave = () => {
      pointerActive.current = false;
      mouse.current = { x: -9999, y: -9999 };
    };
    const onScroll = () => {
      visible = window.scrollY < viewportHeight;
      if (!visible) {
        pointerActive.current = false;
        mouse.current = { x: -9999, y: -9999 };
      }
    };
    const onVisibilityChange = () => {
      if (document.hidden) {
        pointerActive.current = false;
      }
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    resize();
    onScroll();
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0"
      style={{ willChange: "transform" }}
    />
  );
}
