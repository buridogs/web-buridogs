import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Acesso Não Autorizado",
    description: "Você não tem permissão para acessar esta página",
    openGraph: {
        images: ["logo-buridogs.png"],
    },
};

export default function UnauthorizedPage() {
    return (
        <main className="bg-white">
            <div className="max-w-screen-xl mx-auto px-8 py-20 flex flex-col items-center justify-center min-h-[60vh]">
                <h1 className="text-4xl font-bold text-primary-700 mb-6">Acesso Não Autorizado</h1>
                <p className="text-xl text-gray-700 mb-8 text-center">
                    Você não tem permissão para acessar esta página. Por favor, entre em contato com
                    um administrador se acredita que isso é um erro.
                </p>
                <div className="flex gap-4">
                    <Link
                        href="/"
                        className="px-6 py-3 bg-primary-400 text-white rounded-3xl hover:bg-primary-700 transition-colors"
                    >
                        Voltar para Início
                    </Link>
                    <Link
                        href="/login"
                        className="px-6 py-3 bg-gray-200 text-gray-800 rounded-3xl hover:bg-gray-300 transition-colors"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </main>
    );
}
