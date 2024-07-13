import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
    {
        files: ["src/**/*.{js,mjs,cjs,ts,jsx,tsx}"],
        rules: {
            semi: ["error", "always"],
            quotes: ["error", "double"],
            "no-unused-vars": "error",
        },
        plugins: {
            pluginReactConfig,
            eslintConfigPrettier,
        },
    },
    { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
];
