import React, { useContext } from "react";
import { ThemeContext } from "../context";
import { experienceData } from "../data";
import { Briefcase, GraduationCap, MapPin, Calendar, CheckCircle2 } from "lucide-react";

const Experience = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Target anchor alias for legacy #about links */}
      <div id="about" className="absolute -top-24" />

      {/* Ambient background glow elements */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title Header */}
        <div className="text-center space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold tracking-wide uppercase shadow-sm">
            <Briefcase size={14} />
            Career & Academic Journey
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Work Experience & <span className="text-gradient">Education</span>
          </h2>
          <p className={`max-w-2xl mx-auto text-base sm:text-lg ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
            My professional path across software development in Canada and India, showcasing enterprise engineering achievements.
          </p>
        </div>

        {/* Pixel-Perfect Responsive Timeline */}
        <div className="relative space-y-8 sm:space-y-12 before:absolute before:inset-0 before:left-5 md:before:left-1/2 before:-translate-x-px before:h-full before:w-1 before:bg-gradient-to-b before:from-cyan-500 before:via-indigo-500 before:to-purple-500">
          {experienceData.map((item, index) => {
            const isEven = index % 2 === 0;
            const isEducation = item.type === "Education";

            return (
              <div
                key={item.id}
                className="relative flex items-start md:items-center justify-start md:justify-normal md:odd:flex-row-reverse group"
              >
                {/* Glowing Marker Badge */}
                <div className="absolute left-5 md:left-1/2 -translate-x-1/2 top-1.5 md:top-auto w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-slate-950 border-2 border-cyan-400 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/30 z-20 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-300">
                  {isEducation ? <GraduationCap className="w-4 h-4 md:w-5 md:h-5" /> : <Briefcase className="w-4 h-4 md:w-5 md:h-5" />}
                </div>

                {/* Timeline Content Card */}
                <div
                  className={`w-full ml-13 md:ml-0 md:w-[calc(50%-3rem)] p-5 sm:p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-1.5 ${
                    darkMode
                      ? "bg-slate-900/80 border-slate-800 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10"
                      : "bg-white border-slate-200 shadow-lg hover:border-cyan-400 hover:shadow-2xl"
                  } ${isEven ? "md:mr-auto" : "md:ml-auto"}`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {item.type}
                    </span>
                    <div className={`flex items-center gap-1.5 text-xs font-semibold ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                      <Calendar size={13} className="text-cyan-400" />
                      {item.period}
                    </div>
                  </div>

                  <h3 className={`text-lg sm:text-2xl font-extrabold mb-1 group-hover:text-cyan-400 transition-colors ${
                    darkMode ? "text-white" : "text-slate-900"
                  }`}>
                    {item.role}
                  </h3>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4 text-xs sm:text-sm font-semibold text-indigo-400">
                    <span>{item.company}</span>
                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <MapPin size={13} className="text-cyan-400" />
                      {item.location}
                    </span>
                  </div>

                  <p className={`text-xs sm:text-sm leading-relaxed mb-4 italic border-l-2 border-cyan-400/50 pl-3 ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
                    &quot;{item.highlight}&quot;
                  </p>

                  {/* Bullet Points */}
                  <div className="space-y-2.5 mb-5">
                    {item.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                        <span className={darkMode ? "text-slate-300" : "text-slate-700"}>{pt}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-3.5 border-t border-slate-800/40">
                    {item.tech.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg text-[11px] sm:text-xs font-medium bg-slate-800/80 text-slate-200 border border-slate-700/60 hover:border-cyan-500/40 transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
