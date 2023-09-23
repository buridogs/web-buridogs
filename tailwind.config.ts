import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                primary: {
                    100: "#F4A551",
                    400: "#EF7E07",
                    700: "#E44E02",
                },
                grey: {
                    100: "#6E787E",
                    400: "#303E46",
                    700: "#131B20",
                },
                blue: {
                    100: "#4EACDF",
                    400: "#0288D1",
                    700: "#0158B5",
                },
                green: {
                    100: "#68C690",
                    400: "#27AE60",
                    700: "#0E8433",
                },
                yellow: {
                    100: "#EBCE76",
                    400: "#E2B93B",
                    700: "#CF9319",
                },
                red: {
                    100: "#EC6969",
                    400: "#CD2929",
                    700: "#AE0F0F",
                },
            },
        },
    },
    plugins: [],
};
export default config;
