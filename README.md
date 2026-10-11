# Langora

A lightweight, offline-first language-learning PWA with a responsive student dashboard, light/dark themes, practical Japanese dialogues, starter lessons, local phrasebook, guided conversation, speech-synthesis fallback, and JSON backup. The project intentionally has **zero runtime or build dependencies** and uses **pnpm** for all package scripts.

## Requirements

- Node.js 20 or newer
- pnpm 10.18.3 (`corepack enable` then `corepack prepare pnpm@10.18.3 --activate`, if Corepack is available)

## Local development

```sh
pnpm dev
```

Open http://localhost:4173. Build the static site with `pnpm build`; output is in `dist/`. Preview the built site with `pnpm preview`.

## GitHub Pages

1. Create a public GitHub repository and push these files to its `main` branch.
2. Open **Settings → Pages** and choose **GitHub Actions** as the build and deployment source.
3. The included `.github/workflows/deploy.yml` builds with pnpm and deploys `dist`.
4. Wait for the workflow to finish and open the Pages URL. Use HTTPS, then in Android Chrome choose **Install app** or **Add to Home screen**.

The app uses relative asset paths, so it works from a repository subpath. The service worker caches the app shell for offline use after the first successful load. Future service-worker versions replace the old shell cache while user progress remains in browser storage.

## Data and privacy

Saved expressions, course choice, theme, and lesson completion are stored locally in `localStorage`; there is no account, analytics, backend, or cloud inference. Browser storage can be removed by the operating system or browser, so use the JSON backup feature regularly. Speech uses the browser's Speech Synthesis API when available. Offline speech depends on installed device voices.

## Current content and limitations

The interface includes five selectable language tracks, but the fully authored starter dialogues and lessons are Japanese-focused. Other language tracks currently provide a UI selection and localized greeting only; they are not yet complete curricula. The interface language selector saves a preference, but translations of the entire UI into Spanish and Catalan are not yet implemented. Conversation practice is deterministic guided practice, not generative AI. Audio is device-generated speech, not native-speaker recordings. The optional local generative model tier and remote downloadable language packs are not implemented in this starter build.

## Project structure

- `index.html`: application shell and navigation
- `src/app.js`: UI rendering, lesson flow, local state, conversation and export
- `src/styles.css`: responsive design and theme tokens
- `public/manifest.webmanifest`: installable PWA metadata
- `public/sw.js`: offline shell caching
- `public/icon.svg`: application icon
- `scripts/`: zero-dependency build and local static server

## Adding content

Add dialogue objects to `scenarios` and lesson objects to `lessons` in `src/app.js`. To make the other languages complete, move the content into language-specific data modules with parallel target-language text, reading aids, Spanish and English translations, and reviewed explanations. Rebuild with `pnpm build`.
