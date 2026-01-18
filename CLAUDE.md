# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based static site generator project using TypeScript. The project follows standard Astro conventions with a minimal setup.

## Commands

All commands use pnpm package manager:

- `pnpm install` - Install dependencies
- `pnpm dev` - Start development server at localhost:4321
- `pnpm build` - Build production site to ./dist/
- `pnpm preview` - Preview production build locally
- `pnpm astro ...` - Run Astro CLI commands

## Architecture

### Framework
- **Astro 5.16.9**: Static site generator with TypeScript support
- **TypeScript**: Strict configuration extending `astro/tsconfigs/strict`
- **ESM**: Project uses ES modules (`"type": "module"`)

### Project Structure
```
src/
├── assets/         # Static assets (SVGs, images)
├── components/     # Reusable Astro components
├── layouts/        # Page layout templates
└── pages/          # File-based routing pages
```

### Key Files
- `src/layouts/Layout.astro`: Base HTML layout with global styles
- `src/pages/index.astro`: Homepage using frontmatter imports
- `src/components/Welcome.astro`: Welcome component with embedded styles
- `astro.config.mjs`: Minimal Astro configuration
- `tsconfig.json`: TypeScript configuration extending Astro's strict preset

### Styling Approach
- Component-scoped styles using Astro's `<style>` blocks
- Global styles defined in Layout.astro
- CSS custom properties and modern layout techniques (flexbox, grid)
- Responsive design with media queries

### Asset Handling
- Assets imported as ES modules in frontmatter
- SVG assets served with proper attributes (fetchpriority, alt text)
- Static assets in public/ directory served at root