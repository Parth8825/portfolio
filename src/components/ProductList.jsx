import React, { useContext, useState, lazy, Suspense } from "react";
import { createPortal } from "react-dom";
import { ThemeContext } from "../context";
import Product from "./Product";
import { enterpriseProjects } from "../data";
import { FolderCode, Mail } from "lucide-react";
import { LinkedinIcon } from "./Icons";
import { motion, AnimatePresence } from "framer-motion";
import SectionEyebrow from "./SectionEyebrow";

const ProjectModal = lazy(() => import("./ProjectModal"));

const projectAccents = [
  "6 182 212",
  "99 102 241",
  "168 85 247",
  "244 63 94",
  "16 185 129",
];

const ModalFallback = () => {
  if (typeof document === "undefined") return null;
  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/85 backdrop-blur-xl"
      aria-busy="true"
      aria-label="Loading project details"
    >
      <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
    </div>,
    document.body
  );
};

const ProductList = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" data-section-accent="indigo" className="chapter-section py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <SectionEyebrow icon={FolderCode} number="04">
            Enterprise Solutions
          </SectionEyebrow>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Featured <span className="text-gradient">Production Projects</span>
          </h2>
          <p className={`max-w-2xl mx-auto text-base sm:text-lg ${darkMode ? "text-slate-400" : "text-[#44403c]"}`}>
            Key enterprise web applications, real-time validation APIs, OAuth 2.0 microservices, and CMS migrations engineered during production tenure. Click any card to inspect system architecture.
          </p>
        </motion.div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 sm:gap-6 mb-16">
          {enterpriseProjects.map((item, index) => {
            const projectNumber = String(index + 1).padStart(2, "0");
            const accentRgb = projectAccents[index % projectAccents.length];

            return (
              <Product
                key={item.id}
                index={index}
                projectNumber={projectNumber}
                accentRgb={accentRgb}
                className={index < 2 ? "lg:col-span-3" : "lg:col-span-2"}
                title={item.title}
                company={item.company}
                desc={item.desc}
                architecture={item.architecture}
                tags={item.tags}
                onOpenModal={() => setSelectedProject({ ...item, projectNumber, accentRgb })}
              />
            );
          })}
        </div>

        {/* Connect Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="surface-card p-5 sm:p-8 rounded-3xl border text-center flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="text-left">
            <h3 className={`text-lg sm:text-xl font-bold mb-1 ${darkMode ? "text-white" : "text-[#1c1917]"}`}>
              Interested in architecture details or technical collaboration?
            </h3>
            <p className={`text-xs sm:text-sm ${darkMode ? "text-slate-400" : "text-[#44403c]"}`}>
              Connect directly via email or LinkedIn to discuss system design, API architecture, and software opportunities.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full sm:w-auto shrink-0">
            <a
              href="mailto:parthdarji8825@gmail.com"
              className="action-control inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-md shadow-cyan-500/25 w-full sm:w-auto"
            >
              <Mail size={18} />
              Email Me
            </a>
            <a
              href="https://www.linkedin.com/in/parthdarji8825"
              target="_blank"
              rel="noopener noreferrer"
              className="action-control inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-md shadow-blue-600/25 w-full sm:w-auto"
            >
              <LinkedinIcon size={18} />
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>

      {/* Case Study Detail Modal with AnimatePresence for 3D Flip */}
      <AnimatePresence>
        {selectedProject && (
          <Suspense fallback={<ModalFallback />}>
            <ProjectModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          </Suspense>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProductList;
