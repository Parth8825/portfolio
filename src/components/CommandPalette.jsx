import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../context";
import { Search, Home, Briefcase, Wrench, FolderCode, Mail, Copy, Check, Terminal } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

const CommandPalette = ({ isOpen, onClose }) => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} aria-label="Close command palette background" />

      <div
        className={`relative w-full max-w-xl rounded-3xl border shadow-2xl z-10 overflow-hidden text-left animate-in zoom-in-95 duration-200 ${
          darkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
        }`}
      >
        {/* Search Input Bar */}
        <div className="px-5 py-4 border-b border-slate-800/40 flex items-center gap-3">
          <Search size={20} className="text-cyan-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search..."
            autoFocus
            className={`w-full bg-transparent text-sm sm:text-base outline-hidden font-medium ${
              darkMode ? "text-white placeholder-slate-500" : "text-slate-900 placeholder-slate-400"
            }`}
          />
          <kbd className="px-2 py-1 rounded-md text-[10px] font-mono uppercase bg-slate-800 text-slate-400 border border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Command List */}
        <div className="max-h-80 overflow-y-auto p-3 space-y-1">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd) => (
              <button
                key={cmd.id}
                onClick={cmd.action}
                className={`w-full p-3 rounded-2xl flex items-center justify-between text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                  darkMode
                    ? "hover:bg-slate-800/80 text-slate-200 hover:text-white"
                    : "hover:bg-slate-100 text-slate-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  {cmd.icon}
                  <span>{cmd.label}</span>
                </div>
                <span className="text-[10px] font-mono uppercase text-slate-500 bg-slate-800/40 px-2 py-0.5 rounded-md">
                  {cmd.category}
                </span>
              </button>
            ))
          ) : (
            <div className="p-6 text-center text-xs text-slate-500 font-mono">
              No matching commands found for &quot;{query}&quot;
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
