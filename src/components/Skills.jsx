import React, { useContext } from "react";
import { ThemeContext } from "../context";
import { Server, Database, Layout, Wrench, Terminal } from "lucide-react";

const skillCategories = [
  {
    category: "Backend & Core",
    icon: <Server className="text-cyan-400" size={22} />,
    skills: [
      { name: "ASP.NET Core", level: "Advanced" },
      { name: "C#", level: "Advanced" },
      { name: "ASP.NET MVC", level: "Advanced" },
      { name: "REST Web API", level: "Advanced" },
      { name: "ADO.NET", level: "Proficient" },
      { name: "Object Oriented Programming (OOP)", level: "Advanced" },
    ],
  },
  {
    category: "Databases & ORM",
    icon: <Database className="text-indigo-400" size={22} />,
    skills: [
      { name: "Microsoft SQL Server", level: "Advanced" },
      { name: "Entity Framework / EF Core", level: "Advanced" },
      { name: "LINQ", level: "Advanced" },
      { name: "Database Schema & Indexing", level: "Proficient" },
      { name: "Stored Procedures & T-SQL", level: "Advanced" },
    ],
  },
  {
    category: "Frontend & Web",
    icon: <Layout className="text-purple-400" size={22} />,
    skills: [
      { name: "React.js", level: "Proficient" },
      { name: "JavaScript (ES6+)", level: "Advanced" },
      { name: "jQuery", level: "Advanced" },
      { name: "HTML5 / CSS3", level: "Advanced" },
      { name: "Tailwind CSS", level: "Proficient" },
      { name: "AJAX & JSON", level: "Advanced" },
    ],
  },
  {
    category: "Cloud, DevOps & Tools",
    icon: <Wrench className="text-emerald-400" size={22} />,
    skills: [
      { name: "Microsoft Azure", level: "Proficient" },
      { name: "GitHub / Git", level: "Advanced" },
      { name: "Azure DevOps / CI-CD", level: "Proficient" },
      { name: "Visual Studio & VS Code", level: "Advanced" },
      { name: "IIS Web Server", level: "Proficient" },
      { name: "Agile & SCRUM", level: "Advanced" },
    ],
  },
];

const Skills = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold tracking-wide uppercase">
            <Terminal size={14} />
            Technical Toolkit
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
          <p className={`max-w-2xl mx-auto text-base sm:text-lg ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
            Core technologies, frameworks, and developer tools I leverage daily to engineer high-performing software.
          </p>
        </div>

        {/* Skills Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((cat, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-3xl border transition-all duration-300 ${
                darkMode
                  ? "bg-slate-900/50 border-slate-800 hover:border-slate-700 shadow-xl"
                  : "bg-white border-slate-200 shadow-md hover:shadow-lg"
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
                  <div
                    key={sIdx}
                    className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200 hover:scale-105 ${
                      darkMode
                        ? "bg-slate-800/80 border-slate-700/80 text-slate-200 hover:bg-slate-800 hover:border-cyan-500/50"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-white hover:border-cyan-500/50 shadow-xs"
                    }`}
                  >
                    <span>{skill.name}</span>
                    <span className="ml-2 text-xs text-cyan-400 font-mono opacity-80">({skill.level})</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
