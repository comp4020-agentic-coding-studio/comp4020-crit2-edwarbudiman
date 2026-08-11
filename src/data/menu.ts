/*
 * Inari — menu data.
 *
 * SINGLE SOURCE: Inari's own food menu PDF, June 2026
 * https://inari.restaurant/s/inari-menu-25-Jun-1.pdf  (slug: 25/6/2026 14:09)
 *
 * Every name, price, description, dietary marker, origin tag and star below
 * was read off that PDF and re-verified against a 110dpi render of both
 * pages (`magick -density 110 inari-menu.pdf[0]`), not off an earlier
 * transcription. Nothing here is inferred, extended, or generated —
 * CLAUDE.md forbids inventing a fact about Inari, and forbids generating
 * dietary, allergen or ingredient data specifically.
 *
 * Two things the PDF does that we reproduce rather than tidy up:
 *
 *   1. The priced menu lists "Corn Cobs"; the celiac-friendly list on page 2
 *      calls the same dish "Corn Ribs". That inconsistency is Inari's, and
 *      resolving it silently would be inventing a fact. Both names ship, and
 *      the menu page says why.
 *   2. GF / DF / V are Inari's *dietary* markers. They are not allergen
 *      guarantees, and the PDF's own advisory (below) is what a diner is
 *      meant to act on.
 *
 * This is a SELECTION — 17 of roughly 45 dishes, chosen by which dishes we
 * hold a photograph of. The full menu stays linked, never reproduced.
 */

export type Dietary = "GF" | "DF" | "V";
export type Origin = "AUS" | "JAP";

export interface Photo {
  /** Filename stem in src/assets/photos, without extension. */
  file: string;
  /** Alt text for THIS frame — never a shared caption across a dish's set. */
  alt: string;
}

export interface Price {
  /** Only set where the PDF prices one dish two ways (the oysters). */
  label?: string;
  /** Kept as a string so "58.8" stays exactly as Inari prints it. */
  amount: string;
}

export interface Dish {
  id: string;
  name: string;
  prices: Price[];
  description: string;
  dietary: Dietary[];
  origin: Origin | null;
  /** Inari prints a red star beside these on the menu itself. */
  signature: boolean;
  category: CategoryId;
  /** Where Inari's own two pages disagree about this dish. */
  note?: string;
}

export type CategoryId =
  | "cold-starters"
  | "hot-starters"
  | "sushi-nigiri"
  | "makimono"
  | "mains"
  | "signature"
  | "desserts"
  | "dessert-cocktails";

export interface Category {
  id: CategoryId;
  name: string;
  /** Short label for the bookmark rail, where horizontal room is scarce. */
  short: string;
}

/* Menu order, as printed. "Signature" is a section Inari prints as its own
   boxed panel — distinct from the red star, which marks individual dishes
   across several sections. Both exist on the PDF; conflating them would be
   a factual error. */
export const categories: Category[] = [
  { id: "cold-starters", name: "Cold Starters", short: "Cold" },
  { id: "hot-starters", name: "Hot Starters", short: "Hot" },
  { id: "sushi-nigiri", name: "Sushi Nigiri", short: "Nigiri" },
  { id: "makimono", name: "Makimono", short: "Makimono" },
  { id: "mains", name: "Mains", short: "Mains" },
  { id: "signature", name: "Signature", short: "Signature" },
  { id: "desserts", name: "Desserts", short: "Desserts" },
  { id: "dessert-cocktails", name: "Dessert Cocktails", short: "Cocktails" },
];

