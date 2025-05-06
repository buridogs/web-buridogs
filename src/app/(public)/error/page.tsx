"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ErrorPageProps {
    error?: Error;
    reset?: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
    const router = useRouter();

    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Unhandled error:", error);
    }, [error]);

    const handleGoBack = () => {
        if (window.history.length > 1) {
            router.back();
        } else {
            router.push("/");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-gray-50">
            <div className="w-full max-w-md text-center space-y-8">
                {/* Logo */}
                <div className="flex justify-center">
                    <Image
                        src="/logo-buridogs.png"
                        alt="Buridogs Logo"
                        width={180}
                        height={60}
                        className="h-auto"
                        priority
                    />
                </div>

                {/* Cute dog image */}
                <div className="relative w-64 h-64 mx-auto">
                    <Image
                        src="/contato-cachorro.jpg"
                        alt="Cachorro triste"
                        fill
                        className="object-cover rounded-full"
                    />
                </div>

                {/* Error message */}
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold text-primary-500">Ops!</h1>
                    <p className="text-xl text-gray-600">
                        Algo deu errado, mas estamos trabalhando nisso.
                    </p>
                    {error && process.env.NODE_ENV !== "production" && (
                        <p className="p-4 mt-4 text-sm text-red-700 bg-red-100 rounded-md">
                            {error.message || "Um erro desconhecido ocorreu"}
                        </p>
                    )}
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                    <button
                        onClick={handleGoBack}
                        className="px-6 py-3 text-white bg-primary-500 rounded-md hover:bg-primary-600 transition-colors"
                    >
                        Voltar
                    </button>

                    {reset && (
                        <button
                            onClick={reset}
                            className="px-6 py-3 text-primary-500 border border-primary-500 rounded-md hover:bg-primary-50 transition-colors"
                        >
                            Tentar novamente
                        </button>
                    )}

                    <Link
                        href="/"
                        className="px-6 py-3 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                    >
                        Página inicial
                    </Link>
                </div>
            </div>
        </div>
    );
}
