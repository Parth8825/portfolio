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

// Interactive 3D Spatial Parallax Avatar (Moves Face with True 3D Depth)
const TiltAvatar = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 20 });

  // 3D Card Rotation
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["16deg", "-16deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-16deg", "16deg"]);

  // 3D Parallax Face Movement (Independent inner depth plane)
  const faceTranslateX = useTransform(mouseXSpring, [-0.5, 0.5], ["-22px", "22px"]);
  const faceTranslateY = useTransform(mouseYSpring, [-0.5, 0.5], ["-20px", "20px"]);

  // Holographic Light Reflection Glare Sweep
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["-100%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["-100%", "100%"]);
  const glareOpacity = useTransform(mouseXSpring, [-0.5, 0, 0.5], [0.4, 0.1, 0.4]);

  // Floating 3D Badge (Opposite depth layer creating spatial separation)
  const badgeTranslateX = useTransform(mouseXSpring, [-0.5, 0.5], ["12px", "-12px"]);
  const badgeTranslateY = useTransform(mouseYSpring, [-0.5, 0.5], ["12px", "-12px"]);

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
    <div style={{ perspective: 1200 }} className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 select-none">
      {/* Glowing backdrop card with dynamic shift */}
      <motion.div
        style={{
          x: useTransform(mouseXSpring, [-0.5, 0.5], ["20px", "-20px"]),
          y: useTransform(mouseYSpring, [-0.5, 0.5], ["20px", "-20px"]),
        }}
        className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 rotate-6 opacity-35 blur-xl pointer-events-none"
      />

      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-0 rounded-3xl bg-slate-900 border-2 border-slate-700/80 overflow-hidden shadow-2xl flex items-center justify-center group cursor-grab active:cursor-grabbing"
      >
        {/* Invisible Protection Overlay Shield (blocks right click & drag) */}
        <div 
          className="absolute inset-0 z-30 select-none pointer-events-auto"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        />
        
        {/* 3D Parallax Moving Face Layer */}
        <motion.div
          style={{
            x: faceTranslateX,
            y: faceTranslateY,
            scale: 1.15,
          }}
          className="w-full h-full pointer-events-none select-none"
        >
          <img
            src={developerAvatar}
            alt="Parth Darji - Software Developer"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            className="w-full h-full object-cover object-[50%_15%]"
          />
        </motion.div>

        {/* Dynamic Holographic Reflection Sheen */}
        <motion.div
          style={{
            x: glareX,
            y: glareY,
            opacity: glareOpacity,
          }}
          className="pointer-events-none absolute -inset-full bg-gradient-to-tr from-transparent via-white/25 to-transparent rotate-45 z-20"
        />

        {/* Floating 3D Tech Badge that pops out in front */}
        <motion.div
          style={{
            x: badgeTranslateX,
            y: badgeTranslateY,
          }}
          className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-2.5 sm:p-3 rounded-2xl glass-panel text-left flex items-center justify-between border border-white/20 z-25 shadow-xl backdrop-blur-md"
        >
          <div>
            <p className="text-[10px] sm:text-xs text-cyan-400 font-semibold uppercase tracking-wider">Tech Focus</p>
            <p className="text-xs sm:text-sm font-bold text-white">.NET Core & Modern Web</p>
          </div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400 animate-pulse shrink-0 shadow-xs shadow-emerald-400" />
        </motion.div>
      </motion.div>
    </div>
  );
};

// Fluid Spring/Timer Animated Counter for hero metrics
const AnimatedCounter = ({ value }) => {
  const match = String(value).match(/^(\d+)(.*)$/);
  const targetNum = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";

  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && targetNum > 0) {
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
  }, [isInView, targetNum]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
};

