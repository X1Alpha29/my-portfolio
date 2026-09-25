"use client";

import { motion } from "motion/react";
import {
  SiDotnet,
  SiLaravel,
  SiNextdotjs,
  SiPostgresql,
  SiReact,
  SiTypescript,
} from "react-icons/si";

const capabilities = [
  {
    number: "01",
    title: "Full-Stack Development",
    text: "Building complete web applications from interface to database, authentication and deployment.",
  },
  {
    number: "02",
    title: "Backend & APIs",
    text: "Designing structured backend systems, REST APIs, validation and database-driven workflows.",
  },
  {
    number: "03",
    title: "Cloud & Deployment",
    text: "Deploying production applications using modern cloud platforms, managed databases and container tooling.",
  },
  {
    number: "04",
    title: "Problem Solving",
    text: "Combining software development with real-world IT experience to diagnose problems and build practical solutions.",
  },
];

const technologies = [
  { name: "Next.js", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "React", icon: SiReact },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "Laravel", icon: SiLaravel },
  { name: ".NET", icon: SiDotnet },
  { name: "C#", icon: null },
];

export default function AboutSection() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-28 sm:px-8">
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="mb-14"
      >
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-blue-400">
          About
        </p>

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-3xl text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl md:text-6xl">
            Building things that
            <span className="text-gray-500"> actually work.</span>
          </h2>

          <span className="hidden text-7xl font-black tracking-[-0.08em] text-white/[0.035] md:block">
            01
          </span>
        </div>
      </motion.div>

      {/* Main profile panel */}
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Profile */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] p-7 backdrop-blur-xl sm:p-10"
        >
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-blue-500/[0.06] blur-3xl" />

          <div className="relative z-10">
            <p className="max-w-2xl text-lg leading-8 text-gray-300 sm:text-xl">
              I’m a Software Developer with a First Class Honours degree in
              Computing Systems from Ulster University, combining software
              development with practical experience in a production IT
              environment.
            </p>

            <p className="mt-6 max-w-2xl leading-7 text-gray-500">
              My work spans full-stack web applications, backend systems,
              REST APIs, databases, cloud deployment, mobile development and
              game development. I enjoy taking an idea from an initial concept
              through to a working, deployed product.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                ["BSc", "Computing Systems"],
                ["1st", "Class Honours"],
                ["Full", "Stack"],
                ["Cloud", "Deployment"],
              ].map(([value, label]) => (
                <div
                  key={value + label}
                  className="rounded-2xl border border-white/[0.06] bg-black/20 p-4"
                >
                  <div className="text-2xl font-bold tracking-tight text-white">
                    {value}
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-gray-600">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Capabilities */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {capabilities.map((item, index) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ x: 6 }}
              className="group rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6 backdrop-blur-xl transition-colors hover:border-blue-400/20 hover:bg-white/[0.04]"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="text-xs font-semibold tracking-[0.25em] text-blue-400/70">
                  {item.number}
                </span>

                <span className="h-px w-10 bg-white/10 transition-all duration-300 group-hover:w-16 group-hover:bg-blue-400/40" />
              </div>

              <h3 className="text-lg font-semibold text-white">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Technology strip */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="mt-8 overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.018] py-5"
      >
        <div className="flex flex-wrap items-center justify-center gap-3 px-4">
          {technologies.map(({ name, icon: Icon }) => (
            <motion.div
              key={name}
              whileHover={{ y: -4, scale: 1.04 }}
              className="flex items-center gap-2 rounded-full border border-white/[0.06] bg-black/20 px-4 py-2 text-sm text-gray-500 transition-colors hover:border-blue-400/20 hover:text-white"
            >
              {Icon ? (
                <Icon className="text-base text-gray-600 transition-colors group-hover:text-blue-400" />
                ) : (
                <span className="text-xs font-bold text-gray-600 transition-colors group-hover:text-blue-400">
                    C#
                </span>
                )}
                {name}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}