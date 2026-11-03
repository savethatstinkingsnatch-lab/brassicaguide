import { resolve } from "node:path";
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [viteReact(), tailwindcss()],
  resolve: {
    alias: { "@": resolve(import.meta.dirname, "src") },
  },
  base: "./",
  publicDir: false,
  build: {
    outDir: "dist-offline",
    emptyOutDir: true,
    assetsInlineLimit: 12_000_000,
    cssCodeSplit: false,
    modulePreload: false,
    rollupOptions: {
      input: resolve(import.meta.dirname, "src/offline/index.html"),
      output: { inlineDynamicImports: true },
    },
  },
});
