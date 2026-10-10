import { getScrollBehavior } from "../hooks/useReducedMotion";
import React, { useContext } from "react";
import { ThemeContext } from "../context";
import { Code2, ArrowUp, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { SITE_SECTIONS } from "../constants/navigation";
import useReducedMotion from "../hooks/useReducedMotion";

const Footer = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const reduceMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: getScrollBehavior() });
  };

  return (
    <motion.footer
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      data-reduced-motion={reduceMotion ? "true" : "false"}
      className={`portfolio-footer relative overflow-hidden border-t pt-14 pb-8 transition-colors duration-300 ${
        darkMode ? "bg-slate-950 border-slate-800 text-slate-400" : "bg-[#e4ded3] border-[#d6cebf] text-[#44403c]"
      }`}
    >
      <div className="footer-accent-line" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_0.8fr] lg:gap-14 pb-10">
          <div className="space-y-4">
            <a href="#home" className="inline-flex items-center gap-3 group">
              <span className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
                <Code2 size={20} />
              </span>
              <span>
                <span className={`block text-lg font-extrabold ${darkMode ? "text-white" : "text-[#1c1917]"}`}>
                  Parth Darji<span className="text-cyan-500">.</span>
                </span>
                <span className="block text-[11px] uppercase tracking-[0.18em]">Software Developer</span>
              </span>
            </a>
            <p className="max-w-sm text-sm leading-relaxed">
              Full-stack software development with ASP.NET Core, Microsoft Azure, SQL Server, and React.
            </p>
            <div className="flex items-center gap-2" aria-label="Social profiles">
              <a
                href="https://github.com/Parth8825"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="footer-social-link action-control"
              >
                <GithubIcon size={17} />
              </a>
              <a
                href="https://www.linkedin.com/in/parthdarji8825"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="footer-social-link action-control"
              >
                <LinkedinIcon size={17} />
              </a>
              <a
                href="mailto:parthdarji8825@gmail.com"
                aria-label="Email Me"
                className="footer-social-link action-control"
              >
                <Mail size={17} />
              </a>
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className={`mb-4 text-xs font-bold uppercase tracking-[0.18em] ${darkMode ? "text-slate-200" : "text-[#292524]"}`}>
              Navigate
            </h2>
            <ul className="grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-1">
              {SITE_SECTIONS.map((section) => (
                <li key={section.id}>
                  <a className="footer-nav-link" href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={`mb-4 text-xs font-bold uppercase tracking-[0.18em] ${darkMode ? "text-slate-200" : "text-[#292524]"}`}>
              Focus
            </h2>
            <ul className="space-y-3 text-sm">
              <li>ASP.NET Core & C#</li>
              <li>Microsoft Azure</li>
              <li>SQL Server</li>
              <li>React & TypeScript</li>
            </ul>
          </div>
        </div>

        <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 border-t pt-6 ${darkMode ? "border-slate-800" : "border-[#c9c0b1]"}`}>
          <p className="text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Parth Darji. Built with React 19, Vite & Tailwind CSS.
          </p>

          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className={`action-control inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider ${
              darkMode
                ? "bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/50"
                : "bg-[#fbf9f5] border-[#d6cebf] text-[#1c1917] hover:bg-[#ede8df] shadow-2xs"
            }`}
          >
            Back to top
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
