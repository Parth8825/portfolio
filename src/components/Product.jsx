import React, { useContext, useState } from "react";
import { ThemeContext } from "../context";
import { Cpu, ShieldCheck, ArrowRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const Product = ({ title, company, desc, architecture, tags, onOpenModal, index = 0 }) => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  // 3D Perspective Tilt Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const posX = e.clientX - rect.left;
    const posY = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${posX}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${posY}px`);
    const mouseX = posX / rect.width - 0.5;
    const mouseY = posY / rect.height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        role="button"
        tabIndex={0}
        aria-label={`View architecture details for ${title}`}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.12 }}
        whileHover={{ y: -6, scale: 1.01 }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onClick={onOpenModal}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpenModal();
          }
        }}
        className={`group relative h-full rounded-3xl border overflow-hidden transition-all duration-300 flex flex-col justify-between cursor-pointer outline-hidden focus-visible:ring-2 focus-visible:ring-cyan-500 ${
          darkMode
            ? "bg-slate-900/85 backdrop-blur-md group-hover:bg-slate-950/15 group-hover:backdrop-blur-none border-slate-700/60 group-hover:border-cyan-500/60 shadow-lg group-hover:shadow-2xl group-hover:shadow-cyan-500/10"
            : "bg-[#fbf9f5]/90 backdrop-blur-md group-hover:bg-[#ede8df]/25 group-hover:backdrop-blur-none border-[#d6cebf] group-hover:border-cyan-600/60 shadow-sm group-hover:shadow-lg"
        }`}
      >
      {/* Interactive Cursor Spotlight Glow on Hover */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(380px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), ${
            darkMode ? "rgba(6, 182, 212, 0.26)" : "rgba(14, 165, 233, 0.18)"
          }, transparent 75%)`,
        }}
      />

      {/* Illuminated Cyber Dots Reveal under Cursor on Hover */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          backgroundImage: darkMode
            ? "radial-gradient(rgba(6, 182, 212, 0.7) 1.5px, transparent 1.5px)"
            : "radial-gradient(rgba(120, 113, 108, 0.45) 1.5px, transparent 1.5px)",
          backgroundSize: "36px 36px",
          WebkitMaskImage: "radial-gradient(320px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), black 30%, transparent 80%)",
          maskImage: "radial-gradient(320px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), black 30%, transparent 80%)",
        }}
      />
      <div>
        {/* Card Header */}
        <div className={`px-4 sm:px-6 py-3.5 border-b flex flex-wrap items-center justify-between gap-2 transition-colors duration-300 ${
          darkMode ? "bg-slate-950/40 group-hover:bg-transparent border-slate-800/60" : "bg-[#ede8df]/60 group-hover:bg-transparent border-[#d6cebf]/60"
        }`}>
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className={darkMode ? "text-cyan-400 shrink-0" : "text-cyan-700 shrink-0"} />
            <span className={`text-xs font-bold uppercase tracking-wider truncate max-w-[200px] ${
              darkMode ? "text-cyan-400" : "text-cyan-800"
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
          <div className={`p-3 sm:p-3.5 rounded-xl border flex items-start gap-2.5 text-xs font-mono break-words ${
            darkMode
              ? "bg-slate-950/40 border-slate-700/60 text-slate-100"
              : "bg-[#ede8df]/70 border-[#d6cebf] text-[#1c1917] font-medium"
          }`}>
            <Cpu size={16} className={darkMode ? "text-cyan-400 shrink-0 mt-0.5" : "text-cyan-700 shrink-0 mt-0.5"} />
            <div className="w-full min-w-0">
              <span className="text-slate-500 font-bold uppercase text-[10px] block mb-0.5">System Architecture</span>
              <span className="break-words leading-relaxed text-[11px] sm:text-xs">{architecture}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Tags & CTA Footer */}
      <div className="p-5 sm:p-8 pt-0 space-y-4">
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

        <div className={`flex items-center gap-1 text-xs font-bold uppercase tracking-wider ${
          darkMode ? "text-cyan-400 group-hover:text-cyan-300" : "text-cyan-800 group-hover:text-cyan-900"
        }`}>
          <span>View Architecture Details</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  </div>
  );
};

export default Product;
