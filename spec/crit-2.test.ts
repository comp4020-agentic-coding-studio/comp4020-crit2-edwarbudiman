import { readdirSync, readFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

// This week's spec (the four numbered lines referenced below, plus "the
// distinctive test") is published on the course website; TASKS.md §0.3 is
// where this file's checklist came from. Runs against the BUILT site, same
// as spec/invariants.test.ts.
const DIST = resolve("dist");

function htmlFiles(dir: string = DIST): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(path);
    return entry.name.endsWith(".html") ? [path] : [];
  });
}

function jsFiles(dir: string = DIST): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return jsFiles(path);
    return entry.name.endsWith(".js") ? [path] : [];
  });
}

const pages = htmlFiles().map((path) => ({
  name: relative(DIST, path),
  doc: new JSDOM(readFileSync(path, "utf8")).window.document,
}));

const allText = pages.map(({ doc }) => doc.body?.textContent ?? "").join("\n");

function findPage(pattern: RegExp) {
  return pages.find(({ name }) => pattern.test(name));
}

// --- Line 2: the required outbound link -----------------------------------

describe("spec line 2 — link out to the real site", () => {
  it("has at least one anchor linking to inari.restaurant", () => {
    const hrefs = pages.flatMap(({ doc }) =>
      Array.from(doc.querySelectorAll("a[href]")).map((a) =>
        a.getAttribute("href"),
      ),
    );
    expect(hrefs.some((href) => href?.includes("inari.restaurant"))).toBe(
      true,
    );
  });
});

// --- Line 3: the facts the original buries ---------------------------------

describe("spec line 3 — practical facts, stated plainly", () => {
  it("states the address", () => {
    expect(allText).toContain("148 Bunda St");
  });

  it("states the contact email", () => {
    expect(allText).toContain("hello@inari.restaurant");
  });

  it("states opening hours, including that lunch is closed", () => {
    // Loose by design: the two facts must appear near each other, not just
    // anywhere in the same document.
    const windowed = /lunch[^.]{0,80}closed|closed[^.]{0,80}lunch/i;
    expect(windowed.test(allText)).toBe(true);
  });

  it("never invents a phone number — Inari publishes none", () => {
    // AU landline (e.g. "02 6162 1234") and mobile (e.g. "0412 345 678")
    // shapes, allowing space/hyphen separators.
    const landline = /\(?0\d\)?[ -]?\d{4}[ -]?\d{4}/;
    const mobile = /04\d{2}[ -]?\d{3}[ -]?\d{3}/;
    const international = /\+61[ -]?\d[ -]?\d{4}[ -]?\d{4}/;
    for (const re of [landline, mobile, international]) {
      expect(re.test(allText), `matched ${re}`).toBe(false);
    }
  });
});

// --- Line 3, rewritten not pasted — the distinctive test -------------------

// Fixtured verbatim from the original's homepage (TASKS.md Appendix B), for
// the paste-test only — never render these strings.
const ORIGINAL_COPY = [
  "We are open for lunch by pre-booked group reservations of 10 or more guests. Please note that we are not open for walk-in lunch service.",
  "To organise your lunch booking, please call or email our team.",
  "Enjoy 20% off your total bill at Inari when you book online for a 5:00pm or 5:30pm seating, any night of the week during July.",
  "Leave Canberra behind as you step into a grown-up wonderland of fun, frivolity and fusion inspired by Japan's evolution from tradition to modernism.",
  "Backdropped by an immersive and vibrant space, Inari invites you to indulge in a dining experience that blends tradition with innovation.",
  "Named after the Japanese god of rice, Inari showcases the finest locally sourced seafood, expertly crafted into sashimi, sushi, and signature Japanese dishes. From delicate nigiri to bold, modern creations, the menu celebrates Japan's rich culinary heritage with a contemporary twist.",
  "Cast your expectations aside and experience Japanese dining reimagined, right in the heart of Canberra's Tiger Lane.",
  "Discover traditional Japanese dishes fused with modern Australian flavour, centred around the elite of locally sourced seafood.",
];

function normalise(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9%'\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function eightWordRuns(text: string): Set<string> {
  const words = normalise(text);
  const runs = new Set<string>();
  for (let i = 0; i + 8 <= words.length; i++) {
    runs.add(words.slice(i, i + 8).join(" "));
  }
  return runs;
}

const originalRuns = new Set(
  ORIGINAL_COPY.flatMap((s) => Array.from(eightWordRuns(s))),
);

describe("spec line 3, rewritten not pasted — the paste test", () => {
  it("contains no 8+ consecutive word run from the original's homepage copy", () => {
    // Scope: dish names/descriptions/prices and Inari's advisory carry over
    // verbatim from the menu PDF by design (§3.2) and are tagged
    // data-verbatim in the markup — strip that text before comparing, since
    // it is a different source to the homepage copy fixtured above and is
    // exempt from the paste test either way.
    const withoutVerbatim = pages
      .map(({ doc }) => {
        const clone = doc.body?.cloneNode(true) as HTMLElement | undefined;
        clone?.querySelectorAll("[data-verbatim]").forEach((el) => el.remove());
        return clone?.textContent ?? "";
      })
      .join("\n");
    const builtRuns = eightWordRuns(withoutVerbatim);
    const overlap = Array.from(builtRuns).filter((run) =>
      originalRuns.has(run),
    );
    expect(overlap, `matched run(s): ${overlap.join(" | ")}`).toHaveLength(0);
  });
});

// --- Line 4: booking is fully static ----------------------------------------

