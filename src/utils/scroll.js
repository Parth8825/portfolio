import { getScrollBehavior } from "../hooks/useReducedMotion";

const hasPendingSectionBefore = (target) =>
  Array.from(document.querySelectorAll('[data-lazy-pending="true"]')).some(
    (placeholder) => placeholder.id === target.id || placeholder.offsetTop < target.offsetTop
  );

export const scrollToSection = (targetId, navOffset = 80) => {
  if (typeof document === "undefined" || !document.getElementById(targetId)) return;

  const startedAt = performance.now();
  document.dispatchEvent(new CustomEvent("portfolio:navigate", { detail: { targetId } }));

  const scrollWhenReady = () => {
    const target = document.getElementById(targetId);
    if (!target) return;

    if (hasPendingSectionBefore(target) && performance.now() - startedAt < 1200) {
      window.requestAnimationFrame(scrollWhenReady);
      return;
    }

    const top = target.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: Math.max(0, top - navOffset),
      behavior: getScrollBehavior(),
    });
  };

  window.requestAnimationFrame(scrollWhenReady);
};

export const navigateToSection = (targetId) => {
  scrollToSection(targetId);
  if (typeof window !== "undefined" && window.history?.pushState) {
    window.history.pushState(null, "", `#${targetId}`);
  }
};
