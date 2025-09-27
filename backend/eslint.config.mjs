import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default {
  languageOptions: {
    parser: tsParser,
  },
  plugins: {
    "@typescript-eslint": tseslint,
  },
  rules: {
    "no-unused-vars": "error",
    "no-console": "warn",
    "prefer-const": "error",
    "no-console": "off",
  },
  ignores: ["dist", "node_modules"],
  languageOptions: {
    globals: {
      // Node.js globals
      require: "readonly",
      module: "readonly",
      exports: "readonly",
      process: "readonly",
      console: "readonly",
    },
  },
};