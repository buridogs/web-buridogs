"use client";

import ProtectedRoute from "@/components/app/auth/ProtectedRoute";
import { UserRole } from "@/interfaces/authInterfaces";
import { useAuth } from "@/providers/auth/AuthProvider";
import Link from "next/link";

export default function AdminDashboardContainer() {
    const { user, logout } = useAuth();

    return (
        <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
            <main className="bg-white">
                <div className="max-w-screen-xl mx-auto px-8 py-11 md:py-12">
                    <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center">
                        <h1 className="text-3xl font-bold text-primary-700 mb-4 md:mb-0">
                            Dashboard Administrativo
                        </h1>
                        <button
                            onClick={logout}
                            className="py-2 px-4 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors text-gray-800 max-w-fit"
                        >
                            Sair
                        </button>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg shadow mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Bem-vindo, {user?.name}
                        </h2>
                        <p className="text-gray-600">
                            Este é o painel administrativo do Buridogs. Aqui você pode gerenciar o
                            conteúdo do site.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                            <h3 className="text-lg font-semibold text-primary-700 mb-2">Adoções</h3>
                            <p className="text-gray-600 mb-4">
                                Gerenciar cachorros disponíveis para adoção
                            </p>
                            <Link
                                href="#"
                                className="text-primary-400 font-medium hover:text-primary-700 transition-colors"
                            >
                                Gerenciar &rarr;
                            </Link>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                            <h3 className="text-lg font-semibold text-primary-700 mb-2">
                                Finais Felizes
                            </h3>
                            <p className="text-gray-600 mb-4">Adicionar novos casos de sucesso</p>
                            <Link
                                href="#"
                                className="text-primary-400 font-medium hover:text-primary-700 transition-colors"
                            >
                                Gerenciar &rarr;
                            </Link>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                            <h3 className="text-lg font-semibold text-primary-700 mb-2">
                                Parceiros
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Gerenciar parceiros e patrocinadores
                            </p>
                            <Link
                                href="#"
                                className="text-primary-400 font-medium hover:text-primary-700 transition-colors"
                            >
                                Gerenciar &rarr;
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                        <h3 className="text-lg font-semibold text-primary-700 mb-4">
                            Usuários e Permissões
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Gerenciar acesso ao painel administrativo
                        </p>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b text-left">Nome</th>
                                        <th className="py-2 px-4 border-b text-left">Email</th>
                                        <th className="py-2 px-4 border-b text-left">Função</th>
                                        <th className="py-2 px-4 border-b text-left">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="py-2 px-4 border-b">Admin User</td>
                                        <td className="py-2 px-4 border-b">admin@buridogs.org</td>
                                        <td className="py-2 px-4 border-b">
                                            <span className="bg-blue-100 text-blue-800 py-1 px-2 rounded-full text-xs">
                                                Administrador
                                            </span>
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            <Link
                                                href="#"
                                                className="text-primary-400 hover:text-primary-700 mr-2"
                                            >
                                                Editar
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b">Volunteer User</td>
                                        <td className="py-2 px-4 border-b">
                                            volunteer@buridogs.org
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            <span className="bg-green-100 text-green-800 py-1 px-2 rounded-full text-xs">
                                                Voluntário
                                            </span>
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            <Link
                                                href="#"
                                                className="text-primary-400 hover:text-primary-700 mr-2"
                                            >
                                                Editar
                                            </Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </ProtectedRoute>
    );
}
