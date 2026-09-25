"use client";

import { FaReact, FaPython, FaUnity, FaAndroid } from "react-icons/fa";
import {
  SiFlask,
  SiTailwindcss,
  SiKotlin,
  SiDotnet,
  SiNextdotjs,
  SiTypescript,
  SiPostgresql,
  SiPrisma,
  SiDocker,
} from "react-icons/si";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

import AnimatedBackground from "../components/AnimatedBackground";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";

function TiltCard({ children, className = "" }) {
  const [tilt, setTilt] = useState({
    x: 0,
    y: 0,
    mouseX: 50,
    mouseY: 50,
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 6;
    const rotateX = ((y / rect.height) - 0.5) * -6;

    setTilt({
      x: rotateX,
      y: rotateY,
      mouseX: x,
      mouseY: y,
    });
  };

  const handleMouseLeave = () => {
    setTilt({
      x: 0,
      y: 0,
      mouseX: 50,
      mouseY: 50,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative"
      style={{
        perspective: "1400px",
      }}
    >
      <div
        className={`relative transition-transform duration-150 ease-out ${className}`}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Cursor-following light */}
        <div
          className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(
              420px circle at ${tilt.mouseX}px ${tilt.mouseY}px,
              rgba(34, 211, 238, 0.10),
              rgba(59, 130, 246, 0.04) 35%,
              transparent 70%
            )`,
          }}
        />

        {children}
      </div>
    </div>
  );
}

export default function Home() {
  const images = [
    "/images/taskpilot-1.png",
    "/images/taskpilot-2.png",
    "/images/taskpilot-3.png",
    "/images/android.png",
    "/images/unity.png",
  ];

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [events, setEvents] = useState([]);

  const buttonStyle =
    "inline-block px-6 py-3 font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105";

  const cardStyle =
    "bg-zinc-900/80 p-6 rounded-2xl hover:bg-zinc-800/90 transition shadow-lg border border-zinc-800 hover:scale-[1.02] hover:shadow-2xl backdrop-blur-xl";

  const nextImage = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e) => {
      if (selectedIndex === null) return;

      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [selectedIndex, nextImage, prevImage]);

  // GitHub Activity Fetch
  useEffect(() => {
    fetch("https://api.github.com/users/X1Alpha29/events")
      .then((res) => res.json())
      .then((data) => {
        const pushes = data.filter((e) => e.type === "PushEvent");
        setEvents(pushes.slice(0, 5));
      });
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden p-10 text-center text-white">
      <AnimatedBackground />

      <div className="relative z-10">
        {/* HERO */}
        <HeroSection />

        {/* ABOUT */}
        <AboutSection />
                {/* TECHNOLOGY STACK */}
        <section className="mx-auto max-w-7xl py-28">
          <div className="mb-14 text-left">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-cyan-400" />
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
                Technology
              </p>
            </div>

            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl">
                  Built With
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
                  Technologies I use across web applications, backend systems,
                  databases, mobile development and interactive projects.
                </p>
              </div>

              <div className="hidden rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-gray-600 lg:block">
                Engineering Stack
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Frontend",
                description: "Interfaces & user experiences",
                technologies: [
                  ["Next.js", SiNextdotjs],
                  ["TypeScript", SiTypescript],
                  ["React", FaReact],
                  ["Tailwind CSS", SiTailwindcss],
                ],
              },
              {
                title: "Backend",
                description: "APIs & application logic",
                technologies: [
                  ["Python", FaPython],
                  ["Flask", SiFlask],
                  ["C#", null],
                  [".NET", SiDotnet],
                ],
              },
              {
                title: "Data",
                description: "Storage & persistence",
                technologies: [
                  ["PostgreSQL", SiPostgresql],
                  ["Prisma", SiPrisma],
                ],
              },
              {
                title: "Platforms",
                description: "Containers & applications",
                technologies: [
                  ["Docker", SiDocker],
                  ["Android", FaAndroid],
                  ["Kotlin", SiKotlin],
                  ["Unity", FaUnity],
                ],
              },
            ].map((group, index) => (
              <div
                key={group.title}
                className="group relative overflow-hidden rounded-[22px] border border-white/[0.07] bg-zinc-950/80 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-zinc-900/90 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
              >
                {/* Ambient glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-cyan-400/[0.05] blur-3xl transition duration-700 group-hover:bg-cyan-400/[0.10]" />

                {/* Top accent */}
                <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-cyan-400/70">
                        0{index + 1}
                      </p>

                      <h3 className="mt-1 text-lg font-semibold text-white">
                        {group.title}
                      </h3>

                      <p className="mt-1 text-xs text-gray-600">
                        {group.description}
                      </p>
                    </div>

                    <span className="h-2 w-2 rounded-full bg-white/10 transition duration-500 group-hover:bg-cyan-400 group-hover:shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
                  </div>

                  <div className="space-y-2">
                    {group.technologies.map(([name, Icon]) => (
                      <div
                        key={name}
                        className="group/tech flex items-center gap-3 border-b border-white/[0.05] py-3 last:border-b-0"
                      >
                        {Icon ? (
                          <Icon className="shrink-0 text-sm text-gray-600 transition-all duration-300 group-hover/tech:scale-110 group-hover/tech:text-cyan-400" />
                        ) : (
                          <span className="w-[14px] shrink-0 text-[9px] font-bold text-gray-600 transition-colors duration-300 group-hover/tech:text-cyan-400">
                            C#
                          </span>
                        )}

                        <span className="text-xs font-medium text-gray-500 transition-colors duration-300 group-hover/tech:text-white">
                          {name}
                        </span>

                        <span className="ml-auto h-px w-0 bg-cyan-400/50 transition-all duration-500 group-hover/tech:w-5" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Animated capability rail */}
          <div className="mt-5 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            <div className="flex min-w-max animate-[techMarquee_24s_linear_infinite] items-center gap-10 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-700">
              <span>Web Applications</span>
              <span className="text-cyan-400/50">•</span>
              <span>REST APIs</span>
              <span className="text-cyan-400/50">•</span>
              <span>Database Design</span>
              <span className="text-cyan-400/50">•</span>
              <span>Cloud & Deployment</span>
              <span className="text-cyan-400/50">•</span>
              <span>Mobile Development</span>
              <span className="text-cyan-400/50">•</span>
              <span>Game Development</span>
              <span className="text-cyan-400/50">•</span>
              <span>Web Applications</span>
              <span className="text-cyan-400/50">•</span>
              <span>REST APIs</span>
              <span className="text-cyan-400/50">•</span>
              <span>Database Design</span>
            </div>
          </div>
        </section>
                {/* GITHUB ACTIVITY */}
        <section className="mx-auto mt-16 max-w-7xl text-left">
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-10 bg-cyan-400" />
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
                GitHub
              </p>
            </div>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
                  Development Activity
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-500">
                  A snapshot of my open-source activity, recent repository
                  work and contribution history.
                </p>
              </div>

              <a
                href="https://github.com/X1Alpha29"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 self-start rounded-xl border border-white/[0.08] bg-white/[0.025] px-5 py-3 text-sm font-semibold text-gray-400 transition duration-300 hover:border-cyan-400/25 hover:bg-cyan-400/[0.05] hover:text-white"
              >
                GitHub Profile
                <span className="transition duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </a>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.5fr_0.9fr]">

            {/* Contribution graph */}
            <div className="group relative overflow-hidden rounded-[24px] border border-white/[0.07] bg-zinc-950/80 p-5 sm:p-6">
              <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-cyan-400/[0.04] blur-3xl transition duration-700 group-hover:bg-cyan-400/[0.08]" />

              <div className="relative z-10">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-600">
                      Contribution History
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-300">
                      github.com/X1Alpha29
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
                    Active
                  </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-white/[0.05] bg-black/40 p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://ghchart.rshah.org/39d353/X1Alpha29"
                    alt="GitHub contribution graph"
                    className="relative w-full rounded-lg opacity-80 transition duration-500 group-hover:opacity-100"
                  />
                </div>

                <div className="mt-4 flex items-center justify-between text-[9px] uppercase tracking-[0.16em] text-gray-700">
                  <span>Less</span>

                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-sm bg-[#161b22]" />
                    <span className="h-2.5 w-2.5 rounded-sm bg-[#9be9a8]" />
                    <span className="h-2.5 w-2.5 rounded-sm bg-[#40c463]" />
                    <span className="h-2.5 w-2.5 rounded-sm bg-[#30a14e]" />
                    <span className="h-2.5 w-2.5 rounded-sm bg-[#216e39]" />
                  </div>

                  <span>More</span>
                </div>
              </div>
            </div>


            {/* Recent activity */}
            <div className="group relative overflow-hidden rounded-[24px] border border-white/[0.07] bg-zinc-950/80 p-5 sm:p-6">
              <div className="pointer-events-none absolute -left-24 -top-24 h-56 w-56 rounded-full bg-blue-500/[0.04] blur-3xl transition duration-700 group-hover:bg-blue-500/[0.08]" />

              <div className="relative z-10">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-600">
                      Recent Activity
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-300">
                      Latest repository pushes
                    </p>
                  </div>

                  <span className="rounded-full border border-white/[0.06] bg-white/[0.025] px-2.5 py-1 text-[9px] uppercase tracking-[0.15em] text-gray-600">
                    Live Feed
                  </span>
                </div>

                <div className="space-y-1">
                  {events.length > 0 ? (
                    events.map((event, index) => (
                      <div
                        key={`${event.id || event.created_at}-${index}`}
                        className="group/activity border-b border-white/[0.05] py-3 last:border-b-0"
                      >
                        <div className="flex items-start gap-3">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/70 transition group-hover/activity:bg-cyan-300 group-hover/activity:shadow-[0_0_8px_rgba(34,211,238,0.7)]" />

                          <div className="min-w-0">
                            <p className="truncate text-xs font-medium text-gray-400 transition-colors group-hover/activity:text-white">
                              {event.repo?.name || "GitHub repository"}
                            </p>

                            <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-gray-700">
                              Push •{" "}
                              {event.created_at
                                ? new Date(event.created_at).toLocaleDateString(
                                    "en-GB",
                                    {
                                      day: "2-digit",
                                      month: "short",
                                    }
                                  )
                                : "Recent"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex min-h-[250px] items-center justify-center">
                      <p className="text-xs text-gray-700">
                        Loading GitHub activity...
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

              {/* PROJECTS */}
      <section id="projects" className="mx-auto max-w-7xl py-24">
        {/* SECTION HEADER */}
        <div className="mb-16 text-left">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-cyan-400" />
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Selected Work
            </p>
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl md:text-6xl">
                Projects
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
                Applications, platforms and interactive projects built across
                web, mobile and game development.
              </p>
            </div>

            <div className="hidden items-center gap-3 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2 text-xs uppercase tracking-[0.18em] text-gray-500 md:flex">
              <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
              Portfolio / 2026
            </div>
          </div>
        </div>

        <div className="space-y-8">

          {/* ====================================================== */}
          {/* BELLA LUNA — FLAGSHIP PROJECT                         */}
          {/* ====================================================== */}
<TiltCard className="group relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-zinc-950/90 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
            {/* Ambient glow */}
            <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-cyan-400/[0.07] blur-3xl transition duration-700 group-hover:bg-cyan-400/[0.12]" />
            <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-500/[0.06] blur-3xl" />

            {/* Top border light */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

            <div className="relative z-10 p-6 sm:p-8 lg:p-10">

              {/* Header */}
              <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-cyan-400/20 bg-cyan-400/[0.08] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
                      Featured Project
                    </span>

                    <span className="flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.05] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                      Live
                    </span>
                  </div>

                  <h3 className="text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
                    Trattoria Bella Luna
                  </h3>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
                    Full-stack restaurant platform built as a production-style
                    application, combining customer-facing experiences with
                    authenticated administration and database-driven content.
                  </p>
                </div>

                <div className="hidden shrink-0 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-right lg:block">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-gray-600">
                    Deployment
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray-300">
                    Production
                  </p>
                </div>
              </div>

              {/* Main layout */}
              <div className="grid gap-8 lg:grid-cols-[1.55fr_0.75fr] lg:items-center">

                {/* Screenshot */}
                <div className="group/media relative">
                  <div className="absolute -inset-3 rounded-[28px] bg-cyan-400/[0.04] opacity-0 blur-2xl transition duration-700 group-hover/media:opacity-100" />

                  <div className="relative overflow-hidden rounded-[22px] border border-white/[0.08] bg-black shadow-2xl">

                    {/* Decorative frame */}
                    <div className="pointer-events-none absolute inset-0 z-20">
                      <div className="absolute left-4 top-4 h-5 w-5 border-l border-t border-cyan-400/40" />
                      <div className="absolute right-4 top-4 h-5 w-5 border-r border-t border-cyan-400/40" />
                      <div className="absolute bottom-4 left-4 h-5 w-5 border-b border-l border-cyan-400/40" />
                      <div className="absolute bottom-4 right-4 h-5 w-5 border-b border-r border-cyan-400/40" />
                    </div>

                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src="/images/bella-luna.png"
                        alt="Trattoria Bella Luna restaurant website"
                        fill
                        priority
                        className="object-cover transition duration-700 group-hover/media:scale-[1.035]"
                      />

                      {/* Dark cinematic gradient */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

                      {/* Scan line */}
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent opacity-0 transition duration-500 group-hover/media:animate-pulse group-hover/media:opacity-100" />

                      {/* Bottom label */}
                      <div className="absolute bottom-5 left-5 z-20">
                        <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-cyan-300">
                          Full-Stack Web Platform
                        </p>
                      </div>
                    </div>

                    {/* Hover sweep */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-30 w-1/3 -translate-x-[180%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent transition duration-1000 group-hover/media:translate-x-[520%]" />
                  </div>
                </div>

                {/* Details */}
                <div className="flex h-full flex-col justify-between">

                  <div>
                    <div className="mb-6 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition duration-300 hover:border-cyan-400/20 hover:bg-white/[0.04]">
                        <p className="text-[9px] uppercase tracking-[0.18em] text-gray-600">
                          Frontend
                        </p>
                        <p className="mt-2 text-sm font-semibold text-gray-300">
                          Next.js
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition duration-300 hover:border-cyan-400/20 hover:bg-white/[0.04]">
                        <p className="text-[9px] uppercase tracking-[0.18em] text-gray-600">
                          Database
                        </p>
                        <p className="mt-2 text-sm font-semibold text-gray-300">
                          PostgreSQL
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition duration-300 hover:border-cyan-400/20 hover:bg-white/[0.04]">
                        <p className="text-[9px] uppercase tracking-[0.18em] text-gray-600">
                          ORM
                        </p>
                        <p className="mt-2 text-sm font-semibold text-gray-300">
                          Prisma
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition duration-300 hover:border-cyan-400/20 hover:bg-white/[0.04]">
                        <p className="text-[9px] uppercase tracking-[0.18em] text-gray-600">
                          Deployment
                        </p>
                        <p className="mt-2 text-sm font-semibold text-gray-300">
                          Vercel
                        </p>
                      </div>
                    </div>

                    {/* Tech stack */}
                    <div className="mb-8">
                      <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-gray-600">
                        Technology
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {[
                          ["Next.js", SiNextdotjs],
                          ["TypeScript", SiTypescript],
                          ["Tailwind", SiTailwindcss],
                          ["PostgreSQL", SiPostgresql],
                          ["Prisma", SiPrisma],
                          ["Docker", SiDocker],
                        ].map(([name, Icon]) => (
                          <div
                            key={name}
                            className="group/tech flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.025] px-3 py-2 text-xs text-gray-500 transition duration-300 hover:border-cyan-400/20 hover:bg-cyan-400/[0.05] hover:text-white"
                          >
                            <Icon className="text-sm text-gray-600 transition duration-300 group-hover/tech:text-cyan-400" />
                            {name}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                    <a
                      href="https://trattoria-bella-luna.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/button inline-flex items-center justify-center gap-3 rounded-xl border border-cyan-400/25 bg-cyan-400/[0.08] px-5 py-3 text-sm font-semibold text-cyan-300 transition duration-300 hover:border-cyan-300/50 hover:bg-cyan-400/[0.14] hover:text-white"
                    >
                      <span>Live Website</span>
                      <span className="transition duration-300 group-hover/button:translate-x-1">
                        →
                      </span>
                    </a>

                    <a
                      href="https://github.com/X1Alpha29/trattoria-bella-luna"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/button inline-flex items-center justify-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] px-5 py-3 text-sm font-semibold text-gray-300 transition duration-300 hover:border-white/[0.16] hover:bg-white/[0.06] hover:text-white"
                    >
                      <span>View Source</span>
                      <span className="transition duration-300 group-hover/button:translate-x-1">
                        ↗
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>


          {/* ====================================================== */}
          {/* TASKPILOT                                               */}
          {/* ====================================================== */}
<TiltCard className="group relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-zinc-950/90 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
            <div className="pointer-events-none absolute -right-32 top-0 h-72 w-72 rounded-full bg-blue-500/[0.05] blur-3xl transition duration-700 group-hover:bg-blue-500/[0.09]" />

            <div className="relative z-10 p-6 sm:p-8">
              <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-blue-400/80">
                    Featured Application
                  </p>

                  <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    TaskPilot
                  </h3>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                    Full-stack SaaS task management application with AI-powered
                    features and analytics.
                  </p>
                </div>

                <span className="self-start rounded-full border border-white/[0.06] bg-white/[0.025] px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-gray-500">
                  SaaS / AI
                </span>
              </div>

              {/* Screenshots */}
              <div className="grid gap-4 md:grid-cols-3">

                {/* Large */}
                <button
                  type="button"
                  onClick={() => setSelectedIndex(0)}
                  className="group/image relative overflow-hidden rounded-2xl border border-white/[0.07] bg-black text-left outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 md:col-span-2"
                  aria-label="Open TaskPilot screenshot 1"
                >
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={images[0]}
                      alt="TaskPilot dashboard screenshot"
                      fill
                      className="object-cover transition duration-300 ease-out group-hover/image:scale-[1.04]"                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    <div className="absolute bottom-4 left-4">
                      <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[9px] uppercase tracking-[0.18em] text-gray-300 backdrop-blur-md">
                        Dashboard
                      </span>
                    </div>
                  </div>

                  <div className="absolute inset-x-0 top-0 h-px -translate-x-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent transition duration-700 group-hover/image:translate-x-full" />
                </button>

                {/* Small */}
                <div className="grid gap-4">
                  <button
                    type="button"
                    onClick={() => setSelectedIndex(1)}
                    className="group/image relative overflow-hidden rounded-2xl border border-white/[0.07] bg-black outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                    aria-label="Open TaskPilot screenshot 2"
                  >
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={images[1]}
                        alt="TaskPilot screenshot 2"
                        fill
className="object-cover transition duration-300 ease-out group-hover/image:scale-[1.05]"                      />
                      <div className="absolute inset-0 bg-black/20 transition group-hover/image:bg-transparent" />
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedIndex(2)}
                    className="group/image relative overflow-hidden rounded-2xl border border-white/[0.07] bg-black outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                    aria-label="Open TaskPilot screenshot 3"
                  >
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={images[2]}
                        alt="TaskPilot screenshot 3"
                        fill
className="object-cover transition duration-300 ease-out group-hover/image:scale-[1.05]"                      />
                      <div className="absolute inset-0 bg-black/20 transition group-hover/image:bg-transparent" />
                    </div>
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-7 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap gap-2">
                  {[
                    ["React", FaReact],
                    ["Flask", SiFlask],
                    ["Python", FaPython],
                    ["Tailwind", SiTailwindcss],
                  ].map(([name, Icon]) => (
                    <div
                      key={name}
                      className="flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.025] px-3 py-2 text-xs text-gray-500 transition hover:border-blue-400/20 hover:text-white"
                    >
                      <Icon className="text-gray-600" />
                      {name}
                    </div>
                  ))}
                </div>

                <a
                  href="https://github.com/X1Alpha29/taskpilot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/button inline-flex items-center justify-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-3 text-sm font-semibold text-gray-300 transition duration-300 hover:border-blue-400/30 hover:bg-blue-400/[0.06] hover:text-white"
                >
                  View Project
                  <span className="transition duration-300 group-hover/button:translate-x-1">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </TiltCard>


          {/* ====================================================== */}
          {/* SECONDARY PROJECTS                                     */}
          {/* ====================================================== */}
          <div className="grid gap-8 lg:grid-cols-2">

            {/* REPSTACK */}
            <article className="group relative overflow-hidden rounded-[26px] border border-white/[0.07] bg-zinc-950/80 shadow-[0_14px_50px_rgba(0,0,0,0.28)]">

              <div className="pointer-events-none absolute -left-24 -top-24 h-56 w-56 rounded-full bg-cyan-400/[0.04] blur-3xl transition duration-700 group-hover:bg-cyan-400/[0.08]" />

              <div className="relative z-10 p-6">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-gray-600">
                      Mobile Application
                    </p>

                    <h3 className="text-2xl font-bold text-white">
                      RepStack
                    </h3>
                  </div>

                  <span className="rounded-full border border-white/[0.06] bg-white/[0.025] px-3 py-1 text-[9px] uppercase tracking-[0.18em] text-gray-500">
                    Android
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedIndex(3)}
                  className="group/image relative block w-full overflow-hidden rounded-2xl border border-white/[0.07] bg-black text-left outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  aria-label="Open RepStack screenshot"
                >
                  <div className="relative aspect-video">
                    <Image
                      src="/images/android.png"
                      alt="RepStack Android application"
                      fill
                      className="object-contain p-4 transition duration-700 group-hover/image:scale-[1.04]"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-70" />
                </button>

                <p className="mt-5 text-sm leading-6 text-gray-500">
                  Android fitness application focused on workout tracking and
                  structured training.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <div className="group/tech flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.025] px-3 py-2 text-xs text-gray-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/25 hover:bg-cyan-400/[0.05] hover:text-white hover:shadow-[0_0_20px_rgba(34,211,238,0.08)]">
                    <FaAndroid className="text-gray-600 transition-all duration-300 group-hover/tech:scale-110 group-hover/tech:text-cyan-400" />
                    Android
                  </div>

                  <div className="group/tech flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.025] px-3 py-2 text-xs text-gray-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/25 hover:bg-cyan-400/[0.05] hover:text-white hover:shadow-[0_0_20px_rgba(34,211,238,0.08)]">
                    <SiKotlin className="text-gray-600 transition-all duration-300 group-hover/tech:scale-110 group-hover/tech:text-cyan-400" />
                    Kotlin
                  </div>
                </div>

                <a
                  href="https://play.google.com/store/apps/details?id=com.richard.repstack"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/button mt-6 inline-flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-3 text-sm font-semibold text-gray-300 transition duration-300 hover:border-cyan-400/25 hover:bg-cyan-400/[0.05] hover:text-white"
                >
                  Google Play
                  <span className="transition duration-300 group-hover/button:translate-x-1">
                    ↗
                  </span>
                </a>
              </div>
            </article>


            {/* UNITY */}
            <article className="group relative overflow-hidden rounded-[26px] border border-white/[0.07] bg-zinc-950/80 shadow-[0_14px_50px_rgba(0,0,0,0.28)]">

              <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-blue-500/[0.04] blur-3xl transition duration-700 group-hover:bg-blue-500/[0.08]" />

              <div className="relative z-10 p-6">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-gray-600">
                      Game Development
                    </p>

                    <h3 className="text-2xl font-bold text-white">
                      Unity FPS
                    </h3>
                  </div>

                  <span className="rounded-full border border-white/[0.06] bg-white/[0.025] px-3 py-1 text-[9px] uppercase tracking-[0.18em] text-gray-500">
                    Unity
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedIndex(4)}
                  className="group/image relative block w-full overflow-hidden rounded-2xl border border-white/[0.07] bg-black text-left outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  aria-label="Open Unity FPS screenshot"
                >
                  <div className="relative aspect-video">
                    <Image
                      src="/images/unity.png"
                      alt="Unity FPS game"
                      fill
                      className="object-contain p-4 transition duration-700 group-hover/image:scale-[1.04]"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-70" />
                </button>

                <p className="mt-5 text-sm leading-6 text-gray-500">
                  First-person multiplayer-style game project developed with
                  Unity and .NET-based tooling.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <div className="group/tech flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.025] px-3 py-2 text-xs text-gray-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/25 hover:bg-cyan-400/[0.05] hover:text-white hover:shadow-[0_0_20px_rgba(34,211,238,0.08)]">
                    <FaUnity className="text-gray-600 transition-all duration-300 group-hover/tech:scale-110 group-hover/tech:text-cyan-400" />
                    Unity
                  </div>

                  <div className="group/tech flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.025] px-3 py-2 text-xs text-gray-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/25 hover:bg-cyan-400/[0.05] hover:text-white hover:shadow-[0_0_20px_rgba(34,211,238,0.08)]">
                    <SiDotnet className="text-gray-600 transition-all duration-300 group-hover/tech:scale-110 group-hover/tech:text-cyan-400" />
                    .NET
                  </div>
                </div>

                <a
                  href="https://rbadmintech.itch.io/overcharged-capture-command"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/button mt-6 inline-flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-3 text-sm font-semibold text-gray-300 transition duration-300 hover:border-blue-400/25 hover:bg-blue-400/[0.05] hover:text-white"
                >
                  Play / View Project
                  <span className="transition duration-300 group-hover/button:translate-x-1">
                    ↗
                  </span>
                </a>
              </div>
            </article>

          </div>
        </div>
      </section>
        

        {/* FULLSCREEN */}
        {selectedIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-6">
            <button
              type="button"
              className="absolute right-6 top-6 z-20 text-3xl text-white transition hover:scale-110 hover:text-blue-300"
              onClick={() => setSelectedIndex(null)}
              aria-label="Close image viewer"
            >
              ✕
            </button>

            <button
              type="button"
              className="absolute left-6 z-20 text-4xl text-white transition hover:scale-110 hover:text-blue-300"
              onClick={prevImage}
              aria-label="Previous image"
            >
              ‹
            </button>

            <Image
              src={images[selectedIndex]}
              alt="Project preview"
              width={1400}
              height={900}
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />

            <button
              type="button"
              className="absolute right-6 z-20 text-4xl text-white transition hover:scale-110 hover:text-blue-300"
              onClick={nextImage}
              aria-label="Next image"
            >
              ›
            </button>

            <div className="absolute bottom-6 text-xs uppercase tracking-[0.2em] text-gray-400">
              {selectedIndex + 1} / {images.length}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}