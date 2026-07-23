import React, { useContext } from "react";
import { ThemeContext } from "../context";
import Product from "./Product";
import { projectsData } from "../data";
import { FolderCode, Github, Linkedin } from "lucide-react";

const ProductList = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-semibold tracking-wide uppercase">
            <FolderCode size={14} />
            Featured Work
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Portfolio <span className="text-gradient">Projects</span>
          </h2>
          <p className={`max-w-2xl mx-auto text-base sm:text-lg ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
            Explore selected web applications and enterprise projects built using .NET Core, C#, Azure, and modern frontend tools.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {projectsData.map((item) => (
            <Product
              key={item.id}
              title={item.title}
              desc={item.desc}
              img={item.img}
              link={item.link}
              tags={item.tags}
            />
          ))}
        </div>

        {/* Social Links Banner */}
        <div
          className={`p-8 rounded-3xl border text-center flex flex-col sm:flex-row items-center justify-between gap-6 ${
            darkMode
              ? "glass-panel border-slate-800"
              : "glass-panel-light border-slate-200 shadow-md"
          }`}
        >
          <div className="text-left">
            <h3 className={`text-xl font-bold mb-1 ${darkMode ? "text-white" : "text-slate-900"}`}>
              Want to see more code repositories?
            </h3>
            <p className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
              Check out all public code repositories and active contributions on GitHub and LinkedIn.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://github.com/Parth8825"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-700 transition-all shadow-sm active:scale-95"
            >
              <Github size={18} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/parthdarji8825"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-md shadow-blue-600/25 active:scale-95"
            >
              <Linkedin size={18} />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
