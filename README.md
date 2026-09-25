# Awesome Web Design References

**Curated website screenshots, design observations, and practical prompts for AI coding agents.**

Maintained by **Jaeho / VibeRick**. Start with a visual direction, understand why it fits, and build something original with your own content.

[Browse the gallery](https://jays0606.github.io/awesome-web-design-references/) · [Prompt library](PROMPTS.md) · [Structured catalog](REFERENCES.json) · [Agent skill](skills/reference-led-design/SKILL.md)

## What is included

- **18 desktop screenshots captured and visually reviewed on September 25, 2026.**
- Original observations, suitable use cases, and cautions for each captured example.
- Six reusable English prompts for choosing a direction, adapting references, improving an interface, focused iteration, exploring alternatives, and final review.
- An optional `reference-led-design` skill using the open Agent Skills format.
- Three earlier screenshots retained as a dated archive.

Two additional candidates are recorded without a new public screenshot because account-related states were detected. This is a maintained personal selection, not a comprehensive ranking. Captures represent one desktop state; they do not certify accessibility, mobile behavior, motion quality, or business outcomes.

## Start here

| Direction | Examples | Useful for |
|---|---|---|
| Editorial clarity | Anthropic | Research, consulting, explanation-led brands |
| Product clarity | Cursor, Linear, Clerk, Vercel, Mobbin MCP, Rive | Software and technical products |
| Image-led brands | Aesop, Fora, Toss | Hospitality, lifestyle, everyday services |
| Playful products | Family, Arc / Dia | Approachable consumer products |
| Expressive studios and commerce | Basement, Darkroom, Illoca, Direct, 29CM, Teenage Engineering | Distinctive creative and retail identities |

## Use without installation

Give your agent the repository URL, your brief, and access to your real content. Ask it to read `REFERENCES.json`, inspect the most relevant images, and adapt specific design principles. Start with one primary reference; add a second only for a different need.

```text
Read this repository's README.md and REFERENCES.json.
I am building [project] for [audience]. The primary action is [action].
Use the content and assets in [location] and preserve [existing constraints].
Choose one suitable reference, explain the specific ideas you will adapt,
and implement a working first version. Use original content and assets.
Verify the result at desktop and mobile widths, and report what remains untested.
```

See [PROMPTS.md](PROMPTS.md) for complete workflows. The library complements frontend implementation skills; it does not require a particular framework or replace your design system.

## Optional skill installation

Using the third-party Skills CLI:

```sh
npx skills add jays0606/awesome-web-design-references --skill reference-led-design
```

Choose your agent and installation scope in the CLI. Review existing installations before replacement. The skill contains Markdown and JSON, with no hooks or executable scripts. It bundles catalog text; viewing screenshot URLs requires network access. The CLI is separate software and has its own telemetry behavior; set `DISABLE_TELEMETRY=1` to opt out according to its documentation.

The skill follows the [Agent Skills specification](https://agentskills.io/specification). This does **not** mean Anthropic, OpenAI, or Vercel has endorsed or certified it. Schema validation and CLI discovery are distinct from end-to-end model behavior tests. See [VALIDATION.md](VALIDATION.md).

## Contribute

See [CONTRIBUTING.md](CONTRIBUTING.md). Suggest a reference with a source URL, a concrete design observation, an appropriate use case, and capture details. Quality and coverage matter more than adding names.

If this helps your work, star the repository to find it again and follow updates.

## More discovery sources

[Siteinspire](https://www.siteinspire.com/) · [Lapa Ninja](https://www.lapa.ninja/) · [Recent Websites](https://recent.design/websites) · [21st templates](https://21st.dev/community/templates)

## Rights and attribution

Original code, prompts and commentary are [MIT licensed](LICENSE). Third-party screenshots and their depicted logos, photography, text and artwork are excluded. They are limited reference examples accompanying commentary, not reusable production assets. No affiliation or endorsement is implied. See [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md) for sources and correction/removal requests.
