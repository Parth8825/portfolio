import React from "react";

const SectionEyebrow = ({ icon: Icon, number, children, className = "" }) => (
  <div className={`section-chapter-marker relative inline-flex ${className}`}>
    {number && (
      <span className="section-chapter-number" aria-hidden="true">
        {number}
      </span>
    )}
    <div className="section-eyebrow relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold tracking-wide uppercase shadow-sm">
      {number && (
        <span className="font-mono tracking-[0.16em]" aria-hidden="true">
          {number} /
        </span>
      )}
      {Icon && <Icon size={14} aria-hidden="true" />}
      <span>{children}</span>
    </div>
  </div>
);

export default SectionEyebrow;
