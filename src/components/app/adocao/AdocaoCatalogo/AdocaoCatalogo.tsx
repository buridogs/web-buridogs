"use client";
import { estadoInicialFiltrosAdocao } from "../AdocaoUtils";
import { useState } from "react";
import { AdocaoFiltros } from "./AdocaoFiltros";
import { AdocaoCachorroCard } from "./AdocaoCachorroCard";
import { cachorrosAdocao } from "@/mock/adocaoMock";
import { AdocaoFiltrosEnum } from "@/interfaces/adocaoInterfaces";

export function AdocaoCatalogo() {
    const [filtrosSelecionados, setFiltrosSelecionados] = useState<Record<string, string[]>>({
        ...estadoInicialFiltrosAdocao,
    });
    const [cachorrosFiltrados, setCachorrosFiltrados] = useState([...cachorrosAdocao]);

    function onSearch() {
        setCachorrosFiltrados(
            Object.entries(filtrosSelecionados).reduce(
                (acm, cur) => {
                    if (!cur[1].length) return acm;
                    const filtrado = acm.filter((ca) =>
                        cur[1].includes(ca[cur[0] as AdocaoFiltrosEnum])
                    );

                    return [...filtrado];
                },
                [...cachorrosAdocao]
            )
        );
    }

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
                <span className="text-grey-400 text-base font-medium mt-4">
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
                {cachorrosFiltrados.map((c) => (
                    <AdocaoCachorroCard
                        key={c.id}
                        cachorroInformacao={c}
                    />
                ))}
            </div>
        </section>
    );
}
