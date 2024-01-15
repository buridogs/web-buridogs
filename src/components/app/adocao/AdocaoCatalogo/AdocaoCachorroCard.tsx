import { AdocaoFiltrosEnum, IAdocaoDetails } from "@/interfaces/adocaoInterfaces";
import { generateImgURL, returnFormattedOptionLabel } from "@/utils/methods";
import Image from "next/image";
import Link from "next/link";

interface AdocaoCachorroCardProps {
    cachorroInformacao: IAdocaoDetails;
}

export function AdocaoCachorroCard({ cachorroInformacao }: AdocaoCachorroCardProps) {
    const { id, descricao, genero, idade, imageSrc, nomeExibicao, nomeURL, porte, imagesSrc } =
        cachorroInformacao;
    const labelGenero = returnFormattedOptionLabel(AdocaoFiltrosEnum.genero, genero);
    const labelIdade = returnFormattedOptionLabel(AdocaoFiltrosEnum.idade, idade);
    const labelPorte = returnFormattedOptionLabel(AdocaoFiltrosEnum.porte, porte);

    const image = imagesSrc ? imagesSrc[0] : imageSrc;

    return (
        <div className=" max-w-full w-[344px] flex flex-col items-start rounded shadow-[0px_1px_3px_0px_rgba(0,0,0,0.20),0px_2px_1px_0px_rgba(0,0,0,0.12),0px_1px_1px_0px_rgba(0,0,0,0.14)]">
            <div className="w-full h-[350px] rounded rounded-b-2xl bg-grey-50 relative">
                <Image
                    className="object-cover"
                    src={generateImgURL(image ?? "")}
                    alt={nomeExibicao}
                    fill
                />
            </div>
            <div className="flex flex-col items-start px-4 pb-3">
                <strong className="text-grey-400 text-xl font-medium mt-4">{nomeExibicao}</strong>
                <span className="text-grey-400 text-sm">{`${labelGenero}, ${labelIdade}, ${labelPorte}`}</span>
                <p className="text-grey-100 text-sm mt-6 mb-4">{descricao}</p>
                <button className="text-primary-400 uppercase text-sm font-medium py-2 underline">
                    <Link href={`/adocao/${id}-${nomeURL.replaceAll(" ", "")}`}>
                        Quero adotar esse
                    </Link>
                </button>
            </div>
        </div>
    );
}
