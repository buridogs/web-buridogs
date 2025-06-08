import {
    AzureBlobStorageContainerNames,
    mountBlobStorageLink,
} from "@/services/azure-blob/azure-blob";
import Image from "next/image";
import AliceCarousel from "react-alice-carousel";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

interface FinaisFelizesAntesDepoisInfoProps {
    label: string;
    imagensUrl?: string[];
    youtubeUrlId?: string;
    nome: string;
}

export default function FinaisFelizesAntesDepoisInfo({
    label,
    imagensUrl,
    youtubeUrlId,
    nome,
}: FinaisFelizesAntesDepoisInfoProps) {
    const renderImagens = (imagensUrl?: string[]) => {
        if (!imagensUrl?.length) return null;

        if (imagensUrl.length === 1) {
            return (
                <div className="flex flex-col w-[300px] h-[300px]">
                    <div className="h-full w-full relative flex items-start md:max-w-lg lg:max-w-xl">
                        <Image
                            src={
                                imagensUrl[0]
                                    ? mountBlobStorageLink(
                                          AzureBlobStorageContainerNames.DOGS,
                                          imagensUrl[0]
                                      )
                                    : ""
                            }
                            alt={nome}
                            fill
                            priority
                        />
                    </div>
                </div>
            );
        }

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
                    items={imagensUrl?.map((image) => (
                        <div
                            key={image}
                            className="flex flex-col items-center md:flex-row md:justify-evenly md:pl-2"
                        >
                            <div className="flex flex-col w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
                                <div className="h-full w-full relative flex items-start md:max-w-lg lg:max-w-xl">
                                    <Image
                                        src={mountBlobStorageLink(
                                            AzureBlobStorageContainerNames.DOGS,
                                            image
                                        )}
                                        alt={nome}
                                        fill
                                        priority
                                        className="object-cover"
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
        <div className="w-full flex flex-col items-center py-8">
            <h2 className="text-primary-400 text-2xl font-medium md:text-3xl">{label}</h2>

            {renderImagens(imagensUrl)}
            {youtubeUrlId ? (
                <section className="mt-8 w-full h-[300px] flex flex-col items-start lg:w-[800px] lg:h-[480px] mx-auto">
                    <h2 className="text-primary-400 text-2xl font-medium mb-4">
                        Veja também um vídeo dele(a)
                    </h2>
                    <iframe
                        title={`Vídeo do ${nome}`}
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${youtubeUrlId}`}
                    ></iframe>
                </section>
            ) : null}
        </div>
    );
}
