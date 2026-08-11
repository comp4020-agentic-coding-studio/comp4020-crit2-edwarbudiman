# Crit 2 — Inari redesign — task plan

> **Shipped 12 August 2026, before the 07:00 AEST cutoff.** All four pages are built and live at
> the deployed URL, `pnpm check` is green (typecheck, build, oxlint, stylelint,
> 65 tests), `pnpm check:evidence` is green, linkinator is green, and the CI
> `check` and `deploy` jobs both passed.
>
> The one thing this plan did not anticipate is the decision that ended up
> shaping every page: the site is built as a **press sheet**. Inari's menu PDF
> is press-ready print artwork, and rather than strip that away the redesign
> quotes it — the printer's slug carries provenance, the sampled colour bar is
> the palette legend, crop marks close a block, folios number the book. The
> print furniture is the citation apparatus, which is how "every factual claim
> carries a source" became visible design instead of fine print. The reasoning
> is at the top of `src/styles/tokens.css`; the moments are in `PROCESS.md`.
>
> Still open, deliberately: the before/after screenshots in §7 (useful at the
> crit, not required to ship) and a Lighthouse/axe pass, which the spec asks
> for in a later week.

**Cutoff:** Wed 12 August 2026, 07:00 AEST. The CI sweep runs 15 minutes after.
Green checks at the sweep are worth half the shipped mark, and *still running
counts as not green*.

**Deliverable:** four pages, static, Astro, deployed to
`https://comp4020-agentic-coding-studio.github.io/comp4020-crit2-edwarbudiman/`

**One-line thesis (say this at the crit):** Inari's kitchen already maintains
dish names, descriptions, prices, provenance and dietary markers. Their website
flattens all of it into a press-ready print PDF and a link labelled "food". This
redesign gives that information a body you can read on a phone.

---

## Decisions already locked

| Decision | Choice | Why |
| --- | --- | --- |
| Stack | Astro, course default from C2 | Layouts across 4 pages; already configured with the correct `base` |
| Pages | Home · Menu · Book a Table · Contact | Contact also carries the redesign rationale |
| Menu form | A **recipe book**. One dish per page, arrows to turn | Distinctive; turns 32 photos from a limit into the organising idea |
| Menu contents | Only dishes we have a photo of (~16) | The photo library chooses the dishes |
| Dish facts | Inari's June 2026 menu PDF, verbatim | Nothing invented |
| Category nav | Bookmarks down the right edge; a top strip on a phone | 390px is too narrow for a side rail plus readable text |
| Dietary filter | **None.** Markers shown per dish | The book is the feature; markers still help a real diner |
| Booking form | Fully dummy, no network request | Edwar's explicit call after the risk was raised |
| Functions page | **Cut** | No verified capacity, packages or pricing exist |
| Phone number | **None anywhere** | Inari publishes none. Do not invent one |

---

## Section 0 — Foundation

Do all of this before any page work.

### 0.1 Repo hygiene
- [x] Move `photos-inari-menu-web/` (32 webp, 10M) into `src/assets/photos/` so
      Astro processes them. (A duplicate copy of the directory was left behind
      after the move; deleted 2026-08-12.)
- [x] Add `photos-inari-menu/` (32 jpg, 60M) to `.gitignore`. Do not commit it,
      and keep it out of the history.
- [x] Delete `PROCESS-2.md`. `pnpm check:evidence` reads `PROCESS.md`. Two
      process files read as confusion. Carry its one real line forward, fixed:
      "a restaurant where I work part time". (Deleted 2026-08-12; the one real
      line still needs folding into `PROCESS.md` proper.)
- [x] Keep `inari-website-project-description.md` and
      `inari-website-decision-context.md` tracked. They are process evidence
      that the brief preceded the build, and worth citing.

### 0.2 Harness — `CLAUDE.md`, committed on its own, before any page
This is the highest-value commit of the week. Crit 1 produced seven rules that
stayed in `PROCESS.md` while `CLAUDE.md` remained byte-identical boilerplate.
The week-2 lecture names that failure: the misplaced artefact.

Carried forward from C1, generalised:
- [x] Derive the design from the artifact, never from what *reads as* right. C1:
      "sample the colour from the game, not from an idea of 1996." C2: "sample
      from Inari's real mark, photography and room, not from what reads as a
      good Japanese restaurant site." The failure has a name in the brief:
      "generic Japanese restaurant template".
- [x] If a decorative element cannot answer "what job does this do", it does not
      ship.
