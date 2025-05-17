import { defineConfig } from "vite";
import pkg from "./package.json";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5000,
  },
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version), // ← gets injected globally
  },
});
