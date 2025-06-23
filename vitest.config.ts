// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
    plugins: [react()],
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: ["./tests/vitest.setup.ts"],
        alias: {
            "@": resolve(__dirname, "./src"),
        },
        env: {
            NEXT_PUBLIC_AZURE_STORAGE_ACCOUNT_NAME: "mockstorageaccount",
            NEXT_PUBLIC_AZURE_STORAGE_SAS_TOKEN: "mockSasToken",
            NEXT_PUBLIC_AZURE_STORAGE_CONTAINER_NAME: "mockcontainer",
            NEXT_PUBLIC_AZURE_STORAGE_ADOPTION_FORM_CONTAINER_NAME: "mockadoptioncontainer",
            NEXT_PUBLIC_AZURE_FUNCTION_KEY_SEND_EMAIL_FUNCTION_ADOCAO_FORM: "mockfunctionkey",
            NEXT_PUBLIC_AZURE_STORAGE_PARTNERS_CONTAINER_NAME: "mockpartnerscontainer",
            NEXT_PUBLIC_AZURE_STORAGE_DOGS_CONTAINER_NAME: "mockdogscontainer",
        },
        coverage: {
            provider: "v8", // Use o provider v8 para cobertura
            reporter: ["text", "json", "html", "lcov"],
            exclude: [
                "node_modules/",
                "tests/",
                "**/*.d.ts",
                "**/*.test.{ts,tsx}",
                "vitest.config.ts",
                "next.config.js",
                "**/*.js",
                "*Mock.ts",
                "**/interfaces/*",
                "**/mock/*",
                "**/mock.ts",
                "**/*Types.ts",
                "**/types.ts",
                "**/consts.ts",
                "**/page.tsx",
                "*.mjs",
                "*.config.ts",
                ".next/",
            ],
            thresholds: {
                // statements: 80,
                // branches: 70,
                // functions: 80,
                // lines: 80,
            },
        },
    },
});
