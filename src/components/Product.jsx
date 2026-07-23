import React, { useContext } from "react";
import { ThemeContext } from "../context";
import { ExternalLink, Github, FolderGit2 } from "lucide-react";

const Product = ({ title, desc, img, link, tags }) => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  return (
    <div
      className={`group rounded-3xl border overflow-hidden transition-all duration-300 hover:-translate-y-2 flex flex-col ${
        darkMode
          ? "bg-slate-900/70 border-slate-800 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10"
          : "bg-white border-slate-200 hover:border-cyan-400 shadow-md hover:shadow-xl"
      }`}
    >
      {/* Mock Browser Header Bar */}
      <div className="bg-slate-950/80 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
        </div>
        <div className="text-xs font-mono text-slate-500 truncate max-w-[180px]">
          {title}
        </div>
        <FolderGit2 size={14} className="text-slate-500" />
      </div>

      {/* Image Preview Container */}
      <div className="relative overflow-hidden aspect-video bg-slate-950 flex items-center justify-center">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        {/* Overlay CTA */}
        <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4 backdrop-blur-xs">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-cyan-500/30"
          >
            <Github size={16} />
            View Repository
          </a>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className={`text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors ${
            darkMode ? "text-white" : "text-slate-900"
          }`}>
            {title}
          </h3>
          <p className={`text-sm leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
            {desc}
          </p>
        </div>

        {/* Tech Stack Tags */}
        <div className="space-y-4 pt-2 border-t border-slate-800/40">
          <div className="flex flex-wrap gap-1.5">
            {tags &&
              tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                >
                  {tag}
                </span>
              ))}
          </div>

          <div className="flex items-center justify-between">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 uppercase tracking-wider group/link"
            >
              Source Code
              <ExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
