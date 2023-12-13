"use client";
import { finaisFelizes } from "@/mock/finaisFelizesMock";
import { generateImgURL } from "@/utils/methods";
import Image from "next/image";
import Link from "next/link";
import AliceCarousel from "react-alice-carousel";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

export function FinaisFelizesSecao() {
    const finaisFelizesHighlight = finaisFelizes.slice(0, 3);

    return (
        <section>
            <div className="max-w-screen-xl mx-auto px-8 py-8">
                <h2 className="text-primary-400 text-4xl font-bold text-center">
                    Acompanhe alguns dos nossos finais felizes
                </h2>
                <div className="py-10 w-full">
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
                        renderPrevButton={() => (
                            <div className="w-10 h-10 flex items-center justify-center float-left mt-4 rounded-[50%] bg-primary-400 cursor-pointer">
                                <FaArrowLeft color="white" />
                            </div>
                        )}
                        renderNextButton={() => (
                            <div className="w-10 h-10 flex items-center justify-center float-right mt-4 rounded-[50%] bg-primary-400 cursor-pointer">
                                <FaArrowRight color="white" />
                            </div>
                        )}
                        items={finaisFelizesHighlight.map((dog) => (
                            <div
                                key={dog.nome}
                                className="w-full flex flex-col items-center md:flex-row md:justify-evenly md:pl-2"
                            >
                                {dog.imagemPrincipal ? (
                                    <Image
                                        src={generateImgURL(dog.imagemPrincipal)}
                                        alt={dog.nome}
                                        width={280}
                                        height={280}
                                        className="w-[200px] h-[200px] md:w-[280px] md:h-[280px] rounded-[50%] object-cover"
                                    />
                                ) : (
                                    <div className="w-[200px] h-[200px] md:w-[280px] md:h-[280px] rounded-[50%] bg-primary-100" />
                                )}
                                <div className="flex flex-col items-start">
                                    <Link
                                        href="/finais-felizes"
                                        className="group py-3 px-4 rounded-[40px] bg-grey-50 mb-5 mt-4 transition duration-150 hover:bg-grey-100"
                                    >
                                        <span className="uppercase font-medium text-grey-400 transition duration-150 group-hover:text-white">
                                            {dog.nome}
                                        </span>
                                    </Link>
                                    <div className="w-full h-fit flex items-start md:max-w-lg lg:max-w-xl">
                                        <Image
                                            src={generateImgURL("quote-open.svg")}
                                            alt="Aspas"
                                            width={32}
                                            height={32}
                                        />
                                        <p className="max-w-[80%] text-grey-400 text-lg font-medium ml-1">
                                            {dog.descricaoDepois}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    />
                </div>
            </div>
        </section>
    );
}
