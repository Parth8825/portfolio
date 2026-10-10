import useReducedMotion from "../hooks/useReducedMotion";
import React, { useContext, useRef } from "react";
import { ThemeContext } from "../context";
import { experienceData } from "../data";
import { Briefcase, GraduationCap, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import { motion, useScroll } from "framer-motion";
import SectionEyebrow from "./SectionEyebrow";

// Frosted Glass Experience Card with Cursor & Touch Spotlight
const ExperienceCard = ({ item, darkMode }) => {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="experience-card surface-card interactive-card portfolio-card group relative w-[calc(100%-3.25rem)] ml-13 md:ml-0 md:w-auto p-5 sm:p-7 lg:p-8 rounded-3xl border hover:-translate-y-1 overflow-hidden"
    >
      {/* Interactive Cursor Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(380px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), ${
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
          WebkitMaskImage: "radial-gradient(320px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), black 30%, transparent 80%)",
          maskImage: "radial-gradient(320px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), black 30%, transparent 80%)",
        }}
      />

      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className={`px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold ${
            darkMode ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "bg-cyan-900/10 text-cyan-900 border border-cyan-300"
          }`}>
            {item.type}
          </span>
          <div className={`md:hidden flex items-center gap-1.5 text-xs font-semibold ${darkMode ? "text-slate-400" : "text-[#44403c]"}`}>
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
        <ul className="space-y-2.5 mb-5" aria-label={`${item.role} achievements`}>
          {item.points.map((pt, pIdx) => (
            <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
              <CheckCircle2 size={16} className={`${darkMode ? "text-cyan-400" : "text-cyan-700"} shrink-0 mt-0.5`} />
              <span className={darkMode ? "text-slate-100 font-normal" : "text-[#3f3b35] font-medium"}>{pt}</span>
            </li>
          ))}
        </ul>

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
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  return (
    <section
      ref={sectionRef}
      id="experience"
      data-section-accent="cyan"
      data-reduced-motion={reduceMotion ? "true" : undefined}
      className="chapter-section py-24 relative overflow-hidden"
    >
      {/* Target anchor alias for legacy #about links */}
      <div id="about" className="absolute -top-24" />

      {/* Ambient background glow elements */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16 sm:mb-20"
        >
          <SectionEyebrow icon={Briefcase} number="01">
            Career & Academic Journey
          </SectionEyebrow>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Work Experience & <span className="text-gradient">Education</span>
          </h2>
          <p className={`max-w-2xl mx-auto text-base sm:text-lg ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
            My professional path across software development in Canada and India, showcasing enterprise engineering achievements.
          </p>
        </motion.div>

        <div className="experience-timeline relative max-w-5xl mx-auto space-y-8 sm:space-y-10" role="list" aria-label="Career and education timeline">
          <div className="experience-timeline-track" aria-hidden="true">
            <motion.div
              className="experience-timeline-progress"
              style={{ scaleY: reduceMotion ? 1 : scrollYProgress }}
            />
          </div>

          {experienceData.map((item, index) => {
            const isEducation = item.type === "Education";

            return (
              <motion.div
                key={item.id}
                role="listitem"
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="relative md:grid md:grid-cols-[10rem_3rem_minmax(0,1fr)] items-start group"
              >
                <div className="hidden md:flex justify-end pr-4 self-stretch">
                  <div className="experience-period sticky top-28 self-start text-right">
                    <span className="block font-mono text-[10px] tracking-[0.18em] text-cyan-500 mb-1" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={`block text-xs font-bold ${darkMode ? "text-slate-200" : "text-[#3f3b35]"}`}>
                      {item.period}
                    </span>
                  </div>
                </div>

                <div className="absolute left-5 md:static md:translate-x-0 -translate-x-1/2 top-1.5 md:flex md:justify-center md:pt-1 z-20">
                  <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-slate-950 border-2 border-cyan-400 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/20 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors duration-200">
                  {isEducation ? <GraduationCap className="w-4 h-4 md:w-5 md:h-5" /> : <Briefcase className="w-4 h-4 md:w-5 md:h-5" />}
                  </div>
                </div>

                <ExperienceCard item={item} darkMode={darkMode} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