const Intro = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const yearsExp = getYearsOfExperience();

  // Mechanical Typewriter Engine
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(85);

  useEffect(() => {
    const currentTitle = titles[loopNum % titles.length];

    const handleType = () => {
      if (isDeleting) {
        setDisplayText((prev) => currentTitle.substring(0, prev.length - 1));
        setTypingSpeed(45);
      } else {
        setDisplayText((prev) => currentTitle.substring(0, prev.length + 1));
        setTypingSpeed(85);
      }

      if (!isDeleting && displayText === currentTitle) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setLoopNum((prev) => prev + 1);
        setTypingSpeed(200);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, typingSpeed]);

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

  return (
    <section id="home" className="min-h-screen pt-28 pb-16 flex items-center relative overflow-hidden">
      {/* Ambient background glow elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column - Hero Text */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
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
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
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
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="min-h-12 flex flex-wrap items-center"
          >
            <span className={`text-lg sm:text-2xl font-semibold ${darkMode ? "text-cyan-400" : "text-cyan-700"}`}>I am a </span>
            <span
              className={`ml-2.5 text-lg sm:text-2xl font-bold ${
                darkMode ? "text-indigo-300" : "text-indigo-600"
              }`}
            >
              {displayText}
            </span>
            <span className="inline-block w-0.5 sm:w-1 h-5 sm:h-7 bg-cyan-400 ml-1.5 translate-y-0.5 rounded-full animate-pulse shadow-xs shadow-cyan-400" />
          </motion.div>

          {/* Dynamic Description */}
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className={`max-w-2xl text-sm sm:text-lg leading-relaxed ${
              darkMode ? "text-slate-300" : "text-slate-600"
            }`}
          >
            Result-driven Azure & .NET Developer with {yearsExp} of experience designing, developing, and deploying scalable web applications and APIs. Expertise in
            <strong className={`font-semibold ${darkMode ? "text-cyan-400" : "text-cyan-800"}`}> ASP.NET Core, Azure Services, RESTful & GraphQL APIs, OAuth 2.0, SQL Server, </strong>
            and modern frontend frameworks like React & TypeScript.
          </motion.p>

          {/* CTA Action Buttons */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <Magnetic strength={0.25} className="w-full sm:w-auto">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2.5 px-5 py-3 sm:px-6 sm:py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold rounded-xl text-sm sm:text-base transition-all duration-200 shadow-lg shadow-cyan-500/25 active:scale-95 group w-full sm:w-auto"
              >
                View Projects
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </Magnetic>

            <Magnetic strength={0.25} className="w-full sm:w-auto">
              <a
                href="#contact"
                className={`inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl border font-semibold text-sm sm:text-base transition-all duration-200 w-full sm:w-auto ${
                  darkMode
                    ? "bg-slate-900/80 border-slate-800 text-slate-200 hover:bg-slate-800 hover:border-slate-700"
                    : "bg-[#fbf9f5] border-[#d6cebf] text-[#1c1917] hover:bg-[#ede8df] shadow-2xs"
                }`}
              >
                Contact Me
              </a>
            </Magnetic>

            {/* Social Links with Magnetic Attraction */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-start sm:justify-none pt-2 sm:pt-0">
              <Magnetic strength={0.45}>
                <a
                  href="https://github.com/Parth8825"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className={`p-3 rounded-xl border transition-colors flex items-center justify-center ${
                    darkMode
                      ? "bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/50"
                      : "bg-[#fbf9f5] border-[#d6cebf] text-[#1c1917] hover:bg-[#ede8df] hover:border-cyan-600 shadow-2xs"
                  }`}
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
                  className={`p-3 rounded-xl border transition-colors flex items-center justify-center ${
                    darkMode
                      ? "bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/50"
                      : "bg-[#fbf9f5] border-[#d6cebf] text-[#1c1917] hover:bg-[#ede8df] hover:border-cyan-600 shadow-2xs"
                  }`}
                >
                  <LinkedinIcon size={20} />
                </a>
              </Magnetic>

              <Magnetic strength={0.45}>
                <a
                  href="mailto:parthdarji8825@gmail.com"
                  aria-label="Email Me"
                  className={`p-3 rounded-xl border transition-colors flex items-center justify-center ${
                    darkMode
                      ? "bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/50"
                      : "bg-[#fbf9f5] border-[#d6cebf] text-[#1c1917] hover:bg-[#ede8df] hover:border-cyan-600 shadow-2xs"
                  }`}
                >
                  <Mail size={20} />
                </a>
              </Magnetic>
            </div>
          </motion.div>

          {/* Animated Impact Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="pt-6 border-t border-slate-800/40 grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {stats.map((st, sIdx) => (
              <motion.div
                key={sIdx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5, scale: 1.03 }}
                transition={{ duration: 0.3, delay: 0.7 + sIdx * 0.1 }}
                className={`p-3.5 rounded-2xl border transition-all duration-300 cursor-default ${
                  darkMode
                    ? "bg-slate-900/85 backdrop-blur-md hover:bg-slate-950/15 hover:backdrop-blur-none border-slate-700/60 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10"
                    : "bg-[#fbf9f5]/90 backdrop-blur-md hover:bg-[#ede8df]/25 hover:backdrop-blur-none border-[#d6cebf] shadow-2xs hover:border-cyan-600/50 hover:shadow-md"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {st.icon}
                  <span className={`text-lg sm:text-xl font-black ${darkMode ? "text-white" : "text-[#1c1917]"}`}>
                    <AnimatedCounter value={st.value} />
                  </span>
                </div>
                <p className={`text-[11px] font-semibold leading-snug ${darkMode ? "text-slate-200" : "text-[#44403c]"}`}>
                  {st.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right Column - Protected Avatar with 3D Tilt */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="lg:col-span-5 flex justify-center items-center"
        >
          <TiltAvatar />
        </motion.div>
      </div>
    </section>
  );
};

export default Intro;
