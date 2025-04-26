"use client";

import { useEffect, useState } from "react";
import { GerenciarParceirosTable } from "./GerenciarParceirosTable";
import { GerenciarParceirosModal } from "./GerenciarParceirosModal";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth/AuthProvider";
import { PublicRoutes } from "@/components/Header/routes-ui";
import { UserRole } from "@/interfaces/authInterfaces";
import { IParceiros } from "@/interfaces/parceirosInterfaces";
import { parceiros } from "@/mock/parceirosMock";

// TODO: REFACTOR THIS COMPONENT
export default function GerenciarParceirosContainer() {
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const [partners, setPartners] = useState<IParceiros[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPartner, setSelectedPartner] = useState<IParceiros | null>(null);
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

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-screen-xl mx-auto px-8 py-11 flex flex-col item-center md:py-12">
                <h1 className="text-primary-400 text-3xl leading-10 font-bold mb-6 md:text-4xl md:mb-10">
                    Formulários enviados
                </h1>

                <div className="w-full">
                    <GerenciarParceirosTable
                        partners={partners}
                        onViewDetails={handleViewDetails}
                    />
                </div>

                {isModalOpen && selectedPartner && (
                    <GerenciarParceirosModal
                        partner={selectedPartner}
                        onClose={handleCloseModal}
                        onDelete={(partner) => console.log("Delete", partner)}
                    />
                )}
            </div>
        </div>
    );
}
