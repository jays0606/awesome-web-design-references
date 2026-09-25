from pathlib import Path
import json, html
r = Path(__file__).resolve().parents[1]
d = json.loads((r / "REFERENCES.json").read_text())
raw = "https://raw.githubusercontent.com/jays0606/awesome-web-design-references/main/"
# Link the newest reviewed evidence bundle (tools/capture + analysis.json) per reference.
for e in d["references"]:
    bundles = sorted((r / "evidence").glob(f"*/{e['id']}/analysis.json"))
    if not bundles:
        continue
    b = bundles[-1].parent
    rel = b.relative_to(r).as_posix()
    e["evidence"] = {"captured_at": b.parent.name, "path": rel, "url": raw + rel + "/",
                     "files": sorted(f.name for f in b.iterdir() if not f.name.startswith("."))}
    e["analysis_coverage"].update(full_page="captured-and-reviewed", mobile="captured-and-reviewed",
                                  motion="load-and-scroll-captured", interactions="not-audited")
    e["limitations"] = (f"Evidence bundle {b.parent.name}: desktop and mobile full pages, load and scroll motion. "
                        "Hover, menus, keyboard, click paths, performance and conversion outcomes not audited.")
(r / "REFERENCES.json").write_text(json.dumps(d, ensure_ascii=False, indent=2) + "\n")
(r / "skills/reference-led-design/references/catalog.json").write_text(json.dumps(d, ensure_ascii=False, indent=2) + "\n")
esc = html.escape
cards = []
for e in d["references"]:
    if "screenshot" not in e:
        continue
    cards.append(f'<article><div class="eyebrow">{esc(e["style"])}</div><h2>{esc(e["name"])}</h2><a href="{esc(e["url"])}">Visit original ↗</a><a href="{esc(e["screenshot"])}"><img loading="lazy" src="{esc(e["screenshot"])}" alt="{esc(e["name"])} desktop reference captured {e["captured_at"]}"></a><p>{esc(e["observation"])}</p><p><b>Useful for:</b> {esc(e["suitable_for"])}</p><details><summary>Adapt with care</summary><p>{esc(e["avoid"])}</p></details><small>{e["captured_at"]} · {e["viewport"]["width"]} × {e["viewport"]["height"]} · Desktop state</small></article>')
styles = "body{max-width:1240px;margin:auto;padding:48px 24px;background:#f7f7f3;color:#242720;font:17px/1.6 system-ui,sans-serif}h1{font-size:clamp(38px,6vw,76px);line-height:1.05;letter-spacing:-.04em;max-width:1000px}a{color:#244cc7;text-underline-offset:4px}nav{display:flex;gap:20px;flex-wrap:wrap}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr));gap:24px;margin-top:40px}article{padding:24px;background:white;border:1px solid #dedfd8;border-radius:12px}img{display:block;width:100%;height:auto;margin:22px 0;border:1px solid #eee}h2{font-size:30px;margin:4px 0}.eyebrow,small{color:#596055;font-size:14px}small{display:block;margin-top:18px}footer{margin-top:40px;border-top:1px solid #ccc;padding-top:24px;font-size:14px}a:focus-visible,summary:focus-visible{outline:3px solid #244cc7;outline-offset:4px}summary{cursor:pointer}"
repo = "https://github.com/jays0606/awesome-web-design-references"
page = '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="Curated website screenshots, design observations, and prompts for AI coding agents."><title>Awesome Web Design References</title><style>' + styles + '</style><header><p class="eyebrow">CURATED BY JAEHO / VIBERICK</p><h1>Better references.<br>More intentional websites.</h1><p>17 fresh desktop captures, specific design observations, and practical prompts.<br>Choose a direction. Understand the idea. Build something original.</p><nav><a href="' + repo + '">GitHub ↗</a><a href="' + repo + '/blob/main/PROMPTS.md">Prompt library</a><a href="REFERENCES.json">Agent catalog</a><a href="' + repo + '/tree/main/skills/reference-led-design">Installable skill</a></nav><p class="eyebrow">Captured September 25, 2026. Personal curation, not an official ranking.</p></header><main class="grid">' + ''.join(cards) + '</main><footer>Two candidates omitted from screenshots because of account-related states. Older captures remain in the repository archive.<br>Original code and commentary: MIT. Third-party screenshots excluded. <a href="' + repo + '/blob/main/THIRD-PARTY-NOTICES.md">Attribution and rights</a></footer></html>'
(r / "index.html").write_text(page)
print(f"Built {len(cards)} cards and synchronized skill catalog")
