"use client";

import { DogStatusEnum } from "@/services/api/modules/dogs/types";
import { AdocaoCatalogo } from "./AdocaoCatalogo/AdocaoCatalogo";
import { AdocaoEspecial } from "./AdocaoEspecial/AdocaoEspecial";
import { AdocaoInstrucoes } from "./AdocaoInstrucoes";
import { useDogs } from "@/hooks/dogs-hook";
import { Spinner } from "@/components/Spinner/Spinner";

export function AdocaoContainer() {
    const { isLoading: dogsLoading, dogs } = useDogs();
    const cachorrosAdocao = dogs.filter(
        (cachorro) => cachorro.status === DogStatusEnum.aguardando_adocao
    );

    const renderContent = () => {
        if (dogsLoading) {
            return <Spinner />;
        }

        return (
            <>
                <AdocaoEspecial cachorrosAdocao={cachorrosAdocao} />
                <AdocaoCatalogo cachorrosAdocao={cachorrosAdocao} />
            </>
        );
    };

    return (
        <div className="bg-white">
            <div className="max-w-screen-xl mx-auto px-8 py-11 flex flex-col item-center md:py-12">
                <AdocaoInstrucoes />
                {renderContent()}
            </div>
        </div>
    );
}
