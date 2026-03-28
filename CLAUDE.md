# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run develop    # Local dev server (gatsby develop)
npm run build      # Production build
npm run serve      # Serve production build locally
npm run clean      # Clear Gatsby cache and public directory
npm run lint       # ESLint on src/**/*.{js,jsx}
npm run format     # Prettier on src/**/*.{js,jsx,css,html}
```

No test runner script exists, but unit tests are in `src/util/*.test.js` (Jest-compatible).

## Environment

- Requires Node 24+ (see `.nvmrc`)
- `GATSBY_ROOT_URL` env var sets the site URL (defaults to `http://localhost:8000`)

## Architecture

### Content System

All content lives in `src/content/` as MDX files with frontmatter:
- `src/content/blog/[post-name]/index.mdx` — blog posts
- `src/content/project/[project-name]/index.mdx` — project posts
- `src/content/global/` — global/shared data

MDX frontmatter fields: `slug`, `title`, `coverImage`, `summary`, `keywords`, `publishedAt`, `updatedAt`, `tags[]`, `isArticle`, `preventIndexing`, `embeddedAssets[]`.

Images for each post live alongside the MDX file in `images/`.

### Page Generation

`gatsby-node.js` dynamically generates:
- `/blog/{slug}` — individual posts (template: `src/templates/blog.js`)
- `/blog/page/{n}` — paginated listing, 4 per page (template: `src/templates/blog-list.js`)
- `/project/{slug}` and `/project/page/{n}` — same pattern for projects
- `/tag/{tagName}` — tag-filtered listing (template: `src/templates/tag-list.js`)

File-based pages in `src/pages/` cover: home, about, contact, cv, 404, and `showcase/*` (interactive demos).

### Styling

Tailwind CSS with PostCSS. Global styles in `src/css/`:
- `index.css` — Tailwind directives + component classes
- `markdown.css` — styles for MDX-rendered content
- `header-footer.css`, `contact-page.css`, `canvas.css` — page-specific styles

Light/dark theming uses CSS custom properties toggled via a `data-theme` attribute on `<html>`.

### Key Plugins

- **gatsby-plugin-mdx** — MDX rendering with remark-gfm, remark-katex, gatsby-remark-images
- **gatsby-plugin-image** + **gatsby-transformer-sharp** — optimized images
- **gatsby-plugin-feed** — RSS feed for blog
- **gatsby-plugin-sitemap** — XML sitemap (excludes `/showcase/*`)
- **gatsby-plugin-offline** — PWA/offline support

### Showcase Section

`src/pages/showcase/` contains standalone interactive demos (algorithms, ballistic simulations, Smith Charts, astronomy). These use Plotly.js for visualization and mathjs/KaTeX for computation and rendering.

### Photography Gallery

`/photography` — albums list (static page: `src/pages/photography.js`)
`/photography/[album-slug]` — album grid (template: `src/templates/photography-album.js`)
`/photography/[album-slug]/[filename]` — photo detail + EXIF (template: `src/templates/photography-photo.js`)

Albums live at `src/content/photography/[album-slug]/index.mdx` with frontmatter: `slug`, `title`, `summary`, `publishedAt`, `location`, `coverImage`.

Photos are placed directly in the album folder. During build, `gatsby-node.js` `onCreateNode` reads EXIF from each JPEG/PNG using `exifr` and creates `PhotographyPhoto` GraphQL nodes (fields: `camera`, `lens`, `aperture`, `shutterSpeed`, `iso`, `focalLength`, `dateTaken`, `latitude`, `longitude`). The node's `parent` links to the `File` node so `gatsby-plugin-image` sharp transforms are accessible.

### Config Files

- `gatsby-config.mjs` — main Gatsby config (ESM format)
- `gatsby-node.js` — dynamic page creation and schema customization
- `tailwind.config.js` — Tailwind with custom theme variables
- `.eslintrc` — Airbnb preset with React plugins
- `.prettierrc` — trailing commas (es5), 2 spaces, semicolons, single quotes
