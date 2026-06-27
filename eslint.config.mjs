import { sheriff } from "eslint-config-sheriff";
import { defineConfig } from "eslint/config";

const sheriffOptions = {
  // files: ["src/**/*"], // Only the files in the src directory will be linted.
  react: true,
  next: true,
  astro: false,
  lodash: false,
  remeda: false,
  playwright: false,
  storybook: false,
  jest: false,
  vitest: false,
  tsconfigRootDir: import.meta.dirname,
};

export default defineConfig(sheriff(sheriffOptions));
