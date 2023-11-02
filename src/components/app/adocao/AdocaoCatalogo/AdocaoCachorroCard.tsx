import { IAdocaoCard } from "@/interfaces/adocaoInterfaces";
import Image from "next/image";
import Link from "next/link";
import { returnFormattedOptionLabel } from "../AdocaoUtils";

interface AdocaoCachorroCardProps {
    cachorroInformacao: IAdocaoCard;
}

export function AdocaoCachorroCard({ cachorroInformacao }: AdocaoCachorroCardProps) {
    const { id, descricao, genero, idade, imageSrc, nome, porte } = cachorroInformacao;
    const labelGenero = returnFormattedOptionLabel("genero", genero);
    const labelIdade = returnFormattedOptionLabel("idade", idade);
    const labelPorte = returnFormattedOptionLabel("porte", porte);
    return (
        <div className="w-[344px] flex flex-col items-start rounded shadow-[0px_1px_3px_0px_rgba(0,0,0,0.20),0px_2px_1px_0px_rgba(0,0,0,0.12),0px_1px_1px_0px_rgba(0,0,0,0.14)]">
            <div className="w-full h-[350px] rounded rounded-b-2xl bg-grey-50 relative">
                <Image
                    className="object-cover"
                    src={imageSrc}
                    alt={nome}
                    fill
                />
            </div>
            <div className="flex flex-col items-start px-4 pb-3">
                <strong className="text-grey-400 text-xl font-medium mt-4">{nome}</strong>
                <span className="text-grey-400 text-sm">{`${labelGenero}, ${labelIdade}, ${labelPorte}`}</span>
                <p className="text-grey-100 text-sm mt-6 mb-4">{descricao}</p>
                <button className="text-primary-400 uppercase text-sm font-medium py-2">
                    <Link href={`/adocao/${id}-${nome.replaceAll(" ", "")}`}>
                        Quero adotar esse
                    </Link>
                </button>
            </div>
        </div>
    );
}
