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
        ],
    },
};

module.exports = nextConfig;
