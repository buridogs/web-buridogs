"use client";
import { IFinalFeliz } from "@/interfaces/finaisFelizesInterfaces";
import { finaisFelizes } from "@/mock/finaisFelizesMock";
import { useEffect, useState } from "react";
import Link from "next/link";
import FinaisFelizesDetalhesInfo from "./FinaisFelizesDetalhesInfo";
import FinaisFelizesAntesDepoisInfo from "./FinaisFelizesAntesDepoisInfo";

interface FinaisFelizesDetalhesContainerProps {
    slug?: string;
}

export default function FinaisFelizesDetalhesContainer({
    slug,
}: FinaisFelizesDetalhesContainerProps) {
    const [finalFelizSelecionado, setFinalFelizSelecionado] = useState<IFinalFeliz>(
        {} as IFinalFeliz
    );

    useEffect(() => {
        if (slug) {
            const idAnimalSelecionado = slug.split("-")[0];
            setFinalFelizSelecionado(
                finaisFelizes.find((c) => c.id.toString() === idAnimalSelecionado) ??
                    ({} as IFinalFeliz)
            );
        }
    }, [slug]);

    return (
        <main className="bg-white">
            <div className="max-w-screen-xl mx-auto px-8 py-11 flex flex-col item-center md:py-12">
                <section className="w-full flex flex-col items-center pb-11">
                    <FinaisFelizesDetalhesInfo finalFelizSelecionado={finalFelizSelecionado} />
                    <p className="text-grey-400 text-base my-6 w-full">
                        {finalFelizSelecionado.descricao}
                    </p>
                    <FinaisFelizesAntesDepoisInfo
                        label="Antes"
                        nome={finalFelizSelecionado.nome}
                        imagensUrl={finalFelizSelecionado.imagensUrlAntes}
                        youtubeUrlId={finalFelizSelecionado.youtubeUrlIdAntes}
                    />
                    <FinaisFelizesAntesDepoisInfo
                        label="Depois"
                        nome={finalFelizSelecionado.nome}
                        imagensUrl={finalFelizSelecionado.imagensUrlDepois}
                        youtubeUrlId={finalFelizSelecionado.youtubeUrlIdDepois}
                    />
                </section>
                <h2 className="text-primary-400 text-3xl font-medium text-center leading-10">
                    Quer fazer parte da nossa história?
                    <br />
                    <Link
                        href="/adocao"
                        className="font-bold underline"
                    >
                        Adote!
                    </Link>
                </h2>
            </div>
        </main>
    );
}
