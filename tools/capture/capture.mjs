// Deep evidence capture for published references.
// Usage: node capture.mjs [id ...]   (no ids = every published reference)
// Writes evidence/<date>/<id>/ at the repository root. Public pages only:
// no clicks, form input, cookie acceptance or logins.
import { chromium, devices } from "playwright";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "../..");
const DATE = new Date().toISOString().slice(0, 10);
const OUT = path.join(ROOT, "evidence", DATE);
const DESKTOP = { width: 1440, height: 900 };
// Headless Chrome announces itself in its user agent; present a regular one.
const DESKTOP_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";
const MAX_FULL_PAGE = 14000;
const MAX_SCROLL_FRAMES = 24;
const MIN_SCROLL_FRAMES = 10;
const INTRO_MS = [0, 700, 1800, 3500, 8000];
// Width-based responsive layout with an iPhone user agent and touch, at 1x.
// Chrome repeats content in captures taller than 16,384 device pixels, and
// isMobile emulation also breaks full-page captures.
const MOBILE = { ...devices["iPhone 15"], isMobile: false, deviceScaleFactor: 1 };

// Dismiss a blocking notice without accepting anything: one Escape key press.
async function unblock(page, record) {
  const before = await page.evaluate(() => scrollY);
  await page.mouse.wheel(0, 400);
  await sleep(500);
  if ((await page.evaluate(() => scrollY)) === before) {
    await page.keyboard.press("Escape");
    record.notes.push("scroll looked blocked after load; pressed Escape once");
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(300);
}

const catalog = JSON.parse(fs.readFileSync(path.join(ROOT, "REFERENCES.json"), "utf8"));
const wanted = process.argv.slice(2);
const refs = catalog.references.filter(
  (r) => r.screenshot && (!wanted.length || wanted.includes(r.id)),
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function load(page, url) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForLoadState("networkidle", { timeout: 12000 }).catch(() => {});
}

// Headings and landmarks in document order, with their vertical position.
const outlineScript = () => {
  const els = [...document.querySelectorAll("header,nav,main > section,section,h1,h2,h3,footer")];
  const seen = new Set();
  return els
    .map((e) => {
      const r = e.getBoundingClientRect();
      const text = (e.innerText || "").replace(/\s+/g, " ").trim().slice(0, 90);
      return { tag: e.tagName.toLowerCase(), y: Math.round(r.top + scrollY), h: Math.round(r.height), text };
    })
    .filter((o) => o.h > 0 && (/^h\d$/.test(o.tag) ? o.text : true))
    .filter((o) => {
      const k = `${o.tag}|${o.y}|${o.text}`;
      return seen.has(k) ? false : seen.add(k);
    })
    .map((o) => (/^h\d$/.test(o.tag) ? o : { ...o, text: o.text.slice(0, 50) }));
};

// Public technical evidence only; absence proves nothing.
const techScript = () => ({
  page_height: document.documentElement.scrollHeight,
  running_animations: document.getAnimations().length,
  globals: ["gsap", "ScrollTrigger", "Lenis", "lenis", "__framer_importFromPackage", "THREE", "rive", "Webflow", "__NEXT_DATA__"]
    .filter((k) => k in window),
  videos: document.querySelectorAll("video").length,
  canvases: document.querySelectorAll("canvas").length,
  sticky_or_fixed: [...document.querySelectorAll("body *")]
    .filter((e) => ["sticky", "fixed"].includes(getComputedStyle(e).position)).length,
});

// Wheel steps, not jumps, so scroll-driven content fires. Pages that hijack
// scrolling report a short document, so take at least MIN_SCROLL_FRAMES.
async function slowScroll(page, frameDir, prefix = "scroll") {
  const vh = page.viewportSize().height;
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = Math.max(vh * 0.8, height / MAX_SCROLL_FRAMES);
  const count = Math.min(MAX_SCROLL_FRAMES, Math.max(MIN_SCROLL_FRAMES, Math.ceil(height / step)));
  const frames = [];
  for (let i = 0; i < count; i++) {
    await page.mouse.wheel(0, i === 0 ? 0 : step);
    await sleep(900);
    const f = path.join(frameDir, `${prefix}-${String(i).padStart(2, "0")}.jpg`);
    await page.screenshot({ path: f, type: "jpeg", quality: 60 });
    frames.push(f);
  }
  return frames;
}

function tile(frames, out, cols, width = 720) {
  if (!frames.length) return;
  const pattern = path.join(path.dirname(frames[0]), path.basename(frames[0]).replace(/\d+\.jpg$/, "%02d.jpg"));
  const rows = Math.ceil(frames.length / cols);
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", pattern,
    "-vf", `scale=${width}:-1,tile=${cols}x${rows}:padding=8:color=white`, "-frames:v", "1", "-q:v", "4", out]);
  frames.forEach((f) => fs.rmSync(f));
}

