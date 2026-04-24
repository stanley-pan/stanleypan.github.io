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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let dots: Dot[] = [];

    const buildGrid = () => {
      dots = [];
      const cols = Math.ceil(canvas.width / SPACING) + 1;
      const rows = Math.ceil(canvas.height / SPACING) + 1;
      const offsetX = (canvas.width % SPACING) / 2;
      const offsetY = (canvas.height % SPACING) / 2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const hx = offsetX + c * SPACING;
          const hy = offsetY + r * SPACING;
          dots.push({ x: hx, y: hy, homeX: hx, homeY: hy, vx: 0, vy: 0, r: 255, g: 255, b: 255, tr: 255, tg: 255, tb: 255 });
        }
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      buildGrid();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouse.current.x;
      const my = mouse.current.y;

      // Group dots by color to minimize fillStyle changes
      const byColor = new Map<string, Dot[]>();

      for (const dot of dots) {
        const dx = dot.x - mx;
        const dy = dot.y - my;
        const distSq = dx * dx + dy * dy;
        const inRange = distSq < REPULSION_RADIUS * REPULSION_RADIUS;

        if (inRange) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / REPULSION_RADIUS) * REPULSION_STRENGTH;
          dot.vx += (dx / dist) * force;
          dot.vy += (dy / dist) * force;

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
            Math.abs(dot.vx) < 0.01 && Math.abs(dot.vy) < 0.01 &&
            Math.abs(dot.x - dot.homeX) < 0.05 && Math.abs(dot.y - dot.homeY) < 0.05
          ) {
            dot.x = dot.homeX; dot.y = dot.homeY;
            dot.vx = 0; dot.vy = 0;
          }
        }

        const key = `${Math.round(dot.r)},${Math.round(dot.g)},${Math.round(dot.b)}`;
        if (!byColor.has(key)) byColor.set(key, []);
        byColor.get(key)!.push(dot);
      }

      // Draw each color group in one pass
      for (const [key, group] of byColor) {
        const [rr, gg, bb] = key.split(",").map(Number);
        const isWhite = rr > 240 && gg > 240 && bb > 240;
        ctx.fillStyle = `rgba(${key},${isWhite ? 0.35 : 0.9})`;
        if (!isWhite) {
          ctx.shadowColor = `rgb(${key})`;
          ctx.shadowBlur = 10;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.beginPath();
        for (const dot of group) {
          const r = isWhite ? 1.2 : 2;
          ctx.moveTo(dot.x + r, dot.y);
          ctx.arc(dot.x, dot.y, r, 0, Math.PI * 2);
        }
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      const pageY = e.clientY + window.scrollY;
      if (pageY < window.innerHeight) {
        mouse.current = { x: e.clientX, y: pageY };
      } else {
        mouse.current = { x: -9999, y: -9999 };
      }
    };
    const onMouseLeave = () => { mouse.current = { x: -9999, y: -9999 }; };
    const onScroll = () => {
      if (window.scrollY >= window.innerHeight) mouse.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    resize();
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
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
