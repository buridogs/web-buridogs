import "react-alice-carousel/lib/alice-carousel.css";
import "./globals.css";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ToastProvider from "@/providers/ToastProvider";
import { TracerTagsWrapper } from "@/components/TracerTagsWrapper/TracerTagsWrapper";
import { AuthProvider } from "@/providers/auth/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        default: "",
        template: " %s | Buri Dogs",
    },
    description: "",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body className={`${inter.className} flex flex-col`}>
                <ToastProvider>
                    <AuthProvider>{children}</AuthProvider>
                </ToastProvider>
                <TracerTagsWrapper />
            </body>
        </html>
    );
}
