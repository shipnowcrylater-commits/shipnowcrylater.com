# Ship Now, Cry Later — Design System

The visual language for the podcast. Follow this exactly. It overrides any default
web-design instinct you have. When this document and your taste disagree, this
document wins.

**The vibe in one line:** loud, flat, confident. Big type, three colours, no fuss.
Editorial poster energy — not a SaaS landing page.

---

## 1. Colour

Three colours. That is the entire palette.

```css
--yellow: #FFDE00;
--blue:   #0D0DDE;
--white:  #FFFFFF;
```

**Rules**
- Never introduce a fourth colour. No greys, no tints, no shades, no `#f5f5f5`
  "subtle background". If something needs separation, use a 2px border or a
  section colour change.
- Never use opacity to fake a lighter colour (no `rgba(255,255,255,0.6)` muted
  text). Text is full-strength white or full-strength blue. Always.
- Blue background → white text, yellow accents.
- Yellow background → blue text, blue accents. **No white text on yellow, ever.**
- Black is only allowed inside the button hover shadow. Nowhere else.

---

## 2. Type

Two families, each with one job.

| Family | Role | Usage |
|---|---|---|
| **Lemon Milk** | Headings + body + buttons | The workhorse. Local `.otf`, weights 400 / 700, with italics. |
| **Brother Home** | Accent only | Handwritten. Labels, eyebrows, host tags. **Never** body copy, never headings, never buttons. |

**Headings** (`h1, h2, h3`) are always:
```css
font-weight: 700;
text-transform: uppercase;
line-height: 0.93;      /* deliberately tight — letters nearly touch */
letter-spacing: -0.02em;
```
That crushed line-height is the signature. Do not "fix" it to 1.2.

**Body copy**: 400 weight, `line-height: 1.5`, `max-width: 660px`. Never full-bleed
text. Never centred (except in the hero and footer).

### The type scale — 1.5× ratio

**Every heading size comes from a step on this scale. Never invent a new
`font-size`** — pick a step, or add one to the scale.

```
2.2  →  3.3  →  5  →  7.4  →  11     (rem, desktop max)
   ×1.5   ×1.5   ×1.5   ×1.5
```

Sizes are set **once, globally, on the tag** — `h1`, `h2`, `h3`, `p`. There are
**no per-section overrides**. A heading is the size it is because of its level,
not because of which section it sits in.

| Token | Value | Used by |
|---|---|---|
| `--fs-h1` | `clamp(3.8rem, 13vw, 11rem)` | hero only — intentionally enormous |
| `--fs-h2` | `clamp(2.5rem, 6vw, 5rem)` | every section heading |
| `--fs-h3` | `clamp(1.7rem, 3.5vw, 3.3rem)` | episode title, host names, up-next |
| `--fs-body` | `clamp(1rem, 1.4vw, 1.1rem)` | all body copy |
| `--fs-accent` | `clamp(1rem, 1.8vw, 1.3rem)` | Brother Home labels & eyebrows |

**Episode headings are one size, not two.** `ep 001: Roots before Branches` is a
single `h3` — the number is *not* a smaller kicker. Don't reintroduce one.

Everything is fluid via `clamp()`. **Never a fixed `px` font-size.**

**To make a heading smaller, drop it a level** (`h2` → `h3`) rather than
overriding its size. The episode title is an `h3` for exactly this reason —
it needed to be quieter than "Join the conversation", so it went down a level
rather than getting a special size.

### The `<em>` rule (important)
Inside a heading, `<em>` marks the one word that gets emphasis. It is **italic
always**, and:
- On **blue** sections → the `<em>` turns **yellow**.
- On **yellow** sections → the `<em>` stays **blue** (italic carries it; colour must not).

One `<em>` per heading. Two is too many.

---

## 3. Section rhythm

Sections alternate blue and yellow. This alternation *is* the layout — there are no
cards, dividers, or containers doing that work.

**Blue sections** (`.hero`, `.hosts`, `.community`, `.footer`) get the paper texture:
```css
background-color: var(--blue);
background-image:
  linear-gradient(rgba(13,13,222,0.12), rgba(13,13,222,0.12)),
  url('bg-ID.jpg');
background-size: cover;
background-position: center;
background-blend-mode: normal, luminosity;
```
Content inside a textured section needs `position: relative; z-index: 1;`.

**Yellow sections** (`.about`, `.episode`) are **flat**. No texture, ever. The
contrast between gritty blue and clean yellow is the point.

**Spacing**
```css
--max-w: 1100px;
--pad-x: clamp(24px, 6vw, 100px);
--pad-y: clamp(72px, 12vh, 140px);
```
Every section: `padding: var(--pad-y) var(--pad-x)`, inner `.container` with
`max-width: var(--max-w); margin: 0 auto`. No exceptions.

