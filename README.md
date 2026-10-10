# Parth Darji — Software Developer Portfolio

[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Vite 6](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite)](https://vite.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-48_tests_passing-6E9F18?style=flat-square&logo=vitest)](https://vitest.dev/)

Production site: **[parthsportfolio.netlify.app](https://parthsportfolio.netlify.app/)**

A responsive developer portfolio for **Parth Darji**, a Software Developer and Full-Stack Engineer specializing in C#, ASP.NET Core, Microsoft Azure, SQL Server, and React.

## Highlights

- A chapter-based visual system with section markers, accent colors, a scroll progress bar, and a desktop section navigator.
- A performance-aware hero with a technical avatar frame, typewriter roles, grouped calls to action, and connected statistics.
- A desktop period rail and dedicated mobile flow for work experience and education.
- A responsive skills bento with visible proficiency labels and compact level indicators.
- An interactive C#, ASP.NET Core, SQL, and React code showcase.
- Numbered production project cards with individual accents, lightweight pointer depth, architecture summaries, and a lazy-loaded detail modal.
- A global `Cmd/Ctrl + K` command palette with search and keyboard navigation.
- A persistent dark/warm-light theme with system preference detection and an optional View Transition reveal.
- An EmailJS contact form with validation, input escaping, honeypot handling, a submission cooldown, and a mail-client fallback.
- SEO metadata, OpenGraph and Twitter cards, JSON-LD, a web app manifest, and a network-first service worker.

## Application architecture

```text
App
├── Navbar + shared active-section state
├── ScrollNavigator
├── Intro
├── Experience
├── Skills
├── LazySection → CodeShowcase
├── ProductList → lazy ProjectModal
├── LazySection → Contact
├── Footer
└── lazy CommandPalette
```

The app uses focused state rather than a general state library:

- `ThemeContext` owns theme detection, persistence, and document theme synchronization.
- `useActiveSection` calculates section offsets and shares the active chapter with the Navbar and scroll navigator.
- `LazySection` loads expensive lower-page sections when they approach the viewport or when navigation targets them.
- Modal, palette, contact, code-example, form, and animation state remains local to the component that owns it.
- `ErrorBoundary` provides a recoverable application fallback.

The design tokens and reusable surface, focus, motion, chapter, project, timeline, skills, and footer treatments live in `src/index.css`. Tailwind CSS classes handle component layout and responsive variations.

## Accessibility and interaction

- Semantic headings, lists, links, buttons, labels, and project achievement groups.
- Visible `:focus-visible` treatment using shared theme tokens.
- Enter and Space activation for project cards.
- Focus trapping, Escape handling, background scroll locking, and trigger-focus restoration in the project modal and command palette.
- `aria-current` state in primary and chapter navigation.
- Text alternatives for images and accessible names for icon-only controls.
- `prefers-reduced-motion` support across Framer Motion, scrolling, counters, pointer effects, theme changes, and decorative CSS animation.
- Touch-friendly controls, safe-area modal spacing, and layouts verified down to 320 px.

## Performance design

The following decisions are intentional and should be preserved:

- Google Fonts load through a non-blocking preload/`media="print"` pattern.
- The hero avatar uses `fetchPriority="high"` and `decoding="async"`.
- The hero description is a normal, immediately visible `<p>`. It has no opacity-zero state or delayed entrance because it is the page's LCP element.
- `CodeShowcase` and `Contact` are section-lazy; `ProjectModal` and `CommandPalette` are interaction-lazy.
- EmailJS performs no work until the Contact chunk loads and a valid form is submitted.
- Scroll tracking uses passive listeners and `requestAnimationFrame` scheduling.
- Project pointer depth uses CSS variables instead of per-card animation springs or blur filters.

Latest production build output:

| Asset | Raw | Gzip |
| :--- | ---: | ---: |
| Main JavaScript | 410.15 kB | 127.99 kB |
| Main CSS | 78.39 kB | 13.97 kB |
| Code Showcase chunk | 21.43 kB | 7.16 kB |
| Contact chunk | 18.05 kB | 5.84 kB |
| Command Palette chunk | 9.25 kB | 3.37 kB |
| Project Modal chunk | 6.44 kB | 2.42 kB |

Local Chrome production-preview measurements are three-sample medians. They are useful for regression comparison and are not a substitute for field data.

| Profile | FCP | LCP | CLS | Long tasks |
| :--- | ---: | ---: | ---: | :--- |
| 1536×900 desktop | 56 ms | 56 ms | 0.0039 | 0 |
| 390×844, 4× CPU throttle | 116 ms | 116 ms | 0.00022 | 1 × 56 ms |

The audit also confirmed that Code Showcase, Contact, Project Modal, and Command Palette chunks are absent from initial-load requests.

## Technology stack

| Category | Technology |
| :--- | :--- |
| UI | React 19 |
| Build | Vite 6 |
| Styling | Tailwind CSS v4 and custom CSS tokens |
| Motion | Framer Motion 12 and CSS transitions |
| Icons | Lucide React and custom SVG icons |
| Email | EmailJS Browser SDK |
| Tests | Vitest, React Testing Library, JSDOM |
| Code quality | ESLint flat configuration |
| Deployment | Netlify and Vercel configuration |
| PWA support | Web App Manifest and service worker |

## Getting started

### Prerequisites

- Node.js 20 or newer
- npm

### Install and run

```bash
git clone https://github.com/Parth8825/portfolio.git
cd portfolio
npm install
cp .env.example .env
npm run dev
```

The development server is available at `http://localhost:5173` by default.

### EmailJS configuration

Set the following client-side variables in `.env` and in the selected deployment provider:

```env
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

The EmailJS template should accept `name`, `title`, `email`, `message`, and `time`. Vite exposes variables prefixed with `VITE_` to the browser, so these values must be EmailJS client configuration rather than private server credentials.

## Scripts

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Create the optimized production build in `dist/`. |
| `npm run preview` | Serve the production build locally. |
| `npm test` | Run the complete Vitest suite once. |
| `npm run lint` | Run ESLint. |
| `npm run check` | Run ESLint followed by the complete test suite. |

## Testing and CI

The current suite contains **48 tests across 19 files**. It covers:

- component rendering and responsive content structure;
- theme persistence and reduced-motion fallbacks;
- active-section and lazy-navigation behavior;
- command palette keyboard controls and focus handling;
- project keyboard activation and modal focus management;
- contact validation and honeypot behavior;
- the protected hero LCP and avatar loading attributes.

GitHub Actions runs `npm run lint`, `npm test`, and `npm run build` on pushes and pull requests targeting `main`, `master`, or `development`.

## Deployment and response headers

`netlify.toml` and `vercel.json` provide SPA rewrites, immutable caching for fingerprinted assets, no-cache rules for HTML and the service worker, and the following response headers:

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- a restrictive camera, microphone, and geolocation `Permissions-Policy`

## License

This project is available under the [MIT License](LICENSE).
