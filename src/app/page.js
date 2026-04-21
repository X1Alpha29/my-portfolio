"use client";

import { FaReact, FaPython, FaUnity, FaAndroid } from "react-icons/fa";
import { SiFlask, SiTailwindcss, SiKotlin, SiDotnet } from "react-icons/si";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {

  const images = [
    "/images/taskpilot-1.png",
    "/images/taskpilot-2.png",
    "/images/taskpilot-3.png",
    "/images/android.png",
    "/images/unity.png"
  ];

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [events, setEvents] = useState([]);

  const buttonStyle =
    "inline-block px-6 py-3 font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg hover:from-purple-500 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105";

  const cardStyle =
    "bg-zinc-900 p-6 rounded-2xl hover:bg-zinc-800 transition shadow-lg border border-zinc-800 hover:scale-[1.02] hover:shadow-2xl";

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e) => {
      if (selectedIndex === null) return;

      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex]);

  // GitHub Activity Fetch
  useEffect(() => {
    fetch("https://api.github.com/users/X1Alpha29/events")
      .then((res) => res.json())
      .then((data) => {
        const pushes = data.filter(e => e.type === "PushEvent");
        setEvents(pushes.slice(0, 5));
      });
  }, []);

  return (
    <main className="min-h-screen text-white text-center p-10 relative overflow-hidden bg-gradient-to-br from-black via-zinc-900 to-black">
      
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent)] pointer-events-none"></div>

      {/* HERO */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold mb-4">
          Richard Istvan Baba
        </h1>

        <p className="text-lg text-gray-400">
          Software Developer | Building Web, Mobile & Game Projects
        </p>

        <section className="mt-20 max-w-3xl mx-auto text-center">
  
          <h2 className="text-3xl font-semibold mb-6">
            About Me
          </h2>

          <p className="text-gray-400 leading-relaxed">
            I’m a Junior Software Developer with a strong backend focus, holding a First Class Honours 
            degree in Computing Systems from Ulster University. I combine academic knowledge with 
            hands-on experience in both application development and real-world IT environments.
          </p>

          <p className="text-gray-400 leading-relaxed mt-4">
            I have experience building full-stack web applications using Laravel, REST APIs, and SQL, 
            alongside exposure to C#/.NET, Android, and Unity through shipped personal projects. 
            My work includes developing scalable web applications, a published Android fitness app, 
            and a fully functional FPS game.
          </p>

          <p className="text-gray-400 leading-relaxed mt-4">
            Currently working as an IT Technician in a university environment, I apply strong 
            problem-solving skills in production systems while continuing to develop my programming 
            abilities. I actively use modern development tools and AI-assisted workflows to build 
            efficiently and focus on delivering complete, practical solutions.
          </p>

          <p className="text-gray-400 leading-relaxed mt-4">
            I am particularly interested in backend development and cloud technologies, with the goal 
            of building scalable, reliable systems within a growth-focused development team.
          </p>

        </section>

        {/* GitHub Section */}
        <div className="mt-8 flex flex-col items-center gap-6">

          <a
            href="https://github.com/X1Alpha29"
            target="_blank"
            className={buttonStyle}
          >
            View My GitHub
          </a>

          {/* Contribution Graph */}
          <div className="relative p-4 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-lg">
            <div className="absolute inset-0 bg-green-500/10 blur-xl opacity-30"></div>
            <img
              src="https://ghchart.rshah.org/39d353/X1Alpha29"
              alt="GitHub Contributions"
              className="relative rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">
          My Projects
        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          {/* TASKPILOT */}
          <div className={`${cardStyle} md:col-span-2`}>
            <h3 className="text-2xl font-bold mb-2">
              TaskPilot (AI Task Dashboard)
            </h3>

            <div className="flex gap-8 justify-center mb-10 items-center">
              {images.slice(0, 3).map((img, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedIndex(i)}
                  className="relative rounded-2xl overflow-hidden transition-all duration-500 
                  w-[520px] hover:w-[680px] hover:z-10 group cursor-pointer"
                >
                  <div className="relative w-full aspect-video bg-black">
                    <Image
                      src={img}
                      alt="TaskPilot Screenshot"
                      fill
                      className="object-contain transition"
                    />
                  </div>

                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition"></div>
                </div>
              ))}
            </div>

            <p className="text-gray-400 mb-4">
              Full-stack SaaS task management app with AI-powered features and analytics.
            </p>

            <div className="flex justify-center gap-6 mb-4 text-2xl">
              <FaReact className="hover:scale-125 hover:text-cyan-400 transition" />
              <SiFlask className="hover:scale-125 hover:text-gray-300 transition" />
              <FaPython className="hover:scale-125 hover:text-yellow-400 transition" />
              <SiTailwindcss className="hover:scale-125 hover:text-sky-400 transition" />
            </div>

            <a
              href="https://github.com/X1Alpha29/taskpilot"
              target="_blank"
              className={buttonStyle}
            >
              View Project
            </a>
          </div>

          {/* ANDROID */}
          <div className={cardStyle}>
            <h3 className="text-xl font-bold mb-2">RepStack</h3>

            <div onClick={() => setSelectedIndex(3)} className="w-[420px] hover:w-[520px] mx-auto cursor-pointer transition mb-4">
              <div className="aspect-video relative bg-black rounded-xl overflow-hidden">
                <Image src="/images/android.png" fill alt="" className="object-contain" />
              </div>
            </div>

            <div className="flex justify-center gap-6 mb-4 text-2xl">
              <FaAndroid className="hover:scale-125 hover:text-green-400 transition" />
              <SiKotlin className="hover:scale-125 hover:text-purple-400 transition" />
            </div>

            <a href="https://play.google.com/store/apps/details?id=com.richard.repstack" target="_blank" className={buttonStyle}>
              View Project
            </a>
          </div>

          {/* UNITY */}
          <div className={cardStyle}>
            <h3 className="text-xl font-bold mb-2">Unity FPS</h3>

            <div onClick={() => setSelectedIndex(4)} className="w-[420px] hover:w-[520px] mx-auto cursor-pointer transition mb-4">
              <div className="aspect-video relative bg-black rounded-xl overflow-hidden">
                <Image src="/images/unity.png" fill alt="" className="object-contain" />
              </div>
            </div>

            <div className="flex justify-center gap-6 mb-4 text-2xl">
              <FaUnity className="hover:scale-125 hover:text-gray-300 transition" />
              <SiDotnet className="hover:scale-125 hover:text-purple-500 transition" />
            </div>

            <a href="https://rbadmintech.itch.io/overcharged-capture-command" target="_blank" className={buttonStyle}>
              View Project
            </a>
          </div>

        </div>

        {/* CV */}
        <section className="mt-20">
          <h2 className="text-2xl font-semibold mb-4">My CV</h2>
          <a href="/cv.pdf" target="_blank" className={buttonStyle}>
            Download CV
          </a>
        </section>
      </section>

      {/* FULLSCREEN */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50">

          <button className="absolute top-6 right-6 text-white text-3xl" onClick={() => setSelectedIndex(null)}>✕</button>
          <button className="absolute left-6 text-white text-4xl" onClick={prevImage}>‹</button>

          <Image src={images[selectedIndex]} alt="Full" width={1400} height={900} className="max-w-[90%] max-h-[90%] object-contain" />

          <button className="absolute right-6 text-white text-4xl" onClick={nextImage}>›</button>

          <div className="absolute bottom-6 text-gray-300">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}

    </main>
  );
}