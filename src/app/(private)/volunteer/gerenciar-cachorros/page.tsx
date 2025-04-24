"use client";

import { useState } from "react";
import { AdocaoCachorroCard } from "@/components/app/adocao/AdocaoCatalogo/AdocaoCachorroCard";
import { IAdocaoDetails } from "@/interfaces/adocaoInterfaces";
import { LuPlus, LuSearch } from "react-icons/lu";
import Link from "next/link";
import Select from "@/components/Select/Select";

// Mock data - replace with API call in production
export const cachorrosMock: IAdocaoDetails[] = [
    {
        id: 1,
        nomeExibicao: "Thor",
        nomeURL: "thor",
        genero: "macho",
        idade: "filhote",
        porte: "medio-porte",
        descricao:
            "Thor é um cachorro muito brincalhão e cheio de energia. Ele adora correr e brincar com bolas.",
        imageSrc: "",
        imagesSrc: [""],
    },
    {
        id: 2,
        nomeExibicao: "Zazá",
        nomeURL: "zaza",
        genero: "femea",
        idade: "adulto",
        porte: "grande-porte",
        descricao:
            "Zazá é uma cachorrinha dócil e carinhosa. Adora ficar no colo e receber carinho.",
        imageSrc: "",
        imagesSrc: [""],
    },
    {
        id: 3,
        nomeExibicao: "Yasmin",
        nomeURL: "yasmin",
        genero: "femea",
        idade: "idoso",
        porte: "grande-porte",
        descricao:
            "Yasmin é uma senhora tranquila e muito amorosa. Gosta de passar o dia dormindo ao lado do seu tutor.",
        imageSrc: "",
        imagesSrc: [""],
    },
];

export default function GerenciarCachorrosPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGenero, setSelectedGenero] = useState<string>("");
    const [selectedIdade, setSelectedIdade] = useState<string>("");
    const [selectedPorte, setSelectedPorte] = useState<string>("");
    const [filteredDogs, setFilteredDogs] = useState<IAdocaoDetails[]>(cachorrosMock);

    const handleSearch = () => {
        const filtered = cachorrosMock.filter((dog) => {
            const matchesName = dog.nomeExibicao.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesGenero = selectedGenero ? dog.genero === selectedGenero : true;
            const matchesIdade = selectedIdade ? dog.idade === selectedIdade : true;
            const matchesPorte = selectedPorte ? dog.porte === selectedPorte : true;

            return matchesName && matchesGenero && matchesIdade && matchesPorte;
        });

        setFilteredDogs(filtered);
    };

    const handleClearFilters = () => {
        setSearchTerm("");
        setSelectedGenero("");
        setSelectedIdade("");
        setSelectedPorte("");
        setFilteredDogs(cachorrosMock);
    };

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-screen-xl mx-auto px-8 py-11 flex flex-col item-center md:py-12">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Gerenciar Cachorros</h1>
                    <Link
                        href="/volunteer/gerenciar-cachorros/novo"
                        className="bg-primary-700 hover:bg-primary-400 text-white py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <LuPlus className="h-5 w-5" />
                        Adicionar Cachorro
                    </Link>
                </div>

                {/* Filtros */}
                <div className="bg-gray-200 p-4 rounded-lg shadow mb-6">
                    <h2 className="text-gray-700 font-medium text-lg mb-4">Filtros</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div className="flex flex-col">
                            <label
                                htmlFor="search"
                                className="text-sm text-gray-600 mb-1"
                            >
                                Nome do cachorro
                            </label>
                            <div className="relative">
                                <input
                                    id="search"
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-2 pr-10"
                                    placeholder="Buscar..."
                                />
                                <LuSearch className="absolute right-3 top-3 text-gray-400" />
                            </div>
                        </div>

                        <Select
                            id="genero"
                            options={[
                                { value: "", label: "Todos" },
                                { value: "macho", label: "Macho" },
                                { value: "femea", label: "Fêmea" },
                            ]}
                            value={selectedGenero}
                            onChange={(value) => setSelectedIdade(value)}
                            label="Gênero"
                            isVerticalLabel
                        />

                        <Select
                            id="idade"
                            options={[
                                { value: "", label: "Todos" },
                                { value: "filhote", label: "Filhote" },
                                { value: "adulto", label: "Adulto" },
                                { value: "idoso", label: "Idoso" },
                            ]}
                            value={selectedPorte}
                            onChange={(value) => setSelectedIdade(value)}
                            label="Idade"
                            isVerticalLabel
                        />

                        <Select
                            id="porte"
                            options={[
                                { value: "", label: "Todos" },
                                { value: "pequeno-porte", label: "Pequeno" },
                                { value: "medio-porte", label: "Medio" },
                                { value: "grande-porte", label: "Grande" },
                            ]}
                            value={selectedPorte}
                            onChange={(value) => setSelectedPorte(value)}
                            label="Porte"
                            isVerticalLabel
                        />

                        <div className="flex center gap-2">
                            <button
                                onClick={handleSearch}
                                className="bg-primary-700 hover:bg-primary-400 text-white py-2 px-4 rounded-lg flex-1 transition-colors"
                            >
                                Filtrar
                            </button>
                            <button
                                onClick={handleClearFilters}
                                className="bg-red-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                            >
                                Limpar
                            </button>
                        </div>
                    </div>
                </div>

                {/* Card List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDogs.length > 0 ? (
                        filteredDogs.map((cachorro) => (
                            <AdocaoCachorroCard
                                key={cachorro.id}
                                cachorroInformacao={cachorro}
                                isManagementMode={true}
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
        </div>
    );
}
