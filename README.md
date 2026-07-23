# Parth Darji — Software Developer Portfolio

[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Vite 6](https://img.shields.io/badge/Vite-6.1-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![PWA Ready](https://img.shields.io/badge/PWA-Standalone_App-000000?style=flat-square&logo=pwa)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
[![Build Status](https://img.shields.io/badge/Netlify-Deploys_OK-00C7B7?style=flat-square&logo=netlify)](https://parthsportfolio.netlify.app/)
[![Tests Passed](https://img.shields.io/badge/Vitest-4%2F4_Passed-6E9F18?style=flat-square&logo=vitest)](https://vitest.dev/)

Live Application: **[https://parthsportfolio.netlify.app/](https://parthsportfolio.netlify.app/)**

A modern, high-performance web portfolio for **Parth Darji**, Software Developer specializing in ASP.NET Core, C#, Azure, SQL Server, and modern React web applications. 

---

## ✨ Features

- ⚡ **Vite 6 + React 19 Core**: Fast HMR and sub-second production builds replacing legacy Create React App.
- 🎨 **Tailwind CSS v4 Styling**: Custom design system featuring dark slate glassmorphic panels, neon gradients, and fluid typography.
- 📱 **Progressive Web App (PWA)**: Standalone installability on mobile and desktop Chrome with offline asset caching.
- 🛡️ **Multi-Layer Image Protection**: Client-side invisible DOM protection shields blocking right-click/dragging, combined with watermarked Git repository image assets.
- ✉️ **Secure Contact System**: Real-time field validation, XSS HTML sanitization, EmailJS integration, and prefilled 1-click `mailto:` fallback.
- 🌓 **Auto System Theme Detection**: Real-time OS color preference listener (`prefers-color-scheme`) with `localStorage` persistence.
- 🧪 **Vitest & ESLint Suite**: Unit test suite covering UI components and form validation, plus ESLint flat configuration.
- 🚀 **Netlify Deployment Ready**: Preconfigured `netlify.toml` with SPA route redirects (`/*` -> `/index.html`) and security response headers.

---

## 🛠️ Technology Stack

| Category | Technology |
| :--- | :--- |
| **Frontend Framework** | React 19 |
| **Build & Tooling** | Vite 6 |
| **Styling & Design System** | Tailwind CSS v4, Glassmorphism CSS |
| **Icons & UI** | Lucide React |
| **Animations** | Framer Motion & CSS Keyframes |
| **Email Delivery** | EmailJS Browser SDK |
| **Testing Environment** | Vitest, `@testing-library/react`, JSDOM |
| **Code Verification** | ESLint (Flat Config) |
| **PWA & Caching** | Web App Manifest & Service Worker (`sw.js`) |
| **Deployment** | Netlify |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Parth8825/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory (copy from `.env.example`):
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

---

## 📜 Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| **`npm run dev`** | `vite` | Starts local development server with instant HMR. |
| **`npm run build`** | `vite build` | Compiles optimized production bundle to `dist/`. |
| **`npm run preview`** | `vite preview` | Previews production build locally. |
| **`npm test`** | `vitest run` | Executes all Vitest unit tests. |
| **`npm run lint`** | `eslint .` | Runs ESLint syntax and code quality checks. |
| **`npm run check`** | `eslint . && vitest run` | Runs full linting and unit tests together. |

---

## ⚙️ Environment Variables (EmailJS Setup)

To enable automatic email delivery via the contact form:

1. Sign up for free at **[EmailJS](https://www.emailjs.com/)**.
2. Add your Email Service (Gmail / Outlook) and copy your **Service ID**.
3. Create an Email Template with placeholders `{{name}}`, `{{title}}`, `{{email}}`, `{{message}}`, `{{time}}` and copy your **Template ID**.
4. Copy your **Public Key** from Account settings.
5. In **Netlify Dashboard**:
   - Go to **Site configuration** ➔ **Environment variables**.
   - Add `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY`.
   - Trigger **Deploy project without cache**.

---

## 🔒 Security & Image Protection

- **DOM Shield**: An invisible overlay prevents right-clicking and dragging portfolio photos.
- **XSS Protection**: Contact form input strings are HTML-sanitized before transmission.
- **Security Headers**: `netlify.toml` enforces `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy`.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
