# CLAUDE.md — shibayukki.com

## Commands
- `npm run dev` — Dev server at localhost:4321
- `npm run build` — Production build (ALWAYS run before committing)
- `npm run preview` — Preview production build

## Architecture
Bilingual Astro 5 site (English + Russian) for a Shiba Inu puppy blog.
Deployed on Cloudflare Pages. Domain: shibayukki.com

### Routing & i18n
- English: `/src/pages/*.astro` → root (`/`)
- Russian: `/src/pages/ru/*.astro` → `/ru/`
- Every Russian page MUST pass `lang="ru"` to Layout. Forgetting this breaks language switching and hreflang.
- hreflang tags auto-generated in `Layout.astro`
- Navigation translations in `Layout.astro` (nav object)
- When creating a new page: ALWAYS create both EN and RU versions. Never create one without the other.

### Layout System
`Layout.astro` handles: language switching, SEO meta, Open Graph, Twitter cards, hreflang, navbar, footer.

Props: `title`, `description`, `image`, `type`, `publishedDate`, `lang`, `alternateUrls`

### Styling
CSS variables in `/src/styles/global.css`:
- Colors: `--color-primary` (orange), `--color-secondary` (cream)
- Spacing: `--space-xs` through `--space-4xl`
- ALWAYS use existing variables. Never hardcode colors or spacing values.
- No external CSS frameworks — vanilla CSS only on this project.

### Comments
Giscus (GitHub Discussions) in `/src/config/giscus.ts`. Repo: `nesilozer/yukki`.

### Images
- All images in `/public/` as `.webp` format.
- Always compress/optimize before adding.
- Use descriptive filenames: `yukki-first-walk.webp` not `IMG_1234.webp`.
- Always include `alt` text with descriptive content for SEO.

## Conventions
- Blog post paragraph spacing: `margin-bottom: 1.25em`
- Mobile-first responsive design
- Semantic HTML only (`section`, `article`, `nav`, `main`)

## SEO Checklist — Apply to Every New Page
1. Unique `title` and `description` meta tags
2. Open Graph and Twitter Card tags via Layout props
3. hreflang pointing to the alternate language version
4. Internal links to at least 2 related pages
5. One H1 per page containing the primary keyword
6. Images with descriptive `alt` text
7. Structured data where applicable (blog posts, FAQ)

## Common Mistakes — Don't Repeat These
- Forgetting `lang="ru"` on Russian pages
- Creating an EN page without the RU version (or vice versa)
- Hardcoding colors instead of using CSS variables
- Adding images in formats other than `.webp`
- Skipping `npm run build` before committing — Astro catches errors at build time
- Installing unnecessary packages. This is a simple Astro site. Check if Astro has a built-in solution first.

## Verification After Changes
After making changes, always:
1. `npm run dev` — check the page renders correctly
2. Switch languages — verify both EN and RU work
3. Check mobile responsiveness (resize browser or use dev tools)
4. `npm run build` — must pass with zero errors
