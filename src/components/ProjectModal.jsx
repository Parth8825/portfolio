import React, { useContext, useEffect } from "react";
import { createPortal } from "react-dom";
import { ThemeContext } from "../context";
import { X, Cpu, CheckCircle2, Building2 } from "lucide-react";
import { motion } from "framer-motion";

const ProjectModal = ({ project, onClose }) => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  useEffect(() => {
    // Lock background page scroll on mount
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!project) return null;

  const modalNode = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[70] flex items-start sm:items-center justify-center p-3.5 sm:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-xl [perspective:1000px] touch-pan-y"
      style={{
        paddingTop: "max(5.5rem, calc(env(safe-area-inset-top, 0px) + 5rem))",
        paddingBottom: "max(2.5rem, calc(env(safe-area-inset-bottom, 0px) + 2rem))",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {/* Click backdrop to close */}
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-label="Close modal background"
      />

      {/* 3D Flip Animated Modal Body */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        initial={{ opacity: 0, rotateY: -65, scale: 0.88 }}
        animate={{ opacity: 1, rotateY: 0, scale: 1 }}
        exit={{ opacity: 0, rotateY: 65, scale: 0.88 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`relative w-full max-w-2xl rounded-3xl p-5 sm:p-8 shadow-2xl z-10 space-y-5 sm:space-y-6 text-left my-auto [backface-visibility:hidden] [transform-style:preserve-3d] ${
          darkMode
            ? "glass-panel border border-cyan-500/30 text-slate-100 shadow-cyan-500/10"
            : "bg-[#fbf9f5] border border-[#d6cebf] text-[#1c1917] shadow-2xl"
        }`}
      >
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-3 sm:gap-4 pb-4 border-b border-slate-800/40">
          <div className="min-w-0 pr-2">
            <div className="flex items-center gap-2 mb-1.5">
              <Building2 size={15} className={darkMode ? "text-cyan-400 shrink-0" : "text-cyan-700 shrink-0"} />
              <span className={`text-[11px] sm:text-xs font-bold uppercase tracking-wider truncate ${darkMode ? "text-cyan-400" : "text-cyan-800"}`}>
                {project.company}
              </span>
            </div>
            <h3 id="project-modal-title" className="text-xl sm:text-3xl font-extrabold leading-snug break-words">{project.title}</h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className={`p-2.5 rounded-2xl transition-all duration-200 cursor-pointer shadow-md active:scale-90 shrink-0 ${
              darkMode
                ? "bg-slate-800/80 hover:bg-cyan-500 hover:text-slate-950 text-slate-300"
                : "bg-[#ede8df] hover:bg-cyan-700 hover:text-white text-[#1c1917]"
            }`}
          >
            <X size={18} />
          </button>
        </div>

        {/* Overview Description */}
        <div>
          <h4 className={`text-xs uppercase font-bold tracking-wider mb-2 ${darkMode ? "text-cyan-400" : "text-cyan-800"}`}>
            Project Overview
          </h4>
          <p className={`text-sm sm:text-base leading-relaxed ${darkMode ? "text-slate-300" : "text-[#3f3b35]"}`}>
            {project.desc}
          </p>
        </div>

        {/* Architecture Details */}
        <div className={`p-4 rounded-2xl border space-y-2 ${
          darkMode ? "bg-slate-950/60 border-slate-800/80" : "bg-[#ede8df] border-[#d6cebf]"
        }`}>
          <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${darkMode ? "text-cyan-400" : "text-cyan-800"}`}>
            <Cpu size={16} className="shrink-0" />
            <span>System Architecture & Integration</span>
          </div>
          <p className={`text-xs sm:text-sm font-mono leading-relaxed break-words ${darkMode ? "text-slate-300" : "text-[#1c1917] font-medium"}`}>
            {project.architecture}
          </p>
        </div>

        {/* Key Highlights */}
        <div>
          <h4 className={`text-xs uppercase font-bold tracking-wider mb-3 ${darkMode ? "text-slate-400" : "text-[#44403c]"}`}>
            Key Technical Achievements
          </h4>
          <div className="space-y-2.5">
            {project.achievements && project.achievements.length > 0 ? (
              project.achievements.map((achievement, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                  <CheckCircle2 size={16} className={`${darkMode ? "text-cyan-400" : "text-cyan-700"} shrink-0 mt-0.5`} />
                  <span className={darkMode ? "text-slate-200" : "text-[#3f3b35] font-medium"}>{achievement}</span>
                </div>
              ))
            ) : (
              <div className="flex items-start gap-2.5 text-xs sm:text-sm">
                <CheckCircle2 size={16} className={`${darkMode ? "text-cyan-400" : "text-cyan-700"} shrink-0 mt-0.5`} />
                <span className={darkMode ? "text-slate-200" : "text-[#3f3b35] font-medium"}>
                  Architected with enterprise security protocols and cloud services.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Tech Stack Badges */}
        <div className="pt-4 border-t border-slate-800/40 flex flex-wrap gap-2">
          {project.tags?.map((tag, idx) => (
            <span
              key={idx}
              className={`px-3 py-1 rounded-lg text-xs font-semibold shadow-xs ${
                darkMode
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                  : "bg-[#ede8df] text-cyan-800 border border-[#d6cebf] font-semibold"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );

  return typeof document !== "undefined" ? createPortal(modalNode, document.body) : modalNode;
};

export default ProjectModal;
