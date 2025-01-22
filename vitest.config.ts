/// <reference types="@vitest/browser/providers/playwright" />

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      provider: "playwright",
      instances: [{ browser: "chromium" }],
      testerHtmlPath: "./index.html",
      headless: true,
      viewport: { width: 1200, height: 800 },
    },
    testTimeout: 3000,
  },
});