export const dishes = {
  "pacific-oyster-ponzu": {
    id: "pacific-oyster-ponzu",
    name: "Pacific Oyster Ponzu",
    prices: [
      { label: "Half Dozen", amount: "32.8" },
      { label: "Dozen", amount: "58.8" },
    ],
    description:
      "Oysters, Japanese Ponzu Jelly, Yarra Valley Caviar, Lemon and Chives",
    dietary: ["DF", "GF"],
    origin: "AUS",
    signature: false,
    category: "cold-starters",
  },
  "inari-sashimi": {
    id: "inari-sashimi",
    name: "Inari Sashimi 18pcs",
    prices: [{ amount: "76.8" }],
    description:
      "Chef selection of fresh Tuna, Kingfish, Hokkaido Scallop, Salmon Roe and Salmon",
    dietary: ["DF", "GF"],
    origin: "AUS",
    signature: true,
    category: "cold-starters",
  },
  "kingfish-carpaccio": {
    id: "kingfish-carpaccio",
    name: "Kingfish Carpaccio",
    prices: [{ amount: "29.8" }],
    description:
      "Hiramasa, Grape-seed dressing, Slightly torched Blood Orange and Neriume",
    dietary: ["DF", "GF"],
    origin: "AUS",
    signature: false,
    category: "cold-starters",
  },
  "spicy-salmon-salad": {
    id: "spicy-salmon-salad",
    name: "Spicy Salmon Salad",
    prices: [{ amount: "22.8" }],
    description:
      "Sliced lettuce, Sliced fennel, Cube Salmon, Crispy tempura with Spicy mayo",
    dietary: ["DF", "GF"],
    origin: "AUS",
    signature: false,
    category: "cold-starters",
  },
  "corn-cobs": {
    id: "corn-cobs",
    name: "Corn Cobs",
    prices: [{ amount: "17.8" }],
    description:
      "Cut Corn, Corn seasoning, Parmesan cheese, Chives, Beetroot purée",
    dietary: ["GF", "V"],
    origin: null,
    signature: false,
    category: "hot-starters",
    note: 'Inari\'s priced menu calls this "Corn Cobs"; its celiac-friendly list calls the same dish "Corn Ribs". Both names are theirs, so both are printed here.',
  },
  "vegetable-gyoza": {
    id: "vegetable-gyoza",
    name: "Vegetable Gyoza 5pcs",
    prices: [{ amount: "18.8" }],
    description:
      "Vegetable Gyoza, Avocado purée, sesame seeds, mixed herbs & Ponzu sauce",
    dietary: ["DF", "V"],
    origin: null,
    signature: false,
    category: "hot-starters",
  },
  "salmon-scallop": {
    id: "salmon-scallop",
    name: "Salmon & Scallop",
    prices: [{ amount: "21.8" }],
    description:
      "Long strip salmon, Japanese Scallop with Plum sauce, Teriyaki sauce, Chives and Chilli hair",
    dietary: ["DF", "GF"],
    origin: "AUS",
    signature: true,
    category: "sushi-nigiri",
  },
  "naked-crispy-salmon": {
    id: "naked-crispy-salmon",
    name: "Naked Crispy Salmon",
    prices: [{ amount: "29.8" }],
    description:
      "Fresh Salmon, Avocado, Sesame sauce, Topped Japanese Krispies",
    dietary: ["DF", "GF"],
    origin: "AUS",
    signature: true,
    category: "makimono",
  },
  "special-eel-sushi-roll": {
    id: "special-eel-sushi-roll",
    name: "Special Eel Sushi Roll",
    prices: [{ amount: "32.8" }],
    description:
      "Roasted Eel, Avocado, Pineapple, Philadelphia cheese, Asparagus",
    dietary: ["GF"],
    origin: "JAP",
    signature: false,
    category: "makimono",
  },
  "spicy-tuna-sushi-roll": {
    id: "spicy-tuna-sushi-roll",
    name: "Spicy Tuna Sushi Roll",
    prices: [{ amount: "28.8" }],
    description: "Freshly cut Tuna, Avocado, Spicy mayo",
    dietary: ["DF", "GF"],
    origin: "AUS",
    signature: false,
    category: "makimono",
  },
  "chicken-karaage": {
    id: "chicken-karaage",
    name: "Chicken Karaage",
    prices: [{ amount: "29.8" }],
    description:
      "250g Chicken thigh skin on serve with creamy plum sauce and Truffle mayo",
    dietary: ["DF", "GF"],
    origin: null,
    signature: false,
    category: "mains",
  },
  "pork-belly-glaze": {
    id: "pork-belly-glaze",
    name: "Pork Belly Glaze",
    prices: [{ amount: "26.8" }],
    description:
      "Pork Belly Cubes (3pcs) with Beetroot purée, sweet potato purée, micro herb",
    dietary: ["DF", "GF"],
    origin: null,
    signature: false,
    category: "signature",
  },
  "patagonian-toothfish": {
    id: "patagonian-toothfish",
    name: "Patagonian Toothfish",
    prices: [{ amount: "58.8" }],
    description:
      "Marinated Tooth-fish for 3 days in caramelised Miso, Pickled vegetable, Puff quinoa, Miso Jelly",
    dietary: ["DF"],
    origin: "AUS",
    signature: false,
    category: "signature",
  },
  "sorry-mum": {
    id: "sorry-mum",
    name: "Sorry Mum",
    prices: [{ amount: "16.8" }],
    description: "Mixed Ice Cream, Crushed cookies, waffle cones crushed and nuts",
    dietary: [],
    origin: null,
    signature: false,
    category: "desserts",
  },
  "ice-cream-tempura": {
    id: "ice-cream-tempura",
    name: "Ice Cream Tempura",
    prices: [{ amount: "18.8" }],
    description:
      "Vanilla Ice Cream, Panko bread crumbs, Dulce de Leche, Fairy Floss",
    dietary: ["GF"],
    origin: null,
    signature: false,
    category: "desserts",
  },
  churros: {
    id: "churros",
    name: "Churros 4pcs",
    prices: [{ amount: "19.8" }],
    description:
      "Churros mix Ice Cream, Cinnamon powder with sugar, Vanilla custard",
    dietary: [],
    origin: null,
    signature: false,
    category: "desserts",
  },
  "matcha-tiramisu": {
    id: "matcha-tiramisu",
    name: "Matcha Tiramisu",
    prices: [{ amount: "26.8" }],
    description:
      "Blended Kahlua, Little drippa, Vanilla vodka, Cream, Japanese matcha",
    dietary: [],
    origin: null,
    signature: false,
    category: "dessert-cocktails",
  },
} as const satisfies Record<string, Dish>;

