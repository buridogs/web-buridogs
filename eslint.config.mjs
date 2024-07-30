import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import eslintConfigPrettier from "eslint-config-prettier";
import stylisticJs from "@stylistic/eslint-plugin-js";

export default [
    {
        files: ["src/**/*.{ts,tsx}"],
        rules: {
            semi: ["error", "always"],
            quotes: ["error", "double"],
            "no-unused-vars": "error",
        },
        plugins: {
            pluginReactConfig,
            eslintConfigPrettier,
            stylisticJs,
        },
    },
    { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
];
