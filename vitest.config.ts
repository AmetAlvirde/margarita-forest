import { defineConfig, coverageConfigDefaults } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        "./src/**/*.stories.ts",
        "./src/lib/**",
        ...coverageConfigDefaults.exclude,
      ],
      reporter: ["text", "json", "html"],
    },
  },
});
