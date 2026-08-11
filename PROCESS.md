# Process overview

This is a redesign of the website of Inari, a Japanese restaurant in the
Canberra Centre where I work part time. Four pages: Home, Menu, Book a Table,
Contact. Every factual claim on it comes from one of exactly two sources,
`inari.restaurant` and Inari's June 2026 food menu PDF. Where a fact was
missing, the section was cut rather than filled in.

The thesis, in one line: Inari's published "menu" is a press sheet that never
reached the screen. This one admits it is quoting a press sheet, then does what
print cannot — turn pages, jump between categories, and stay readable at 390px.

This file is a reading guide. It points at the commits; it doesn't replace them.

## Where to look

| What | Where |
| --- | --- |
| The harness I directed the agent with | `CLAUDE.md` |
| The audit, the plan, and the decisions with their reasons | `TASKS.md` |
| This week's own tests, written before the pages | `spec/crit-2.test.ts` |
| Every colour and type value, with the source it came from | `src/styles/tokens.css` |
| The brief, written before any code | `inari-website-project-description.md`, `inari-website-decision-context.md` |
| The menu data, and what it refuses to infer | `src/data/menu.ts` |
| The book engine, written to work with JavaScript off | `src/pages/menu.astro` |
| The reflection | `reflections/crit-2.md` |

## The moments that mattered

### The press sheet

I opened the file behind Inari's menu link expecting a menu and found print
production artwork: two A3 landscape spreads with crop marks, registration
crosshairs, a CMYK colour bar down the left edge, a greyscale step wedge along
the bottom, and the printer's slug `inari menu 25 Jun.pdf 1 25/6/2026 14:09`
still sitting in the corner. That is what a phone is served when someone taps
"food".

The obvious redesign is to hide all of it: extract the dishes, drop the print
furniture, ship a clean list. I quoted it instead. The slug line became the
provenance citation, the colour bar became the live palette legend, and the
folios number the pages of the book. The print apparatus is doing the job of
telling you where the data came from, which satisfies the harness rule that a
decorative element has to answer "what job does this do".

I knew this was the right direction because it came out of the source artifact
rather than out of looking at the website. It is also the concrete defence
against the failure the brief names by name, "the design does not resemble a
generic Japanese restaurant template" — the visual world is derived from a
document Inari actually produced, so it cannot converge on the median
restaurant look by accident.

Cited: the finding and the 16-page running order it produced, in `TASKS.md`
(§6 audit list, Appendix C), and the two brief documents tracked alongside it as
evidence the brief preceded the build —
[`9f3ccb3`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-edwarbudiman/commit/9f3ccb3).

### The browser found two bugs that every check had passed

With the four pages built, `pnpm check` was green: types, build, both linters,
all 65 tests. I opened the built site in Chrome anyway, because `CLAUDE.md`
says the rendered page is the truth and my model of it isn't.

Two defects were sitting there that no check could see. The menu jumped about a
thousand pixels down the page on load — Chrome keeps trying to resolve a
document's fragment as late-loading content arrives, so the `#dish-id` my book
engine wrote with `replaceState` during startup got acted on once the
photographs finished, and the page scrolled itself. And at 390px the section
rail had vanished: it was sticky at a hard-coded `4.25rem`, under a header that
wraps to two rows on a phone and is actually 122px tall, so it was pinned
permanently behind the nav.

The obvious fix for the second one was to nudge the offset until it looked
right. Instead the header now measures itself and publishes `--header-h`, so
anything sticking below it is correct at any viewport and after any font
swap. Both bugs were invisible in the source and invisible to the test suite;
they were only ever going to be found by looking. Fixed in
[`266bcde`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-edwarbudiman/commit/266bcde).

### The spec test that was wrong, and how I proved it

Spec line 4 says the booking form must never post anywhere. My own test for it
went red against a form that has no `action` and no `method` at all — which is
the strongest possible pass, because a form that names nowhere to post cannot
post. `getAttribute` returns `null` there, `null` is typeof `"object"`, and
`.not.toMatch()` throws on a non-string. The test errored on exactly the markup
it was written to reward.

`CLAUDE.md` says to prove whether the site or the test is wrong before changing
either, so I dumped every `<form>` tag in `dist/` and read the attributes
directly before touching anything. The site was right. Then, because relaxing a
check is how a check quietly stops working, I mutation-tested the fix: injected
`action="https://evil.example.com/post"` and `method="post"` into the built
HTML, confirmed both assertions went red, restored, confirmed both went green.
The same discipline caught a second one — teaching stylelint about BEM
modifiers, then proving `.badCamelCase` still fails and `.good-name__el--mod`
passes.
[`266bcde`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-edwarbudiman/commit/266bcde).

### The harness gap, caught and closed before any page work

