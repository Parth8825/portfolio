import { useEffect, useState } from "react";
import { SITE_SECTION_IDS } from "../constants/navigation";

const useActiveSection = (sectionIds = SITE_SECTION_IDS, navigationOffset = 140) => {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "home");

  useEffect(() => {
    let scrollFrame = null;
    let resizeFrame = null;
    let sectionOffsets = [];

    const updateSectionOffsets = () => {
      sectionOffsets = sectionIds
        .map((id) => {
          const section = document.getElementById(id);
          return section ? { id, top: section.offsetTop } : null;
        })
        .filter(Boolean);
    };

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + navigationOffset;

      for (let index = sectionOffsets.length - 1; index >= 0; index -= 1) {
        if (sectionOffsets[index].top <= scrollPosition) {
          const nextSection = sectionOffsets[index].id;
          setActiveSection((current) => current === nextSection ? current : nextSection);
          break;
        }
      }
    };

    const handleScroll = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        updateActiveSection();
        scrollFrame = null;
      });
    };

    const scheduleOffsetUpdate = () => {
      if (resizeFrame) return;
      resizeFrame = window.requestAnimationFrame(() => {
        updateSectionOffsets();
        updateActiveSection();
        resizeFrame = null;
      });
    };

    updateSectionOffsets();
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", scheduleOffsetUpdate, { passive: true });

    const main = document.querySelector("main");
    const resizeObserver = main && typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(scheduleOffsetUpdate)
      : null;
    resizeObserver?.observe(main);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", scheduleOffsetUpdate);
      resizeObserver?.disconnect();
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
    };
  }, [navigationOffset, sectionIds]);

  return activeSection;
};

export default useActiveSection;
