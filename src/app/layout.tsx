import "react-alice-carousel/lib/alice-carousel.css";
import "./globals.css";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import ToastProvider from "@/providers/ToastProvider";
import { initializeClarity } from "@/services/clarity/clarity-tag";
import Script from "next/script";

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
            <head>
                <Script id="clarity">{initializeClarity()}</Script>
            </head>
            <body className={`${inter.className} flex flex-col`}>
                <ToastProvider>
                    <Header />
                    <main className="flex-auto pt-[110px]">{children}</main>
                    <Footer />
                </ToastProvider>
            </body>
        </html>
    );
}
