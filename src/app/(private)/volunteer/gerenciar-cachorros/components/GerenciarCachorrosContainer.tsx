"use client";

import { useMemo, useState } from "react";
import { AdocaoCachorroCard } from "@/components/app/adocao/AdocaoCatalogo/AdocaoCachorroCard";
import { LuPlus } from "react-icons/lu";
import Link from "next/link";
import GerenciarCachorrosFiltros from "./GerenciarCachorrosFiltros";
import { PrivateRoutes } from "@/components/Header/routes-ui";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";
import { IDogUI } from "@/interfaces/dogInterfaces";
import { useDogs } from "@/hooks/dogs-hook";
import { Spinner } from "@/components/Spinner/Spinner";
import { DogStatusEnum } from "@/services/api/modules/dogs/types";

export default function GerenciarCachorrosContainer() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGenero, setSelectedGenero] = useState<string>("");
    const [selectedIdade, setSelectedIdade] = useState<string>("");
    const [selectedPorte, setSelectedPorte] = useState<string>("");
    const [isHappyEnding, setIsHappyEnding] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [selectedDogToDelete, setSelectedDogToDelete] = useState<IDogUI | null>(null);

    const { isLoading: dogsLoading, dogs, deleteDog } = useDogs();

    const filteredDogs = useMemo(() => {
        return dogs.filter((dog) => {
            const matchesName = dog.nomeExibicao.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesGenero = selectedGenero ? dog.genero === selectedGenero : true;
            const matchesIdade = selectedIdade ? dog.idade === selectedIdade : true;
            const matchesPorte = selectedPorte ? dog.porte === selectedPorte : true;
            const matchesStatus = isHappyEnding
                ? dog.status === DogStatusEnum.adotado
                : dog.status !== DogStatusEnum.adotado;
            return matchesName && matchesGenero && matchesIdade && matchesPorte && matchesStatus;
        });
    }, [searchTerm, selectedGenero, selectedIdade, selectedPorte, isHappyEnding, dogs]);

    const handleClearFilters = () => {
        setSearchTerm("");
        setSelectedGenero("");
        setSelectedIdade("");
        setSelectedPorte("");
    };

    const renderContent = () => {
        if (dogsLoading) {
            return <Spinner />;
        }

        return (
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
        );
    };

    const handleDeleteDog = async () => {
        if (selectedDogToDelete) {
            await deleteDog(selectedDogToDelete.id);
            setIsConfirmationModalOpen(false);
        }
    };

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-screen-xl mx-auto px-8 py-11 flex flex-col item-center md:py-12">
                <div className="flex justify-between items-center mb-6 md:mb-10">
                    <h1 className="text-primary-400 text-3xl leading-10 font-bold md:text-4xl">
                        Gerenciar Cachorros
                    </h1>
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
                {renderContent()}
            </div>
            {isConfirmationModalOpen && selectedDogToDelete && (
                <ConfirmationModal
                    isOpen={isConfirmationModalOpen}
                    title="Deletar Cachorro"
                    description={`Você tem certeza que deseja deletar o cachorro ${selectedDogToDelete.nomeExibicao}? Esta ação não pode ser desfeita.`}
                    primaryButtonText="Deletar"
                    secondaryButtonText="Cancelar"
                    onPrimaryAction={() => handleDeleteDog()}
                    onSecondaryAction={() => setIsConfirmationModalOpen(false)}
                    onClose={() => setIsConfirmationModalOpen(false)}
                />
            )}
        </div>
    );
}
