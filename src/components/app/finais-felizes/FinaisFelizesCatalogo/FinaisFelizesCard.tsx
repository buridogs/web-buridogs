"use client";
import { IFinalFeliz } from "@/interfaces/finaisFelizesInterfaces";
import Image from "next/image";
import Link from "next/link";
import AliceCarousel from "react-alice-carousel";
import { FaHandsHelping } from "react-icons/fa";
import { GiLoveHowl } from "react-icons/gi";

interface FinaisFelizesCardProps {
    finalFeliz: IFinalFeliz;
}

export default function FinaisFelizesCard({ finalFeliz }: FinaisFelizesCardProps) {
    return (
        <div className="w-[344px] flex flex-col items-start rounded shadow-[0px_1px_3px_0px_rgba(0,0,0,0.20),0px_2px_1px_0px_rgba(0,0,0,0.12),0px_1px_1px_0px_rgba(0,0,0,0.14)]">
            <div className="w-full h-[350px] rounded rounded-b-2xl bg-grey-50 relative">
                {finalFeliz.imagensUrlAntes?.concat(finalFeliz.imagensUrlDepois ?? []).length ? (
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
                        items={finalFeliz.imagensUrlAntes
                            .concat(finalFeliz.imagensUrlDepois ?? [])
                            .map((image) => (
                                <div
                                    key={image}
                                    className="flex flex-col items-center md:flex-row md:justify-evenly md:pl-2"
                                >
                                    <div className="flex flex-col w-[300px] h-[300px]">
                                        <div className="h-full w-full relative flex items-start md:max-w-lg lg:max-w-xl">
                                            <Image
                                                src={image}
                                                alt={finalFeliz.nome}
                                                fill
                                                priority
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                    />
                ) : null}
            </div>
            <div className="flex flex-col items-start px-4 pb-3">
                <strong className="text-grey-400 text-xl font-medium mt-4">
                    {finalFeliz.nome}
                </strong>
                <span className="text-grey-400 text-sm">{`${finalFeliz.genero}, ${finalFeliz.idade}, ${finalFeliz.porte}`}</span>
                <p className="text-grey-100 text-sm mt-4 mb-4 flex items-center">
                    <FaHandsHelping
                        size={18}
                        className="text-primary-400 mr-2"
                    />
                    {finalFeliz.dataAcolhimento}
                </p>
                <p className="text-grey-100 text-sm mb-4 flex items-center">
                    <GiLoveHowl
                        size={18}
                        className="text-primary-400 mr-2"
                    />
                    {finalFeliz.dataAdocao}
                </p>
                <button className="text-primary-400 uppercase text-sm font-medium py-2 underline">
                    <Link
                        href={`/finais-felizes/${finalFeliz.id}-${finalFeliz.nome.replaceAll(
                            " ",
                            ""
                        )}`}
                    >
                        Ver História
                    </Link>
                </button>
            </div>
        </div>
    );
}
