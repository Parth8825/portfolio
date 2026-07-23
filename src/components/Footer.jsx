import React, { useContext } from "react";
import { ThemeContext } from "../context";
import { Code2, ArrowUp } from "lucide-react";

const Footer = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className={`border-t py-12 transition-colors duration-300 ${
        darkMode ? "bg-slate-950 border-slate-800 text-slate-400" : "bg-slate-50 border-slate-200 text-slate-600"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
            <Code2 size={16} />
          </div>
          <span className={`font-bold ${darkMode ? "text-white" : "text-slate-900"}`}>
            Parth Darji
          </span>
          <span className="text-xs text-slate-500">| Software Developer</span>
        </div>

        {/* Copyright */}
        <p className="text-xs text-center flex items-center gap-1.5">
          © {new Date().getFullYear()} Parth Darji. Built with React 19, Vite & Tailwind CSS.
        </p>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className={`p-3 rounded-xl border transition-all duration-200 ${
            darkMode
              ? "bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/50"
              : "bg-white border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm"
          }`}
        >
          <ArrowUp size={18} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
