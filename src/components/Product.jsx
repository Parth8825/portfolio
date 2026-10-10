import useReducedMotion from "../hooks/useReducedMotion";
import React, { useContext } from "react";
import { ThemeContext } from "../context";
import { Cpu, ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Product = ({
  title,
  company,
  desc,
  architecture,
  tags,
  onOpenModal,
  index = 0,
  projectNumber = String(index + 1).padStart(2, "0"),
  accentRgb = "6 182 212",
  className = "",
}) => {
  const reduceMotion = useReducedMotion();
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const posX = e.clientX - rect.left;
    const posY = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${posX}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${posY}px`);
    e.currentTarget.style.setProperty("--project-rotate-x", `${(0.5 - posY / rect.height) * 4}deg`);
    e.currentTarget.style.setProperty("--project-rotate-y", `${(posX / rect.width - 0.5) * 4}deg`);
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.setProperty("--project-rotate-x", "0deg");
    e.currentTarget.style.setProperty("--project-rotate-y", "0deg");
  };

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, delay: index * 0.045 }}
      className={`h-full ${className}`}
      data-project-number={projectNumber}
    >
      <div
        role="button"
        tabIndex={0}
        aria-label={`View architecture details for ${title}`}
        data-reduced-motion={reduceMotion ? "true" : "false"}
        style={{ "--project-accent-rgb": accentRgb }}
        onClick={onOpenModal}
        onMouseMove={reduceMotion ? undefined : handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpenModal();
          }
        }}
        className="surface-card interactive-card portfolio-card project-card group relative h-full rounded-3xl border overflow-hidden flex flex-col justify-between cursor-pointer outline-hidden"
      >
      {/* Lightweight pointer highlight driven by CSS variables. */}
      <div
        className="project-card-highlight pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 z-0"
        aria-hidden="true"
      />

      <span className="project-card-number" aria-hidden="true">{projectNumber}</span>

      <div className="relative z-10">
        {/* Card Header */}
        <div className={`px-4 sm:px-6 py-3.5 border-b flex flex-wrap items-center justify-between gap-2 transition-colors duration-300 ${
          darkMode ? "bg-slate-950/40 group-hover:bg-transparent border-slate-800/60" : "bg-[#ede8df]/60 group-hover:bg-transparent border-[#d6cebf]/60"
        }`}>
          <div className="flex items-center gap-2">
            <span className="project-card-index font-mono text-[10px] font-black tracking-[0.18em]">{projectNumber}</span>
            <ShieldCheck size={16} className="project-card-accent shrink-0" />
            <span className={`text-xs font-bold uppercase tracking-wider truncate max-w-[200px] ${
              darkMode ? "text-slate-200" : "text-[#292524]"
            }`}>
              {company}
            </span>
          </div>
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
            darkMode ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" : "bg-indigo-900/10 text-indigo-900 border-indigo-200"
          }`}>
            Enterprise Solution
          </span>
        </div>

        {/* Card Content Body */}
        <div className="p-5 sm:p-8 space-y-4">
          <h3 className={`text-lg sm:text-2xl font-extrabold transition-colors ${
            darkMode ? "text-white group-hover:text-cyan-400" : "text-[#1c1917] group-hover:text-cyan-700"
          }`}>
            {title}
          </h3>

          <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? "text-slate-100 font-normal" : "text-[#3f3b35] font-medium"}`}>
            {desc}
          </p>

          {/* Architecture Box */}
          <div className={`project-architecture-strip p-3 sm:p-3.5 rounded-xl border flex items-start gap-2.5 text-xs font-mono break-words ${
            darkMode
              ? "bg-slate-950/40 border-slate-700/60 text-slate-100"
              : "bg-[#ede8df]/70 border-[#d6cebf] text-[#1c1917] font-medium"
          }`}>
            <Cpu size={16} className="project-card-accent shrink-0 mt-0.5" />
            <div className="w-full min-w-0">
              <span className="project-card-accent font-bold uppercase text-[10px] block mb-0.5 tracking-[0.14em]">Architecture / Stack</span>
              <span className="break-words leading-relaxed text-[11px] sm:text-xs">{architecture}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Tags & CTA Footer */}
      <div className="relative z-10 p-5 sm:p-8 pt-0 space-y-4">
        <div className="pt-3.5 border-t border-slate-800/40 flex flex-wrap gap-1.5">
          {tags &&
            tags.map((tag, idx) => (
              <span
                key={idx}
                className={`px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-semibold border ${
                  darkMode
                    ? "bg-slate-950/60 text-cyan-300 border-slate-700/70"
                    : "bg-[#ede8df] text-cyan-800 border-[#d6cebf] font-semibold shadow-2xs"
                }`}
              >
                {tag}
              </span>
            ))}
        </div>

        <div className="project-card-accent flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-wider">
          <span>View Architecture Details</span>
          <span className="project-card-arrow inline-flex h-8 w-8 items-center justify-center rounded-full border" aria-hidden="true">
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
      </div>
    </motion.div>
  );
};

export default Product;
