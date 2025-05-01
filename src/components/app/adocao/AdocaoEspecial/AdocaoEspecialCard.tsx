import { AdocaoFiltrosEnum } from "@/interfaces/adocaoInterfaces";
import { IDogUI } from "@/interfaces/dogInterfaces";
import { generateImgURL, returnFormattedOptionLabel } from "@/utils/methods";
import Image from "next/image";
import Link from "next/link";

interface AdocaoEspecialCardProps {
    dog: IDogUI;
}

export function AdocaoEspecialCard({ dog }: AdocaoEspecialCardProps) {
    const { id, descricao, genero, idade, images, nomeExibicao, slug, porte } = dog;
    const labelGenero = returnFormattedOptionLabel(AdocaoFiltrosEnum.genero, genero);
    const labelIdade = returnFormattedOptionLabel(AdocaoFiltrosEnum.idade, idade);
    const labelPorte = returnFormattedOptionLabel(AdocaoFiltrosEnum.porte, porte);

    const image = images?.find((img) => img.type === "main")?.src ?? images?.[0]?.src;

    return (
        <div className="py-6 flex flex-row items-center justify-center">
            <div className="flex flex-col items-center justify-center bg-gray-50 py-4 px-4 rounded-3xl md:flex-row">
                <div className="w-[250px] h-[250px] rounded rounded-b-2xl bg-gray-50 relative">
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
                        <span className="text-gray-400 text-sm">{`${labelGenero}, ${labelIdade}, ${labelPorte}`}</span>
                        <p className="text-gray-100 text-sm mt-4 mb-4">{descricao}</p>
                    </div>
                    <button className="text-primary-400 uppercase text-sm font-medium py-2 underline">
                        <Link href={`/adocao/${id}-${slug}`}>Quero adotar esse</Link>
                    </button>
                </div>
            </div>
        </div>
    );
}
