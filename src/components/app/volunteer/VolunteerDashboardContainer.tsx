"use client";

import ProtectedRoute from "@/components/app/auth/ProtectedRoute";
import { PrivateRoutes } from "@/components/Header/routes-ui";
import { useFormRequests } from "@/hooks/form-requests-hook";
import { UserRole } from "@/interfaces/authInterfaces";
import { useAuth } from "@/providers/auth/AuthProvider";
import { FormRequestStatusEnum } from "@/services/api/modules/form-requests/types";
import Link from "next/link";
import { FaEnvelope, FaHandshake, FaPaw } from "react-icons/fa";

export default function VolunteerDashboardContainer() {
    const { user, logout } = useAuth();
    const { formRequests, isLoading: formRequestsLoading } = useFormRequests({
        shouldFetch: true,
    });

    const pendingRequests = formRequests.filter(
        (request) => request.status === FormRequestStatusEnum.pending
    );

    return (
        <ProtectedRoute allowedRoles={[UserRole.VOLUNTEER, UserRole.ADMIN]}>
            <div className="h-full bg-white">
                <div className="max-w-screen-xl mx-auto px-8 py-11 mt-20 md:py-12 md:mt-0">
                    <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center">
                        <h1 className="text-3xl font-bold text-primary-700 mb-4 md:mb-0">
                            Área do Voluntário
                        </h1>
                        <button
                            onClick={logout}
                            className="py-2 px-4 bg-red-600 rounded-lg hover:bg-red-700 transition-colors text-gray-200 max-w-fit"
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
                                <FaEnvelope className="text-primary-400 text-2xl mr-3 mt-1" />
                                <div>
                                    <h3 className="text-lg font-semibold text-primary-700 mb-2">
                                        Solicitações Pendentes
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        Mensagens de contato para resposta
                                    </p>
                                </div>
                            </div>
                            <div className="bg-amber-50 p-3 rounded">
                                {formRequestsLoading ? (
                                    <p className="text-gray-500">Carregando...</p>
                                ) : (
                                    <p className="text-amber-800 text-sm">
                                        {pendingRequests.length > 0
                                            ? pendingRequests.length
                                            : "Nenhuma "}{" "}
                                        {pendingRequests.length > 1
                                            ? "mensagens não lidas"
                                            : "mensagem não lida"}
                                    </p>
                                )}
                            </div>
                            <Link
                                href={PrivateRoutes.REQUESTS_PENDING}
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
                                href={PrivateRoutes.MANAGE_DOGS}
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
                                href={PrivateRoutes.MANAGE_PARTNERS}
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
