"use client";
import { estadoInicialFiltrosAdocao } from "../AdocaoUtils";
import { useMemo, useState } from "react";
import { AdocaoFiltros } from "./AdocaoFiltros";
import { AdocaoCachorroCard } from "./AdocaoCachorroCard";
import { AdocaoFiltrosEnum } from "@/interfaces/adocaoInterfaces";
import { IDogUI } from "@/interfaces/dogInterfaces";

interface AdocaoCatalogoProps {
    cachorrosAdocao: IDogUI[];
}

export function AdocaoCatalogo({ cachorrosAdocao }: AdocaoCatalogoProps) {
    const [filtrosSelecionados, setFiltrosSelecionados] = useState<Record<string, string[]>>({
        ...estadoInicialFiltrosAdocao,
    });

    const filteredDogs = useMemo(() => {
        return cachorrosAdocao.filter((dog) => {
            const matchesGenero = filtrosSelecionados[AdocaoFiltrosEnum.genero].length
                ? filtrosSelecionados[AdocaoFiltrosEnum.genero].includes(dog.genero)
                : true;
            const matchesIdade = filtrosSelecionados[AdocaoFiltrosEnum.idade].length
                ? filtrosSelecionados[AdocaoFiltrosEnum.idade].includes(dog.idade)
                : true;
            const matchesPorte = filtrosSelecionados[AdocaoFiltrosEnum.porte].length
                ? filtrosSelecionados[AdocaoFiltrosEnum.porte].includes(dog.porte)
                : true;

            return matchesGenero && matchesIdade && matchesPorte;
        });
    }, [filtrosSelecionados, cachorrosAdocao]);

    function onResetFiltros() {
        setFiltrosSelecionados({ ...estadoInicialFiltrosAdocao });
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
                />
            </div>
            <div className="grid gap-6 grid-cols-1 justify-items-center md:grid-cols-2 xl:grid-cols-3 xl:gap-10">
                {filteredDogs.map((cachorro) => (
                    <AdocaoCachorroCard
                        key={cachorro.id}
                        cachorroInformacao={cachorro}
                    />
                ))}
            </div>
        </section>
    );
}
