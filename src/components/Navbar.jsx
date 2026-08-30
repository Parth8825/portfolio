import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context";
import { Sun, Moon, Menu, X, Code2, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ onOpenCommandPalette }) => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [osKey, setOsKey] = useState("Ctrl+K");
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);

          const sectionIds = ["home", "experience", "skills", "code-showcase", "projects", "contact"];
          const scrollPosition = window.scrollY + 140;

          for (let i = sectionIds.length - 1; i >= 0; i--) {
            const section = document.getElementById(sectionIds[i]);
            if (section && section.offsetTop <= scrollPosition) {
              setActiveSection((prev) => (prev !== sectionIds[i] ? sectionIds[i] : prev));
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const isMac =
      typeof window !== "undefined" &&
      ((navigator.platform && navigator.platform.toUpperCase().indexOf("MAC") >= 0) ||
        (navigator.userAgent && navigator.userAgent.toUpperCase().indexOf("MAC") >= 0));
    setOsKey(isMac ? "⌘K" : "Ctrl+K");
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Code", href: "#code-showcase" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const toggleTheme = () => {
    theme.dispatch({ type: "TOGGLE" });
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const targetId = href.replace(/^#/, "");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      setTimeout(() => {
        const navOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navOffset;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: "smooth",
        });

        if (typeof window !== "undefined" && window.history?.pushState) {
          window.history.pushState(null, "", href);
        }
      }, 50);
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? darkMode
            ? "glass-panel bg-slate-950/90 shadow-lg shadow-black/20 py-3"
            : "glass-panel-light bg-[#ede8df]/95 border-b border-[#d6cebf]/80 shadow-xs py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="flex items-center gap-2 group text-xl font-bold tracking-tight cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/25 group-hover:scale-105 transition-transform">
            <Code2 size={20} />
          </div>
          <span
            className={
              darkMode
                ? "text-white group-hover:text-cyan-400 transition-colors"
                : "text-[#1c1917] group-hover:text-cyan-700 transition-colors"
            }
          >
            Parth<span className="text-cyan-500">.</span>
          </span>
        </a>

        {/* Desktop Navigation with Active Scroll Spy */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? darkMode
                      ? "text-cyan-400 font-semibold"
                      : "text-cyan-800 font-bold"
                    : darkMode
                    ? "text-slate-300 hover:text-cyan-400"
                    : "text-[#44403c] hover:text-cyan-700 font-semibold"
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* OS-Aware Command Palette Trigger Button */}
          <button
            onClick={onOpenCommandPalette}
            aria-label="Open Command Palette"
            className={`p-2 sm:px-3 sm:py-2 rounded-xl border text-xs font-mono transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 ${
              darkMode
                ? "bg-slate-900 border-slate-800 text-slate-300 hover:border-cyan-500/50 hover:text-white"
                : "bg-[#fbf9f5] border-[#d6cebf] text-[#1c1917] hover:bg-[#ede8df] hover:border-cyan-600 shadow-2xs"
            }`}
          >
            <Search size={14} className={darkMode ? "text-cyan-400" : "text-cyan-700"} />
            <span className="hidden sm:inline font-semibold">{osKey}</span>
          </button>

          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className={`p-2.5 rounded-xl border transition-all duration-200 active:scale-95 ${
              darkMode
                ? "bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800"
                : "bg-[#fbf9f5] border-[#d6cebf] text-[#1c1917] hover:bg-[#ede8df] shadow-2xs"
            }`}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className={`md:hidden p-2.5 rounded-xl border transition-all duration-200 active:scale-95 ${
              darkMode
                ? "bg-slate-900 border-slate-800 text-slate-200"
                : "bg-[#fbf9f5] border-[#d6cebf] text-[#1c1917]"
            }`}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden border-b px-4 pt-4 pb-6 space-y-3 overflow-hidden ${
              darkMode
                ? "bg-slate-950/95 border-slate-800 text-white"
                : "bg-[#ede8df]/95 border-[#d6cebf] text-[#1c1917]"
            }`}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`block px-3 py-2.5 rounded-xl text-base font-medium transition-colors cursor-pointer active:scale-[0.98] ${
                    isActive
                      ? darkMode
                        ? "bg-cyan-500/15 text-cyan-400 font-semibold"
                        : "bg-cyan-900/10 text-cyan-900 font-bold"
                      : darkMode
                      ? "text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-400"
                      : "text-[#3f3b35] hover:bg-cyan-900/5 hover:text-cyan-900"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
