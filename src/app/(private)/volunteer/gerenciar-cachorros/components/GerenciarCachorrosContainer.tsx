"use client";

import { useMemo, useState } from "react";
import { AdocaoCachorroCard } from "@/components/app/adocao/AdocaoCatalogo/AdocaoCachorroCard";
import { LuPlus } from "react-icons/lu";
import Link from "next/link";
import GerenciarCachorrosFiltros from "./GerenciarCachorrosFiltros";
import { cachorrosMock } from "./mock";
import { PrivateRoutes } from "@/components/Header/routes-ui";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";
import { IDog } from "@/interfaces/dogInterfaces";

export default function GerenciarCachorrosContainer() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGenero, setSelectedGenero] = useState<string>("");
    const [selectedIdade, setSelectedIdade] = useState<string>("");
    const [selectedPorte, setSelectedPorte] = useState<string>("");
    const [isHappyEnding, setIsHappyEnding] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [selectedDogToDelete, setSelectedDogToDelete] = useState<IDog | null>(null);

    const filteredDogs = useMemo(() => {
        return cachorrosMock.filter((dog) => {
            const matchesName = dog.nomeExibicao.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesGenero = selectedGenero ? dog.genero === selectedGenero : true;
            const matchesIdade = selectedIdade ? dog.idade === selectedIdade : true;
            const matchesPorte = selectedPorte ? dog.porte === selectedPorte : true;
            const matchesStatus = isHappyEnding
                ? dog.status === "finais-felizes"
                : dog.status !== "finais-felizes";
            return matchesName && matchesGenero && matchesIdade && matchesPorte && matchesStatus;
        });
    }, [searchTerm, selectedGenero, selectedIdade, selectedPorte, isHappyEnding]);

    const handleClearFilters = () => {
        setSearchTerm("");
        setSelectedGenero("");
        setSelectedIdade("");
        setSelectedPorte("");
    };

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-screen-xl mx-auto px-8 py-11 flex flex-col item-center md:py-12">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Gerenciar Cachorros</h1>
                    <Link
                        href={PrivateRoutes.ADD_DOG}
                        className="bg-primary-700 hover:bg-primary-400 text-white py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <LuPlus className="h-5 w-5" />
                        Adicionar Cachorro
                    </Link>
                </div>

                {/* Filtros */}
                <GerenciarCachorrosFiltros
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    selectedGenero={selectedGenero}
                    setSelectedGenero={setSelectedGenero}
                    selectedIdade={selectedIdade}
                    setSelectedIdade={setSelectedIdade}
                    selectedPorte={selectedPorte}
                    setSelectedPorte={setSelectedPorte}
                    isHappyEndingMode={isHappyEnding}
                    setIsHappyEndingMode={setIsHappyEnding}
                    handleClearFilters={handleClearFilters}
                />

                {/* Card List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDogs.length > 0 ? (
                        filteredDogs.map((cachorro) => (
                            <AdocaoCachorroCard
                                key={cachorro.id}
                                cachorroInformacao={cachorro}
                                isManagementMode
                                onDelete={(dog) => {
                                    setSelectedDogToDelete(dog);
                                    setIsConfirmationModalOpen(true);
                                }}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-8">
                            <p className="text-gray-500">
                                Nenhum cachorro encontrado com os filtros selecionados.
                            </p>
                        </div>
                    )}
                </div>
            </div>
            {isConfirmationModalOpen && selectedDogToDelete && (
                <ConfirmationModal
                    isOpen={isConfirmationModalOpen}
                    title="Deletar Cachorro"
                    description={`Você tem certeza que deseja deletar o cachorro ${selectedDogToDelete.nomeExibicao}? Esta ação não pode ser desfeita.`}
                    primaryButtonText="Deletar"
                    secondaryButtonText="Cancelar"
                    onPrimaryAction={() => console.log("Confirmed action")}
                    onSecondaryAction={() => setIsConfirmationModalOpen(false)}
                    onClose={() => setIsConfirmationModalOpen(false)}
                />
            )}
        </div>
    );
}
