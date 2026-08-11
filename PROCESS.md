# Process overview

<!-- IN PROGRESS: this covers only today's harness/pipeline setup, not the
     redesign itself. Will be replaced with the full moments-that-mattered
     writeup once the actual prototype is built. -->

## What I've done so far

Before building the actual redesign, I swapped the repo's starter from the
default hand-written Vite/HTML/TS setup to a minimal Astro project — two
pages (Home, About) sharing a layout — to get a working
build → push → deploy pipeline confirmed end to end before putting real work
on top of it.

## What happened

Astro needs its GitHub Pages `base` path set explicitly (unlike the Vite
starter, which sidesteps this with relative asset URLs) — I set it without a
trailing slash, and the built About link silently resolved to
`.../comp4020-crit2-edwarbudimanabout/` instead of
`.../comp4020-crit2-edwarbudiman/about/`. `pnpm build` and `pnpm check` stayed
green throughout, because the invariant tests don't inspect nav link targets
— reading the built `dist/index.html` and `dist/about/index.html` output
directly is what actually caught it. Fixed in
[`90a9dbc`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-edwarbudiman/commit/90a9dbc).

Flipping the repo public and dispatching `checks` then surfaced a second,
related issue: the `check` job's "Check internal links" step ran
`linkinator ./dist`, which serves `dist/` at its own local root — so the same
base-prefixed nav hrefs (`/comp4020-crit2-edwarbudiman/about/`) that are
correct once GitHub Pages serves the repo under that path 404 locally,
because `dist/` has no matching subdirectory on disk. `pnpm build`/`pnpm check`
don't run linkinator, so this only showed up in the CI run itself. Fixed by
adding a `linkinator.config.json` that rewrites the base prefix out of URLs
before linkinator resolves them against the local tree, so the same
`pnpm dlx linkinator ./dist --silent` command in `checks.yml` needed no
changes. Fixed in
[`23ae9d1`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-edwarbudiman/commit/23ae9d1).

## Next

Push this commit, re-dispatch `checks`, and confirm the `deploy` job actually
publishes the two-page site to the live Pages URL — then start the real
redesign work on top of a confirmed-working pipeline.
