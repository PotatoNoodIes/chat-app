import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // Enables polling for file changes
    },
    hmr: {
      overlay: true, // Ensures error overlay works properly
    },
    host: true, // Allows access from external devices
  },
});
