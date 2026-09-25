"use client";

import { motion } from "motion/react";
import { useEffect, useRef } from "react";

const particles = Array.from({ length: 45 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 61) % 100}%`,
  size: index % 4 === 0 ? 2 : 1,
  duration: 8 + (index % 7),
  delay: -(index % 6),
}));

export default function AnimatedBackground() {
  const glowRef = useRef(null);
  const frameRef = useRef(null);
  const targetRef = useRef({ x: 50, y: 50 });
  const currentRef = useRef({ x: 50, y: 50 });

  useEffect(() => {
    const handlePointerMove = (event) => {
      targetRef.current = {
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100,
      };

      if (!frameRef.current) {
        frameRef.current = requestAnimationFrame(updateGlow);
      }
    };

    const updateGlow = () => {
      const target = targetRef.current;
      const current = currentRef.current;

      // Very small smoothing = smooth without noticeable lag.
      current.x += (target.x - current.x) * 0.42;
      current.y += (target.y - current.y) * 0.42;

      if (glowRef.current) {
        glowRef.current.style.left = `${current.x}%`;
        glowRef.current.style.top = `${current.y}%`;
      }

      frameRef.current = requestAnimationFrame(updateGlow);
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    frameRef.current = requestAnimationFrame(updateGlow);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#030304]"
    >
      {/* Base atmospheric gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.12),transparent_38%),radial-gradient(circle_at_100%_50%,rgba(59,130,246,0.08),transparent_30%),radial-gradient(circle_at_0%_80%,rgba(217,70,239,0.07),transparent_30%)]" />

      {/* Fine grid */}
      <div
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(circle at center, black 20%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 20%, transparent 90%)",
        }}
      />

      {/* Perspective floor grid */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[38%] opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.25) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
          transform:
            "perspective(500px) rotateX(62deg) scale(1.7)",
          transformOrigin: "bottom",
        }}
      />

      {/* Cursor light — now uses direct DOM updates instead of React state */}
      <div
        ref={glowRef}
        className="absolute h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: "50%",
          top: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.22) 0%, rgba(59,130,246,0.10) 28%, rgba(168,85,247,0.04) 48%, transparent 72%)",
          filter: "blur(18px)",
          willChange: "left, top",
        }}
      />

      {/* Large animated orb */}
      <motion.div
        className="absolute -left-40 top-[-8rem] h-[32rem] w-[32rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, rgba(129,140,248,0.20), rgba(79,70,229,0.08) 42%, transparent 72%)",
          filter: "blur(30px)",
        }}
        animate={{
          x: [0, 140, 60, 0],
          y: [0, 100, 180, 0],
          scale: [1, 1.12, 0.94, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blue orb */}
      <motion.div
        className="absolute -right-40 top-[25%] h-[34rem] w-[34rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.13), rgba(59,130,246,0.04) 45%, transparent 72%)",
          filter: "blur(34px)",
        }}
        animate={{
          x: [0, -120, -40, 0],
          y: [0, 90, -70, 0],
          scale: [1, 0.92, 1.08, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Magenta orb */}
      <motion.div
        className="absolute bottom-[-14rem] left-[25%] h-[38rem] w-[38rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(217,70,239,0.10), rgba(168,85,247,0.03) 45%, transparent 72%)",
          filter: "blur(40px)",
        }}
        animate={{
          x: [0, 120, -80, 0],
          y: [0, -100, -30, 0],
          scale: [1, 1.08, 0.94, 1],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-white/40"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -18, 0],
            opacity: [0.05, 0.45, 0.05],
            scale: [1, 1.7, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Scanline */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{
          top: ["-5%", "105%"],
          opacity: [0, 0.6, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-screen"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Cinematic vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.7)_100%)]" />
    </div>
  );
}