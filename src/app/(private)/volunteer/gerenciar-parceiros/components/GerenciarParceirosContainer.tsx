"use client";

import { useState } from "react";
import { GerenciarParceirosTable } from "./GerenciarParceirosTable";
import { GerenciarParceirosModal } from "./GerenciarParceirosModal";
import { PrivateRoutes } from "@/components/Header/routes-ui";
import { IPartnerUI } from "@/interfaces/parceirosInterfaces";
import Link from "next/link";
import { LuPlus } from "react-icons/lu";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";
import { usePartners } from "@/hooks/partners-hook";
import { Spinner } from "@/components/Spinner/Spinner";
import { AzureBlobStorageContainerNames, deleteBlob } from "@/services/azure-blob/azure-blob";

export default function GerenciarParceirosContainer() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [selectedPartner, setSelectedPartner] = useState<IPartnerUI | null>(null);
    const [selectedPartnerToDelete, setSelectedPartnerToDelete] = useState<IPartnerUI | null>(null);

    const { isLoading: partnersLoading, partners, deletePartner } = usePartners();

    const handleViewDetails = (adoption: IPartnerUI) => {
        setSelectedPartner(adoption);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPartner(null);
    };

    const handleConfirm = async () => {
        if (selectedPartnerToDelete) {
            await deletePartner(selectedPartnerToDelete.id);
            if (selectedPartnerToDelete.imagemSrc) {
                await deleteBlob(
                    AzureBlobStorageContainerNames.PARTNERS,
                    selectedPartnerToDelete.imagemSrc
                );
            }
            setIsConfirmationModalOpen(false);
            setSelectedPartnerToDelete(null);
        }
    };

    const handleCancel = () => {
        setIsConfirmationModalOpen(false);
    };

    const renderContent = () => {
        if (partnersLoading) {
            return <Spinner />;
        }

        if (partners.length === 0) {
            return <div className="text-left text-gray-600">Nenhum parceiro encontrado.</div>;
        }

        return (
            <GerenciarParceirosTable
                partners={partners}
                onViewDetails={handleViewDetails}
                onDelete={(partner) => {
                    setSelectedPartnerToDelete(partner);
                    setIsConfirmationModalOpen(true);
                }}
            />
        );
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

                <div className="w-full">{renderContent()}</div>

                {isModalOpen && selectedPartner && (
                    <GerenciarParceirosModal
                        partner={selectedPartner}
                        onClose={handleCloseModal}
                        onDelete={(partner) => {
                            setSelectedPartnerToDelete(partner);
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
