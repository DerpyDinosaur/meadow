import { defineConfig } from "vitest/config";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  test: {
    environment: "jsdom",
    exclude: ["node_modules/**", ".svelte-kit/**", "dist/**"],
  },
  resolve: process.env.VITEST ? { conditions: ["browser"] } : undefined,
});
