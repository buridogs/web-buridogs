"use client";
import { cachorrosAdocao } from "@/mock/adocaoMock";
import AliceCarousel from "react-alice-carousel";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { AdocaoEspecialCard } from "./AdocaoEspecialCard";

export function AdocaoEspecial() {
    const cachorrosIncapacitados = cachorrosAdocao.filter(
        (cachorro) => !!cachorro.possuiAlgumaInaptidao
    );

    return (
        <section className="relative flex flex-col items-center py-6 mt-6">
            <span className="text-primary-400 text-3xl font-semibold">
                Já conhece nosso cantinho especial?
            </span>
            <p className="w-full mt-4 text-gray-500 text-center">
                Esses são os nossos amigos especiais, cada um com seu jeitinho. Seja por algum
                problema físico, por ser mais velhinho ou por ter mais tempo de casa. Fazem parte da
                nossa história e merecem ser muito felizes!
            </p>
            <AliceCarousel
                mouseTracking
                disableDotsControls
                renderPrevButton={() => (
                    <div className="absolute top-[90%] left-0 w-10 h-10 flex items-center justify-center float-left rounded-[50%] bg-primary-400 cursor-pointer transition hover:bg-primary-100">
                        <FaArrowLeft color="white" />
                    </div>
                )}
                renderNextButton={() => (
                    <div className="absolute top-[90%] right-0 w-10 h-10 flex items-center justify-center float-right rounded-[50%] bg-primary-400 cursor-pointer transition hover:bg-primary-100">
                        <FaArrowRight color="white" />
                    </div>
                )}
                infinite
                autoPlay
                autoPlayInterval={3500}
                responsive={{
                    0: {
                        items: 1,
                    },
                }}
                items={cachorrosIncapacitados.map((dog) => (
                    <AdocaoEspecialCard
                        key={dog.nomeExibicao}
                        dog={dog}
                    />
                ))}
            />
        </section>
    );
}
