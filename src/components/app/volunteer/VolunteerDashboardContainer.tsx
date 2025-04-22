"use client";

import ProtectedRoute from "@/components/app/auth/ProtectedRoute";
import { UserRole } from "@/interfaces/authInterfaces";
import { useAuth } from "@/providers/auth/AuthProvider";
import Link from "next/link";
import { FaDog, FaHandHoldingHeart, FaEnvelope, FaPaw, FaHeart, FaHandshake } from "react-icons/fa";

export default function VolunteerDashboardContainer() {
    const { user, logout } = useAuth();

    return (
        <ProtectedRoute allowedRoles={[UserRole.VOLUNTEER, UserRole.ADMIN]}>
            <div className="h-full bg-white">
                <div className="max-w-screen-xl mx-auto px-8 py-11 md:py-12">
                    <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center">
                        <h1 className="text-3xl font-bold text-primary-700 mb-4 md:mb-0">
                            Área do Voluntário
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
                            Esta é a área do voluntário do Buridogs. Aqui você pode acompanhar
                            solicitações pendentes e gerenciar o conteúdo do site.
                        </p>
                    </div>

                    {/* Pending Requests Section */}
                    <h3 className="text-2xl font-bold text-primary-700 mb-5">
                        Solicitações Pendentes
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                            <div className="flex items-start">
                                <FaDog className="text-primary-400 text-2xl mr-3 mt-1" />
                                <div>
                                    <h3 className="text-lg font-semibold text-primary-700 mb-2">
                                        Adoções Pendentes
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        Solicitações de adoção para aprovação
                                    </p>
                                </div>
                            </div>
                            <div className="bg-blue-50 p-3 rounded">
                                <p className="text-blue-800 text-sm">
                                    5 solicitações para analisar
                                </p>
                            </div>
                            <Link
                                href="/volunteer/adocoes-pendentes"
                                className="mt-4 inline-block text-primary-400 font-medium hover:text-primary-700 transition-colors"
                            >
                                Ver detalhes &rarr;
                            </Link>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                            <div className="flex items-start">
                                <FaHandHoldingHeart className="text-primary-400 text-2xl mr-3 mt-1" />
                                <div>
                                    <h3 className="text-lg font-semibold text-primary-700 mb-2">
                                        Apadrinhamentos Pendentes
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        Solicitações de apadrinhamento para aprovação
                                    </p>
                                </div>
                            </div>
                            <div className="bg-green-50 p-3 rounded">
                                <p className="text-green-800 text-sm">
                                    3 solicitações para analisar
                                </p>
                            </div>
                            <Link
                                href="/volunteer/apadrinhamentos-pendentes"
                                className="mt-4 inline-block text-primary-400 font-medium hover:text-primary-700 transition-colors"
                            >
                                Ver detalhes &rarr;
                            </Link>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                            <div className="flex items-start">
                                <FaEnvelope className="text-primary-400 text-2xl mr-3 mt-1" />
                                <div>
                                    <h3 className="text-lg font-semibold text-primary-700 mb-2">
                                        Contatos Pendentes
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        Mensagens de contato para resposta
                                    </p>
                                </div>
                            </div>
                            <div className="bg-amber-50 p-3 rounded">
                                <p className="text-amber-800 text-sm">7 mensagens não lidas</p>
                            </div>
                            <Link
                                href="/volunteer/contatos-pendentes"
                                className="mt-4 inline-block text-primary-400 font-medium hover:text-primary-700 transition-colors"
                            >
                                Ver detalhes &rarr;
                            </Link>
                        </div>
                    </div>

                    {/* Content Management Section */}
                    <h3 className="text-2xl font-bold text-primary-700 mb-5">
                        Gerenciamento de Conteúdo
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                            <div className="flex items-start">
                                <FaPaw className="text-primary-400 text-2xl mr-3 mt-1" />
                                <div>
                                    <h3 className="text-lg font-semibold text-primary-700 mb-2">
                                        Gerenciar Cachorros
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        Adicionar, editar ou remover cachorros para adoção
                                    </p>
                                </div>
                            </div>
                            <Link
                                href="/volunteer/gerenciar-cachorros"
                                className="mt-4 inline-block text-primary-400 font-medium hover:text-primary-700 transition-colors"
                            >
                                Gerenciar &rarr;
                            </Link>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                            <div className="flex items-start">
                                <FaHeart className="text-primary-400 text-2xl mr-3 mt-1" />
                                <div>
                                    <h3 className="text-lg font-semibold text-primary-700 mb-2">
                                        Gerenciar Finais Felizes
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        Adicionar, editar ou remover histórias de sucesso
                                    </p>
                                </div>
                            </div>
                            <Link
                                href="/volunteer/gerenciar-finais-felizes"
                                className="mt-4 inline-block text-primary-400 font-medium hover:text-primary-700 transition-colors"
                            >
                                Gerenciar &rarr;
                            </Link>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                            <div className="flex items-start">
                                <FaHandshake className="text-primary-400 text-2xl mr-3 mt-1" />
                                <div>
                                    <h3 className="text-lg font-semibold text-primary-700 mb-2">
                                        Gerenciar Parceiros
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        Adicionar, editar ou remover parceiros
                                    </p>
                                </div>
                            </div>
                            <Link
                                href="/volunteer/gerenciar-parceiros"
                                className="mt-4 inline-block text-primary-400 font-medium hover:text-primary-700 transition-colors"
                            >
                                Gerenciar &rarr;
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
