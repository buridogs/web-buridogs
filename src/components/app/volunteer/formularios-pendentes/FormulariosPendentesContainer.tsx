"use client";

import { useAuth } from "@/providers/auth/AuthProvider";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FormulariosPendentesTable } from "./FormulariosPendentesTable";
import { FormulariosPendentesModal } from "./FormulariosPendentesModal";
import {
    pendingAdocoesMock,
    pendingApadrinhamentosMock,
    pendingContatosMock,
} from "@/mock/pendingAdocaoMock";
import { toast } from "react-toastify";
import { UserRole } from "@/interfaces/authInterfaces";
import { PublicRoutes } from "@/components/Header/utils";
import { FormStatusEnum, IForm } from "@/interfaces/formularioInterfaces";

// TODO: REFACTOR THIS COMPONENT
export default function FormulariosPendentesContainer() {
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const formQueryParam = useSearchParams().get("formulario");
    console.log("pathname", formQueryParam);
    const [pendingAdoptions, setPendingAdoptions] = useState<IForm[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAdoption, setSelectedAdoption] = useState<IForm | null>(null);
    const [isLoadingData, setIsLoadingData] = useState(true);

    useEffect(() => {
        // Check authentication and role
        if (!isLoading && !isAuthenticated) {
            router.push(PublicRoutes.LOGIN);
            return;
        }

        if (!isLoading && isAuthenticated && user?.role === UserRole.VOLUNTEER) {
            router.push(PublicRoutes.NAO_AUTORIZADO);
            return;
        }

        // Fetch data
        if (!isLoading && isAuthenticated) {
            // In a real app, this would be an API call
            // For now, we're using mock data
            setPendingAdoptions(
                pendingAdocoesMock.concat(pendingApadrinhamentosMock).concat(pendingContatosMock)
            );
            setIsLoadingData(false);
        }
    }, [isLoading, isAuthenticated, user, router]);

    const handleViewDetails = (adoption: IForm) => {
        setSelectedAdoption(adoption);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedAdoption(null);
    };

    const handleUpdateStatus = (id: string, newStatus: string) => {
        // In a real app, this would be an API call
        // For now, we'll just update the local state
        setPendingAdoptions((prevAdoptions) =>
            prevAdoptions.map((adoption) => {
                if (adoption.id === id) {
                    return {
                        ...adoption,
                        status: newStatus as FormStatusEnum,
                    };
                }
                return adoption;
            })
        );

        const statusMessages = {
            [FormStatusEnum.APPROVED]: "Adoção aprovada com sucesso!",
            [FormStatusEnum.REJECTED]: "Adoção rejeitada.",
            [FormStatusEnum.IN_PROCESS]: "Adoção marcada como em análise.",
            [FormStatusEnum.PENDENT]: "Adoção marcada como pendente.",
        };

        toast.success(
            statusMessages[newStatus as FormStatusEnum] || "Status atualizado com sucesso!"
        );

        if (isModalOpen) {
            handleCloseModal();
        }
    };

    if (isLoading || isLoadingData) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-screen-xl mx-auto px-8 py-11 flex flex-col item-center md:py-12">
                <h1 className="text-primary-400 text-3xl leading-10 font-bold mb-6 md:text-4xl md:mb-10">
                    Formulários enviados
                </h1>

                <div className="w-full">
                    <FormulariosPendentesTable
                        adoptions={pendingAdoptions}
                        onViewDetails={handleViewDetails}
                        onUpdateStatus={handleUpdateStatus}
                    />
                </div>

                {isModalOpen && selectedAdoption && (
                    <FormulariosPendentesModal
                        adoption={selectedAdoption}
                        onClose={handleCloseModal}
                        onUpdateStatus={handleUpdateStatus}
                    />
                )}
            </div>
        </div>
    );
}
