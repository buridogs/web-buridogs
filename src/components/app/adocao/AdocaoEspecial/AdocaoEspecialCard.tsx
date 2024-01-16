import { AdocaoFiltrosEnum, IAdocaoDetails } from "@/interfaces/adocaoInterfaces";
import { generateImgURL, returnFormattedOptionLabel } from "@/utils/methods";
import Image from "next/image";
import Link from "next/link";

interface AdocaoEspecialCardProps {
    dog: IAdocaoDetails;
}

export function AdocaoEspecialCard({ dog }: AdocaoEspecialCardProps) {
    const { id, descricao, genero, idade, imageSrc, nomeExibicao, nomeURL, porte, imagesSrc } = dog;
    const labelGenero = returnFormattedOptionLabel(AdocaoFiltrosEnum.genero, genero);
    const labelIdade = returnFormattedOptionLabel(AdocaoFiltrosEnum.idade, idade);
    const labelPorte = returnFormattedOptionLabel(AdocaoFiltrosEnum.porte, porte);

    const image = imagesSrc ? imagesSrc[0] : imageSrc;

    return (
        <div className="py-6 flex flex-row items-center justify-center">
            <div className="flex flex-col items-center justify-center bg-gray-100 py-4 px-4 rounded-3xl md:flex-row">
                <div className="w-[250px] h-[250px] rounded rounded-b-2xl bg-grey-50 relative">
                    <Image
                        className="object-cover"
                        src={generateImgURL(image ?? "")}
                        alt={nomeExibicao}
                        fill
                    />
                </div>
                <div className="flex flex-col items-center justify-center px-4 mt-4 md:items-start md:mt-0 md:ml-[64px] ">
                    <strong className="text-primary-400 text-2xl">{nomeExibicao}</strong>
                    <div className="flex flex-col items-center mt-2 md:items-start md:max-w-lg lg:max-w-xl">
                        <span className="text-grey-400 text-sm">{`${labelGenero}, ${labelIdade}, ${labelPorte}`}</span>
                        <p className="text-grey-100 text-sm mt-4 mb-4">{descricao}</p>
                    </div>
                    <button className="text-primary-400 uppercase text-sm font-medium py-2 underline">
                        <Link href={`/adocao/${id}-${nomeURL.replaceAll(" ", "")}`}>
                            Quero adotar esse
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
}
