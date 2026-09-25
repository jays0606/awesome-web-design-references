# Capture tool

Produces a dated evidence bundle for each published reference, or for the ids
you pass. Public pages only: no clicks, form input, cookie acceptance or login.

Requirements: Node 20+, ffmpeg, and Google Chrome (falls back to Playwright's
Chromium, which cannot play some proprietary video codecs).

```sh
cd tools/capture
npm install
npx playwright install chromium   # only if Chrome is not installed
node capture.mjs                  # all published references
node capture.mjs anthropic fora-travel
python3 ../build.py               # link bundles into REFERENCES.json and the skill catalog
```

Each `evidence/<date>/<id>/` bundle contains:

| File | What it shows |
|---|---|
| `desktop-intro.jpg` | 1440×900 at 0, 0.7, 1.8 and 3.5 s after load |
| `desktop-scroll.jpg` | Viewport frames taken while wheel-scrolling top to bottom |
| `desktop-scroll.mp4` | Recording of the load and scroll pass |
| `desktop-full.jpg` | Full page after the scroll pass (cropped past 14,000 px) |
| `desktop-reduced-motion.jpg` | Hero with `prefers-reduced-motion: reduce` |
| `mobile-hero.jpg`, `mobile-full.jpg` | iPhone 15 emulation |
| `capture.json` | Heading and landmark outline, public script globals, animation counts |
| `analysis.json` | Human or agent review of the images above |

`analysis.json` is written after viewing the images; the capture script does
not generate it. Sticky and scroll-linked sections render one state in full
page captures; use the scroll strip and recording for those.