export type DishId = keyof typeof dishes;

/* ---- The book ------------------------------------------------------------
 *
 * 16 pages, 17 dishes. Two pages are openers: a single photograph that shows
 * several plates at once. Rather than invent a combined dish to caption them
 * with, an opener names each real dish in the frame, each with its own real
 * price and markers, and links to that dish's own page where one exists.
 */

interface BasePage {
  id: string;
  category: CategoryId;
  photos: Photo[];
}

export interface DishBookPage extends BasePage {
  kind: "dish";
  dish: DishId;
}

export interface OpenerBookPage extends BasePage {
  kind: "opener";
  title: string;
  /** What the frame shows, in the order it reads, so a plate is identifiable. */
  caption: string;
  dishesShown: DishId[];
}

export type BookPage = DishBookPage | OpenerBookPage;

export const book: BookPage[] = [
  {
    kind: "dish",
    id: "pacific-oyster-ponzu",
    category: "cold-starters",
    dish: "pacific-oyster-ponzu",
    photos: [
      {
        file: "starter-ponzu",
        alt: "A tray of oysters on crushed ice with a standing bamboo leaf, on a timber table beside a cocktail.",
      },
      {
        file: "starter-ponzu-2",
        alt: "Closer in: each shell holds dark ponzu jelly and orange roe, with a lemon wedge alongside.",
      },
      {
        file: "starter-ponzu-3",
        alt: "Overhead — a dozen oysters ringed on crushed ice in a dark bowl, herbs and lemon at the centre.",
      },
    ],
  },
  {
    kind: "dish",
    id: "inari-sashimi",
    category: "cold-starters",
    dish: "inari-sashimi",
    photos: [
      {
        file: "starter-inari-sashimi",
        alt: "A wooden serving boat of assorted sashimi with a bamboo leaf, a sunflower, lemon and wasabi.",
      },
    ],
  },
  {
    kind: "dish",
    id: "kingfish-carpaccio",
    category: "cold-starters",
    dish: "kingfish-carpaccio",
    photos: [
      {
        file: "starter-kingfish-carpacio",
        alt: "A blue wave-patterned plate against black, thin kingfish slices interleaved with torched blood orange.",
      },
      {
        file: "starter-kingfish-carpacio-2",
        alt: "The same plate overhead on timber, with a small dish of grape-seed dressing beside it.",
      },
    ],
  },
  {
    kind: "dish",
    id: "spicy-salmon-salad",
    category: "cold-starters",
    dish: "spicy-salmon-salad",
    photos: [
      {
        file: "starter-salmon-salad",
        alt: "A deep bowl of salad piled with crisp tempura and a nest of fine red chilli threads.",
      },
      {
        file: "starter-salmon-salad-2",
        alt: "A grey-green bowl of the same salad, crisp tempura over sliced leaves and fennel.",
      },
    ],
  },
  {
    kind: "dish",
    id: "corn-cobs",
    category: "hot-starters",
    dish: "corn-cobs",
    photos: [
      {
        file: "starter-corn-ribs",
        alt: "Cut corn on a blue wave-patterned plate against black, with a swipe of orange purée.",
      },
      {
        file: "starter-corn-ribs-2",
        alt: "A hand reaching for the corn plate, beetroot and orange purées beside the pieces.",
      },
      {
        file: "starter-corn-ribs-3",
        alt: "Overhead on timber, the corn plate among other dishes, dusted with cheese and chives.",
      },
    ],
  },
  {
    kind: "dish",
    id: "vegetable-gyoza",
    category: "hot-starters",
    dish: "vegetable-gyoza",
    photos: [
      {
        file: "starter-veg-gyoza",
        alt: "Gyoza on a blue wave-patterned plate, chopsticks lifting one, edamame and a wine glass behind.",
      },
    ],
  },
  {
    kind: "dish",
    id: "salmon-scallop",
    category: "sushi-nigiri",
    dish: "salmon-scallop",
    photos: [
      {
        file: "nigiri-salmon-scallop",
        alt: "Three nigiri on a dark board, each crowned with a nest of fine red chilli threads.",
      },
      {
        file: "nigiri-salmon-scallop-2",
        alt: "Chopsticks holding a single nigiri with chilli threads, a water glass warm behind.",
      },
    ],
  },
  {
    kind: "opener",
    id: "makimono",
    category: "makimono",
    title: "Makimono",
    caption:
      "One table, three of Inari's rolls. The long platter at the back carries the eel roll under scallions and roe; in front of it, the tuna roll under spicy mayo and chilli threads; and on the pale plate, the salmon roll under tempura crisps. Each has its own page.",
    dishesShown: [
      "special-eel-sushi-roll",
      "spicy-tuna-sushi-roll",
      "naked-crispy-salmon",
    ],
    photos: [
      {
        file: "makimono-salmon-tuna-eel",
        alt: "Two long platters side by side — one roll topped with chilli threads, one with tempura crisps — beside a wine glass.",
      },
      {
        file: "makimono-salmon-tuna-eel-2",
        alt: "Three platters on a timber table: a green plate of rolls, a dark plate, and an orange drink.",
      },
      {
        file: "makimono-salmon-tuna-eel-3",
        alt: "Overhead — chopsticks reaching for a roll topped with salmon roe, a second roll under crisps alongside.",
      },
      {
        file: "makimono-salmon-tuna-eel-4",
        alt: "A long black platter of rolls under chilli threads, a wine glass and leather banquette behind.",
      },
    ],
  },
  {
    kind: "dish",
    id: "naked-crispy-salmon",
    category: "makimono",
    dish: "naked-crispy-salmon",
    photos: [
      {
        file: "makimono-crispy-salmon",
        alt: "Chopsticks lifting one piece from a roll topped with tempura crisps, warm lights out of focus behind.",
      },
    ],
  },
  {
    kind: "dish",
    id: "special-eel-sushi-roll",
    category: "makimono",
    dish: "special-eel-sushi-roll",
    photos: [
      {
        file: "makimono-eel",
        alt: "A long dark plate of eel roll, a hand reaching in, a green platter behind.",
      },
    ],
  },
  {
    kind: "dish",
    id: "spicy-tuna-sushi-roll",
    category: "makimono",
    dish: "spicy-tuna-sushi-roll",
    photos: [
      {
        file: "makimono-spicy-tuna",
        alt: "Chopsticks lifting a piece of the tuna roll under spicy mayo, a wine glass behind.",
      },
    ],
  },
  {
    kind: "dish",
    id: "chicken-karaage",
    category: "mains",
    dish: "chicken-karaage",
    photos: [
      {
        file: "main-chicken-karage",
        alt: "A black plate on timber: fried chicken thigh with a swipe of plum sauce, truffle mayo, a purple flower and lemon.",
      },
    ],
  },
  {
    kind: "dish",
    id: "pork-belly-glaze",
    category: "signature",
    dish: "pork-belly-glaze",
    photos: [
      {
        file: "mains-porks-belly",
        alt: "Pork belly cubes with beetroot and sweet potato purées on a white plate, a pink cocktail held behind.",
      },
      {
        file: "mains-pork-belly-2",
        alt: "The same plate from above — three cubes, magenta beetroot purée, orange purée and edible flowers.",
      },
    ],
  },
  {
    kind: "dish",
    id: "patagonian-toothfish",
    category: "signature",
    dish: "patagonian-toothfish",
    photos: [
      {
        file: "main-potagonian-tootfish",
        alt: "Overhead on an olive-green ceramic plate: the miso-caramelised toothfish, charred at one edge, with a curved smear of miso jelly.",
      },
    ],
  },
  {
    kind: "opener",
    id: "desserts",
    category: "desserts",
    title: "Desserts",
    caption:
      "All three desserts, on one table. Back left, the waffle cones with crushed cookies and berries — that is Sorry Mum. Back right, the crumbed dome under fairy floss — Ice Cream Tempura. On the dark plate in front, churros with a scoop of ice cream. These three are photographed together and nowhere else, so this page is the whole Desserts section.",
    dishesShown: ["sorry-mum", "ice-cream-tempura", "churros"],
    photos: [
      {
        file: "dessert-icecream-churos-sorrymom",
        alt: "Three desserts across one table: waffle cones with crushed cookies and berries at the back left, a crumbed dome under pink fairy floss at the back right, and churros with a scoop of ice cream on a dark plate in front.",
      },
    ],
  },
  {
    kind: "dish",
    id: "matcha-tiramisu",
    category: "dessert-cocktails",
    dish: "matcha-tiramisu",
    photos: [
      {
        file: "drinks-matcha-tiramisu",
        alt: "A tall glass of layered matcha cocktail dusted with cocoa, on a dark table beside chopsticks.",
      },
    ],
  },
];

