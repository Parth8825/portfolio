import useReducedMotion from "../hooks/useReducedMotion";
import React, { useContext, useState, useEffect, useRef } from "react";
import { ThemeContext } from "../context";
import { ArrowRight, Mail, Sparkles, Code2, Globe2, Award, Zap } from "lucide-react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { GithubIcon, LinkedinIcon } from "./Icons";
import Magnetic from "./Magnetic";
import developerAvatar from "../assets/images/developer-avatar.webp";
import { getYearsOfExperience } from "../utils/experience";

const titles = [
  "Software Developer",
  ".NET Core Expert",
  "C# Specialist",
  "Azure & Cloud Engineer",
  "SQL & Database Developer",
  "React & Frontend Engineer",
];

// Restrained pointer tilt inside a lightweight technical profile frame.
const TiltAvatar = () => {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"]);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["-35%", "35%"]);

  const handleUpdate = (clientX, clientY, rect) => {
    const mouseX = (clientX - rect.left) / rect.width - 0.5;
    const mouseY = (clientY - rect.top) / rect.height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseMove = (e) => {
    handleUpdate(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect());
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      data-avatar-frame
      style={{ perspective: 1200 }}
      className="hero-avatar-frame relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 select-none"
    >
      <div className="hero-avatar-backplate" aria-hidden="true" />
      <div className="hero-avatar-meta hero-avatar-meta-top" aria-hidden="true">
        <span>PROFILE // 01</span>
        <span>FULL-STACK ENGINEER</span>
      </div>
      <div className="hero-avatar-meta hero-avatar-meta-side" aria-hidden="true">
        <span>AZURE</span>
        <span>ASP.NET</span>
        <span>REACT</span>
      </div>

      <motion.div
        onMouseMove={reduceMotion ? undefined : handleMouseMove}
        onMouseLeave={handleLeave}
        style={{
          rotateX: reduceMotion ? 0 : rotateX,
          rotateY: reduceMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className="hero-avatar-card absolute inset-0 rounded-3xl bg-slate-900 overflow-hidden shadow-2xl flex items-center justify-center group cursor-grab active:cursor-grabbing"
      >
        <span className="hero-frame-corner hero-frame-corner-tl" aria-hidden="true" />
        <span className="hero-frame-corner hero-frame-corner-tr" aria-hidden="true" />
        <span className="hero-frame-corner hero-frame-corner-bl" aria-hidden="true" />
        <span className="hero-frame-corner hero-frame-corner-br" aria-hidden="true" />

        {/* Invisible Protection Overlay Shield (blocks right click & drag) */}
        <div
          className="absolute inset-0 z-30 select-none pointer-events-auto"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        />

        <div className="w-full h-full pointer-events-none select-none">
          <img
            src={developerAvatar}
            alt="Parth Darji - Software Developer"
            fetchPriority="high"
            decoding="async"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            className="w-full h-full object-cover object-[50%_15%] scale-[1.06]"
          />
        </div>

        {/* Subtle pointer reflection without a blurred moving layer. */}
        <motion.div
          style={{
            x: reduceMotion ? 0 : glareX,
            opacity: reduceMotion ? 0.08 : 0.16,
          }}
          className="pointer-events-none absolute -inset-x-1/2 inset-y-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 z-20"
        />

        <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-2.5 sm:p-3 rounded-2xl bg-slate-950/90 text-left flex items-center justify-between border border-white/15 z-25 shadow-xl">
          <div>
            <p className="text-[10px] sm:text-xs text-cyan-400 font-semibold uppercase tracking-wider">Tech Focus</p>
            <p className="text-xs sm:text-sm font-bold text-white">.NET Core & Modern Web</p>
          </div>
          <div
            data-avatar-status
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400 shrink-0 shadow-xs shadow-emerald-400 ${reduceMotion ? "" : "animate-pulse"}`}
          />
        </div>
      </motion.div>
    </div>
  );
};

// Fluid Spring/Timer Animated Counter for hero metrics
const AnimatedCounter = ({ value }) => {
  const reduceMotion = useReducedMotion();
  const match = String(value).match(/^(\d+)(.*)$/);
  const targetNum = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";

  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!reduceMotion && isInView && targetNum > 0) {
      let start = 0;
      const duration = 1200;
      const stepTime = Math.max(Math.floor(duration / targetNum), 20);
      const interval = setInterval(() => {
        start += Math.ceil(targetNum / 30) || 1;
        if (start >= targetNum) {
          setCount(targetNum);
          clearInterval(interval);
        } else {
          setCount(start);
        }
      }, stepTime);
      return () => clearInterval(interval);
    }
  }, [isInView, targetNum, reduceMotion]);

  return (
    <span ref={ref}>
      {reduceMotion ? targetNum : count}{suffix}
    </span>
  );
};

const Intro = () => {
  const sectionRef = useRef(null);
  const isVisible = useInView(sectionRef);
  const reduceMotion = useReducedMotion();
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const yearsExp = getYearsOfExperience();
  const heroEntrance = (delay = 0) => reduceMotion
    ? { initial: false }
    : {
        initial: { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
      };

  // Mechanical Typewriter Engine
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(85);

  useEffect(() => {
    if (reduceMotion || !isVisible) return;
    let pauseTimer = null;
    const currentTitle = titles[loopNum % titles.length];

    if (!isDeleting && displayText === currentTitle) {
      pauseTimer = setTimeout(() => {
        setIsDeleting(true);
        setTypingSpeed(45);
      }, 1800);
      return () => {
        if (pauseTimer) clearTimeout(pauseTimer);
      };
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setLoopNum((prev) => prev + 1);
      setTypingSpeed(200);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayText((prev) =>
        isDeleting
          ? currentTitle.substring(0, prev.length - 1)
          : currentTitle.substring(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => {
      clearTimeout(timer);
      if (pauseTimer) clearTimeout(pauseTimer);
    };
  }, [displayText, isDeleting, loopNum, typingSpeed, reduceMotion, isVisible]);

  const stats = [
    {
      icon: <Award className={darkMode ? "text-cyan-400" : "text-cyan-600"} size={18} />,
      value: yearsExp,
      label: "Enterprise Experience",
    },
    {
      icon: <Code2 className="text-indigo-400" size={18} />,
      value: "5+",
      label: "Production Web Apps & APIs",
    },
    {
      icon: <Globe2 className="text-purple-400" size={18} />,
      value: "2",
      label: "Countries (Canada 🇨🇦 & India 🇮🇳)",
    },
    {
      icon: <Zap className="text-emerald-400" size={18} />,
      value: "100%",
      label: "Clean Architecture & CI/CD",
    },
  ];

  const socialLinkClass = `action-control hero-social-link p-3 rounded-xl border flex items-center justify-center ${
    darkMode
      ? "bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/50"
      : "bg-[#fbf9f5] border-[#d6cebf] text-[#1c1917] hover:bg-[#ede8df] hover:border-cyan-600 shadow-2xs"
  }`;

  return (
    <section ref={sectionRef} id="home" className="min-h-screen pt-28 pb-16 flex items-center relative overflow-hidden">
      {/* Ambient background glow elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-8 lg:gap-y-6 items-center">
        {/* Left Column - Hero Text */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
          {/* Status Badge */}
          <motion.div
            {...heroEntrance(0)}
            className={`inline-flex max-w-full items-center gap-2 px-3.5 py-2 sm:py-1.5 rounded-2xl sm:rounded-full border text-[11px] sm:text-xs font-semibold tracking-wide uppercase leading-relaxed shadow-sm ${
              darkMode
                ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-400"
                : "border-cyan-300 bg-cyan-50 text-cyan-800"
            }`}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <Sparkles size={13} className={`${darkMode ? "text-cyan-400" : "text-cyan-600"} shrink-0 hidden xs:inline-block`} />
            <span className="leading-tight">
              Software Developer @ TechnoBrains <span className="hidden sm:inline opacity-70">•</span> <br className="sm:hidden" /> Ahmedabad, India
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div
            {...heroEntrance(0.05)}
            className="space-y-2"
          >
            <p className={darkMode ? "text-slate-400 text-base sm:text-lg font-medium" : "text-slate-600 text-base sm:text-lg font-medium"}>
              Hello, my name is
            </p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
              <span className={darkMode ? "text-white" : "text-slate-900"}>Parth </span>
              <span className="text-gradient">Darji</span>
            </h1>
          </motion.div>

          {/* Animated Mechanical Typewriter Role Switcher */}
          <motion.div
            {...heroEntrance(0.1)}
            className="min-h-12 flex flex-wrap items-center"
          >
            <span className={`text-lg sm:text-2xl font-semibold ${darkMode ? "text-cyan-400" : "text-cyan-700"}`}>I am a </span>
            <span
              className={`ml-2.5 text-lg sm:text-2xl font-bold ${
                darkMode ? "text-indigo-300" : "text-indigo-600"
              }`}
            >
              {reduceMotion ? titles[0] : displayText}
            </span>
            <span className="inline-block w-0.5 sm:w-1 h-5 sm:h-7 bg-cyan-400 ml-1.5 translate-y-0.5 rounded-full animate-pulse shadow-xs shadow-cyan-400" />
          </motion.div>

          {/* Dynamic Description */}
          <p
            className={`hero-lcp-description max-w-2xl text-sm sm:text-lg leading-relaxed ${
              darkMode ? "text-slate-300" : "text-slate-600"
            }`}
          >
            Result-driven Azure & .NET Developer with {yearsExp} of experience designing, developing, and deploying scalable web applications and APIs. Expertise in
            <strong className={`font-semibold ${darkMode ? "text-cyan-400" : "text-cyan-800"}`}> ASP.NET Core, Azure Services, RESTful & GraphQL APIs, OAuth 2.0, SQL Server, </strong>
            and modern frontend frameworks like React & TypeScript.
          </p>

          {/* CTA Action Buttons */}
          <motion.div
            {...heroEntrance(0.15)}
            className="pt-1 space-y-3"
          >
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Magnetic strength={0.25} className="w-full sm:w-auto">
                <a
                  href="#projects"
                  className="action-control inline-flex items-center justify-center gap-2.5 px-5 py-3 sm:px-6 sm:py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold rounded-xl text-sm sm:text-base shadow-lg shadow-cyan-500/25 group w-full sm:w-auto"
                >
                  View Projects
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </Magnetic>

              <Magnetic strength={0.25} className="w-full sm:w-auto">
                <a
                  href="#contact"
                  className={`action-control inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl border font-semibold text-sm sm:text-base w-full sm:w-auto ${
                    darkMode
                      ? "bg-slate-900/80 border-slate-800 text-slate-200 hover:bg-slate-800 hover:border-slate-700"
                      : "bg-[#fbf9f5] border-[#d6cebf] text-[#1c1917] hover:bg-[#ede8df] shadow-2xs"
                  }`}
                >
                  Contact Me
                </a>
              </Magnetic>
            </div>

            <div role="group" aria-label="Social profiles" className="flex items-center gap-2">
              <Magnetic strength={0.45}>
                <a
                  href="https://github.com/Parth8825"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className={socialLinkClass}
                >
                  <GithubIcon size={20} />
                </a>
              </Magnetic>

              <Magnetic strength={0.45}>
                <a
                  href="https://www.linkedin.com/in/parthdarji8825"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className={socialLinkClass}
                >
                  <LinkedinIcon size={20} />
                </a>
              </Magnetic>

              <Magnetic strength={0.45}>
                <a
                  href="mailto:parthdarji8825@gmail.com"
                  aria-label="Email Me"
                  className={socialLinkClass}
                >
                  <Mail size={20} />
                </a>
              </Magnetic>
            </div>
          </motion.div>
        </div>

        {/* Technical profile frame moves between content and stats on mobile. */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: reduceMotion ? 0 : 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:row-span-2 flex justify-center items-center py-3 sm:py-5 lg:py-0"
        >
          <TiltAvatar />
        </motion.div>

        {/* Connected impact statistics panel */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="surface-card hero-stats-panel lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 overflow-hidden rounded-3xl border"
          role="list"
          aria-label="Professional highlights"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="hero-stat p-3.5 sm:p-4 cursor-default" role="listitem">
              <div className="flex items-center gap-2 mb-1">
                {stat.icon}
                <span className={`text-lg sm:text-xl font-black ${darkMode ? "text-white" : "text-[#1c1917]"}`}>
                  <AnimatedCounter value={stat.value} />
                </span>
              </div>
              <p className={`text-[11px] font-semibold leading-snug ${darkMode ? "text-slate-200" : "text-[#44403c]"}`}>
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Intro;
