"use client";

import { IAdocaoDetails } from "@/interfaces/adocaoInterfaces";
import { cachorrosAdocao } from "@/mock/adocaoMock";
import { useEffect, useState } from "react";
import AdocaoDetalhesInfo from "./AdocaoDetalhesInfo";
import AdocaoDetalhesForm from "./AdocaoDetalhesForm";

interface AdocaoDetalhesContainerProps {
    slug?: string;
}

export default function AdocaoDetalhesContainer({ slug }: AdocaoDetalhesContainerProps) {
    const [cachorroSelecionado, setCachorroSelecionado] = useState<IAdocaoDetails>(
        {} as IAdocaoDetails
    );

    useEffect(() => {
        if (slug) {
            const idAnimalSelecionado = slug.split("-")[0];
            setCachorroSelecionado(
                cachorrosAdocao.find((c) => c.id.toString() === idAnimalSelecionado) ??
                    ({} as IAdocaoDetails)
            );
        }
    }, [slug]);

    return (
        <main className="bg-white">
            <div className="max-w-screen-xl mx-auto px-8 py-11 flex flex-col item-center md:py-12">
                <AdocaoDetalhesInfo cachorroSelecionado={cachorroSelecionado} />
                <AdocaoDetalhesForm />
            </div>
        </main>
    );
}
