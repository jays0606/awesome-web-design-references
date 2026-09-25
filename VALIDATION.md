# Validation and distribution status

- 2026-09-25: 17 public desktop captures visually reviewed; transient blank captures were replaced after rendering completed. Two account-related candidates excluded from public capture output.
- Original dated captures preserved separately. Still images do not verify interaction or animation behavior.
- Public files checked for local absolute paths and credential-like strings before publication.
- Skill frontmatter validator passed. `DISABLE_TELEMETRY=1 npx skills add jays0606/awesome-web-design-references --list` discovered exactly one skill, reference-led-design. This was discovery only; no user-global installation or end-to-end model run was performed.
- No official certification, marketplace acceptance, or leaderboard placement claimed.
- The Skills directory documents automatic discovery through real user installations. GitHub topics and a usable install command improve discovery; no artificial installs or stars are generated.

## Analysis coverage

| Evidence | Current coverage |
|---|---|
| Dated desktop capture and visual observation | 18 public sites |
| Full-page structure and section-by-section dissection | 17 sites, evidence bundles 2026-09-25 |
| Mobile layout (iPhone 15 emulation, full page) | 17 sites, 2026-09-25 |
| Load and scroll motion (intro timeline, scroll strip, recording) | 17 sites, 2026-09-25 |
| Reduced-motion hero comparison | 17 sites, 2026-09-25 |
| Click paths, menus, hover and keyboard states | Not systematically performed |
| Touch journeys on real devices | Not performed |
| End-to-end skill use on an implementation | Not performed |

Evidence bundles come from `tools/capture/` (headless Chrome, public pages,
no clicks or cookie acceptance). Each `analysis.json` was written after
viewing the bundle's images; cookie banners and other capture issues are
recorded there.

Version 0.4.0 adds a live access checklist: standalone navigation, a
`document.visibilityState` check, stepped scrolling before full-page capture,
one retry by another route, and asking the user before falling back to
catalog evidence. These instructions are not evidence that any live inspection
occurred in a given session. No browser runtime is bundled with the skill.
