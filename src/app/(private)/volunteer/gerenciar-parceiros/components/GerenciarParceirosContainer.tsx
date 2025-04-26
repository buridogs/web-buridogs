"use client";

import { useEffect, useState } from "react";
import { GerenciarParceirosTable } from "./GerenciarParceirosTable";
import { GerenciarParceirosModal } from "./GerenciarParceirosModal";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth/AuthProvider";
import { PrivateRoutes, PublicRoutes } from "@/components/Header/routes-ui";
import { UserRole } from "@/interfaces/authInterfaces";
import { IParceiros } from "@/interfaces/parceirosInterfaces";
import { parceiros } from "@/mock/parceirosMock";
import Link from "next/link";
import { LuPlus } from "react-icons/lu";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";

// TODO: REFACTOR THIS COMPONENT
export default function GerenciarParceirosContainer() {
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const [partners, setPartners] = useState<IParceiros[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [selectedPartner, setSelectedPartner] = useState<IParceiros | null>(null);
    const [selectedPartnerToDelete, setSelectedPartnerToDelete] = useState<IParceiros | null>(null);
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
            setPartners([...parceiros]);
            setIsLoadingData(false);
        }
    }, [isLoading, isAuthenticated, user, router]);

    const handleViewDetails = (adoption: IParceiros) => {
        setSelectedPartner(adoption);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPartner(null);
    };

    if (isLoading || isLoadingData) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="loader"></div>
            </div>
        );
    }

    const handleConfirm = () => {
        console.log("Confirmed action", { selectedPartnerToDelete });
        setIsConfirmationModalOpen(false);
    };

    const handleCancel = () => {
        console.log("Cancelled action");
        setIsConfirmationModalOpen(false);
    };

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-screen-xl mx-auto px-8 py-11 flex flex-col item-center md:py-12">
                <div className="flex justify-between items-center mb-6 md:mb-10">
                    <h1 className="text-primary-400 text-3xl leading-10 font-bold md:text-4xl">
                        Gerenciar Parceiros
                    </h1>
                    <Link
                        href={PrivateRoutes.ADD_PARTNER}
                        className="bg-primary-700 hover:bg-primary-400 text-white py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <LuPlus className="h-5 w-5" />
                        Adicionar Parceiro
                    </Link>
                </div>

                <div className="w-full">
                    <GerenciarParceirosTable
                        partners={partners}
                        onViewDetails={handleViewDetails}
                        onDelete={(partner) => {
                            setSelectedPartnerToDelete(partner);
                            setIsConfirmationModalOpen(true);
                        }}
                    />
                </div>

                {isModalOpen && selectedPartner && (
                    <GerenciarParceirosModal
                        partner={selectedPartner}
                        onClose={handleCloseModal}
                        onDelete={() => {
                            setSelectedPartnerToDelete(selectedPartner);
                            setIsConfirmationModalOpen(true);
                        }}
                    />
                )}
                {isConfirmationModalOpen && selectedPartnerToDelete && (
                    <ConfirmationModal
                        isOpen={isConfirmationModalOpen}
                        title="Deletar Parceiro"
                        description={`Você tem certeza que deseja deletar o parceiro ${selectedPartnerToDelete.nome}? Esta ação não pode ser desfeita.`}
                        primaryButtonText="Deletar"
                        secondaryButtonText="Cancelar"
                        onPrimaryAction={handleConfirm}
                        onSecondaryAction={handleCancel}
                        onClose={handleCloseModal}
                    />
                )}
            </div>
        </div>
    );
}
