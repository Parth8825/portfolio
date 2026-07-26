import React, { useContext } from "react";
import { ThemeContext } from "../context";
import { Cpu, ShieldCheck } from "lucide-react";

const Product = ({ title, company, desc, architecture, tags }) => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  return (
    <div
      className={`group rounded-3xl border overflow-hidden transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between ${
        darkMode
          ? "bg-slate-900/70 border-slate-800 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10"
          : "bg-white border-slate-200 hover:border-cyan-400 shadow-md hover:shadow-xl"
      }`}
    >
      <div>
        {/* Card Header */}
        <div className="bg-slate-950/80 px-4 sm:px-6 py-3.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-cyan-400 shrink-0" />
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 truncate max-w-[200px]">
              {company}
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            Enterprise Solution
          </span>
        </div>

        {/* Card Content Body */}
        <div className="p-5 sm:p-8 space-y-4">
          <h3 className={`text-lg sm:text-2xl font-bold group-hover:text-cyan-400 transition-colors ${
            darkMode ? "text-white" : "text-slate-900"
          }`}>
            {title}
          </h3>

          <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
            {desc}
          </p>

          {/* Architecture Box */}
          <div className={`p-3 sm:p-3.5 rounded-xl border flex items-start gap-2.5 text-xs font-mono break-words ${
            darkMode
              ? "bg-slate-950/60 border-slate-800 text-slate-300"
              : "bg-slate-50 border-slate-200 text-slate-700"
          }`}>
            <Cpu size={16} className="text-cyan-400 shrink-0 mt-0.5" />
            <div className="w-full min-w-0">
              <span className="text-slate-500 font-bold uppercase text-[10px] block mb-0.5">System Architecture</span>
              <span className="break-words leading-relaxed text-[11px] sm:text-xs">{architecture}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Tags Footer */}
      <div className="p-5 sm:p-8 pt-0">
        <div className="pt-3.5 border-t border-slate-800/40 flex flex-wrap gap-1.5">
          {tags &&
            tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
              >
                {tag}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
