"use client";

import { useState } from "react";
import { GerenciarVoluntariosTable } from "./GerenciarVoluntariosTable";
import { GerenciarVoluntariosModal } from "./GerenciarVoluntariosModal";
import { PrivateRoutes } from "@/components/Header/routes-ui";
import { IVoluntarios } from "@/interfaces/voluntariosInterfaces";
import Link from "next/link";
import { LuPlus } from "react-icons/lu";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";
import { useVolunteers } from "@/hooks/users-hook";
import { Spinner } from "@/components/Spinner/Spinner";

export default function GerenciarVoluntariosContainer() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [selectedVolunteer, setSelectedVolunteer] = useState<IVoluntarios | null>(null);
    const [selectedVolunteerToDelete, setSelectedVolunteerToDelete] = useState<IVoluntarios | null>(
        null
    );

    const { isLoading: volunteersLoading, volunteers, deleteVolunteer } = useVolunteers();

    const handleViewDetails = (volunteer: IVoluntarios) => {
        setSelectedVolunteer(volunteer);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedVolunteer(null);
    };

    const handleConfirm = async () => {
        if (selectedVolunteerToDelete) {
            deleteVolunteer(selectedVolunteerToDelete.id).then(() => {
                setIsConfirmationModalOpen(false);
            });
        }
    };

    const handleCancel = () => {
        setIsConfirmationModalOpen(false);
    };

    const renderContent = () => {
        if (volunteersLoading) {
            return (
                <div className="flex justify-center items-center min-h-screen">
                    <Spinner />
                </div>
            );
        }

        if (volunteers.length === 0) {
            return (
                <div className="text-center">
                    <h2 className="text-xl font-semibold">Nenhum voluntário encontrado</h2>
                    <p className="mt-2 text-gray-500">Adicione novos voluntários para começar.</p>
                </div>
            );
        }

        return (
            <GerenciarVoluntariosTable
                volunteers={volunteers}
                onViewDetails={handleViewDetails}
                onDelete={(volunteer) => {
                    setSelectedVolunteerToDelete(volunteer);
                    setIsConfirmationModalOpen(true);
                }}
            />
        );
    };

    const renderAddButton = () => {
        return (
            <Link
                href={PrivateRoutes.ADD_USER}
                className="bg-primary-700 hover:bg-primary-400 text-white py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
            >
                <LuPlus className="h-5 w-5" />
                Adicionar Voluntário
            </Link>
        );
    };

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-screen-xl mx-auto px-8 py-11 flex flex-col item-center md:py-12">
                <div className="flex justify-between items-center mb-6 md:mb-10">
                    <h1 className="text-primary-400 text-3xl leading-10 font-bold md:text-4xl">
                        Gerenciar Voluntários
                    </h1>
                    {renderAddButton()}
                </div>

                <div className="w-full">{renderContent()}</div>

                {isModalOpen && selectedVolunteer && (
                    <GerenciarVoluntariosModal
                        volunteer={selectedVolunteer}
                        onClose={handleCloseModal}
                        onDelete={() => {
                            setSelectedVolunteerToDelete(selectedVolunteer);
                            setIsConfirmationModalOpen(true);
                        }}
                    />
                )}
                {isConfirmationModalOpen && selectedVolunteerToDelete && (
                    <ConfirmationModal
                        isOpen={isConfirmationModalOpen}
                        title="Deletar Voluntário"
                        description={`Você tem certeza que deseja deletar o voluntário ${selectedVolunteerToDelete.name}? Esta ação não pode ser desfeita.`}
                        primaryButtonText="Deletar"
                        secondaryButtonText="Cancelar"
                        onPrimaryAction={handleConfirm}
                        onSecondaryAction={handleCancel}
                        onClose={handleCloseModal}
                        isLoading={volunteersLoading}
                    />
                )}
            </div>
        </div>
    );
}