/* ---- The kitchen ----------------------------------------------------------
 * Four photographs that are not dishes and never get a dish caption. Their
 * job is people and process (decision-context §9).
 */
export const kitchenPhotos: Photo[] = [
  {
    file: "chef-prep",
    alt: "A chef's hands finishing a bowl at a steel bench, prep bowls of cubed salmon and sauce beside a knife and board.",
  },
  {
    file: "chef-cook-ponzu",
    alt: "A chef leaning over a tray of oysters on ice, setting a bamboo leaf in place.",
  },
  {
    file: "chef-prep-2",
    alt: "Hands laying a bamboo leaf across a tray of sashimi on crushed ice.",
  },
  {
    file: "chef-alone",
    alt: "A chef working alone at the pass under a paper lantern, plating on a white board.",
  },
];

/* ---- Fine print, carried verbatim ---------------------------------------
 * These strings are reproduced exactly as the PDF prints them. Anything
 * rendering them must mark itself data-verbatim so the paste test knows this
 * text is quoted on purpose (spec/crit-2.test.ts).
 */

export const ADVISORY =
  "Please advise your waiter of any dietary requirements or allergies you may have.";

export const MARKER_KEY: Record<Dietary, string> = {
  GF: "Gluten Free",
  DF: "Dairy Free",
  V: "Vegetarian",
};

export const SURCHARGES =
  "All card transactions insure a 1.8% processing fee / a 10% service charge applied to all groups of 10+ / a 15% surcharge applies on all public holidays";

export const SOURCE = {
  label: "inari menu 25 Jun.pdf",
  slug: "25/6/2026 14:09",
  url: "https://inari.restaurant/s/inari-menu-25-Jun-1.pdf",
  /* Roughly 45 dishes are priced across the PDF's two pages; this book shows
     17. The exact total is not something we can state precisely without
     counting ambiguous set-menu inclusions, so the page says "about". */
  totalDishesApprox: 45,
} as const;

export const dishList = Object.values(dishes) as Dish[];

export function dishById(id: DishId): Dish {
  return dishes[id] as Dish;
}

/** First page index for each category, for the bookmark rail. */
export const categoryStart = new Map<CategoryId, number>(
  categories
    .map((c) => [c.id, book.findIndex((p) => p.category === c.id)] as const)
    .filter(([, i]) => i >= 0),
);
