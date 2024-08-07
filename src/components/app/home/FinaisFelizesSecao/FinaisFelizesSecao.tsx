"use client";
import { Button } from "@/components/Button/Button";
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
                <div className="pt-10 pb-6 w-full">
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
                                        className="group py-3 px-4 rounded-[40px] bg-gray-50 mb-5 mt-4 transition duration-150 hover:bg-gray-100"
                                    >
                                        <span className="uppercase font-medium text-gray-400 transition duration-150 group-hover:text-white">
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
                                        <p className="max-w-[80%] text-gray-400 text-lg font-medium ml-1 text-ellipsis overflow-hidden line-clamp-6">
                                            {dog.descricao}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    />
                </div>
                <Link
                    href="/finais-felizes"
                    className="w-full flex justify-center md:justify-end"
                >
                    <Button
                        label="Acessar Finais Felizes"
                        customBorderColor="border-primary-400"
                        customTextColor="text-primary-400"
                        customCss="w-full"
                    />
                </Link>
            </div>
        </section>
    );
}
