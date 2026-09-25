# Ideate · Improve · Review

Give your agent this repository, your project context, and access to the page or files. These are three starting points, not a prompt sequence. Use the one that matches the work.

## Ideate

```text
Help me find a visual direction for [project], for [audience].
The main thing visitors should do is [action].
My content, assets, and constraints are in [location].

Explore relevant references from this library and inspect promising live sites
with your available browser tools. Choose by fit, not popularity or a fixed
shortlist. Compare distinct directions where useful, then recommend one and
explain its layout, typography, imagery, and interaction approach.
Separate what you observed from what you are proposing.
Keep this at the direction stage unless I ask you to build.
```

## Improve

```text
Improve and polish [page or project].
Understand the existing brand, content, and working user flows first.
Use relevant references where they help; preserve what already works.

Inspect the rendered page, scroll through it, and try its main interactions.
Improve the hierarchy, typography, spacing, imagery, responsive layout, and
motion wherever they materially improve the experience. Make routine decisions
yourself and implement the changes.
Verify the result in the browser at desktop and mobile sizes, including keyboard
use and reduced motion where relevant. Show the meaningful before-and-after
differences and report anything you could not verify.
```

## Review

```text
Review [page or project] against its purpose, audience, and design direction.
Explore the whole page and its main user journey using available browser tools:
navigation, interactive states, scrolling, responsive behavior, and motion.
Use this reference library only where comparison would clarify a finding.

Prioritize concrete issues by their effect on users. For each, explain what
happens, how to reproduce it, and what you recommend changing. Distinguish
observed behavior, source-code findings, and untested assumptions.
This is a review; do not modify the project unless I ask you to.
```

## Tools and evidence

The skill provides instructions and a catalog, not a browser runtime. An agent
can use Playwright, a browser connector, or its supported computer-use tools.
Screenshots preserve composition and comparison states; they do not establish
animation, keyboard behavior, or a working journey. When live inspection is
unavailable, narrow the assessment and say what remains untested.