Last week I wrote seven rules out of crit 1 and put all seven in `PROCESS.md`.
`CLAUDE.md` stayed byte-identical boilerplate for the whole week. The rules were
in the retrospective, which the agent never reads, instead of in the harness,
which it reads every turn.

The obvious move was to start building and write the rules up afterwards, again.
Instead the first substantive commit of the week is `CLAUDE.md` on its own, with
crit 1's rules generalised and this week's constraints added, before a single
page existed. "Don't costume an era" generalised cleanly into "don't costume a
cuisine": sample from Inari's real mark, photography and room, not from what
reads as a good Japanese restaurant site.

I knew it worked because the rules went on to bite. The Functions cut, the
refusal to generate allergen data, and the missing phone number below are each
traceable to a specific line in that commit, and each one is a decision I would
otherwise have made the lazy way.

Cited:
[`5f6af49`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-edwarbudiman/commit/5f6af49).

### The tests were written red

`spec/crit-2.test.ts` was written against pages that did not exist yet. It
fixtures eight paragraphs of the original's homepage copy and asserts the build
contains no run of eight or more consecutive words from any of them; it asserts
every dish name and price appears in the built HTML, which is what forces the
book to be rendered at build time rather than injected by JavaScript; it asserts
no form has an off-page `action`, no form uses `method="post"`, and no emitted
JavaScript calls `fetch` or `XMLHttpRequest`.

The obvious order is pages first, tests after. Writing tests after a page mostly
encodes whatever the page happens to do. Written first, they are a specification
the page has to meet, and the paste test in particular is one I could not have
written honestly once I had already drafted the copy.

I knew the file was doing its job because it failed for the right reasons: 18
failures, all in the dish-rendering and dietary/advisory checks, naming the
specific dishes missing from the build rather than erroring out. That status is
recorded against §0.3 of the plan in the same commit.

Cited:
[`9f3ccb3`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-edwarbudiman/commit/9f3ccb3).

### The palette was sourced and measured, not eyeballed

Brand red is `#C41411`, taken from Inari's own booking widget configuration
(`?colors=hex%2Cc41411`), not from an eyedropper on a screenshot. Sampling the
logo asset gives `#BD0707`/`#C42827` depending on webp compression, and the
published value sits inside that cluster, so the published value is the one to
trust. Ink, moss, timber and cream were sampled from actual pixels with
`magick <file> -resize 100x100 -colors N -unique-colors txt:-`: the near-black
is the photography's own shadow tone, the moss is the ceramic plate under the
Patagonian toothfish, the timber is a knife handle in a chef photograph.

Contrast was then computed rather than judged, with a throwaway Node script
applying the WCAG 2.1 relative-luminance formula to each pairing. That killed a
combination I would have shipped: black on `#C41411` measures 3.46:1 and fails
AA for body text, while white on the same red is 6.08:1. Every ratio is written
into `tokens.css` next to the token it constrains, along with the rule that
follows from it.

Typography went the same way. Rather than guess at the brand face, I fetched
Inari's own stylesheet and identified it: Uchiyama, a brush-calligraphy display
face, with Louis for body. It is Typekit-licensed to their Squarespace site, and
it is also precisely the "brush or decorative Asian-style font" the brief rejects
by name, so it would have been the wrong answer even if it were licensable. The
logo's own wordmark is a plain geometric block cap with no brush character, and
that is the signal I followed.

Cited: `src/styles/tokens.css`, where every value carries the source it came
from —
[`9f3ccb3`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-edwarbudiman/commit/9f3ccb3).

### Re-reading the PDF instead of trusting my own transcription

The first pass at the dish data was transcribed from a low-resolution read of
the menu, and the signature stars in particular were the kind of small mark that
survives a careless read as a guess. So I rendered page one of the PDF properly
and read it line by line (`magick -density 110 inari-menu.pdf[0]`), against the
transcription. That confirmed the ★ on Inari Sashimi, Salmon & Scallop and Naked
Crispy Salmon, and confirmed all 17 prices.

The obvious thing was to trust the earlier transcription, because it looked
right and nothing was flagging it. It also surfaced an inconsistency in Inari's
own document: the priced menu says Corn Cobs and the celiac list says Corn Ribs.
I reproduced that honestly rather than silently picking one, because resolving it
would be me publishing a decision Inari has not made.

Cited: the re-verification note against §1 of the plan and the fixtured price
list in the spec —
[`9f3ccb3`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-edwarbudiman/commit/9f3ccb3).

### Refusing to generate allergen data

Inari's menu marks dishes GF, DF and V. The obvious way to add value on top of a
transcription is to enrich it: infer ingredients, extend the markers to dishes
that clearly qualify, add an allergen column. I generated none of it. GF/DF/V are
Inari's dietary markers, not allergen guarantees, they are reproduced exactly as
the PDF states them, the site says that is what they are, and Inari's advisory is
carried verbatim: "Please advise your waiter of any dietary requirements or
allergies you may have."

