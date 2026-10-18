# Archive: Nigerian creative heritage

React + Vite + Tailwind build of the Figma file "Archive" (page "Archive copy edits").

- `npm install`, then `npm run dev` to work on it, `npm run build` for the static site in `dist/`.
- `dist/` is self-contained (relative paths, hash routing), so it can be dropped on any static host.
- Content lives in `src/data.js`; images in `public/images` were exported from the Figma file.

Pages: home (`#/`) and 10 detail pages, e.g. `#/fashion/aso-oke`, `#/design/festac-77-poster`, `#/photography/studio-portraits`.

## Features

- Search across every collection (header icon, `/` or Ctrl/Cmd + K), with category filters and keyboard navigation.
- Save pieces to "Your collection" (heart button); kept in the browser's local storage.
- Museum guide on every detail page: answers questions offline from the archive's own texts (`src/guide.js`).
- About, Mission, Contribute and Contact pages, with validated forms. There is no backend yet, so submissions are stored in local storage.
- Motion: hero parallax and staggered intro, masked text reveals, Ken Burns banners, scroll reveals, a looping photo strip, spinning records, 3D tilt cards, a cursor bubble, a lightbox, toasts, page transitions, a scroll progress bar and back-to-top. All of it respects `prefers-reduced-motion`.
