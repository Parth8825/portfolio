export const SITE_SECTIONS = Object.freeze([
  { id: "home", label: "Home", number: "00" },
  { id: "experience", label: "Experience", number: "01" },
  { id: "skills", label: "Skills", number: "02" },
  { id: "code-showcase", label: "Code", number: "03" },
  { id: "projects", label: "Projects", number: "04" },
  { id: "contact", label: "Contact", number: "05" },
]);

export const SITE_SECTION_IDS = SITE_SECTIONS.map(({ id }) => id);