---

## 4. Components

**Buttons** — square-ish, bordered, shouty.
- `border-radius: 4px`. **Never a pill. Never fully square.**
- `border: 2px` always (even the filled yellow one borders itself).
- Text: 700, uppercase, `0.75rem`, `letter-spacing: 0.12em`.
- Two variants only: `.btn-yellow` (filled) and `.btn-ghost` (transparent, white border).
- Hover: `translateY(-3px)` + soft black shadow. Nothing else.

**Platform buttons** (Spotify / Apple / YouTube) — outlined blue on yellow, inline
SVG icon at 18px using `fill: currentColor`. Hover inverts to blue fill / yellow text.

**Social links** — full-width stacked rows, 2px white rules above and below each.
Big uppercase label left, `→` right. Hover: text goes yellow, arrow slides
`translateX(10px)`. This is a list, not a grid of icons.

**Host cards** — two-column grid, portrait one side, bio the other, alternating sides
via `.host-card--flipped`. Collapses to single column under 860px (photo always on
top, max 280px, centred).

---

## 5. Motion

Restrained. Fast. Nothing "delights".

- Duration: `0.15s`–`0.2s`. Easing: `ease`.
- Only these properties animate: `transform`, `color`, `background`, `border-color`,
  `box-shadow`.
- **Banned**: scroll-reveal, fade-in-on-scroll, parallax, typewriter effects,
  bouncing, looping animation, anything over 0.25s.
- `html { scroll-behavior: smooth; }` and that is the extent of scroll magic.

---

## 6. Voice

- **Eyebrows/labels** (Brother Home): lowercase, tiny, casual — "a brand new podcast",
  "your hosts", "find us everywhere".
- **Headings**: uppercase, short, a little cheeky — "Meet the *troublemakers*",
  "Design, leadership & the stuff *nobody tells you*."
- **Body**: plain, warm, first-person plural ("we talk about..."). Real sentences.
  No marketing hype, no "unlock", "elevate", "journey", "empower". No exclamation marks.
- The show's own tagline — *roots before branches* — is the tonal north star: earnest
  under the humour.

---

## 7. Hard bans

Do not, under any circumstances, add:
- Gradients (the one blue-on-blue overlay above is the sole exception)
- Drop shadows on anything except button hover
- Rounded/pill buttons, or border-radius above 12px anywhere
- A fourth colour, a grey, or muted/low-opacity text
- Icon fonts or external icon libraries — inline SVG only
- Any JS framework, build step, or npm dependency
- Web fonts from a CDN — fonts are local `.otf` files in the project root
- Glassmorphism, neumorphism, blurs, or backdrop-filter
- Scroll animations or hover effects beyond those listed in §5

---

## 8. Technical constraints

- **Stack**: plain HTML + CSS. Zero dependencies. Must run by opening `index.html`.
- **Deploy target**: GitHub Pages — all asset paths stay relative, files stay flat in
  the project root (no `assets/` subdirectory; the fonts and images live alongside
  `index.html`).
- **Accessibility**: decorative images get `alt="" aria-hidden="true"`; real ones get
  a real `alt`. Every external link carries `target="_blank" rel="noopener noreferrer"`.
- **Responsive breakpoints**: only two — `860px` (host cards collapse) and `540px`
  (buttons stack full-width, social links shrink).

---

## 9. Known issues — fix these when touching the relevant code

**Verified in the local V2 folder on 2026-07-14. The live site may already be ahead of
this — check before "fixing" anything here.**

- **`Ana.svg` (1.8 MB) and `Egle.svg` (4.5 MB) are not really vectors.** Each is a
  base64-encoded PNG photo wrapped in an SVG shell (2 embedded rasters, 1 path).
  Base64 adds ~33% overhead on top of the image. Re-export as WebP/PNG at ~880px wide
  and they should land at 150–250 KB each — roughly a 95% cut in page weight. This is
  the highest-value fix on the site.
- `logo_mascot_withtears.svg` (396 KB) *is* genuine vector (48 paths). Fine as-is;
  could be run through SVGO but it is not a problem.
- `bg-ID.jpg` is 304 KB — **fine, leave it alone.** (An earlier note claimed 24 MB.
  That was wrong.)
- Ana's bio `<p>` in `index.html` is never closed (`</p>` missing).
- `.btn-ghost` declares `border: 2px solid rgba(255, 255, 255)` — a 3-arg `rgba()`.
  Should be `var(--white)`.
- Apple Podcasts, YouTube, and TikTok links are `href="#"` placeholders locally.
