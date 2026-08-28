import React, { useState, useEffect, useContext, useRef } from "react";
import { ThemeContext } from "../context";
import { Search, Home, Briefcase, Wrench, FolderCode, Mail, Copy, Check, Terminal, CornerDownLeft } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { motion } from "framer-motion";

const CommandPalette = ({ isOpen, onClose }) => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const itemRefs = useRef([]);

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
        window.location.hash = "#home";
        onClose();
      },
    },
    {
      id: "projects",
      icon: <FolderCode size={18} className="text-indigo-400" />,
      label: "Go to Enterprise Projects",
      category: "Navigation",
      action: () => {
        window.location.hash = "#projects";
        onClose();
      },
    },
    {
      id: "experience",
      icon: <Briefcase size={18} className="text-purple-400" />,
      label: "Go to Career Experience & Education",
      category: "Navigation",
      action: () => {
        window.location.hash = "#experience";
        onClose();
      },
    },
    {
      id: "skills",
      icon: <Wrench size={18} className="text-emerald-400" />,
      label: "Go to Technical Toolkit",
      category: "Navigation",
      action: () => {
        window.location.hash = "#skills";
        onClose();
      },
    },
    {
      id: "code",
      icon: <Terminal size={18} className="text-amber-400" />,
      label: "Go to C# & SQL Code Showcase",
      category: "Navigation",
      action: () => {
        window.location.hash = "#code-showcase";
        onClose();
      },
    },
    {
      id: "contact",
      icon: <Mail size={18} className="text-rose-400" />,
      label: "Go to Contact Form",
      category: "Navigation",
      action: () => {
        window.location.hash = "#contact";
        onClose();
      },
    },
    {
      id: "copy-email",
      icon: copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} className="text-cyan-400" />,
      label: copied ? "Email Copied to Clipboard!" : "Copy Email Address (parthdarji8825@gmail.com)",
      category: "Action",
      action: () => {
        navigator.clipboard.writeText("parthdarji8825@gmail.com");
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
        window.open("https://www.linkedin.com/in/parthdarji8825", "_blank");
        onClose();
      },
    },
    {
      id: "github",
      icon: <GithubIcon size={18} className="text-slate-300" />,
      label: "Open GitHub Profile",
      category: "External Link",
      action: () => {
        window.open("https://github.com/Parth8825", "_blank");
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
          darkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
        }`}
      >
        {/* Search Input Bar with 16px font-size to prevent mobile browser auto-zoom */}
        <div className="px-4 sm:px-5 py-3.5 sm:py-4 border-b border-slate-800/40 flex items-center gap-3">
          <Search size={20} className={darkMode ? "text-cyan-400 shrink-0" : "text-cyan-600 shrink-0"} />
          <input
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-autocomplete="list"
            aria-controls="command-list"
            aria-activedescendant={filteredCommands[selectedIndex] ? `cmd-${filteredCommands[selectedIndex].id}` : undefined}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or navigate with ↑↓..."
            autoFocus
            className={`w-full bg-transparent text-base sm:text-base outline-hidden font-medium text-[16px] ${
              darkMode ? "text-white placeholder-slate-500" : "text-slate-900 placeholder-slate-400"
            }`}
          />
          <kbd className="px-2 py-1 rounded-md text-[10px] font-mono uppercase bg-slate-800 text-slate-400 border border-slate-700 shrink-0">
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
                        : "bg-cyan-50 border-cyan-300 text-cyan-950 shadow-xs"
                      : darkMode
                      ? "border-transparent text-slate-300 hover:bg-slate-800/60"
                      : "border-transparent text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {cmd.icon}
                    <span>{cmd.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-md ${
                      darkMode ? "text-slate-400 bg-slate-800/80" : "text-slate-600 bg-slate-200"
                    }`}>
                      {cmd.category}
                    </span>
                    {isSelected && (
                      <CornerDownLeft size={13} className={darkMode ? "text-cyan-400" : "text-cyan-700"} />
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
      </motion.div>
    </motion.div>
  );
};

export default CommandPalette;
