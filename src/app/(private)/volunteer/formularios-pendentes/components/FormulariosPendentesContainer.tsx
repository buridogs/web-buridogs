"use client";

import { useState } from "react";
import { FormulariosPendentesTable } from "./FormulariosPendentesTable";
import { IFormUI } from "@/interfaces/formularioInterfaces";
import { FormulariosPendentesModal } from "./FormulariosPendentesModal";
import { useFormRequests } from "@/hooks/form-requests-hook";
import { FormRequestStatusEnum } from "@/services/api/modules/form-requests/types";
import { Spinner } from "@/components/Spinner/Spinner";

export default function FormulariosPendentesContainer() {
    const {
        formRequests,
        isLoading: formRequestsLoading,
        updateFormRequestStatus,
    } = useFormRequests({
        shouldFetch: true,
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAdoption, setSelectedAdoption] = useState<IFormUI | null>(null);

    const handleViewDetails = (adoption: IFormUI) => {
        setSelectedAdoption(adoption);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedAdoption(null);
    };

    const handleUpdateStatus = async (id: string, newStatus: FormRequestStatusEnum) => {
        await updateFormRequestStatus(id, newStatus);

        if (isModalOpen) {
            handleCloseModal();
        }
    };

    const renderContent = () => {
        if (formRequestsLoading) {
            return <Spinner />;
        }

        if (formRequests.length === 0) {
            return <div className="text-center">Nenhum formulário pendente encontrado.</div>;
        }

        return (
            <FormulariosPendentesTable
                formRequests={formRequests}
                onViewDetails={handleViewDetails}
                onUpdateStatus={handleUpdateStatus}
            />
        );
    };

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-screen-xl mx-auto px-8 py-11 flex flex-col item-center md:py-12">
                <h1 className="text-primary-400 text-3xl leading-10 font-bold mb-6 md:text-4xl md:mb-10">
                    Formulários enviados
                </h1>

                <div className="w-full">{renderContent()}</div>

                {isModalOpen && selectedAdoption && (
                    <FormulariosPendentesModal
                        formRequest={selectedAdoption}
                        onClose={handleCloseModal}
                        onUpdateStatus={handleUpdateStatus}
                    />
                )}
            </div>
        </div>
    );
}
