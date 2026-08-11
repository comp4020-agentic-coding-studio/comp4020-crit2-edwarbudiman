# Crit 2 reflection — Unsolicited redesign

## The breakthrough that moved the work forward

Two things, and the second one is the real answer.

The first was opening Inari's menu. Not their menu page, the file behind it. I
expected a PDF of dishes and got print production artwork: two A3 landscape
spreads, crop marks, registration crosshairs, a CMYK colour bar down the side, a
greyscale step wedge, and the printer's slug still in the corner with a
timestamp on it. Someone sent the file that goes to a commercial printer
straight to the web, and that is what a phone gets served when you tap "food".
The moment I saw it the project stopped being "make this look better", which is
a taste argument I could lose at a crit, and became a specific claim I can
defend: their menu is a press sheet that never reached the screen. So I decided
to quote the press sheet instead of hiding it. The slug becomes the provenance
line, the colour bar becomes the palette legend, the folios number the pages of
the book. That decision came from reading the source artifact rather than
looking at the rendered website, and I would not have reached it from the
website alone.

The second, and the one that actually changed how the week went: I put crit 1's
lessons into `CLAUDE.md` before writing a page, instead of into `PROCESS.md`
afterwards. Last week I wrote seven rules out of my own mistakes and every one of
them went into the retrospective. `CLAUDE.md` sat there byte-identical to the
boilerplate for the entire week. I had written a document that only a marker
reads and left the file the agent reads on every single turn untouched. This week
the first substantive commit is the harness on its own, before any page. "Don't
costume an era" generalised into "don't costume a cuisine" almost word for word.

The difference showed up as decisions I would otherwise have made the lazy way. I
cut the Functions page the brief asked for, because no verified pricing or
capacity exists and a placeholder on a public URL under a real restaurant's name
is a false claim. I refused to generate allergen data on top of Inari's GF/DF/V
markers, which is the obvious way to add value to a transcription and also the
one where being wrong hurts somebody. None of that needed me to be disciplined in
the moment. The rule was already in front of the agent.

## What this work changed about the developer you want to be

I want to be the kind of developer who writes the lesson into the thing that
enforces it, not into the thing that describes it. A retrospective is a record of
what I noticed. A harness is backpressure the next turn actually meets, and so is
a test. The two are not the same artifact, and last week I confused them.

The concrete version of that shift: this week, whenever I caught myself about to
rely on remembering something, I made it checkable instead. No invented phone
number became a regex over the built HTML. Dietary markers must be exactly GF,
DF or V became an assertion that fails the build. Contrast is fine became a
measured ratio written next to the token it constrains, which is how I found out
that black on Inari's red is 3.46:1 and fails, a combination I would have shipped
on the strength of it looking right.

The other habit I want to keep is going to the source artifact rather than the
presentation of it. Opening the PDF is what gave me the design. Re-reading it at
a readable resolution, line by line, instead of trusting my own earlier
transcription, is what confirmed the signature stars and all 17 prices, and what
turned up the inconsistency in Inari's own document where the priced menu says
Corn Cobs and the celiac list says Corn Ribs. I kept that inconsistency, because
resolving it quietly would have been me publishing a decision the restaurant has
not made.