async function fullPage(page, file) {
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  const w = page.viewportSize().width;
  await page.screenshot({ path: file, type: "jpeg", quality: 55, fullPage: true,
    clip: { x: 0, y: 0, width: w, height: Math.min(h, MAX_FULL_PAGE) } });
  return h > MAX_FULL_PAGE;
}

async function captureOne(browser, ref) {
  const dir = path.join(OUT, ref.id);
  const tmp = path.join(dir, ".frames");
  fs.mkdirSync(tmp, { recursive: true });
  const record = { id: ref.id, url: ref.url, captured_at: DATE, notes: [] };

  // Desktop: intro timeline, recorded slow scroll, full page.
  const ctx = await browser.newContext({ viewport: DESKTOP, userAgent: DESKTOP_UA, recordVideo: { dir: tmp, size: { width: 960, height: 600 } } });
  const page = await ctx.newPage();
  await load(page, ref.url);
  const intro = [];
  for (const [i, t] of INTRO_MS.entries()) {
    await sleep(i === 0 ? 0 : t - INTRO_MS[i - 1]);
    const f = path.join(tmp, `intro-${String(i).padStart(2, "0")}.jpg`);
    await page.screenshot({ path: f, type: "jpeg", quality: 60 });
    intro.push(f);
  }
  tile(intro, path.join(dir, "desktop-intro.jpg"), 3);
  record.tech = await page.evaluate(techScript);
  await unblock(page, record);
  const frames = await slowScroll(page, tmp);
  record.scroll_frames = frames.length;
  tile(frames, path.join(dir, "desktop-scroll.jpg"), 4);
  // Full page after the scroll pass, so reveal-once content is shown. Sticky
  // and scroll-linked sections still render one state; the scroll strip and
  // video are the evidence for those.
  record.desktop_outline = await page.evaluate(outlineScript);
  if (await fullPage(page, path.join(dir, "desktop-full.jpg"))) record.notes.push(`desktop full page cropped at ${MAX_FULL_PAGE}px`);
  const video = page.video();
  await ctx.close();
  const webm = await video.path();
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", webm, "-vf", "scale=960:-2", "-c:v", "libx264",
    "-crf", "32", "-preset", "veryslow", "-pix_fmt", "yuv420p", "-an", path.join(dir, "desktop-scroll.mp4")]);

  // Reduced motion: same hero, compare running animations.
  const rctx = await browser.newContext({ viewport: DESKTOP, userAgent: DESKTOP_UA, reducedMotion: "reduce" });
  const rpage = await rctx.newPage();
  await load(rpage, ref.url);
  await sleep(1500);
  record.reduced_motion = { running_animations: await rpage.evaluate(() => document.getAnimations().length) };
  await rpage.screenshot({ path: path.join(dir, "desktop-reduced-motion.jpg"), type: "jpeg", quality: 60 });
  await rctx.close();

  // Mobile.
  const mctx = await browser.newContext(MOBILE);
  const mpage = await mctx.newPage();
  await load(mpage, ref.url);
  await sleep(1500);
  await mpage.screenshot({ path: path.join(dir, "mobile-hero.jpg"), type: "jpeg", quality: 60 });
  await unblock(mpage, record);
  const mframes = await slowScroll(mpage, tmp, "mscroll");
  tile(mframes, path.join(dir, "mobile-scroll.jpg"), 8, 300);
  record.mobile_outline = await mpage.evaluate(outlineScript);
  if (await fullPage(mpage, path.join(dir, "mobile-full.jpg"))) record.notes.push(`mobile full page cropped at ${MAX_FULL_PAGE}px`);
  await mctx.close();

  fs.rmSync(tmp, { recursive: true, force: true });
  fs.writeFileSync(path.join(dir, "capture.json"), JSON.stringify(record, null, 2) + "\n");
  return record;
}

// Google Chrome plays proprietary video codecs; bundled Chromium does not.
const browser = await chromium.launch({ channel: "chrome" }).catch(() => chromium.launch());
const queue = [...refs];
const failures = [];
await Promise.all(
  Array.from({ length: 3 }, async () => {
    for (let ref; (ref = queue.shift()); ) {
      const t = Date.now();
      try {
        await captureOne(browser, ref).catch((e) => {
          console.log(`retry ${ref.id}: ${e.message.split("\n")[0]}`);
          return captureOne(browser, ref);
        });
        console.log(`ok   ${ref.id} ${((Date.now() - t) / 1000).toFixed(0)}s`);
      } catch (e) {
        failures.push(ref.id);
        console.log(`FAIL ${ref.id}: ${e.message.split("\n")[0]}`);
      }
    }
  }),
);
await browser.close();
if (failures.length) process.exitCode = 1;
