import React, { useContext, useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Intro from "./components/Intro";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import CodeShowcase from "./components/CodeShowcase";
import ProductList from "./components/ProductList";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CommandPalette from "./components/CommandPalette";
import { ThemeContext } from "./context";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring } from "framer-motion";

function App() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Fine pointer detection (desktop mouse vs mobile touch screens)
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsFinePointer(mediaQuery.matches);

    const handleChange = (e) => setIsFinePointer(e.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  // Global Site-Wide Ambient Cursor Spotlight Aura (Enabled exclusively on fine-pointer devices)
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 500);
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 3 : 300);
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 20, mass: 0.1 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 20, mass: 0.1 });

  useEffect(() => {
    if (!isFinePointer) return;

    let rafId = null;
    const handleMouseMove = (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        rafId = null;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isFinePointer, mouseX, mouseY]);

  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  // Smooth scroll to sections when anchor links are clicked, without forcing global scroll-behavior: smooth on trackpads
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const targetId = anchor.getAttribute("href")?.slice(1);
      if (!targetId) return;
      const targetElem = document.getElementById(targetId);
      if (targetElem) {
        e.preventDefault();
        if (typeof targetElem.scrollIntoView === "function") {
          targetElem.scrollIntoView({ behavior: "smooth" });
        }
        if (typeof window !== "undefined" && window.history?.pushState) {
          window.history.pushState(null, "", `#${targetId}`);
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <div
      className={`min-h-screen relative transition-colors duration-300 overflow-x-clip ${
        darkMode ? "bg-slate-950 text-slate-100" : "bg-[#ede8df] text-[#1c1917]"
      }`}
    >
      {/* Top Neon Scroll Reading Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 origin-left z-[60] pointer-events-none shadow-sm shadow-cyan-500/50"
      />

      {/* Balanced, Spacious Cyber Dot-Grid (Warm Tone in Light Mode for Zero Eye Strain) */}
      <div
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500"
        style={{
          backgroundImage: darkMode
            ? "radial-gradient(rgba(148, 163, 184, 0.38) 1.5px, transparent 1.5px)"
            : "radial-gradient(rgba(120, 113, 108, 0.3) 1.5px, transparent 1.5px)",
          backgroundSize: "36px 36px",
          opacity: darkMode ? 0.9 : 0.7,
        }}
      />

      {/* Site-Wide Ambient Spotlight: Animated for mouse devices, stationary & zero-cost on touch */}
      {isFinePointer ? (
        <motion.div
          className="fixed pointer-events-none z-0 rounded-full transition-opacity duration-300"
          style={{
            x: smoothMouseX,
            y: smoothMouseY,
            translateX: "-50%",
            translateY: "-50%",
            width: 650,
            height: 650,
            background: darkMode
              ? "radial-gradient(circle, rgba(6, 182, 212, 0.16) 0%, rgba(99, 102, 241, 0.08) 45%, transparent 75%)"
              : "radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, rgba(99, 102, 241, 0.06) 45%, transparent 75%)",
            filter: "blur(40px)",
            willChange: "transform",
          }}
        />
      ) : (
        <div
          className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full pointer-events-none z-0 transition-opacity duration-300"
          style={{
            background: darkMode
              ? "radial-gradient(circle, rgba(6, 182, 212, 0.22) 0%, rgba(99, 102, 241, 0.1) 50%, transparent 75%)"
              : "radial-gradient(circle, rgba(14, 165, 233, 0.16) 0%, rgba(99, 102, 241, 0.08) 50%, transparent 75%)",
            filter: "blur(50px)",
          }}
        />
      )}

      <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
      <main className="relative z-10">
        <Intro />
        <Experience />
        <Skills />
        <CodeShowcase />
        <ProductList />
        <Contact />
      </main>
      <Footer />

      <AnimatePresence>
        {commandPaletteOpen && (
          <CommandPalette
            isOpen={commandPaletteOpen}
            onClose={() => setCommandPaletteOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
