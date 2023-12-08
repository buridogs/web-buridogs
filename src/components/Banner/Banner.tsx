"use client";
import { parceiros } from "@/mock/parceirosMock";
import AliceCarousel from "react-alice-carousel";

export function Banner() {
    return (
        <section className="mt-[48px] mb-6 max-w-screen-xl mx-auto w-full rounded-xl bg-slate-400">
            <div className="py-4 w-full flex flex-col items-center">
                <span className="text-slate-200 text-base font-semibold">
                    Conheça nossos parceiros do projeto
                </span>
                <AliceCarousel
                    mouseTracking
                    disableDotsControls
                    disableButtonsControls
                    infinite
                    autoPlay
                    autoPlayInterval={3500}
                    responsive={{
                        0: {
                            items: 1,
                        },
                    }}
                    items={parceiros.map((parceiro) => (
                        <div
                            key={parceiro.nome}
                            className="py-6 flex flex-row items-center justify-evenly"
                        >
                            <div className="w-[180px] h-[180px] rounded-[50%] bg-slate-300" />
                            <div className="flex flex-col items-start justify-center">
                                <strong className="text-gray-100 text-2xl">{parceiro.nome}</strong>
                                <div className="flex items-start mt-2 md:max-w-lg lg:max-w-xl">
                                    <p className="text-grey-400 text-xl font-medium">
                                        {parceiro.descricao}
                                    </p>
                                </div>
                                {parceiro.linkURL && (
                                    <a
                                        href={parceiro.linkURL}
                                        target="_blank"
                                        className="underline uppercase mt-4 text-slate-200 transition hover:text-blue-400"
                                    >
                                        Ver parceiro
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                />
            </div>
        </section>
    );
}
