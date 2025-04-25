"use client";
import { estadoInicialFiltrosAdocao } from "../AdocaoUtils";
import { useEffect, useState } from "react";
import { AdocaoFiltros } from "./AdocaoFiltros";
import { AdocaoCachorroCard } from "./AdocaoCachorroCard";
import { dogs } from "@/mock/dogsMock";
import { IDog } from "@/interfaces/dogInterfaces";

export function AdocaoCatalogo() {
    const cachorrosAdocao = dogs.filter((cachorro) => cachorro.status === "adocao");
    const [filtrosSelecionados, setFiltrosSelecionados] = useState<Record<string, string[]>>({
        ...estadoInicialFiltrosAdocao,
    });
    const [cachorrosFiltrados, setCachorrosFiltrados] = useState([...cachorrosAdocao]);

    function onSearch() {
        const filteredDogs = cachorrosAdocao.filter((cachorro) => {
            return Object.entries(filtrosSelecionados).every(
                (filtro) =>
                    !filtro[1].length ||
                    filtro[1].includes(cachorro[filtro[0] as keyof IDog] as string)
            );
        });

        setCachorrosFiltrados(filteredDogs);
    }

    useEffect(() => {
        const doesNotHaveAnyFilterSelected = Object.entries(filtrosSelecionados).every(
            (filtro) => !filtro[1].length
        );

        if (doesNotHaveAnyFilterSelected) {
            setCachorrosFiltrados(cachorrosAdocao);
        }
    }, [filtrosSelecionados]);

    function onResetFiltros() {
        setFiltrosSelecionados({ ...estadoInicialFiltrosAdocao });
        setCachorrosFiltrados(cachorrosAdocao);
    }

    return (
        <section className="flex flex-col items-center pt-8">
            <h2 className="text-primary-400 text-2xl leading-10 font-bold md:text-3xl">
                Encontre um animalzinho pra chamar de seu
            </h2>
            <div className="flex flex-col items-start pb-8">
                <span className="text-gray-400 text-base font-medium mt-4">
                    Aqui você encontra algumas características que podem facilitar a busca pelo
                    animalzinho que você tanto procura:
                </span>
                <AdocaoFiltros
                    filtrosSelecionados={filtrosSelecionados}
                    setFiltrosSelecionados={setFiltrosSelecionados}
                    onResetFiltros={onResetFiltros}
                    onSearch={onSearch}
                />
            </div>
            <div className="grid gap-6 grid-cols-1 justify-items-center md:grid-cols-2 xl:grid-cols-3 xl:gap-10">
                {cachorrosFiltrados.map((cachorro) => (
                    <AdocaoCachorroCard
                        key={cachorro.id}
                        cachorroInformacao={cachorro}
                    />
                ))}
            </div>
        </section>
    );
}
