"use client";
import { AdocaoFiltrosEnum } from "@/interfaces/adocaoInterfaces";
import { IFinalFeliz } from "@/interfaces/finaisFelizesInterfaces";
import { generateImgURL, returnFormattedOptionLabel } from "@/utils/methods";
import Image from "next/image";
import Link from "next/link";
import AliceCarousel from "react-alice-carousel";

interface FinaisFelizesCardProps {
    finalFeliz: IFinalFeliz;
}

export default function FinaisFelizesCard({ finalFeliz }: FinaisFelizesCardProps) {
    const { id, nome, genero, idade, imagensUrlAntes, imagensUrlDepois, porte } = finalFeliz;

    const labelGenero = returnFormattedOptionLabel(AdocaoFiltrosEnum.genero, genero);
    const labelIdade = returnFormattedOptionLabel(AdocaoFiltrosEnum.idade, idade);
    const labelPorte = returnFormattedOptionLabel(AdocaoFiltrosEnum.porte, porte);

    return (
        <div className="w-[344px] flex flex-col items-start rounded shadow-[0px_1px_3px_0px_rgba(0,0,0,0.20),0px_2px_1px_0px_rgba(0,0,0,0.12),0px_1px_1px_0px_rgba(0,0,0,0.14)]">
            <div className="w-full h-[350px] rounded rounded-b-2xl bg-gray-50 relative">
                {imagensUrlAntes?.concat(imagensUrlDepois ?? []).length ? (
                    <AliceCarousel
                        mouseTracking
                        disableDotsControls
                        infinite
                        autoPlay
                        autoPlayInterval={4000}
                        responsive={{
                            0: {
                                items: 1,
                            },
                        }}
                        disableButtonsControls
                        items={imagensUrlAntes.concat(imagensUrlDepois ?? []).map((image) => (
                            <div
                                key={image}
                                className="flex flex-col items-center md:flex-row md:justify-evenly"
                            >
                                <div className="w-full h-[350px] rounded rounded-b-2xl bg-gray-50">
                                    <Image
                                        src={generateImgURL(image)}
                                        alt={nome}
                                        fill
                                        priority
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        ))}
                    />
                ) : null}
            </div>
            <div className="flex flex-col items-start px-4 pb-3">
                <strong className="text-gray-400 text-xl font-medium mt-4">{nome}</strong>
                <span className="text-gray-400 text-sm mb-4">{`${labelGenero}, ${labelIdade}, ${labelPorte}`}</span>
                <button className="text-primary-400 uppercase text-sm font-medium py-2 underline">
                    <Link href={`/finais-felizes/${id}-${nome.replaceAll(" ", "")}`}>
                        Ver História
                    </Link>
                </button>
            </div>
        </div>
    );
}
