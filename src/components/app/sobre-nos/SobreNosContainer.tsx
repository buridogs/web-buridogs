"use client";
import AliceCarousel from "react-alice-carousel";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

export function SobreNosContainer() {
    const momentosBuridogs = [
        {
            ano: "2020",
            imgSrc: "",
            altText: "",
            descricao:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida, eros vitae venenatis volutpat, tellus odio tincidunt odio, et porttitor orci dui in ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida, eros vitae venenatis volutpat, tellus odio tincidunt odio, et porttitor orci dui in ante.",
        },
        {
            ano: "2021",
            imgSrc: "",
            altText: "",
            descricao:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida, eros vitae venenatis volutpat, tellus odio tincidunt odio, et porttitor orci dui in ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida, eros vitae venenatis volutpat, tellus odio tincidunt odio, et porttitor orci dui in ante.",
        },
        {
            ano: "2022",
            imgSrc: "",
            altText: "",
            descricao:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida, eros vitae venenatis volutpat, tellus odio tincidunt odio, et porttitor orci dui in ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida, eros vitae venenatis volutpat, tellus odio tincidunt odio, et porttitor orci dui in ante.",
        },
    ];

    return (
        <section className="max-w-screen-xl px-8 mx-auto h-full flex flex-col">
            <div className="py-11 grow flex flex-col-reverse items-center lg:flex-row lg:items-center lg:justify-between lg:py-[56px]">
                <div className="flex flex-col items-center md:items-start lg:max-w-[600px]">
                    <h1 className="text-grey-700 text-3xl leading-10 font-bold md:text-4xl">
                        <span className="text-primary-400 mr-1">Olá!</span> Somos o Buridogs!
                    </h1>
                    <strong className="py-5 text-grey-400 font-bold text-2xl">
                        Um grupo de proteção a cães abandonados do bairro Buritis em Belo Horizonte.
                    </strong>
                    <span className="text-grey-700 text-xl leading-8 font-medium mb-10 lg:text-start">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor
                        sit amet, consectetur adipiscing elit.
                    </span>
                </div>
                <div className="w-[200px] h-[200px] rounded-[50%] bg-primary-100 mb-10 lg:mb-0 lg:ml-10 lg:w-[300px] lg:h-[300px] xl:w-[400px] xl:h-[400px]" />
            </div>
            <div className="grow flex flex-col items-center justify-center lg:py-[56px]">
                <h2 className="text-primary-400 text-3xl font-bold text-center lg:text-4xl">
                    Momentos que marcaram a nossa história
                </h2>
                <div className="w-full py-10 relative">
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
                            <div className="w-10 h-10 flex items-center justify-center float-left mt-4 rounded-[50%] bg-primary-400 cursor-pointer md:absolute md:top-[100px] md:left-0">
                                <FaArrowLeft color="white" />
                            </div>
                        )}
                        renderNextButton={() => (
                            <div className="w-10 h-10 flex items-center justify-center float-right mt-4 rounded-[50%] bg-primary-400 cursor-pointer md:absolute md:top-[100px] md:right-0">
                                <FaArrowRight color="white" />
                            </div>
                        )}
                        items={momentosBuridogs.map((momento) => (
                            <div
                                key={momento.ano}
                                className="flex flex-col items-center lg:flex-row md:justify-evenly md:pl-2"
                            >
                                <div className="w-[280px] h-[280px] rounded-[50%] bg-primary-100" />
                                <div className="flex flex-col items-start">
                                    <span className="py-3 px-4 rounded-[40px] bg-grey-50 mb-5 mt-4 uppercase font-medium text-grey-400 transition duration-150 hover:bg-grey-100 hover:text-white">
                                        {momento.ano}
                                    </span>
                                    <div className="flex items-start md:max-w-lg lg:max-w-xl">
                                        <p className="text-grey-400 text-xl font-medium">
                                            {momento.descricao}
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
