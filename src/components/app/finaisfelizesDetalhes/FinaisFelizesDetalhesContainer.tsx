"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import FinaisFelizesDetalhesInfo from "./FinaisFelizesDetalhesInfo";
import FinaisFelizesAntesDepoisInfo from "./FinaisFelizesAntesDepoisInfo";
import { dogs } from "@/mock/dogsMock";
import { IDog } from "@/interfaces/dogInterfaces";

interface FinaisFelizesDetalhesContainerProps {
    slug?: string;
}

export default function FinaisFelizesDetalhesContainer({
    slug,
}: FinaisFelizesDetalhesContainerProps) {
    const [finalFelizSelecionado, setFinalFelizSelecionado] = useState<IDog>({} as IDog);

    useEffect(() => {
        if (slug) {
            const idAnimalSelecionado = slug.split("-")[0];
            setFinalFelizSelecionado(
                dogs.find(
                    (c) => c.status === "finais-felizes" && c.id.toString() === idAnimalSelecionado
                ) ?? ({} as IDog)
            );
        }
    }, [slug]);

    return (
        <main className="bg-white">
            <div className="max-w-screen-xl mx-auto px-8 py-11 flex flex-col item-center md:py-12">
                <section className="w-full flex flex-col items-center pb-11">
                    <FinaisFelizesDetalhesInfo finalFelizSelecionado={finalFelizSelecionado} />
                    <p className="text-gray-400 text-base my-6 w-full">
                        {finalFelizSelecionado.descricao}
                    </p>
                    <FinaisFelizesAntesDepoisInfo
                        label="Antes"
                        nome={finalFelizSelecionado.nomeExibicao}
                        imagensUrl={
                            finalFelizSelecionado.images
                                ?.filter((i) => i.type === "before")
                                .map((i) => i.src) ?? []
                        }
                        youtubeUrlId={
                            finalFelizSelecionado.youtubeVideos?.find((i) => i.type === "before")
                                ?.src
                        }
                    />
                    <FinaisFelizesAntesDepoisInfo
                        label="Depois"
                        nome={finalFelizSelecionado.nomeExibicao}
                        imagensUrl={
                            finalFelizSelecionado.images
                                ?.filter((i) => i.type === "after")
                                .map((i) => i.src) ?? []
                        }
                        youtubeUrlId={
                            finalFelizSelecionado.youtubeVideos?.find((i) => i.type === "after")
                                ?.src
                        }
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
