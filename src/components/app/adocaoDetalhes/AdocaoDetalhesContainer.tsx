"use client";

import { useEffect, useState } from "react";
import AdocaoDetalhesInfo from "./AdocaoDetalhesInfo";
import AdocaoDetalhesForm from "./AdocaoDetalhesForm";
import { dogs } from "@/mock/dogsMock";
import { IDog } from "@/interfaces/dogInterfaces";

interface AdocaoDetalhesContainerProps {
    slug?: string;
}

export default function AdocaoDetalhesContainer({ slug }: AdocaoDetalhesContainerProps) {
    const [cachorroSelecionado, setCachorroSelecionado] = useState<IDog>({} as IDog);

    const cachorrosIncapacitados = dogs.filter((cachorro) => !!cachorro.possuiAlgumaInaptidao);

    useEffect(() => {
        if (slug) {
            const idAnimalSelecionado = slug.split("-")[0];
            setCachorroSelecionado(
                dogs
                    .concat(cachorrosIncapacitados)
                    .find(
                        (c) => c.status === "adocao" && c.id.toString() === idAnimalSelecionado
                    ) ?? ({} as IDog)
            );
        }
    }, [cachorrosIncapacitados, slug]);

    return (
        <main className="bg-white">
            <div className="max-w-screen-xl mx-auto px-8 py-11 flex flex-col item-center md:py-12">
                <AdocaoDetalhesInfo cachorroSelecionado={cachorroSelecionado} />
                <AdocaoDetalhesForm cachorroSelecionado={cachorroSelecionado} />
            </div>
        </main>
    );
}