This is the same discipline as crit 1's refusal to caption a photo with a dish I
had not confirmed, except the cost of being wrong here is somebody's allergic
reaction rather than an embarrassing label. It is enforced, not just intended: a
spec test asserts every `data-dietary` value is exactly `GF`, `DF` or `V`, so an
invented marker fails the build.

Cited: the rule in
[`5f6af49`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-edwarbudiman/commit/5f6af49),
the test in
[`9f3ccb3`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-edwarbudiman/commit/9f3ccb3).

### The Functions page that didn't ship

The brief asks for one. §8 of the project description specifies a Functions page,
and "functions information remains accessible" is listed as a success criterion.
No verified capacity, package, minimum spend or pricing exists for Inari
anywhere I am allowed to source from, and §16 of the decision context explicitly
permits placeholders during development.

I cut the page instead. The reasoning is that "during development" is doing a lot
of work in that sentence: this development output is a public URL carrying a real
restaurant's name and photography, and a placeholder function package on it is a
false claim about a business that has to answer the phone about it. Cutting a
page the brief asked for is the deviation, and naming it as a deviation is part
of the argument, not an excuse for it.

Cited: the decision and its reason in the plan's decision table —
[`9f3ccb3`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-edwarbudiman/commit/9f3ccb3).

### The phone number that doesn't exist

Inari's current site says "please call or email our team" and lists no phone
number anywhere. That is a real fault worth citing in the critique, and the
tempting fix is to supply what is missing. There is no verified number, so the
redesign has none either; contact is `hello@inari.restaurant` only. Rather than
rely on remembering that, a spec test asserts that no Australian landline,
mobile or `+61` shaped string appears anywhere in the build, so a plausible
placeholder cannot survive a commit.

Cited: the rule in
[`5f6af49`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-edwarbudiman/commit/5f6af49),
the test in
[`9f3ccb3`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-edwarbudiman/commit/9f3ccb3).

### The base path, twice

Before any redesign work I swapped the Vite starter for a minimal Astro setup to
confirm build, push and deploy end to end. Astro needs its GitHub Pages `base`
set explicitly, and I set it without a trailing slash, so the built About link
resolved to `.../comp4020-crit2-edwarbudimanabout/`. `pnpm build` and
`pnpm check` stayed green the whole time, because nothing in the invariants
inspects nav link targets. Reading the built `dist/index.html` rather than the
dev server is what caught it.

Then CI's links step went red on the same hrefs for the opposite reason:
`linkinator ./dist` serves `dist/` at its own root, so the base-prefixed links
that are correct once Pages serves the repo under that path 404 against the
local tree. The obvious fix was to unprefix the links and make the check happy.
That would have broken the deployed site to satisfy a local tool, so I proved
which side was wrong first and fixed the checker: a `linkinator.config.json`
that rewrites the base prefix out before resolution, leaving the CI command
untouched.

Cited:
[`90a9dbc`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-edwarbudiman/commit/90a9dbc),
[`23ae9d1`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-edwarbudiman/commit/23ae9d1),
[`e88ff47`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-edwarbudiman/commit/e88ff47),
or as one range:
[`90a9dbc...e88ff47`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-edwarbudiman/compare/90a9dbc...e88ff47).

### The plan was corrected downward

Partway through I went back through `TASKS.md` and unticked things. Section 1 had
been marked as ready when no `src/data/` directory existed at all; §0.4 was
ticked when the kitsune-mask sampling and the "the room informs the palette but
cannot be shown" note had not been done. The commit message records exactly
that: checkboxes reconciled to verified reality, Section 0 done with two items
still open, Section 1 not started.

The obvious move is to leave the ticks alone, since nobody audits a plan file.
But an aspirational plan is a plan that lies to the next prompt, and I was using
it as the agent's source of truth for what to build next. Correcting it downward
cost half an hour and made every later status line trustworthy.

Cited:
[`9f3ccb3`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-edwarbudiman/commit/9f3ccb3).

### The design changed mid-plan, and I named the trade

An early plan had a dietary filter on the menu, which is the functionally
obvious feature. It was dropped for the recipe book: one dish per page, arrow
and keyboard page turns, category bookmarks, a deep link per dish. That is the
honest trade to state at the crit — distinctiveness over functional novelty. A
filter over 17 dishes is a small convenience, while the book is the argument
that Inari's own data deserves a body you can read on a phone. The markers still
appear on every dish, so the information a real diner needs did not go anywhere.

Cited: the decision table row and its reason —
[`9f3ccb3`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-edwarbudiman/commit/9f3ccb3).

## How to read the history

The commits are small and in order, and `TASKS.md` is the spine they follow:
harness, then tests, then tokens, then the layout shell, then data, then pages,
then evidence, then ship. Where a commit message says a section is partially
done, it means partially done. Nothing in here was ticked to look finished.
