/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    include: ["./app/**/*.test.{ts,tsx}"],
    environment: "happy-dom",
    setupFiles: ["./test/setup-test.ts"],
  },
});
