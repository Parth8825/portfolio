import React, { useContext, useState } from "react";
import { ThemeContext } from "../context";
import { Server, Database, Layout, Wrench, Terminal } from "lucide-react";
import { motion } from "framer-motion";

const skillCategories = [
  {
    category: "Backend & Web APIs",
    icon: <Server className="text-cyan-400" size={24} />,
    skills: [
      { name: "ASP.NET Core", level: "Advanced" },
      { name: "C#", level: "Advanced" },
      { name: "RESTful & GraphQL APIs", level: "Advanced" },
      { name: "OAuth 2.0 / Entra ID", level: "Advanced" },
      { name: "ASP.NET MVC", level: "Advanced" },
      { name: "ADO.NET & EF Core", level: "Advanced" },
      { name: "LINQ", level: "Advanced" },
      { name: "WCF / Web Services", level: "Proficient" },
    ],
  },
  {
    category: "Databases & Architecture",
    icon: <Database className="text-indigo-400" size={24} />,
    skills: [
      { name: "Microsoft SQL Server", level: "Advanced" },
      { name: "Stored Procedures & T-SQL", level: "Advanced" },
      { name: "Database Performance Tuning", level: "Advanced" },
      { name: "Relational Schema Modeling", level: "Advanced" },
      { name: "Server-side Pagination", level: "Advanced" },
    ],
  },
  {
    category: "Frontend & Ecosystem",
    icon: <Layout className="text-purple-400" size={24} />,
    skills: [
      { name: "React.js", level: "Proficient" },
      { name: "TypeScript", level: "Proficient" },
      { name: "JavaScript (ES6+)", level: "Advanced" },
      { name: "Vite Build Tool", level: "Advanced" },
      { name: "jQuery & AJAX", level: "Advanced" },
      { name: "Tailwind CSS & Bootstrap", level: "Proficient" },
      { name: "XML / JSON Data", level: "Advanced" },
    ],
  },
  {
    category: "Cloud, DevOps & CMS",
    icon: <Wrench className="text-emerald-400" size={24} />,
    skills: [
      { name: "Azure Cloud & App Services", level: "Advanced" },
      { name: "Azure SQL & Azure Storage", level: "Advanced" },
      { name: "Azure DevOps (CI/CD)", level: "Advanced" },
      { name: "Git & GitHub", level: "Advanced" },
      { name: "Umbraco CMS (.NET)", level: "Advanced" },
      { name: "Selenium & Unit Testing", level: "Proficient" },
    ],
  },
];

// Interactive Spotlight Skill Card Component
const SkillCard = ({ cat, idx, darkMode }) => {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 35 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: idx * 0.12 }}
      onMouseMove={handleMouseMove}
      className={`group relative p-5 sm:p-8 rounded-3xl border overflow-hidden transition-all duration-300 hover:-translate-y-1.5 ${
        darkMode
          ? "bg-slate-900/85 backdrop-blur-md group-hover:bg-slate-950/15 group-hover:backdrop-blur-none border-slate-700/60 group-hover:border-cyan-500/60 shadow-lg group-hover:shadow-2xl group-hover:shadow-cyan-500/10"
          : "bg-[#fbf9f5]/90 backdrop-blur-md group-hover:bg-[#ede8df]/25 group-hover:backdrop-blur-none border-[#d6cebf] group-hover:border-cyan-600/60 shadow-sm group-hover:shadow-lg"
      }`}
    >
      {/* Interactive Cursor Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(360px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), ${
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
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800/40">
          <div className={`p-3 rounded-xl border ${
            darkMode ? "bg-slate-950/40 border-slate-700/60" : "bg-[#ede8df] border-[#d6cebf] shadow-2xs"
          }`}>
            {cat.icon}
          </div>
          <h3 className={`text-xl font-extrabold ${darkMode ? "text-white" : "text-[#1c1917]"}`}>
            {cat.category}
          </h3>
        </div>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-2.5">
          {cat.skills.map((skill, sIdx) => (
            <motion.div
              key={sIdx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.1 + sIdx * 0.04 }}
              whileHover={{ scale: 1.08 }}
              className={`px-4 py-2 rounded-xl border text-sm font-medium transition-colors cursor-default ${
                darkMode
                  ? "bg-slate-950/60 border-slate-700/80 text-white font-medium hover:border-cyan-400"
                  : "bg-[#ede8df] border-[#d6cebf] text-[#1c1917] font-semibold hover:border-cyan-600 shadow-2xs"
              }`}
            >
              <span>{skill.name}</span>
              <span className={`ml-2 text-xs font-mono ${darkMode ? "text-cyan-400 font-semibold" : "text-cyan-800 font-extrabold"}`}>
                ({skill.level})
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold tracking-wide uppercase shadow-sm ${
            darkMode ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-400" : "border-cyan-300 bg-cyan-50 text-cyan-800"
          }`}>
            <Terminal size={14} />
            Technical Toolkit
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
          <p className={`max-w-2xl mx-auto text-base sm:text-lg ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
            Core technologies, frameworks, and developer tools I leverage daily to engineer high-performing software.
          </p>
        </motion.div>

        {/* Skills Categories Grid with Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((cat, idx) => (
            <SkillCard key={idx} cat={cat} idx={idx} darkMode={darkMode} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
