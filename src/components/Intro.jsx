import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context";
import { ArrowRight, Github, Mail, Sparkles } from "lucide-react";
import developerAvatar from "../assets/images/developer-avatar.webp";

const titles = [
  "Software Developer",
  ".NET Core Expert",
  "C# Specialist",
  "Azure & Cloud Engineer",
  "SQL & Database Developer",
  "React & Frontend Engineer",
];

const Intro = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const [titleIndex, setTitleIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setTitleIndex((prev) => (prev + 1) % titles.length);
        setFade(true);
      }, 300);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen pt-28 pb-16 flex items-center relative overflow-hidden">
      {/* Ambient background glow elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column - Hero Text */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <Sparkles size={14} className="text-cyan-400" />
            Available for New Opportunities
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <p className={darkMode ? "text-slate-400 text-lg font-medium" : "text-slate-600 text-lg font-medium"}>
              Hello, my name is
            </p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
              <span className={darkMode ? "text-white" : "text-slate-900"}>Parth </span>
              <span className="text-gradient">Darji</span>
            </h1>
          </div>

          {/* Animated Role Switcher */}
          <div className="h-12 flex items-center">
            <span className="text-xl sm:text-2xl font-semibold text-cyan-400">I am a </span>
            <span
              className={`ml-2.5 text-xl sm:text-2xl font-bold ${
                darkMode ? "text-indigo-300" : "text-indigo-600"
              } transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}
            >
              {titles[titleIndex]}
            </span>
          </div>

          {/* Description */}
          <p
            className={`max-w-2xl text-base sm:text-lg leading-relaxed ${
              darkMode ? "text-slate-300" : "text-slate-600"
            }`}
          >
            Software Developer with strong experience building scalable enterprise web applications using
            <strong className="text-cyan-400 font-semibold"> ASP.NET Core, C#, MVC, JavaScript, SQL Server, </strong>
            and modern frontend frameworks. Passionate about clean architecture, performance optimization, and reliable software delivery.
          </p>

          {/* CTA Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/25 active:scale-95 group"
            >
              View Projects
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#contact"
              className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border font-semibold transition-all duration-200 ${
                darkMode
                  ? "bg-slate-900/80 border-slate-800 text-slate-200 hover:bg-slate-800 hover:border-slate-700"
                  : "bg-white border-slate-200 text-slate-800 hover:bg-slate-50 shadow-sm"
              }`}
            >
              Contact Me
            </a>

            {/* Social Links */}
            <div className="flex items-center gap-2 ml-auto sm:ml-0">
              <a
                href="https://github.com/Parth8825"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className={`p-3 rounded-xl border transition-colors ${
                  darkMode
                    ? "bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/50"
                    : "bg-white border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm"
                }`}
              >
                <Github size={20} />
              </a>

              <a
                href="mailto:parthdarji8825@gmail.com"
                aria-label="Email Me"
                className={`p-3 rounded-xl border transition-colors ${
                  darkMode
                    ? "bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/50"
                    : "bg-white border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm"
                }`}
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column - Protected Avatar / Hero Graphic */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
            {/* Glowing backdrop card */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-cyan-500 to-indigo-600 rotate-6 opacity-30 blur-lg" />
            <div className="absolute inset-0 rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl flex items-center justify-center group">
              {/* Invisible Protection Overlay Shield (blocks right click & drag) */}
              <div 
                className="absolute inset-0 z-10 select-none"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              />
              
              <img
                src={developerAvatar}
                alt="Parth Darji - Software Developer"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                className="w-full h-full object-cover object-[50%_15%] group-hover:scale-105 transition-transform duration-500 select-none pointer-events-none"
              />

              {/* Floating tech badge over avatar */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl glass-panel text-left flex items-center justify-between border border-white/10 z-20">
                <div>
                  <p className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">Tech Focus</p>
                  <p className="text-sm font-bold text-white">.NET Core & Modern Web</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
