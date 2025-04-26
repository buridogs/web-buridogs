import { AdocaoFiltrosEnum } from "@/interfaces/adocaoInterfaces";
import { IDog } from "@/interfaces/dogInterfaces";
import { generateImgURL, returnFormattedOptionLabel } from "@/utils/methods";
import Image from "next/image";
import Link from "next/link";
import { LuPencil } from "react-icons/lu";

interface AdocaoCachorroCardProps {
    cachorroInformacao: IDog;
    isManagementMode?: boolean;
    onDelete?: (dog: IDog) => void;
}

export function AdocaoCachorroCard({
    cachorroInformacao,
    isManagementMode = false,
    onDelete,
}: AdocaoCachorroCardProps) {
    const { id, descricao, genero, idade, images, nomeExibicao, slug, porte } = cachorroInformacao;
    const labelGenero = returnFormattedOptionLabel(AdocaoFiltrosEnum.genero, genero);
    const labelIdade = returnFormattedOptionLabel(AdocaoFiltrosEnum.idade, idade);
    const labelPorte = returnFormattedOptionLabel(AdocaoFiltrosEnum.porte, porte);

    const image = images?.find((img) => img.type === "main")?.src;

    return (
        <div className="max-w-full w-[344px] flex flex-col items-start rounded shadow-[0px_1px_3px_0px_rgba(0,0,0,0.20),0px_2px_1px_0px_rgba(0,0,0,0.12),0px_1px_1px_0px_rgba(0,0,0,0.14)]">
            <div className="w-full h-[350px] rounded rounded-b-2xl bg-gray-50 relative">
                <Image
                    className="object-cover"
                    src={generateImgURL(image ?? "")}
                    alt={nomeExibicao}
                    fill
                />

                {isManagementMode && (
                    <div className="absolute top-3 right-3 flex">
                        <Link
                            href={`/volunteer/gerenciar-cachorros/novo?dogId=${id}`}
                            className="bg-white hover:bg-gray-100 p-2 rounded-full shadow-md transition-colors"
                        >
                            <LuPencil className="h-5 w-5 text-primary-700" />
                        </Link>
                    </div>
                )}
            </div>
            <div className="flex flex-col items-start px-4 pb-3">
                <strong className="text-gray-400 text-xl font-medium mt-4">{nomeExibicao}</strong>
                <span className="text-gray-400 text-sm">{`${labelGenero}, ${labelIdade}, ${labelPorte}`}</span>
                <p className="text-gray-100 text-sm mt-6 mb-4">{descricao}</p>
                {isManagementMode ? (
                    <div className="flex justify-between w-full">
                        <Link
                            href={`/volunteer/gerenciar-cachorros/novo?dogId=${id}`}
                            className="text-primary-400 hover:text-primary-700 uppercase text-sm font-medium py-2 underline"
                        >
                            Editar
                        </Link>
                        {onDelete && (
                            <button
                                className="text-primary-400 hover:text-primary-700 uppercase text-sm font-medium py-2 underline"
                                onClick={() => {
                                    onDelete(cachorroInformacao);
                                }}
                            >
                                Deletar
                            </button>
                        )}
                    </div>
                ) : (
                    <button className="text-primary-400 uppercase text-sm font-medium py-2 underline">
                        <Link href={`/adocao/${id}-${slug}`}>Quero adotar esse</Link>
                    </button>
                )}
            </div>
        </div>
    );
}
