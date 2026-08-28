import React, { useContext, useState } from "react";
import { ThemeContext } from "../context";
import { experienceData } from "../data";
import { Briefcase, GraduationCap, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

// Frosted Glass Experience Card with Cursor & Touch Spotlight
const ExperienceCard = ({ item, isEven, darkMode }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePos({
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      });
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className={`group relative w-full ml-13 md:ml-0 md:w-[calc(50%-3rem)] p-5 sm:p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-1.5 overflow-hidden ${
        darkMode
          ? "bg-slate-900/85 backdrop-blur-md group-hover:bg-slate-950/15 group-hover:backdrop-blur-none border-slate-700/60 group-hover:border-cyan-500/60 shadow-lg group-hover:shadow-2xl group-hover:shadow-cyan-500/10"
          : "bg-[#fbf9f5]/90 backdrop-blur-md group-hover:bg-[#ede8df]/25 group-hover:backdrop-blur-none border-[#d6cebf] group-hover:border-cyan-600/60 shadow-sm group-hover:shadow-lg"
      } ${isEven ? "md:mr-auto" : "md:ml-auto"}`}
    >
      {/* Interactive Cursor Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(380px circle at ${mousePos.x}px ${mousePos.y}px, ${
            darkMode ? "rgba(6, 182, 212, 0.26)" : "rgba(14, 165, 233, 0.18)"
          }, transparent 75%)`,
        }}
      />

      {/* Illuminated Cyber Dots Reveal under Cursor on Hover */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          backgroundImage: darkMode
            ? "radial-gradient(rgba(6, 182, 212, 0.7) 1.5px, transparent 1.5px)"
            : "radial-gradient(rgba(120, 113, 108, 0.45) 1.5px, transparent 1.5px)",
          backgroundSize: "36px 36px",
          WebkitMaskImage: `radial-gradient(320px circle at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 80%)`,
          maskImage: `radial-gradient(320px circle at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 80%)`,
        }}
      />

      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className={`px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold ${
            darkMode ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "bg-cyan-900/10 text-cyan-900 border border-cyan-300"
          }`}>
            {item.type}
          </span>
          <div className={`flex items-center gap-1.5 text-xs font-semibold ${darkMode ? "text-slate-400" : "text-[#44403c]"}`}>
            <Calendar size={13} className={darkMode ? "text-cyan-400" : "text-cyan-700"} />
            {item.period}
          </div>
        </div>

        <h3 className={`text-lg sm:text-2xl font-extrabold mb-1 transition-colors ${
          darkMode ? "text-white group-hover:text-cyan-400" : "text-[#1c1917] group-hover:text-cyan-700"
        }`}>
          {item.role}
        </h3>

        <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 mb-4 text-xs sm:text-sm font-semibold ${darkMode ? "text-indigo-400" : "text-indigo-900"}`}>
          <span>{item.company}</span>
          <span className={`flex items-center gap-1 text-xs ${darkMode ? "text-slate-400" : "text-[#44403c]"}`}>
            <MapPin size={13} className={darkMode ? "text-cyan-400" : "text-cyan-700"} />
            {item.location}
          </span>
        </div>

        <p className={`text-xs sm:text-sm leading-relaxed mb-4 italic border-l-2 border-cyan-500/50 pl-3 ${darkMode ? "text-slate-100 font-normal" : "text-[#3f3b35] font-medium"}`}>
          &quot;{item.highlight}&quot;
        </p>

        {/* Bullet Points */}
        <div className="space-y-2.5 mb-5">
          {item.points.map((pt, pIdx) => (
            <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
              <CheckCircle2 size={16} className={`${darkMode ? "text-cyan-400" : "text-cyan-700"} shrink-0 mt-0.5`} />
              <span className={darkMode ? "text-slate-100 font-normal" : "text-[#3f3b35] font-medium"}>{pt}</span>
            </div>
          ))}
        </div>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-1.5 pt-3.5 border-t border-slate-800/40">
          {item.tech.map((t, tIdx) => (
            <span
              key={tIdx}
              className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg text-[11px] sm:text-xs font-semibold transition-colors border ${
                darkMode
                  ? "bg-slate-950/60 text-cyan-300 border-slate-700/80 hover:border-cyan-500/40"
                  : "bg-[#ede8df] text-cyan-800 border-[#d6cebf] font-semibold shadow-2xs"
              }`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Target anchor alias for legacy #about links */}
      <div id="about" className="absolute -top-24" />

      {/* Ambient background glow elements */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16 sm:mb-20"
        >
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold tracking-wide uppercase shadow-sm ${
            darkMode ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-400" : "border-cyan-300 bg-cyan-50 text-cyan-800"
          }`}>
            <Briefcase size={14} />
            Career & Academic Journey
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Work Experience & <span className="text-gradient">Education</span>
          </h2>
          <p className={`max-w-2xl mx-auto text-base sm:text-lg ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
            My professional path across software development in Canada and India, showcasing enterprise engineering achievements.
          </p>
        </motion.div>

        {/* Pixel-Perfect Responsive Timeline with Animated Traveling Neon Beam */}
        <div className="relative space-y-8 sm:space-y-12">
          {/* Static Background Line */}
          <div className="absolute top-0 bottom-0 left-5 md:left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-cyan-500/30 via-indigo-500/30 to-purple-500/30 rounded-full pointer-events-none" />

          {/* Traveling Neon Light Beam Traversing 100% of the Timeline Spine */}
          <div className="absolute top-0 bottom-0 left-5 md:left-1/2 -translate-x-1/2 w-1.5 overflow-hidden pointer-events-none rounded-full">
            <motion.div
              style={{ position: "absolute", left: 0, right: 0 }}
              animate={{
                top: ["-10%", "105%"],
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-full h-52 bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-lg shadow-cyan-400"
            />
          </div>

          {experienceData.map((item, index) => {
            const isEven = index % 2 === 0;
            const isEducation = item.type === "Education";

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 45, x: isEven ? -25 : 25 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="relative flex items-start md:items-center justify-start md:justify-normal md:odd:flex-row-reverse group"
              >
                {/* Glowing Marker Badge */}
                <div className="absolute left-5 md:left-1/2 -translate-x-1/2 top-1.5 md:top-auto w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-slate-950 border-2 border-cyan-400 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/30 z-20 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-300">
                  {isEducation ? <GraduationCap className="w-4 h-4 md:w-5 md:h-5" /> : <Briefcase className="w-4 h-4 md:w-5 md:h-5" />}
                </div>

                {/* Timeline Content Card */}
                <ExperienceCard item={item} isEven={isEven} darkMode={darkMode} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
