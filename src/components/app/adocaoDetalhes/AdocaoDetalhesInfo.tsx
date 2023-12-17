import { AdocaoFiltrosEnum, IAdocaoDetails } from "@/interfaces/adocaoInterfaces";
import Image from "next/image";
import AliceCarousel from "react-alice-carousel";
import { FaArrowLeft, FaArrowRight, FaDog } from "react-icons/fa6";
import { BsGenderAmbiguous } from "react-icons/bs";
import { MdBedroomBaby } from "react-icons/md";
import { generateImgURL, returnFormattedOptionLabel } from "@/utils/methods";

interface AdocaoDetalhesInfoProps {
    cachorroSelecionado: IAdocaoDetails;
}

export default function AdocaoDetalhesInfo({ cachorroSelecionado }: AdocaoDetalhesInfoProps) {
    const renderImagens = (nomeCachorro: string, imagens?: string[]) => {
        if (!imagens?.length || imagens?.length === 1) return null;

        return (
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
                        1024: {
                            items: 2,
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
                    items={imagens?.map((image) => (
                        <div
                            key={image}
                            className="flex flex-col items-center md:flex-row md:justify-evenly md:pl-2"
                        >
                            <div className="flex flex-col w-[300px] h-[300px]">
                                <div className="h-full w-full relative flex items-start md:max-w-lg lg:max-w-xl">
                                    <Image
                                        src={generateImgURL(image)}
                                        alt={nomeCachorro}
                                        fill
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                />
            </div>
        );
    };

    return (
        <section className="flex flex-col items-center pb-11">
            <div className="flex flex-col items-center pb-8 lg:flex-row lg:w-500px lg:mx-auto">
                <div className="relative w-[100px] h-[100px] md:h-[300px] md:w-[300px] lg:mr-6">
                    <Image
                        src={generateImgURL(cachorroSelecionado.imageSrc ?? "")}
                        alt={`Imagem do cachorro ${cachorroSelecionado.nome}`}
                        fill
                        sizes="(max-width: 1024px) 300px, 300px"
                        priority
                    />
                </div>
                <div className="flex flex-col items-center mt-6">
                    <h1 className="text-primary-400 text-3xl font-medium">
                        {cachorroSelecionado.nome}
                    </h1>
                    <span className="text-grey-400 text-lg font-medium flex items-center mt-3">
                        <BsGenderAmbiguous
                            size={30}
                            className="text-primary-400 mr-2"
                        />
                        {returnFormattedOptionLabel(
                            AdocaoFiltrosEnum.genero,
                            cachorroSelecionado.genero
                        )}
                    </span>
                    <span className="text-grey-400 text-lg font-medium flex items-center mt-2">
                        <MdBedroomBaby
                            size={30}
                            className="text-primary-400 mr-2"
                        />
                        {returnFormattedOptionLabel(
                            AdocaoFiltrosEnum.idade,
                            cachorroSelecionado.idade
                        )}
                    </span>
                    <span className="text-grey-400 text-lg font-medium flex items-center mt-2">
                        <FaDog
                            size={30}
                            className="text-primary-400 mr-2"
                        />
                        {returnFormattedOptionLabel(
                            AdocaoFiltrosEnum.porte,
                            cachorroSelecionado.porte
                        )}
                    </span>
                </div>
            </div>
            <p className="text-grey-400 text-base my-6">{cachorroSelecionado.descricaoLonga}</p>
            {renderImagens(cachorroSelecionado.nome, cachorroSelecionado.imagesSrc)}
            {cachorroSelecionado.youtubeSrcUrl ? (
                <section className="mt-8 w-full h-[300px] flex flex-col items-start lg:w-[800px] lg:h-[480px] mx-auto">
                    <h2 className="text-primary-400 text-2xl font-medium mb-4">
                        Veja também um vídeo dele(a)
                    </h2>
                    <iframe
                        title={`Vídeo do ${cachorroSelecionado.nome}`}
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${cachorroSelecionado.youtubeSrcUrl}`}
                    ></iframe>
                </section>
            ) : null}
        </section>
    );
}
