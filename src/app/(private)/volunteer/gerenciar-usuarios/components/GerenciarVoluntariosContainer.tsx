"use client";

import { useEffect, useState } from "react";
import { GerenciarVoluntariosTable } from "./GerenciarVoluntariosTable";
import { GerenciarVoluntariosModal } from "./GerenciarVoluntariosModal";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth/AuthProvider";
import { PrivateRoutes, PublicRoutes } from "@/components/Header/routes-ui";
import { UserRole } from "@/interfaces/authInterfaces";
import { IVoluntarios } from "@/interfaces/voluntariosInterfaces";
import { voluntarios } from "@/mock/voluntariosMock";
import Link from "next/link";
import { LuPlus } from "react-icons/lu";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";

export default function GerenciarVoluntariosContainer() {
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const [allVolunteers, setAllVolunteers] = useState<IVoluntarios[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [selectedVolunteer, setSelectedVolunteer] = useState<IVoluntarios | null>(null);
    const [selectedVolunteerToDelete, setSelectedVolunteerToDelete] = useState<IVoluntarios | null>(
        null
    );
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
            setAllVolunteers([...voluntarios]);
            setIsLoadingData(false);
        }
    }, [isLoading, isAuthenticated, user, router]);

    const handleViewDetails = (volunteer: IVoluntarios) => {
        setSelectedVolunteer(volunteer);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedVolunteer(null);
    };

    if (isLoading || isLoadingData) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="loader"></div>
            </div>
        );
    }

    const handleConfirm = () => {
        console.log("Confirmed action", { selectedVolunteerToDelete });
        setIsConfirmationModalOpen(false);
    };

    const handleCancel = () => {
        console.log("Cancelled action");
        setIsConfirmationModalOpen(false);
    };

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-screen-xl mx-auto px-8 py-11 flex flex-col item-center md:py-12">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Gerenciar Voluntários</h1>
                    <Link
                        href={PrivateRoutes.ADD_USER}
                        className="bg-primary-700 hover:bg-primary-400 text-white py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <LuPlus className="h-5 w-5" />
                        Adicionar Voluntário
                    </Link>
                </div>

                <div className="w-full">
                    <GerenciarVoluntariosTable
                        volunteers={allVolunteers}
                        onViewDetails={handleViewDetails}
                        onDelete={(volunteer) => {
                            setSelectedVolunteerToDelete(volunteer);
                            setIsConfirmationModalOpen(true);
                        }}
                    />
                </div>

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
                        description={`Você tem certeza que deseja deletar o voluntário ${selectedVolunteerToDelete.nome}? Esta ação não pode ser desfeita.`}
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
