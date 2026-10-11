# Langora

Langora is an installable, offline-first language-learning app. It offers a student dashboard, structured beginner lessons, everyday dialogues, listening practice, guided conversation, a saved phrasebook with spaced review, and progress tracking.

**Learning languages:** Japanese, Korean, Mandarin Chinese, German and French. Each has its own real lesson and dialogue content.

**Interface languages:** English, Spanish and Catalan. You can change your learning language from the header or Settings and the interface language from Settings.

## Requirements

- Node.js 20 or newer
- pnpm 10.18.3 (via Corepack, if needed)

No third-party runtime or build dependencies are required.

## Run, test, and build

```sh
pnpm dev       # source dev server: http://localhost:4173
pnpm test      # Node test suite
pnpm build     # create dist/
pnpm preview   # serve production build: http://localhost:4173
```

The supplied `dist/` directory is a production-ready static build and can be served directly from any static HTTPS hosting platform. Run either development or preview server from the project root, but not both simultaneously, because both use port 4173.

## Features

- Responsive navigation, dashboard, light/dark/system appearance
- Five separate learning tracks with lessons, quizzes, dialogue and translation
- Listening with your device's speech-synthesis voices
- Guided offline conversation practice with selectable replies and typed answers
- Saved phrases with review scheduling and per-language progress
- Locally stored settings and progress, export/import JSON backups
- Installable progressive web app, cached for offline reuse after an online load

No account or online AI service is required. Spoken audio depends on the voices available in your browser and operating system. Conversation practice is guided, not a generative chat assistant.

## Data and privacy

Progress is saved locally in IndexedDB, with a localStorage fallback. The app does not transmit learning data. To move progress to another device, use Settings → Export backup and Settings → Import backup. Clear data through Settings. Browser/device storage cleanup can still remove locally stored progress, so backups are recommended.

## GitHub Pages deployment

Push this repository to a GitHub `main` branch, then enable GitHub Actions as the publishing source under **Settings → Pages**. The included `.github/workflows/deploy.yml` builds with pnpm and publishes `dist/`. The web manifest and cache use relative URLs, so the PWA works under a project subpath. Install the app from your browser after opening the HTTPS address.

## Project structure

- `index.html`: accessible entry shell
- `src/main.js`: interface, navigation, learning interactions and persistence
- `src/content.js`: five-language learning data
- `src/locale.js`: English, Spanish and Catalan interface content
- `src/style.css`, `src/refinements.css`: responsive UI styling
- `public/`: icons, install manifest and service worker
- `scripts/build.mjs`: creates standalone `dist/`
- `scripts/dev-server.mjs`: local development/static server
- `tests/`: Node test suite
