"use client";

import { useAuth } from "@/providers/auth/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdocoesPendentesTable } from "./AdocoesPendentesTable";
import { AdocoesPendentesModal } from "./AdocoesPendentesModal";
import { pendingAdocoesMock } from "@/mock/pendingAdocaoMock";
import { IPendingAdoption, AdocaoStatusEnum } from "@/interfaces/adocaoInterfaces";
import { toast } from "react-toastify";
import { UserRole } from "@/interfaces/authInterfaces";

// TODO: REFACTOR THIS COMPONENT
export default function AdocoesPendentesContainer() {
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const [pendingAdoptions, setPendingAdoptions] = useState<IPendingAdoption[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAdoption, setSelectedAdoption] = useState<IPendingAdoption | null>(null);
    const [isLoadingData, setIsLoadingData] = useState(true);

    useEffect(() => {
        // Check authentication and role
        if (!isLoading && !isAuthenticated) {
            router.push("/login");
            return;
        }

        if (!isLoading && isAuthenticated && user?.role === UserRole.VOLUNTEER) {
            router.push("/unauthorized");
            return;
        }

        // Fetch data
        if (!isLoading && isAuthenticated) {
            // In a real app, this would be an API call
            // For now, we're using mock data
            setPendingAdoptions(pendingAdocoesMock);
            setIsLoadingData(false);
        }
    }, [isLoading, isAuthenticated, user, router]);

    const handleViewDetails = (adoption: IPendingAdoption) => {
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
                        status: newStatus as AdocaoStatusEnum,
                    };
                }
                return adoption;
            })
        );

        const statusMessages = {
            [AdocaoStatusEnum.APROVADO]: "Adoção aprovada com sucesso!",
            [AdocaoStatusEnum.REJEITADO]: "Adoção rejeitada.",
            [AdocaoStatusEnum.EM_ANALISE]: "Adoção marcada como em análise.",
            [AdocaoStatusEnum.PENDENTE]: "Adoção marcada como pendente.",
        };

        toast.success(
            statusMessages[newStatus as AdocaoStatusEnum] || "Status atualizado com sucesso!"
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
        <main className="bg-white min-h-screen">
            <div className="max-w-screen-xl mx-auto px-8 py-11 flex flex-col item-center md:py-12">
                <h1 className="text-primary-400 text-3xl leading-10 font-bold mb-6 md:text-4xl md:mb-10">
                    Adoções Pendentes
                </h1>

                <div className="w-full">
                    <AdocoesPendentesTable
                        adoptions={pendingAdoptions}
                        onViewDetails={handleViewDetails}
                        onUpdateStatus={handleUpdateStatus}
                    />
                </div>

                {isModalOpen && selectedAdoption && (
                    <AdocoesPendentesModal
                        adoption={selectedAdoption}
                        onClose={handleCloseModal}
                        onUpdateStatus={handleUpdateStatus}
                    />
                )}
            </div>
        </main>
    );
}
