import React, { useContext } from "react";
import { ThemeContext } from "../context";
import { Code, Cpu, Database, Layers, CheckCircle2, Award } from "lucide-react";

const About = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const highlights = [
    {
      icon: <Layers className="text-cyan-400" size={24} />,
      title: "Full SDLC Expertise",
      desc: "Requirement analysis, architecture design, development, testing, & production deployment.",
    },
    {
      icon: <Code className="text-indigo-400" size={24} />,
      title: "Backend Specialist",
      desc: "Expertise in C#, ASP.NET Core, MVC, Web API, ADO.NET, and Entity Framework.",
    },
    {
      icon: <Database className="text-purple-400" size={24} />,
      title: "Data Architecture",
      desc: "Relational database modeling, complex SQL queries, store procedures, and optimization.",
    },
    {
      icon: <Cpu className="text-emerald-400" size={24} />,
      title: "Modern Practices",
      desc: "Agile SCRUM methodology, Test-Driven Development (TDD), and CI/CD DevOps workflows.",
    },
  ];

  const bulletPoints = [
    "2+ years of experience designing, developing, and deploying scalable enterprise web applications and APIs.",
    "Expertise in building secure RESTful & GraphQL APIs using ASP.NET Core, C#, Azure App Services, Azure Storage, and Azure SQL.",
    "Engineered centralized OAuth 2.0 authentication wrapper services with Microsoft Identity Platform for microservices security.",
    "Hands-on experience in modern frontend integration using React, TypeScript, Vite, jQuery, AJAX, and Bootstrap.",
    "Experienced in migrating content-driven platforms (Umbraco CMS v13 to v17) and developing Shopify integration apps.",
    "Post-Graduate Diploma in Computer Programming (Conestoga College, Canada) & Bachelor of IT Engineering (GTU, India).",
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-semibold tracking-wide uppercase">
            <Award size={14} />
            Professional Background
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className={`max-w-2xl mx-auto text-base sm:text-lg ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
            A dedicated Software Developer committed to creating efficient, scalable, and maintainable enterprise software solutions.
          </p>
        </div>

        {/* Highlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                darkMode
                  ? "bg-slate-900/60 border-slate-800 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/5"
                  : "bg-white border-slate-200 hover:border-cyan-400 shadow-sm hover:shadow-md"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center mb-4 border border-slate-700/50">
                {item.icon}
              </div>
              <h3 className={`text-lg font-bold mb-2 ${darkMode ? "text-white" : "text-slate-900"}`}>
                {item.title}
              </h3>
              <p className={`text-sm leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Detailed Experience Container */}
        <div
          className={`rounded-3xl p-8 sm:p-12 border ${
            darkMode
              ? "glass-panel border-slate-800"
              : "glass-panel-light border-slate-200 shadow-lg"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      {/* Left Image Showcase with Protection Shield */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl group">
                <div 
                  className="absolute inset-0 z-10 select-none"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
                <img
                  src="/images/developer-workspace.jpg"
                  alt="Parth Darji Workspace"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  className="w-full h-80 sm:h-96 object-cover object-[50%_20%] group-hover:scale-105 transition-transform duration-500 select-none pointer-events-none"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6 z-20">
                  <div>
                    <h4 className="text-lg font-bold text-white">Full-Stack Development</h4>
                    <p className="text-xs text-cyan-400 font-medium">Enterprise & Web Applications</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Summary Bullet Points */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <h3 className={`text-2xl font-bold mb-4 ${darkMode ? "text-white" : "text-slate-900"}`}>
                Technical Experience & Capabilities
              </h3>

              <div className="space-y-3.5">
                {bulletPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-cyan-400 shrink-0 mt-1" />
                    <p className={`text-sm sm:text-base leading-relaxed ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
