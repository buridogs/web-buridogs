/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
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
