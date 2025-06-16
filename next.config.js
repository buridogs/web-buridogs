/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    experimental: {
        appDir: true,
    },
    images: {
        unoptimized: true,
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
