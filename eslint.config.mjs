import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import eslintConfigPrettier from "eslint-config-prettier";
import stylisticJs from "@stylistic/eslint-plugin-js";

export default [
    {
        files: ["**/*.ts", "**/*.tsx"],
        rules: {
            semi: ["error", "always"],
            quotes: ["error", "double"],
            "no-unused-vars": "error",
            "no-undef": "error",
            "no-console": "error",
            "prefer-const": "error",
            "no-const-assign": "error",
            "no-duplicate-imports": "error",
            "default-case": "error",
            eqeqeq: ["error", "always"],
            "sort-imports": [
                "error",
                {
                    ignoreCase: true,
                    ignoreDeclarationSort: true,
                    ignoreMemberSort: false,
                    memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
                },
            ],
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
