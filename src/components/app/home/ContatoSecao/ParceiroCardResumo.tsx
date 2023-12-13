import { IParceiros } from "@/interfaces/parceirosInterfaces";
import { generateImgURL } from "@/utils/methods";
import Image from "next/image";

interface ParceiroCardResumoProps {
    parceiro: IParceiros;
}

export function ParceiroCardResumo({ parceiro }: ParceiroCardResumoProps) {
    const { nome, endereco, contato, imagemSrc } = parceiro;
    return (
        <li className="flex flex-col items-center lg:items-start">
            {imagemSrc ? (
                <Image
                    src={generateImgURL(imagemSrc)}
                    alt={nome}
                    width={195}
                    height={195}
                    className="rounded-[50%] object-cover"
                />
            ) : (
                <div className="w-[195px] h-[195px] rounded-[50%] bg-grey-100" />
            )}
            <strong className="w-full mt-6">{nome}</strong>
            <span className="w-full text-grey-100 text-sm text-left">{endereco}</span>
            <span className="w-full text-grey-100 text-sm font-medium text-left">{contato}</span>
        </li>
    );
}
