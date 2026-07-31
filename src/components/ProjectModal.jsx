import React, { useContext, useEffect } from "react";
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-xl [perspective:1000px] overflow-hidden"
    >
      {/* Click backdrop to close */}
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-label="Close modal background"
      />

      {/* 3D Flip Animated Modal Body */}
      <motion.div
        initial={{ opacity: 0, rotateY: -65, scale: 0.88 }}
        animate={{ opacity: 1, rotateY: 0, scale: 1 }}
        exit={{ opacity: 0, rotateY: 65, scale: 0.88 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`relative w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl z-10 space-y-6 text-left my-auto [backface-visibility:hidden] [transform-style:preserve-3d] ${
          darkMode
            ? "glass-panel border border-cyan-500/30 text-slate-100 shadow-cyan-500/10"
            : "glass-panel-light border border-slate-200 text-slate-900 shadow-cyan-500/10"
        }`}
      >
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800/40">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Building2 size={16} className="text-cyan-400 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                {project.company}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold">{project.title}</h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2.5 rounded-2xl bg-slate-800/80 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 transition-all duration-200 cursor-pointer shadow-md active:scale-90 shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {/* Overview Description */}
        <div>
          <h4 className="text-xs uppercase font-bold text-cyan-400 tracking-wider mb-2">Project Overview</h4>
          <p className={`text-sm sm:text-base leading-relaxed ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
            {project.desc}
          </p>
        </div>

        {/* Architecture Details */}
        <div className={`p-4 rounded-2xl border space-y-2 ${
          darkMode ? "bg-slate-950/60 border-slate-800/80" : "bg-slate-50 border-slate-200"
        }`}>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Cpu size={16} className="shrink-0" />
            <span>System Architecture & Integration</span>
          </div>
          <p className="text-xs sm:text-sm font-mono text-slate-300 leading-relaxed break-words">
            {project.architecture}
          </p>
        </div>

        {/* Key Highlights */}
        <div>
          <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-3">Key Technical Achievements</h4>
          <div className="space-y-2.5">
            <div className="flex items-start gap-2.5 text-xs sm:text-sm">
              <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
              <span>Architected with OAuth 2.0 / Entra ID security protocols and Microsoft Identity Platform.</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs sm:text-sm">
              <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
              <span>Deployed to Microsoft Azure Cloud Services (App Services, Azure SQL, Azure Storage).</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs sm:text-sm">
              <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
              <span>Integrated CI/CD pipelines via Azure DevOps for automated building and release management.</span>
            </div>
          </div>
        </div>

        {/* Tech Stack Badges */}
        <div className="pt-4 border-t border-slate-800/40 flex flex-wrap gap-2">
          {project.tags?.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-lg text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;
