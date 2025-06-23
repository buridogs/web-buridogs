import "react-alice-carousel/lib/alice-carousel.css";
import "./globals.css";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ToastProvider from "@/providers/ToastProvider";
import { TracerTagsWrapper } from "@/components/TracerTagsWrapper/TracerTagsWrapper";
import { AuthProvider } from "@/providers/auth/AuthProvider";
import { Header } from "@/components/Header/HeaderWrapper";
import { Footer } from "@/components/Footer/Footer";

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
        <html lang="pt-BR">
            <body className={`${inter.className} flex flex-col h-screen`}>
                <ToastProvider>
                    <AuthProvider>
                        <Header />
                        <div className="flex flex-col flex-1">
                            <main>{children}</main>
                        </div>
                        <Footer />
                    </AuthProvider>
                </ToastProvider>
                <TracerTagsWrapper />
            </body>
        </html>
    );
}
