"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Hero from "@/components/hero";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import DotField from "@/components/dot-field";

// px of scroll over which the hero collapses to zero
const COLLAPSE_RANGE = 300;

type Stage = "loading" | "ready";

export default function Page() {
  const [stage, setStage] = useState<Stage>("loading");
  const reduceMotion = useReducedMotion();

  const { scrollY } = useScroll();

  // Hero height: 100vh → 0 over COLLAPSE_RANGE px
  const heroHeight = useTransform(scrollY, (v) =>
    `${Math.max(0, (1 - v / COLLAPSE_RANGE) * 100)}vh`
  );

  // Title: scale 1 → 0.7, opacity 1 → 0 (gone by 65% of range)
  const titleScale   = useTransform(scrollY, [0, COLLAPSE_RANGE * 0.75], [1, 0.7]);
  const titleOpacity = useTransform(scrollY, [0, COLLAPSE_RANGE * 0.65], [1, 0]);

  // Subtitle fades out faster (gone by 40%)
  const subOpacity = useTransform(scrollY, [0, COLLAPSE_RANGE * 0.4], [1, 0]);

  // Scroll hint fades fastest (gone by 25%)
  const hintOpacity = useTransform(scrollY, [0, COLLAPSE_RANGE * 0.25], [1, 0]);
  const headerOpacity = useTransform(
    scrollY,
    [COLLAPSE_RANGE - 140, COLLAPSE_RANGE - 12],
    [0, 1]
  );
  const headerY = useTransform(
    scrollY,
    [COLLAPSE_RANGE - 140, COLLAPSE_RANGE - 12],
    [-18, 0]
  );
  const [headerInteractive, setHeaderInteractive] = useState(false);

  useEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  // Loading → ready after 0.6 s
  useEffect(() => {
    const t = setTimeout(() => setStage("ready"), 600);
    return () => clearTimeout(t);
  }, []);

  useMotionValueEvent(scrollY, "change", (v) => {
    setHeaderInteractive(v >= COLLAPSE_RANGE - 12);
  });

  // Click anywhere on hero = smooth-scroll through the collapse
  const scrollToPortfolio = () => {
    window.scrollTo({ top: COLLAPSE_RANGE, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 250% center; }
          100% { background-position: -150% center; }
        }
      `}</style>

      {/* Fixed nav — eases in as the portfolio section takes over the viewport */}
      <motion.div
        style={
          reduceMotion
            ? undefined
            : {
                opacity: headerOpacity,
                y: headerY,
                pointerEvents: headerInteractive ? "auto" : "none",
              }
        }
        initial={reduceMotion ? { opacity: 0 } : false}
        animate={reduceMotion ? { opacity: headerInteractive ? 1 : 0 } : undefined}
        transition={reduceMotion ? { duration: 0.18 } : undefined}
      >
        <Header />
      </motion.div>

      {/* ── Hero — sticky, shrinks to 0 as you scroll ── */}
      <motion.section
        className="sticky top-0 z-10 w-full overflow-hidden bg-[#0a0a0a] cursor-pointer flex flex-col items-center justify-center"
        style={{ height: reduceMotion ? "100vh" : heroHeight }}
        onClick={scrollToPortfolio}
      >
        {!reduceMotion && <DotField />}

        {/* Loading bar */}
        <AnimatePresence>
          {stage === "loading" && (
            <motion.div
              key="loading"
              className="absolute flex flex-col items-center gap-3"
              exit={{ opacity: 0, transition: { duration: reduceMotion ? 0.15 : 0.4 } }}
            >
              <span className="text-sm tracking-[0.4em] uppercase text-white/30">
                Loading
              </span>
              <div className="relative h-[3px] w-72 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-white/60 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: reduceMotion ? 0.25 : 0.6, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ready state — title + subtitle fade in, then collapse on scroll */}
        {stage === "ready" && (
          <>
            {/* Centered content: parent fades in on mount, children fade on scroll */}
            <motion.div
              className="flex flex-col items-center gap-6 text-center text-white pointer-events-none relative z-10"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0.15 : 0.7 }}
            >
              <motion.h1
                className="text-6xl sm:text-7xl font-semibold tracking-tight"
                style={reduceMotion ? undefined : { scale: titleScale, opacity: titleOpacity }}
              >
                Stanley Pan
              </motion.h1>
              <motion.p
                className="text-sm tracking-widest uppercase text-white/40"
                style={reduceMotion ? undefined : { opacity: subOpacity }}
              >
                Computer Engineer · San Diego, CA
              </motion.p>
            </motion.div>

            {/* Scroll / click hint at the bottom */}
            <motion.div
              className="absolute bottom-9 flex flex-col items-center gap-2 pointer-events-none"
              style={reduceMotion ? undefined : { opacity: hintOpacity }}
            >
              <motion.div
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: reduceMotion ? 0 : 0.5, duration: reduceMotion ? 0.15 : 0.6 }}
                className="flex flex-col items-center gap-2"
              >
                <p
                  className="text-xs tracking-widest uppercase"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, rgba(255,255,255,0.2) 30%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0.2) 70%)",
                    backgroundSize: "200% auto",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animation: reduceMotion ? "none" : "shimmer 4.5s linear infinite",
                    animationDelay: reduceMotion ? undefined : "0.8s",
                  }}
                >
                  Scroll or click to continue
                </p>
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white/70"
                  animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
                  transition={reduceMotion ? undefined : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </motion.svg>
              </motion.div>
            </motion.div>
          </>
        )}
      </motion.section>

      {/* Scroll driver — dark fill that creates the collapse scroll distance */}
      <div style={{ height: reduceMotion ? 0 : COLLAPSE_RANGE, background: "#0a0a0a" }} />

      {/* Portfolio */}
      <div className="bg-[#f3f1ee]">
        <main className="grow">
          <Hero />
          <Experience />
          <Projects />
          <Skills />
        </main>
        <Footer />
      </div>
    </>
  );
}
