# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` - Start development server at localhost:4321
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Architecture

**Bilingual Astro site** (English + Russian) for a Shiba Inu puppy blog.

### Routing & i18n

- English pages: `/src/pages/*.astro` → served at root (`/`)
- Russian pages: `/src/pages/ru/*.astro` → served at `/ru/`
- Each page must pass `lang="ru"` prop to Layout for Russian versions
- hreflang tags are auto-generated in Layout.astro
- Navigation translations live in `Layout.astro` (nav object)

### Layout System

`Layout.astro` handles:
- Language switching (always-visible switcher on mobile)
- SEO meta tags, Open Graph, Twitter cards
- hreflang alternate links
- Navbar and footer with translated content

Props: `title`, `description`, `image`, `type`, `publishedDate`, `lang`, `alternateUrls`

### Styling

CSS variables defined in `/src/styles/global.css`:
- Colors: `--color-primary` (orange), `--color-secondary` (cream)
- Spacing: `--space-xs` through `--space-4xl`
- Use existing variables; avoid hardcoded values

### Comments

Giscus (GitHub Discussions) configured in `/src/config/giscus.ts`. Uses repo `nesilozer/yukki`.

## Conventions

- Blog post paragraph spacing: `margin-bottom: 1.25em` (industry standard)
- Images in `/public/` as `.webp` format
- Mobile-first responsive design
