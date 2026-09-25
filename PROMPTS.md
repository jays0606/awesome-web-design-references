# Reference-led design prompts

Use these prompts with an agent that can read the repository and inspect images. Replace bracketed inputs with real project context. Give the agent access to your actual content and assets; a reference library cannot supply your product facts.

## 1. Turn a brief into a visual direction

```text
Build a website for [product, organization, or person].
Audience: [who visits and what they need].
Primary action: [what a successful visit leads to].
Available content and assets: [files or folders].
Existing constraints: [framework, design system, language, brand requirements].

Read this repository's reference catalog and inspect the relevant screenshots.
Choose one primary reference that fits the brief, plus a secondary reference only
if it solves a different problem. Explain the specific ideas you will adapt:
information hierarchy, typography, spacing, imagery, or interaction.

Then implement a complete first version using my content and assets. Make routine
design and technical decisions yourself. Ask only when missing information would
materially change the scope, introduce a cost, or misrepresent the business.
Open the result and check it at desktop and mobile widths. Report what you
actually verified and anything that remains unresolved.
```

## 2. Adapt a reference without cloning a brand

```text
Use [reference ID, URL, or attached screenshot] as the primary visual reference.
What I want to borrow: [two or three concrete characteristics].
What should remain ours: [brand colors, typography, content, assets, components].

Translate those characteristics into this project's layout and visual hierarchy.
Do not reproduce the reference's logo, copy, product screenshots, or proprietary
artwork. Avoid importing unrelated stylistic details just to look more similar.
If the reference conflicts with our design system, keep our system and adapt the
underlying idea instead. Implement the result rather than stopping at a proposal.
```

## 3. Improve an existing interface with evidence

```text
Inspect the current interface in [route or application] and the attached screenshots.
The main problem is [unclear hierarchy, weak identity, crowded layout, or another
observed issue]. Preserve [content, working interactions, components, or brand decisions].

Identify the three changes most likely to improve this experience. Use this
reference library to justify relevant layout or typography choices, not as a
reason to redesign everything. Implement the changes, then compare the same
views at the same viewport sizes. Check text wrapping, contrast, focus states,
and the primary user action. Explain the visible improvements and tradeoffs.
```

## 4. Refine a specific part of the screen

```text
In the attached screenshot, focus on [section or component].
What is not working: [visible problem and its effect on the user].
Desired change: [specific outcome].
Keep: [parts that should not change].

Make the smallest coherent change that achieves this. Inspect the updated screen,
including a narrow viewport, and check that adjacent sections and existing
interactions still work. If the result misses the intent, revise it before handing
it back. Do not silently expand this into a full-page redesign.
```

## 5. Explore distinct directions before implementation

```text
Using my project brief and the reference catalog, propose three genuinely different
visual directions. For each, name the intended audience impression, layout approach,
type hierarchy, image treatment, and one suitable reference. Explain the tradeoff.

Keep the content and requirements consistent so the directions are comparable.
Present a compact comparison and recommend one. Stop before implementation so I
can choose a direction. Do not produce three cosmetic variations of the same layout.
```

## 6. Review a finished page

```text
Review the implemented page against the selected reference principles and our brief.
Look for inconsistent spacing, weak hierarchy, awkward line breaks, repetitive
sections, distracting motion, inaccessible controls, and broken responsive behavior.

Prioritize defects by their effect on the user. Fix the highest-impact issues
without replacing the established visual direction. Test the main interaction,
keyboard navigation, and reduced-motion behavior where relevant. Separate observed
browser results from source-code checks and anything you could not verify.
```

## A useful handoff

Ask for the chosen reference IDs, the design decisions adapted from each, changed
files, tested viewport sizes, and unresolved issues. A screenshot captures one state;
it is not evidence of conversion rates, accessibility compliance, or animation quality.
