import React, { useContext } from "react";
import { ThemeContext } from "../context";
import Product from "./Product";
import { enterpriseProjects } from "../data";
import { FolderCode, Linkedin, Mail } from "lucide-react";

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
            Enterprise Solutions
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Featured <span className="text-gradient">Production Projects</span>
          </h2>
          <p className={`max-w-2xl mx-auto text-base sm:text-lg ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
            Key enterprise web applications, real-time validation APIs, OAuth 2.0 microservices, and CMS migrations engineered during production tenure.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {enterpriseProjects.map((item) => (
            <Product
              key={item.id}
              title={item.title}
              company={item.company}
              desc={item.desc}
              architecture={item.architecture}
              tags={item.tags}
            />
          ))}
        </div>

        {/* Connect Banner */}
        <div
          className={`p-5 sm:p-8 rounded-3xl border text-center flex flex-col sm:flex-row items-center justify-between gap-6 ${
            darkMode
              ? "glass-panel border-slate-800"
              : "glass-panel-light border-slate-200 shadow-md"
          }`}
        >
          <div className="text-left">
            <h3 className={`text-lg sm:text-xl font-bold mb-1 ${darkMode ? "text-white" : "text-slate-900"}`}>
              Interested in architecture details or technical collaboration?
            </h3>
            <p className={`text-xs sm:text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
              Connect directly via email or LinkedIn to discuss system design, API architecture, and software opportunities.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full sm:w-auto shrink-0">
            <a
              href="mailto:parthdarji8825@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-sm transition-all shadow-md shadow-cyan-500/25 active:scale-95 w-full sm:w-auto"
            >
              <Mail size={18} />
              Email Me
            </a>
            <a
              href="https://www.linkedin.com/in/parthdarji8825"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-md shadow-blue-600/25 active:scale-95 w-full sm:w-auto"
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
