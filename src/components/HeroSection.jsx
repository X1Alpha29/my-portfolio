"use client";

import { motion } from "motion/react";
import {
  SiNextdotjs,
  SiTypescript,
  SiPostgresql,
  SiPrisma,
  SiReact,
} from "react-icons/si";

const technologies = [
  { name: "Next.js", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "Prisma", icon: SiPrisma },
  { name: "React", icon: SiReact },
];

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden px-4 py-24 sm:px-8">
      {/* Central glow */}
      <div className="absolute left-1/2 top-1/2 h-[35rem] w-[35rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.08] blur-[120px]" />

      {/* Decorative rings */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05]"
        animate={{ rotate: 360 }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/[0.06]"
        animate={{ rotate: -360 }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Orbiting point */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-indigo-300 shadow-[0_0_25px_rgba(129,140,248,0.9)]"
        animate={{
          x: [0, 240, 0, -240, 0],
          y: [-160, 0, 160, 0, -160],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-8 flex items-center justify-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-gray-500"
        >
          <span className="h-px w-10 bg-gray-700" />
          Software Developer
          <span className="h-px w-10 bg-gray-700" />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="text-6xl font-black tracking-[-0.06em] text-white sm:text-7xl md:text-8xl lg:text-9xl"
        >
          Richard
          <br />
          <span className="bg-gradient-to-r from-white via-sky-200 to-blue-400 bg-clip-text text-transparent">
            Istvan Baba
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mx-auto mt-8 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg"
        >
          I build modern full-stack applications, interactive web experiences,
          and practical software solutions from concept to production.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#projects"
            className="group relative overflow-hidden rounded-full border border-indigo-400/30 bg-indigo-500/15 px-7 py-3.5 font-semibold text-white backdrop-blur-xl transition hover:border-indigo-300/60 hover:bg-indigo-500/25"
          >
            <span className="relative z-10">Explore My Work</span>

            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </a>

          <a
            href="https://github.com/X1Alpha29"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/10 bg-white/[0.03] px-7 py-3.5 font-semibold text-gray-300 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
          >
            GitHub
          </a>
        </motion.div>

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mx-auto mt-16 max-w-2xl"
        >
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-600">
            Currently building with
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map(({ name, icon: Icon }, index) => (
              <motion.div
                key={name}
                whileHover={{
                  y: -6,
                  scale: 1.05,
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-4 py-2.5 text-sm text-gray-400 backdrop-blur-xl transition hover:border-indigo-400/30 hover:bg-white/[0.06] hover:text-white"
              >
                <Icon className="text-base transition group-hover:text-indigo-300" />
                {name}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[9px] uppercase tracking-[0.35em] text-gray-600 sm:flex"
        >
          Scroll
          <motion.span
            className="h-10 w-px bg-gradient-to-b from-gray-500 to-transparent"
            animate={{ scaleY: [1, 0.55, 1] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}