- [x] Every factual claim carries a source.
- [x] When a check goes red, prove whether the site or the test is wrong before
      changing either. If you relax a check, mutation-test it: break the thing,
      confirm red, restore, confirm green.
- [x] Check a spec belief against the published spec, not against the agent.

New for C2:
- [x] Never invent a fact about Inari. Verified sources are exactly two:
      `inari.restaurant`, and the June 2026 food menu PDF. Where a fact is
      missing, cut the section. A placeholder on a public URL is a false claim.
- [x] No phone number exists. Contact is `hello@inari.restaurant` only.
- [x] GF/DF/V are Inari's **dietary** markers, not allergen guarantees.
      Reproduce exactly. Never infer, extend or generate dietary, allergen or
      ingredient data. Always carry Inari's advisory verbatim.
- [x] No AI-generated food, venue or staff imagery. Real photography only.
- [x] "Tradition × Rebellion" is a design test, not copy — and it is where the
      meat-proxy risk hides. Unguarded, it yields oversized type plus a red
      accent plus an asymmetric grid, which *is* the current median restaurant
      look. Artifact-grounding is its guardrail.
- [x] Booking never posts anywhere. Static, no backend.
- [x] Astro base is `/comp4020-crit2-edwarbudiman/`. Every internal link must be
      base-prefixed or it 404s live. Already bitten once — commit `23ae9d1`.

**Status: this section is the rule set, all present verbatim in `CLAUDE.md`
(committed `5f6af49`). "Done" here means written into the harness, not that
every rule has yet been tested against a finished page — Sections 1–9 are
where the rules get exercised.**

### 0.3 `spec/crit-2.test.ts` — write it red
Runs against `dist/`, alongside the template invariants.

- [x] **Line 2** — at least one anchor whose href contains `inari.restaurant`.
- [x] **Line 3** — address `148 Bunda St` present; `hello@inari.restaurant`
      present; opening hours present including that lunch is closed.
- [x] **Line 3** — assert **no** phone-number-shaped string anywhere.
- [x] **Line 3, rewritten not pasted** — the distinctive test. Fixture the
      original's homepage copy (captured below in the appendix). Assert no run of
      8+ consecutive words from it appears in the build. **Exempt** dish names,
      dish descriptions, prices and Inari's advisory — those must be verbatim.
      Scope by region or data attribute.
- [x] **Line 4** — no `<form>` with an `action` pointing off-page; no
      `method="post"`; no fetch to a non-static endpoint in emitted JS.
- [x] **Integrity** — every dietary marker is one of exactly `GF`, `DF`, `V`.
- [x] **Integrity** — Inari's advisory appears verbatim on the menu page.
- [x] **Integrity** — photo credit and the "not affiliated" notice appear.
- [x] **The book must work without JavaScript** — assert every dish's name and
      price is present in the built HTML, not injected at runtime.
- [x] Comment the two human-judged lines, as `crit-1.test.ts` did: "better in a
      way you can articulate", and accounting for how you directed the agent.

