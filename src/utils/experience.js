/**
 * Dynamically calculates total years of software development experience
 * starting from January 2024 (CAA National tenure start).
 * Automatically updates year over year without manual code edits.
 */
export function getYearsOfExperience() {
  const startYear = 2024;
  const currentYear = new Date().getFullYear();
  const diff = currentYear - startYear;
  const years = diff < 2 ? 2 : diff;
  return `${years}+ Years`;
}
