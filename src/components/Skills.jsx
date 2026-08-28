import React, { useContext } from "react";
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

        {/* Skills Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9, y: 35 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className={`p-5 sm:p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-1.5 ${
                darkMode
                  ? "bg-slate-900/60 border-slate-800 hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/5"
                  : "bg-white border-slate-200 shadow-md hover:shadow-xl hover:border-cyan-400"
              }`}
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800/40">
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                  {cat.icon}
                </div>
                <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}>
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
                        ? "bg-slate-800/80 border-slate-700/80 text-slate-200 hover:bg-slate-800 hover:border-cyan-500/50"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-white hover:border-cyan-500/50 shadow-2xs"
                    }`}
                  >
                    <span>{skill.name}</span>
                    <span className={`ml-2 text-xs font-mono ${darkMode ? "text-cyan-400 opacity-80" : "text-cyan-700 font-semibold"}`}>
                      ({skill.level})
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
