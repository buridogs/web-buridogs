"use client";
import { parceiros } from "@/mock/parceirosMock";
import AliceCarousel from "react-alice-carousel";

export function Banner() {
    return (
        <section className="max-w-[90%] mt-[48px] mb-6 md:max-w-screen-xl mx-auto w-full rounded-xl bg-slate-400 px-6">
            <div className="py-4 w-full flex flex-col items-center">
                <span className="text-slate-200 text-base font-semibold">
                    Conheça nossos parceiros
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
                            className="py-6 flex flex-col md:flex-row items-center justify-evenly"
                        >
                            <div className="w-[120px] h-[120px] sm:w-[180px] sm:h-[180px] rounded-[50%] bg-slate-300 mb-4 md:mb-0" />
                            <div className="max-w-[50%] flex flex-col items-start justify-center">
                                <strong className="text-gray-100 text-2xl">{parceiro.nome}</strong>
                                <div className="flex items-start mt-2 md:max-w-lg lg:max-w-xl">
                                    <p className="text-grey-400 text-base sm:text-xl font-medium">
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
