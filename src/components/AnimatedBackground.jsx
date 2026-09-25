"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function AnimatedBackground() {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouse({
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050505]"
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Cursor-following glow */}
      <div
        className="absolute h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-all duration-300"
        style={{
          left: `${mouse.x}%`,
          top: `${mouse.y}%`,
          background:
            "radial-gradient(circle, rgba(99,102,241,0.14) 0%, rgba(59,130,246,0.07) 32%, transparent 70%)",
        }}
      />

      {/* Ambient floating lights */}
      <motion.div
        className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl"
        animate={{
          x: [0, 100, 20, 0],
          y: [0, 70, 140, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -right-24 top-1/3 h-[28rem] w-[28rem] rounded-full bg-blue-500/10 blur-3xl"
        animate={{
          x: [0, -80, -20, 0],
          y: [0, 90, -40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-[-10rem] left-1/3 h-[32rem] w-[32rem] rounded-full bg-fuchsia-500/[0.07] blur-3xl"
        animate={{
          x: [0, 80, -60, 0],
          y: [0, -100, -20, 0],
          scale: [1, 1.08, 0.92, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(0,0,0,0.72)_100%)]" />
    </div>
  );
}