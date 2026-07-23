# Personal Portfolio Website

[![Visit My Website](https://img.shields.io/badge/Visit My Website-kaloyan--kostadinov.vercel.app-B1001B?style=flat-square)](https://kaloyan-kostadinov.vercel.app/)

> **Website** showcasing my **projects**, **achievements**, and **skills** in both **English** and **Bulgarian**. It features a **home section**, **about/skills overview**, **achievements gallery**, **projects showcase** with detailed modals, and a **contact form** – all wrapped in a themeable UI with light and dark mode, animations and effects

---

## Table of Contents

- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Gitignored Configuration Files](#gitignored-configuration-files)
- [Local Development](#local-development)
- [Production Deployment](#production-deployment)

---

## Architecture

```
PortfolioWebsite/
├── app/
│   ├── page.tsx                  # Single-page composition of all sections
│   ├── layout.tsx                # Root layout, fonts, theme, language, analytics
│   └── globals.css               # Global styles and Tailwind CSS layer
├── components/
│   ├── sections/                 # Page sections
│   │   ├── home-section/         # Home, social links, photo panel
│   │   ├── about-section/        # About text, skills grid, CV download menu
│   │   ├── achievements-section/ # Achievements grid + detail modal
│   │   ├── projects-section/     # Projects showcase + detail modal
│   │   └── contact-section/      # Contact form (EmailJS)
│   ├── ui/                       # Shared shadcn/ui-based primitives
│   ├── navigation.tsx            # Sticky nav + dots navigation
│   ├── footer.tsx                # Footer
│   ├── language-splash.tsx       # First-visit language selection splash
│   ├── language-toggle.tsx       # EN/BG language switcher
│   ├── theme-toggle.tsx          # Light/dark theme switcher
│   ├── theme-provider.tsx        # next-themes provider
│   ├── particles.tsx             # Background particle effect
│   ├── glow-blobs.tsx            # Decorative background blobs
│   └── cursor-glow.tsx           # Cursor-following glow effect
├── hooks/
│   ├── use-reveal.ts             # Scroll-triggered reveal animations
│   └── use-zoom-pan-drag.ts      # Zoom/pan/drag for lightbox media
├── lib/
│   ├── projects-data.ts          # Descriptions, tech stack, links, media
│   ├── project-images-data.ts    # Image paths and captions per project
│   ├── achievements-data.ts      # Achievements content
│   ├── skills-data.ts            # Skills by category
│   ├── i18n/                     # Language context + EN/BG translations
│   ├── text-format.tsx           # Rich text formatting
│   ├── scroll-to-section.ts      # Smooth-scroll navigation
│   └── utils.ts                  # Shared utilities (cn, etc.)
├── public/                       # Static assets (images, CV, favicon, project media)
└── .env                          # Environment variables
```

| Layer                  | Purpose                                           |
| ---------------------- | ------------------------------------------------- |
| `app/`                 | Entry point – global layout and main page         |
| `components/sections/` | Visual blocks of the page, one folder per section |
| `components/ui/`       | UI components, reused across sections             |
| `hooks/`               | Behavior shared across components                 |
| `lib/`                 | Data, translations, helpers                       |

---

## Tech Stack

**Framework & Language**  
Next.js, React 19, TypeScript

**Styling & UI**  
Tailwind CSS, shadcn/ui, Radix UI, Lucide React icons, `next-themes` (light/dark mode), `tw-animate-css`

**Services & Tooling**  
EmailJS, Vercel, ESLint

---

## Gitignored Configuration Files

This file is excluded from version control and must exist locally before running the project. The template below shows the expected structure – fill in real values yourself.

### `.env`

This file lives at the **repo root**.

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key

# Optional, only needed for testing on another device on your local network
NEXT_PUBLIC_DEV_IP=your_local_network_ip
```

> **Note on EmailJS variables:** These power the contact form and are required for it to send messages. Create a free account at [emailjs.com](https://www.emailjs.com/), set up an email service and template, and copy the three values above from your EmailJS dashboard.

> **Note on `NEXT_PUBLIC_DEV_IP`:** Only needed if you want to access the local dev server from another device (e.g. a phone) on the same network; it's added to Next.js' `allowedDevOrigins`. Leave it empty otherwise.

---

## Local Development

### 1. Install dependencies

```bash
cd ./PortfolioWebsite
npm i
```

### 2. Configure environment variables

- Create an EmailJS account and set up a service and template at [emailjs.com](https://www.emailjs.com/).
- Fill in the EmailJS credentials in `.env` as shown above.

### 3. Start the development server

```bash
npm run dev
```

### 4. Lint (optional)

```bash
npm run lint
```

---

## Production Deployment

The project is deployed on **Vercel** as a fully static export.

### 1. Enable static export (one-time)

Add `output: "export"` to `next.config.mjs`. This only needs to be done once:

```js
/** @type {import('next').NextConfig} */

const devIP = process.env.NEXT_PUBLIC_DEV_IP;

const nextConfig = {
  output: "export",
  allowedDevOrigins: devIP ? [devIP] : []
};

export default nextConfig;
```

### 2. Update `.env` for production

Make sure the EmailJS values in `.env` are your production credentials.

### 3. Deploy to Vercel

1. Push the repo to GitHub
2. Import the repo as a new project on [vercel.com](https://vercel.com)
3. Vercel automatically detects Next.js and, since `output: "export"` is set
4. New pushes to `main` automatically trigger a new build and deployment

### 4. Build manually (only needed for non-Vercel hosting)

If deploying to a host that doesn't build the project for you – like cPanel, GitHub Pages, or a drag-and-drop static host – build it yourself first:

```bash
npm run build
```

This produces an `out/` directory at the **repo root** (outside `.next/`), containing the static project build. Upload the **contents** of `out/` to the host.

### 5. Preview the static build locally (optional)

```bash
npm run serve
```

Serves the contents of `out/` locally via `serve`, useful for testing the static export before uploading.
