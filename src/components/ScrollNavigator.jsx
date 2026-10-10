import React from "react";
import { motion } from "framer-motion";
import { SITE_SECTIONS } from "../constants/navigation";
import { navigateToSection } from "../utils/scroll";

const ScrollNavigator = ({ activeSection, scrollProgress }) => {
  const currentSection = SITE_SECTIONS.find(({ id }) => id === activeSection) ?? SITE_SECTIONS[0];

  const handleNavigation = (event, targetId) => {
    event.preventDefault();
    navigateToSection(targetId);
  };

  return (
    <nav
      aria-label="Section navigation"
      className="section-navigator fixed right-4 2xl:right-6 top-1/2 -translate-y-1/2 z-40 hidden min-[1440px]:flex flex-col gap-4"
    >
      <div className="section-navigator-current" aria-live="polite">
        <span className="font-mono text-[10px] tracking-[0.2em]">{currentSection.number}</span>
        <span className="text-xs font-bold uppercase tracking-[0.16em]">{currentSection.label}</span>
      </div>

      <div className="flex items-stretch gap-3">
        <div className="section-navigator-progress" aria-hidden="true">
          <motion.span
            className="section-navigator-progress-fill"
            style={{ scaleY: scrollProgress }}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          {SITE_SECTIONS.map((section) => {
            const isActive = section.id === activeSection;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(event) => handleNavigation(event, section.id)}
                aria-label={`Go to ${section.label} section`}
                aria-current={isActive ? "location" : undefined}
                className={`section-navigator-link action-control ${isActive ? "is-active" : ""}`}
              >
                <span className="font-mono text-[10px]" aria-hidden="true">{section.number}</span>
                <span className="section-navigator-dot" aria-hidden="true" />
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default ScrollNavigator;
