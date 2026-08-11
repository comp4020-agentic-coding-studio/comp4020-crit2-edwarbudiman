import { defineConfig } from "astro/config";

// The deployed site lives at comp4020-agentic-coding-studio.github.io/comp4020-crit2-edwarbudiman/,
// a subpath — Astro needs both set explicitly or its emitted asset URLs 404 once deployed.
export default defineConfig({
  site: "https://comp4020-agentic-coding-studio.github.io",
  base: "/comp4020-crit2-edwarbudiman/",
});
