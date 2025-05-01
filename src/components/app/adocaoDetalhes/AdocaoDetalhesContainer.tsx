"use client";

import { useEffect, useState } from "react";
import AdocaoDetalhesInfo from "./AdocaoDetalhesInfo";
import AdocaoDetalhesForm from "./AdocaoDetalhesForm";
import { IDogUI } from "@/interfaces/dogInterfaces";
import { useDogs } from "@/hooks/dogs-hook";
import { Spinner } from "@/components/Spinner/Spinner";
import { SLUG_CHARACTER_SEPARATOR } from "../adocao/AdocaoUtils";

interface AdocaoDetalhesContainerProps {
    slug?: string;
}

export default function AdocaoDetalhesContainer({ slug }: AdocaoDetalhesContainerProps) {
    const { getDogById, isLoading: dogsLoading } = useDogs();
    const [cachorroSelecionado, setCachorroSelecionado] = useState<IDogUI>({} as IDogUI);

    useEffect(() => {
        if (slug) {
            const fetchDogData = async () => {
                const idAnimalSelecionado = slug.split(SLUG_CHARACTER_SEPARATOR)[0];
                if (idAnimalSelecionado) {
                    const foundDog = await getDogById(idAnimalSelecionado);
                    if (foundDog) {
                        setCachorroSelecionado(foundDog);
                    }
                }
            };

            fetchDogData();
        }
    }, [slug]);

    return (
        <main className="bg-white">
            <div className="max-w-screen-xl mx-auto px-8 py-11 flex flex-col item-center md:py-12">
                <AdocaoDetalhesInfo cachorroSelecionado={cachorroSelecionado} />
                {dogsLoading ? (
                    <Spinner />
                ) : (
                    <AdocaoDetalhesForm cachorroSelecionado={cachorroSelecionado} />
                )}
            </div>
        </main>
    );
}
