import React, { useState, useEffect, useContext, useRef } from "react";
import { ThemeContext } from "../context";
import { Search, Home, Briefcase, Wrench, FolderCode, Mail, Copy, Check, Terminal, CornerDownLeft, X } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { motion } from "framer-motion";

const CommandPalette = ({ isOpen, onClose }) => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const itemRefs = useRef([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkTouch = () => {
        setIsTouchDevice(
          window.matchMedia("(pointer: coarse)").matches ||
          "ontouchstart" in window ||
          (navigator.maxTouchPoints > 0 && window.innerWidth < 768)
        );
      };
      checkTouch();
      window.addEventListener("resize", checkTouch);
      return () => window.removeEventListener("resize", checkTouch);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      setQuery("");
      setSelectedIndex(0);
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  const commands = [
    {
      id: "home",
      icon: <Home size={18} className="text-cyan-400" />,
      label: "Go to Home / Hero",
      category: "Navigation",
      action: () => {
        onClose();
        setTimeout(() => {
          const el = document.getElementById("home");
          if (typeof el?.scrollIntoView === "function") {
            el.scrollIntoView({ behavior: "smooth" });
          } else {
            window.location.hash = "#home";
          }
        }, 80);
      },
    },
    {
      id: "projects",
      icon: <FolderCode size={18} className="text-indigo-400" />,
      label: "Go to Enterprise Projects",
      category: "Navigation",
      action: () => {
        onClose();
        setTimeout(() => {
          const el = document.getElementById("projects");
          if (typeof el?.scrollIntoView === "function") {
            el.scrollIntoView({ behavior: "smooth" });
          } else {
            window.location.hash = "#projects";
          }
        }, 80);
      },
    },
    {
      id: "experience",
      icon: <Briefcase size={18} className="text-purple-400" />,
      label: "Go to Career Experience & Education",
      category: "Navigation",
      action: () => {
        onClose();
        setTimeout(() => {
          const el = document.getElementById("experience");
          if (typeof el?.scrollIntoView === "function") {
            el.scrollIntoView({ behavior: "smooth" });
          } else {
            window.location.hash = "#experience";
          }
        }, 80);
      },
    },
    {
      id: "skills",
      icon: <Wrench size={18} className="text-emerald-400" />,
      label: "Go to Technical Toolkit",
      category: "Navigation",
      action: () => {
        onClose();
        setTimeout(() => {
          const el = document.getElementById("skills");
          if (typeof el?.scrollIntoView === "function") {
            el.scrollIntoView({ behavior: "smooth" });
          } else {
            window.location.hash = "#skills";
          }
        }, 80);
      },
    },
    {
      id: "code",
      icon: <Terminal size={18} className="text-amber-400" />,
      label: "Go to C# & SQL Code Showcase",
      category: "Navigation",
      action: () => {
        onClose();
        setTimeout(() => {
          const el = document.getElementById("code-showcase");
          if (typeof el?.scrollIntoView === "function") {
            el.scrollIntoView({ behavior: "smooth" });
          } else {
            window.location.hash = "#code-showcase";
          }
        }, 80);
      },
    },
    {
      id: "contact",
      icon: <Mail size={18} className="text-rose-400" />,
      label: "Go to Contact Form",
      category: "Navigation",
      action: () => {
        onClose();
        setTimeout(() => {
          const el = document.getElementById("contact");
          if (typeof el?.scrollIntoView === "function") {
            el.scrollIntoView({ behavior: "smooth" });
          } else {
            window.location.hash = "#contact";
          }
        }, 80);
      },
    },
    {
      id: "copy-email",
      icon: copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} className="text-cyan-400" />,
      label: copied ? "Email Copied to Clipboard!" : "Copy Email Address (parthdarji8825@gmail.com)",
      category: "Action",
      action: () => {
        navigator.clipboard.writeText("parthdarji8825@gmail.com").catch(() => {});
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
    },
    {
      id: "linkedin",
      icon: <LinkedinIcon size={18} className="text-blue-400" />,
      label: "Open LinkedIn Profile",
      category: "External Link",
      action: () => {
        window.open("https://www.linkedin.com/in/parthdarji8825", "_blank", "noopener,noreferrer");
        onClose();
      },
    },
    {
      id: "github",
      icon: <GithubIcon size={18} className="text-slate-300" />,
      label: "Open GitHub Profile",
      category: "External Link",
      action: () => {
        window.open("https://github.com/Parth8825", "_blank", "noopener,noreferrer");
        onClose();
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (typeof itemRefs.current[selectedIndex]?.scrollIntoView === "function") {
      itemRefs.current[selectedIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
      if (!isOpen || filteredCommands.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, filteredCommands, selectedIndex]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-3 sm:px-6 bg-slate-950/80 backdrop-blur-md overflow-x-hidden"
    >
      <div className="fixed inset-0" onClick={onClose} aria-label="Close command palette background" />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Command Palette"
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={`relative w-full max-w-xl rounded-3xl border shadow-2xl z-10 overflow-hidden text-left ${
          darkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-[#fbf9f5] border-[#d6cebf] text-[#1c1917] shadow-xl"
        }`}
      >
        {/* Search Input Bar with 16px font-size to prevent mobile browser auto-zoom */}
        <div className="px-4 sm:px-5 py-3.5 sm:py-4 border-b border-slate-800/40 flex items-center gap-3">
          <Search size={20} className={darkMode ? "text-cyan-400 shrink-0" : "text-cyan-700 shrink-0"} />
          <input
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-autocomplete="list"
            aria-controls="command-list"
            aria-activedescendant={filteredCommands[selectedIndex] ? `cmd-${filteredCommands[selectedIndex].id}` : undefined}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isTouchDevice ? "Search portfolio or tap an option..." : "Type a command or navigate with ↑↓..."}
            autoFocus
            className={`w-full bg-transparent text-base sm:text-base outline-hidden font-medium text-[16px] ${
              darkMode ? "text-white placeholder-slate-500" : "text-[#1c1917] placeholder-[#78716c]"
            }`}
          />
          {/* Mobile Touch-Friendly Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className={`sm:hidden p-1.5 rounded-xl transition-colors cursor-pointer shrink-0 ${
              darkMode ? "text-slate-400 hover:text-white hover:bg-slate-800" : "text-[#78716c] hover:text-[#1c1917] hover:bg-[#ede8df]"
            }`}
          >
            <X size={18} />
          </button>

          {/* Desktop Keyboard Badge */}
          <kbd
            onClick={onClose}
            className="hidden sm:inline-flex items-center px-2 py-1 rounded-md text-[10px] font-mono uppercase bg-slate-800 text-slate-400 border border-slate-700 shrink-0 cursor-pointer hover:bg-slate-700 hover:text-slate-200 transition-colors"
            title="Press Escape to close"
          >
            ESC
          </kbd>
        </div>

        {/* Command List */}
        <div id="command-list" role="listbox" className="max-h-80 overflow-y-auto p-3 space-y-1">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  id={`cmd-${cmd.id}`}
                  role="option"
                  aria-selected={isSelected}
                  ref={(el) => (itemRefs.current[index] = el)}
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full p-3 rounded-2xl flex items-center justify-between text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
                    isSelected
                      ? darkMode
                        ? "bg-slate-800 border-cyan-500/50 text-white shadow-xs"
                        : "bg-cyan-900/10 border-cyan-300 text-cyan-950 shadow-xs"
                      : darkMode
                      ? "border-transparent text-slate-300 hover:bg-slate-800/60"
                      : "border-transparent text-[#3f3b35] hover:bg-[#ede8df]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {cmd.icon}
                    <span>{cmd.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-md ${
                      darkMode ? "text-slate-400 bg-slate-800/80" : "text-[#44403c] bg-[#ede8df]"
                    }`}>
                      {cmd.category}
                    </span>
                    {isSelected && (
                      <CornerDownLeft size={13} className={`hidden sm:inline-block ${darkMode ? "text-cyan-400" : "text-cyan-700"}`} />
                    )}
                  </div>
                </button>
              );
            })
          ) : (
            <div className="p-6 text-center text-xs text-slate-500 font-mono">
              No matching commands found for &quot;{query}&quot;
            </div>
          )}
        </div>

        {/* Device-Specific Bottom Helper Guidance */}
        <div className={`px-4 sm:px-5 py-2.5 border-t text-[11px] font-mono flex items-center justify-between transition-colors ${
          darkMode ? "bg-slate-950/60 border-slate-800/60 text-slate-400" : "bg-[#ede8df]/60 border-[#d6cebf]/60 text-[#78716c]"
        }`}>
          {/* Desktop keyboard tips */}
          <div className="hidden sm:flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] border border-slate-700">↑↓</kbd> Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] border border-slate-700">↵</kbd> Select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] border border-slate-700">ESC</kbd> Close
            </span>
          </div>

          {/* Mobile touch tips */}
          <div className="sm:hidden flex items-center gap-1.5 text-[11px]">
            <span>Tap any option to select</span>
          </div>

          <span className="text-[10px]">
            {filteredCommands.length} {filteredCommands.length === 1 ? "result" : "results"}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CommandPalette;