describe("spec line 4 — booking never posts anywhere", () => {
  it("has no form with an action pointing off-page", () => {
    for (const { name, doc } of pages) {
      for (const form of doc.querySelectorAll("form")) {
        // A form carrying no action attribute at all is the strongest pass
        // available: it cannot post off-page because it names nowhere to
        // post to. getAttribute returns null in that case, and .not.toMatch
        // throws on a non-string, so the original assertion errored on
        // exactly the markup it was written to reward. Normalise first —
        // absent and empty are both "no off-page action".
        const action = form.getAttribute("action") ?? "";
        expect(action, `${name}: <form action="${action}">`).not.toMatch(
          /^https?:\/\//i,
        );
      }
    }
  });

  it("has no form using method=post", () => {
    for (const { name, doc } of pages) {
      for (const form of doc.querySelectorAll("form")) {
        expect(
          form.getAttribute("method")?.toLowerCase(),
          `${name}: <form method="post">`,
        ).not.toBe("post");
      }
    }
  });

  it("emits no JavaScript that fetches a non-static endpoint", () => {
    for (const path of jsFiles()) {
      const js = readFileSync(path, "utf8");
      expect(js, `${relative(DIST, path)} calls fetch(...)`).not.toMatch(
        /\bfetch\s*\(/,
      );
      expect(
        js,
        `${relative(DIST, path)} uses XMLHttpRequest`,
      ).not.toMatch(/XMLHttpRequest/);
    }
  });
});

// --- Integrity checks --------------------------------------------------------

describe("integrity — dietary markers", () => {
  // Convention: any element displaying a dietary marker carries
  // data-dietary="GF" | "DF" | "V" — this is what makes the marker checkable
  // without parsing prose. Dish markup (§3.1) must follow this.
  it("every data-dietary value is exactly GF, DF, or V", () => {
    const values = pages.flatMap(({ doc }) =>
      Array.from(doc.querySelectorAll("[data-dietary]")).map((el) =>
        el.getAttribute("data-dietary"),
      ),
    );
    for (const value of values) {
      expect(["GF", "DF", "V"]).toContain(value);
    }
  });
});

describe("integrity — Inari's advisory", () => {
  it("appears verbatim on the menu page", () => {
    const menuPage = findPage(/^menu\//);
    expect(menuPage, "no menu page found in dist/menu/").toBeTruthy();
    expect(menuPage?.doc.body?.textContent).toContain(
      "Please advise your waiter of any dietary requirements or allergies you may have.",
    );
  });
});

describe("integrity — provenance", () => {
  it("carries a photo credit", () => {
    expect(/photo/i.test(allText) && /credit/i.test(allText)).toBe(true);
  });

  it("carries a not-affiliated-with-Inari notice", () => {
    expect(/not affiliated|unofficial/i.test(allText)).toBe(true);
  });
});

// --- The book works without JavaScript --------------------------------------

// Fixtured from TASKS.md Appendix C (the book's contents), itself read off a
// render of the June 2026 menu PDF — §1.1 requires re-verifying every price
// against the PDF directly. If that re-verification corrects a name or
// price, update src/data/menu.ts AND this list together.
const DISHES: Array<{ name: string; price: string }> = [
  { name: "Pacific Oyster Ponzu", price: "58.8" },
  { name: "Inari Sashimi", price: "76.8" },
  { name: "Kingfish Carpaccio", price: "29.8" },
  { name: "Spicy Salmon Salad", price: "22.8" },
  { name: "Corn Cobs", price: "17.8" },
  { name: "Vegetable Gyoza", price: "18.8" },
  { name: "Salmon & Scallop", price: "21.8" },
  { name: "Naked Crispy Salmon", price: "29.8" },
  { name: "Special Eel Sushi Roll", price: "32.8" },
  { name: "Spicy Tuna Sushi Roll", price: "28.8" },
  { name: "Chicken Karaage", price: "29.8" },
  { name: "Pork Belly Glaze", price: "26.8" },
  { name: "Patagonian Toothfish", price: "58.8" },
  { name: "Matcha Tiramisu", price: "26.8" },
  { name: "Sorry Mum", price: "16.8" },
  { name: "Ice Cream Tempura", price: "18.8" },
  { name: "Churros", price: "19.8" },
];

describe("the book works without JavaScript", () => {
  const menuPage = findPage(/^menu\//);

  it("has a menu page in the build", () => {
    expect(menuPage, "no menu page found in dist/menu/").toBeTruthy();
  });

  for (const dish of DISHES) {
    it(`renders "${dish.name}" and its price ${dish.price} into the built HTML`, () => {
      expect(menuPage, "no menu page found in dist/menu/").toBeTruthy();
      if (!menuPage) return;
      expect(menuPage.doc.body?.textContent).toContain(dish.name);
      expect(menuPage.doc.body?.textContent).toContain(dish.price);
    });
  }
});

// --- Human-judged lines — not mechanically checkable ------------------------
//
// Spec line 3 also asks whether the rewrite is "better in a way you can
// articulate" than the original's copy — no test can score prose quality.
// The paste test above only proves it isn't copied; PROCESS.md and the
// Contact page's "what's better here" section carry the actual argument,
// and the crit is where a person judges it.
//
// Spec line 5 ("what's better here, and why") is likewise for the crit and
// the Contact page to answer, not this file — see TASKS.md §6. What can be
// checked mechanically is only that the comparison is comparative and
// evidenced, which is a reading-comprehension task, not a DOM query.

describe("sanity", () => {
  it("built at least one page", () => {
    expect(pages.length).toBeGreaterThan(0);
  });
});