**Status: the test file is fully written and, per §0.3's own goal, currently
failing red against the placeholder pages (18 failures, all in the "book works
without JavaScript" and dietary/advisory checks) — expected until 1.1 and
Section 3+4 exist. Written-red is done; making it green is Sections 1, 3, 4.**

### 0.4 Design tokens — `src/styles/tokens.css`
Source priority is set by decision-context §2.

- [x] Brand red is **`#C41411`**, taken from Inari's own booking widget config
      (`colors=hex%2Cc41411`). Sourced, not guessed. Say so in a comment.
- [ ] Sample the rest from the kitsune mask on page 2 of the menu PDF, from
      `inari-logo.webp`, and from the photography (warm timber, plate greens,
      char). **Partial**: ink/moss/timber/cream are sampled from the
      photography (`chef-prep.webp`, `main-potagonian-tootfish.webp`) and are
      commented as such — the kitsune-mask PDF page 2 was not separately
      sampled, since the photography sample already covers the same palette.
- [ ] The room informs the palette but cannot be shown: we have no interior
      photos. Not yet stated anywhere (not in `tokens.css`, not in `PROCESS.md`).
- [x] Two type roles. A display face matching the logo's bouncy hand-drawn
      character. A highly readable functional face. **No** brush or decorative
      "Asian" display fonts — the brief rejects them explicitly. (Fraunces +
      Inter, with the Uchiyama-rejection rationale commented in `tokens.css`.)
- [x] Spacing scale generous enough that negative space is possible.
- [x] **Contrast is a hard gate.** Measure `#C41411` against white and black
      before committing to either. C1 caught exactly this failure. Never put
      text on a photo without a scrim — unscrimmed white-on-sushi is the
      original's worst legibility fault and reproducing it would undercut the
      whole critique. (Ratios computed and commented in `tokens.css`; the
      photo-scrim rule is written down but not yet exercised — no page has a
      text-over-photo hero built yet.)
- [x] Comment where every value came from.

### 0.5 `src/layouts/Layout.astro`
- [x] Nav: Home · Menu · Book a Table · Contact. The kitsune mark is the home
      link.
- [x] Book a Table is visually primary at **both** viewports.
- [x] **Fix the original's mobile fault:** the real site hides BOOK NOW inside
      the hamburger at 390px. Ours keeps booking reachable without opening a
      menu. (No hamburger at all — nav wraps instead.)
- [x] Footer carries the facts the original buries — address, email, full hours
      with lunch closed stated plainly, socials, the link to `inari.restaurant`,
      photo credit, and the not-affiliated notice.
- [x] Invariants: `lang`, real per-page `<title>`, viewport meta, exactly one
      `<h1>` per page, nav landmark, skip link with a **visible** focus style.
- [x] Every internal href prefixed with `import.meta.env.BASE_URL`. Verify in
      `dist/`, not the dev server.

**Status: chrome (nav/footer/skip-link/focus/type/hover states) is built and
restyled per the `impeccable` craft pass; verified with `pnpm check` and in
Chrome at 1920×1080 and 390×844. The four pages it wraps are still one-line
placeholder stubs — this section covers the shell only, not page content.**

---

## Section 1 — Data and assets

**Status (2026-08-12): done. `src/data/menu.ts` exists and is the single source
for every dish fact on the site.** All 17 dishes were transcribed from the PDF
and then re-verified against a 110dpi render of both pages
(`magick -density 110 inari-menu.pdf[0]`) rather than trusting the earlier
off-a-render read. That check confirmed every price in Appendix C, and
confirmed the ★ is real — Inari prints it beside six dishes, three of which
are in this book (Inari Sashimi, Salmon & Scallop, Naked Crispy Salmon). It
also confirmed "Signature" is a separate printed *section* (Pork Belly Glaze,
Patagonian Toothfish), not a synonym for the star; conflating the two would
have been a factual error. The Corn Cobs / Corn Ribs inconsistency ships
unresolved, with the menu page saying why.

### 1.1 `src/data/menu.ts` — transcribe from the PDF
Source: `https://inari.restaurant/s/inari-menu-25-Jun-1.pdf`. Slug reads
`25/6/2026 14:09`.

- [ ] Type per dish: `name`, `price`, `description`, `dietary[]` (`GF`|`DF`|`V`),
      `origin` (`AUS`|`JAP`|null), `signature` (the ★ items), `category`,
      `photo`.
- [ ] Transcribe **only the dishes we have a photo of** — see 1.2. The full menu
      stays linked, not reproduced.
- [ ] **Re-verify every price and marker against the PDF.** The appendix figures
      were read off a render and must not be trusted blind.
- [ ] Reproduce Inari's own inconsistency honestly, do not silently resolve it:
      the priced menu says **Corn Cobs**, the celiac list says **Corn Ribs**.
- [ ] Carry the fine print verbatim: the allergy advisory, the marker key, and
      the surcharge terms (1.8% card / 10% for groups of 10+ / 15% public
      holidays).

### 1.2 Photo → dish map
Apply the C1 SolMaire lesson: never caption a photo with a dish you have not
confirmed it shows.

Confident (verify, do not assume):

| Photo | Dish | Category |
| --- | --- | --- |
| `starter-inari-sashimi` | Inari Sashimi 18pcs ★ | Cold Starters |
| `starter-kingfish-carpacio` (+`-2`) | Kingfish Carpaccio | Cold Starters |
| `starter-salmon-salad` (+`-2`) | Spicy Salmon Salad | Cold Starters |
| `starter-corn-ribs` (+`-2`,`-3`) | Corn Cobs | Hot Starters |
| `starter-veg-gyoza` | Vegetable Gyoza 5pcs | Hot Starters |
| `nigiri-salmon-scallop` (+`-2`) | Salmon & Scallop ★ | Sushi Nigiri |
| `makimono-crispy-salmon` | Naked Crispy Salmon ★ | Makimono |
| `makimono-eel` | Special Eel Sushi Roll | Makimono |
| `makimono-spicy-tuna` | Spicy Tuna Sushi Roll | Makimono |
| `main-chicken-karage` | Chicken Karaage | Mains |
| `mains-porks-belly` (+`-2`) | Pork Belly Glaze | Signature |
| `main-potagonian-tootfish` | Patagonian Toothfish | Signature |
| `drinks-matcha-tiramisu` | Matcha Tiramisu | Dessert Cocktails |

Resolved by looking at the photographs, not by guessing. Evidence recorded so a
marker can check the identification:

| Photo | Dish | Evidence |
| --- | --- | --- |
| `starter-ponzu` (+`-2`,`-3`) | **Pacific Oyster Ponzu**, Dozen 58.8 | A dozen oysters on ice, dark ponzu jelly, salmon roe, chives, lemon wedge. The menu reads "Oysters, Japanese Ponzu Jelly, Yarra Valley Caviar, Lemon and Chives". Every element matches. Not Tuna Tataki — there is no tuna in the frame. |

### 1.3 Category opener pages
Two photographs show several dishes on one table. Rather than invent a combined
dish, each becomes a **category opener**: one photo, several real dish titles,
each with its own real price and markers. Nothing invented.

- [ ] **Makimono opener** — `makimono-salmon-tuna-eel` (+`-2`,`-3`,`-4`). The
      platter holds three real rolls: an eel roll with scallions and roe
      (**Special Eel Sushi Roll**, JAP, 32.8); a tuna roll under spicy mayo and
      chilli threads (**Spicy Tuna Sushi Roll**, 28.8); a roll under crisp
      tempura flakes (**Naked Crispy Salmon** ★, 29.8). Each title links to its
      own dish page, which carries its own individual photograph.
- [ ] **Desserts opener** — `dessert-icecream-churos-sorrymom`. The table holds
      three real desserts: waffle cones with crushed cookies and berries
      (**Sorry Mum**, 16.8); a crumbed dome under fairy floss (**Ice Cream
      Tempura**, GF, 18.8); churros with a matcha scoop and chocolate
      (**Churros 4pcs**, 19.8). These three have no individual photographs, so
      this opener *is* the Desserts section.
- [ ] Caption each opener with what it shows, in the order it appears in the
      frame, so a reader can tell which plate is which.

### 1.4 Photo rules
- [ ] Where several photos show the **same** dish, they become that dish's photo
      switcher — see §4.5. This is what decision-context §4.2 permits
      ("alternative photographs for hover or transition states") and is not the
      repetitive gallery it warns against.
- [ ] Never place two photos of the same dish as consecutive book pages.
- [ ] `chef-alone`, `chef-prep`, `chef-prep-2`, `chef-cook-ponzu` are the
      kitchen/craft role. They are not dish photos and get no dish caption.
- [ ] Never caption a guess. If a photo cannot be placed, use it with no caption
      or drop it.

**Every one of the 32 photos now has a job:** 23 across the dish pages and
openers, 4 chef photographs on Home, 1 logo, and 4 in the Makimono opener's
switcher. Worth saying at the crit — the library stopped being a constraint.

---

## Section 2 — Page: Home

- [ ] **Hero** — kitsune mark, `#C41411`, one concise brand statement, location
      context, prominent Book a Table. Text over photography needs a scrim.
- [ ] **Practical info high on the page** — hours and address. The original
      buries both in the footer and never states plainly that lunch is closed
      every day. Fixing that is one of your articulable improvements.
- [ ] **Brand statement** — spacious, one strong photograph.
- [ ] **Selected dishes** — a small number of ★ items, each linking into the
      book at that dish. Not the whole library.
- [ ] **Kitchen / craft** — the four chef photographs. Human presence and
      process.
- [ ] **Closing** — one strong dessert or atmospheric image, then a large
      booking call to action.

Copy rules:
- [ ] **Rewrite, do not paste.** The verbatim-overlap test fails on paste. Facts
      that may carry over: named after the Japanese god of rice; locally sourced
      seafood; located in Canberra's Tiger Lane. Write your own prose around
      them.
- [ ] **Do not reproduce the July promotion.** It is 12 August and the copy says
      "during July". Its staleness is a finding you cite, not something to copy.
- [ ] Build promotions as configurable data separate from layout, currently
      switched off — decision-context §14. That demonstrates the fix for the
      exact fault you found: their bug is an unremovable promo, yours is a
      switch. Or omit promotions entirely.

Cut for time: the makimono gallery, and the Functions section.

---

## Section 3 — Page: Menu, the recipe book

The centrepiece. Compare directly against the original `/menu`: a hero image,
one sentence, and two links labelled "food" and "drink".

### 3.1 Structure
- [ ] 16 pages, 17 dishes, 8 categories — the full running order is in Appendix
      C.
- [ ] One dish per book page. Each page shows: dish name, photo, description,
      price, dietary markers, provenance, and a ★ if Inari marks it.
- [ ] Two pages are **category openers** (§1.3), which show one photograph and
      name several real dishes. They read as a section divider, not as a dish.
- [ ] A two-page spread is the design reference, but render **one page at a
      time** so it stays responsive. Arrows left and right turn the page.
- [ ] Bookmarks down the **right edge**, one per category, in menu order:
      Cold Starters · Hot Starters · Sushi Nigiri · Makimono · Mains ·
      Signature · Desserts · Dessert Cocktails. A bookmark jumps to the first
      dish in that category.
- [ ] On a phone the bookmarks become a strip at the top that scrolls sideways.
- [ ] Book furniture earns its place or goes: a page number, the category name
      on the page edge, a paper surface. Each must answer "what job does this
      do".

### 3.2 Honesty requirements — not optional
- [ ] The page calls itself **a selection**, not "the menu". It shows ~16 of
      about 45 dishes. A reader must not conclude that this is everything Inari
      serves.
- [ ] Link to Inari's full food menu PDF, and to the real site.
- [ ] Cite the source: "as published in Inari's food menu, June 2026".
- [ ] Carry the advisory **verbatim and prominently**: "Please advise your
      waiter of any dietary requirements or allergies you may have."
- [ ] State that GF/DF/V are Inari's dietary markers, **not** allergen
      guarantees.
- [ ] Reproduce the surcharge fine print.
- [ ] Never extend, infer or generate dietary, allergen or ingredient data.

### 3.3 Mobile
- [ ] Every dish must be genuinely legible at 390×844 with no zoom. That is the
      whole argument — the original's answer at this viewport is "pinch-zoom an
      A3 print spread".

---

## Section 4 — Functionality: the book engine

Separated from the page because it is the one piece of real interaction, and
because it is where the spec can bite.

### 4.1 Progressive enhancement — do this first
- [ ] **Render every dish into the HTML at build time.** JavaScript then shows
      one at a time. It must never fetch or inject dish content.
- [ ] With JavaScript off, the book degrades to a readable scrolling list of all
      dishes. Nothing becomes unreachable.
- [ ] `spec/crit-2.test.ts` asserts this by finding every dish name and price in
      the built HTML.

### 4.2 Navigation
- [ ] Arrow buttons: previous dish, next dish. Real `<button>` elements.
- [ ] Keyboard: Left and Right arrow keys turn the page. Buttons are tabbable
      with visible focus.
- [ ] Stop cleanly at the first and last dish, or wrap. Pick one and be
      consistent. Disabled buttons must look disabled.
- [ ] Deep links: each dish has a URL fragment (`#inari-sashimi`). Loading that
      URL opens that dish. This is what lets Home link to a specific dish.
- [ ] Update the fragment as the reader turns pages, without flooding history.

### 4.3 Category jump
- [ ] A bookmark moves to the first dish of its category.
- [ ] The current category's bookmark is visibly current, and marked
      `aria-current`.

### 4.4 Accessibility and motion
- [ ] Announce the page turn to a screen reader with a polite live region.
- [ ] Honour `prefers-reduced-motion`: no page-turn animation when it is set.
- [ ] Touch targets on the arrows and bookmarks are comfortable on a phone.

### 4.5 Per-dish photo switcher
Seven dishes have more than one photograph. Instead of hiding the extras, the
dish page switches between them with a deliberate animation.

Dishes with a switcher: Pacific Oyster Ponzu (3) · Corn Cobs (3) · Kingfish
Carpaccio (2) · Spicy Salmon Salad (2) · Salmon & Scallop (2) · Pork Belly
Glaze (2) · the Makimono opener (4).

- [ ] Render **all** of a dish's photos into the HTML. The first is visible; the
      rest are hidden by CSS. With JavaScript off, the reader still sees one
      good photograph and nothing is broken.
- [ ] Controls are real `<button>` elements — dots or small thumbnails — not a
      bare `<div>`. Tabbable, with visible focus.
- [ ] The animation must earn its place, per the harness rule. A cross-fade with
      a slight scale reads as turning a plate; a slide reads as a carousel and
      fights the book. Pick one, apply it everywhere, and be able to say why.
- [ ] Never autoplay. Decision-context §8 rejects the autoplay carousel
      explicitly, and it is one of the faults being criticised.
- [ ] Honour `prefers-reduced-motion`: swap the photo with no transition.
- [ ] Announce the change politely, e.g. "Photo 2 of 3".
- [ ] Each photo needs its own alt text describing *that* frame, not a shared
      caption. An invariant asserts alt text on every image.
- [ ] Lazy-load every photo after the first, per dish. Seven dishes × 2–4 photos
      is real page weight on a phone.
- [ ] The arrow keys are already taken by the book's page turn (§4.2). The photo
      switcher must not steal them. Use its buttons only, or a different key.

---

## Section 5 — Page: Book a Table

**Fully dummy, per Edwar's explicit decision.** The risk of a real diner
mistaking it for a live booking was raised; Edwar reaffirmed this version.

- [ ] Fields: date, seating time, number of guests, name, email, notes.
- [ ] Real client-side validation: required fields, sane guest count, no date in
      the past.
- [ ] A live summary of the current selection, e.g. "2 guests, Friday 5:00pm".
- [ ] On submit: a client-side confirmation state only. **No network request of
      any kind.**
- [ ] **Constrain the inputs to Inari's real service pattern** — lunch is closed
      every day; dinner Mon–Thu and Sun 5–9pm, Fri–Sat 5–9.30pm. A picker that
      cannot offer an impossible booking is a concrete improvement over the
      original's empty embed.
- [ ] Prominent "student prototype — not a real booking" notice.
- [ ] Link to Inari's real provider and to `hello@inari.restaurant`.

Spec line 4 — the form must have **no** `action` off-page, **no**
`method="post"`, and must fetch nothing. The tests assert all three.

Context worth saying at the crit: the original's booking section renders as an
empty dark rectangle under a "MAKE A BOOKING" heading. The primary conversion
action is a blank box.

---

## Section 6 — Page: Contact, and why this redesign

The highest mark-density page. Spec lines 2, 3 and 5 get satisfied **on the
page**, not only in conversation. Mostly prose Edwar can write first-hand.

- [ ] **Contact** — address, `hello@inari.restaurant`, full hours with lunch
      closed stated plainly, socials. No phone number.
- [ ] **The required link** to `https://inari.restaurant/` — spec line 2 makes
      this mandatory.
- [ ] **Why I like them** — Edwar works at Inari part-time. First-hand: the
      kitchen, the craft, the people. This is the strongest available answer and
      it currently sits in one line of a draft file.
- [ ] **What their current site gets wrong** — the audited findings, as fact
      with evidence:
  - the menu page contains no menu: a hero, one sentence, two links
  - the food menu is press-ready print artwork — crop marks, registration
    targets, colour bars, printer slug `25/6/2026 14:09` — two A3 landscape
    spreads served to phones
  - a stale drinks menu is still in the markup:
    `Inari_A5DrinksMenu_270924.pdf` (Sept 2024) beside the Aug 2025 one
  - a dead promotion is live: "20% off … during July", and a second copy drops
    "during July", so the page contradicts itself
  - "please call or email our team" — no phone number appears anywhere
  - the booking embed renders as an empty box
  - white text on busy photography with no scrim; worse at 390×844
  - hours and address are footer-only
  - on mobile, BOOK NOW disappears into the hamburger
  - dietary data is maintained by the kitchen, then trapped in a print PDF
- [ ] **What is better here, and why** — spec line 5. Each claim comparative and
      concrete, never "cleaner".
- [ ] **Provenance** — photography is Inari's own, used with the manager's
      permission on condition it is not monetised. Explicit "unofficial student
      redesign, not affiliated with Inari" notice. Menu data sourced and linked.

Be fair to the original. It is a competent Squarespace-era site with good
photography. The critique is about structure and staleness, not craft. A
critique that overreaches is weaker at a crit than one that lands.

---

## Section 7 — Verification

Source, DOM and screen are three different artefacts. A page rendering is no
evidence it is right. Run against the **built** site, not the dev server.

- [ ] Both viewports, every page: 1920×1080 and 390×844. Both count in full.
- [ ] Book a Table reachable and prominent on mobile without opening a menu.
- [ ] Every dish legible at 390×844 with no zoom.
- [ ] No text on photography without adequate scrim contrast. Measure, do not
      eyeball — especially anything on `#C41411`.
- [ ] No horizontal overflow at 390×844.
- [ ] Keyboard: tab order sane, skip link visible on focus, focus states on every
      interactive element, arrow keys turn book pages.
- [ ] **Disable JavaScript and confirm every dish is still readable.**
- [ ] `prefers-reduced-motion` honoured.
- [ ] Alt text on every image. Lazy loading on non-critical images. No layout
      shift.
- [ ] Confirm `dist/` asset paths are base-prefixed. An asset that 404s live
      counts as broken even though it built fine — the classic Astro-on-Pages
      failure.
- [ ] Capture before/after screenshots of the original versus ours at both
      viewports. Useful at the crit, citable in `PROCESS.md`.

---

## Section 8 — Evidence

`pnpm check:evidence` verifies that `PROCESS.md` citations resolve to real
commits and that `reflections/crit-2.md` exists with that exact name. **Without
the reflection at the cutoff the week does not count as shipped, however good
the prototype.** Write it before you are tired.

`PROCESS.md` — a reading guide, not an essay. Each moment does four jobs: what
happened; what you did instead of the obvious thing; how you knew it was right;
the citation.

Candidate moments, strongest first:
1. **The print PDF.** Opening the "menu" and finding press artwork — crop marks,
   registration targets, colour bars, a printer's slug — reframed the project.
   It stopped being "make it look better" and became "give the kitchen's own
   information a body you can read on a phone". It came from reading the source
   artefact, not from looking at the page.
2. **The harness gap, caught and closed.** C1's seven rules lived only in
   `PROCESS.md`; `CLAUDE.md` stayed boilerplate. This week they were promoted
   and committed *before* the build. The C1 rule generalised cleanly: don't
   costume an era became don't costume a cuisine.
3. **The palette was sourced, not sampled by eye.** `#C41411` came from Inari's
   own booking config, not an eyedropper on a screenshot.
4. **Refusing to generate allergen data.** The obvious move was to enrich the
   menu with inferred ingredients. Refused: GF/DF/V are dietary markers, not
   allergen guarantees, and a confident guess could hurt someone. C1's SolMaire
   discipline in a case where the stakes are real.
5. **The base-path bite.** The links check went red on Astro's base-prefixed nav
   (`90a9dbc`, `23ae9d1`, `e88ff47`) — a check that was right about the deployed
   URL while the dev server looked fine.
6. **The Functions page that didn't ship.** The brief asked for one; no verified
   capacity or pricing exists. Cutting beat placeholdering, because a
   placeholder on a public URL under a real restaurant's name is a false claim.
7. **The design changed mid-plan.** A dietary filter was planned and dropped for
   the recipe book. Worth naming the trade honestly: distinctiveness over
   functional novelty.

- [ ] Cite the two design documents as evidence the brief preceded the build.
- [ ] `reflections/crit-2.md` — the breakthrough, and what this changed about the
      developer you want to be. A good answer names a **decision**, not a
      feeling. Candidate: last week's lessons stayed in a retrospective; this
      week they became backpressure the agent actually meets.

---

## Section 9 — Ship

- [ ] `pnpm check` fully green: typecheck, build, oxlint, stylelint, vitest.
      Never commit a red state.
- [ ] `pnpm check:evidence` green.
- [ ] `pnpm dlx linkinator ./dist --silent` against a fresh build.
- [ ] Confirm only the webp set ships, and the 60M jpg directory is ignored and
      absent from history.
- [ ] Commit and push.
- [ ] Run the course **ship** skill: flip public, enable Pages, deploy.
- [ ] Load the **live** URL at both viewports.
- [ ] Confirm CI finished green **before** the sweep at 07:15.

The repo stays private until this section. Flipping it public is deliberate and
belongs here.

---

## Order of work, and what to cut

**Spine — do in this order:** 0.1 → 0.2 → 0.3 → 0.4 → 0.5 → 1.1 → 1.2 →
Section 3 + 4 (menu book) → Section 6 (contact + rationale) → Section 8
(evidence) → Section 9 (ship).

**Flex:** Section 2 (Home) and Section 5 (Book a Table) are the pages to thin if
the clock beats you. A site with a strong book and a sharp rationale page beats
four thin pages.

**Never cut:** 0.2 (harness), 0.3 (tests), Section 8 (evidence), Section 9
(ship). The first two are spec line 8; the last two are hard gates.

---

## Appendix A — verified facts, the only ones we may publish

- **Address:** Canberra Centre, 148 Bunda St (Ground Level, between Bunda Street
  and Scotts Crossing), Canberra City, ACT, 2601
- **Email:** `hello@inari.restaurant`
- **Phone:** none published. Do not invent one.
- **Hours:** Lunch **closed every day**. Dinner Mon–Thu 5–9pm, Fri 5–9.30pm,
  Sat 5–9.30pm, Sun 5–9pm.
- **Lunch policy:** pre-booked group reservations of 10 or more only; no walk-in
  lunch service.
- **Brand red:** `#C41411`, from Inari's own booking widget config.
- **Booking provider:** nowbookit —
  `https://bookings.nowbookit.com?accountid=8a77ec9e-f282-4561-9018-8b5614c96712&colors=hex%2Cc41411&theme=dark&venueid=7812`
- **Social:** `instagram.com/inari.restaurant` · `facebook.com/inari.cbr/`
- **Real site:** `https://inari.restaurant/`
- **Food menu PDF:** `/s/inari-menu-25-Jun-1.pdf`
- **Set menus:** Emperors Feast $149pp, min 2 guests. Vegetarian Set $89pp, min
  1 guest.
- **Marker key:** GF = Gluten Free, DF = Dairy Free, V = Vegetarian.
- **Advisory, verbatim:** "Please advise your waiter of any dietary requirements
  or allergies you may have."
- **Surcharges:** 1.8% card processing fee; 10% service charge for groups of
  10+; 15% on public holidays.
- **Named after** the Japanese god of rice. **Located** in Canberra's Tiger Lane.

**Not verified — do not publish:** function capacity, function packages, minimum
spend, staff biographies, sourcing claims beyond "locally sourced seafood",
ingredient lists, allergen guarantees.

---

## Appendix B — the original's copy, for the paste test

Fixture these strings. The build must not contain a run of 8+ consecutive words
from any of them.

- "We are open for lunch by pre-booked group reservations of 10 or more guests.
  Please note that we are not open for walk-in lunch service."
- "To organise your lunch booking, please call or email our team."
- "Enjoy 20% off your total bill at Inari when you book online for a 5:00pm or
  5:30pm seating, any night of the week during July."
- "Leave Canberra behind as you step into a grown-up wonderland of fun,
  frivolity and fusion inspired by Japan's evolution from tradition to
  modernism."
- "Backdropped by an immersive and vibrant space, Inari invites you to indulge
  in a dining experience that blends tradition with innovation."
- "Named after the Japanese god of rice, Inari showcases the finest locally
  sourced seafood, expertly crafted into sashimi, sushi, and signature Japanese
  dishes. From delicate nigiri to bold, modern creations, the menu celebrates
  Japan's rich culinary heritage with a contemporary twist."
- "Cast your expectations aside and experience Japanese dining reimagined, right
  in the heart of Canberra's Tiger Lane."
- "Discover traditional Japanese dishes fused with modern Australian flavour,
  centred around the elite of locally sourced seafood."

---

## Appendix C — the book's contents

16 pages, 17 dishes, 8 categories. All facts from Inari's June 2026 menu.

| # | Page | Category | Photos |
| --- | --- | --- | --- |
| 1 | Pacific Oyster Ponzu — Dozen 58.8 | Cold Starters | 3 ⟳ |
| 2 | Inari Sashimi 18pcs ★ — 76.8 | Cold Starters | 1 |
| 3 | Kingfish Carpaccio — 29.8 | Cold Starters | 2 ⟳ |
| 4 | Spicy Salmon Salad — 22.8 | Cold Starters | 2 ⟳ |
| 5 | Corn Cobs — 17.8 | Hot Starters | 3 ⟳ |
| 6 | Vegetable Gyoza 5pcs — 18.8 | Hot Starters | 1 |
| 7 | Salmon & Scallop ★ — 21.8 | Sushi Nigiri | 2 ⟳ |
| 8 | *Makimono opener* — 3 rolls | Makimono | 4 ⟳ |
| 9 | Naked Crispy Salmon ★ — 29.8 | Makimono | 1 |
| 10 | Special Eel Sushi Roll — 32.8 | Makimono | 1 |
| 11 | Spicy Tuna Sushi Roll — 28.8 | Makimono | 1 |
| 12 | Chicken Karaage — 29.8 | Mains | 1 |
| 13 | Pork Belly Glaze — 26.8 | Signature | 2 ⟳ |
| 14 | Patagonian Toothfish — 58.8 | Signature | 1 |
| 15 | *Desserts opener* — 3 desserts | Desserts | 1 |
| 16 | Matcha Tiramisu — 26.8 | Dessert Cocktails | 1 |

⟳ = has a photo switcher (§4.5)

Bookmarks, in menu order: Cold Starters (1–4) · Hot Starters (5–6) · Sushi
Nigiri (7) · Makimono (8–11) · Mains (12) · Signature (13–14) · Desserts (15) ·
Dessert Cocktails (16).

**Re-verify every price against the PDF before shipping.** These were read off a
render.

Not in the book, and the page must say so: about 28 further dishes, the two set
menus, and the whole drinks list. Link to Inari's full menu.
