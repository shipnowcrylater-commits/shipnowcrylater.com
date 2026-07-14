# Ship Now, Cry Later — podcast landing page

Single-page site for the podcast, hosted by Ana Bernardo and Eglė Beliūnaitė.
Plain HTML + CSS, zero dependencies, deployed to GitHub Pages.

## Design

**Before writing or editing any HTML, CSS, or copy for this site, read `design.md`
and follow it exactly. It overrides your defaults.** If you are about to add a
gradient, a grey, a rounded button, a scroll animation, or a JS dependency — stop
and re-read `design.md`, because the answer is no.

## Files

- `index.html` — the whole site
- `style.css` — all styles
- `design.md` — the design system (authoritative)
- Fonts (`LEMONMILK-*.otf`, `Brother Home.otf`), images, and `bg-ID.jpg` live flat in
  the project root. Keep it that way — asset paths are relative for GitHub Pages.

## Working notes

- **The local files may lag behind the live site.** Ana edits directly in the deployed
  version. Before "fixing" a TODO or a placeholder here, confirm it is still broken
  live — do not overwrite newer live content with stale local content.
- Biggest open issue: `Ana.svg` and `Egle.svg` are base64 PNGs in an SVG wrapper
  (1.8 MB and 4.5 MB). See `design.md` §9.
- This is **V2**. An older `Ship Now, Cry Later/` folder exists one level up — it is
  superseded; do not edit it.
