/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    experimental: {
        appDir: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "buridogsstorage.blob.core.windows.net",
                port: "",
                pathname: "/files/**",
            },
            {
                protocol: "https",
                hostname: "buridogsstorage.blob.core.windows.net",
                port: "",
                pathname: "/partner-management/**",
            },
            {
                protocol: "https",
                hostname: "buridogsstorage.blob.core.windows.net",
                port: "",
                pathname: "/dogs-management/**",
            },
            {
                protocol: "https",
                hostname: "buridogsstorage.blob.core.windows.net",
                port: "",
                pathname: "/adoption-form/**",
            },
        ],
    },
};

module.exports = nextConfig;
