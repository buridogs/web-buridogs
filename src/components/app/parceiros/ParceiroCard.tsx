import { RedesSociaisParceiros } from "@/components/RedesSociaisParceiros/RedesSociaisParceiros";
import { IParceiros } from "@/interfaces/parceirosInterfaces";
import { generateImgURL } from "@/utils/methods";
import Image from "next/image";
import { FaLocationDot, FaPhone } from "react-icons/fa6";

interface ParceiroCardProps {
    parceiro: IParceiros;
}
export function ParceiroCard({ parceiro }: ParceiroCardProps) {
    const { nome, endereco, contato, imagemSrc, categoria, redesSociais } = parceiro;

    return (
        <li className="w-full flex flex-col items-center md:flex-row lg:items-start">
            {imagemSrc ? (
                <Image
                    src={generateImgURL(imagemSrc)}
                    alt={nome}
                    width={150}
                    height={150}
                    className="rounded-[50%] object-cover"
                />
            ) : (
                <div className="w-[150px] h-[150px] rounded-[50%] bg-gray-100 md:w-[150px] md:h-[150px]" />
            )}
            <div className="flex flex-col items-start justify-start ml-8 max-w-[70%] mt-4 md:mt-0">
                <p className="text-primary-400 text-md font-bold">{categoria}</p>
                <strong className="text-gray-400 font-bold text-lg lg:text-2xl my-1">{nome}</strong>
                <span className="flex items-center">
                    <FaLocationDot
                        className="text-primary-400 mr-3"
                        size={20}
                    />
                    <span className="max-w-[80%] text-gray-400 font-medium text-sm lg:text-base">
                        {endereco}
                    </span>
                </span>
                <div className="w-full flex items-center mt-2">
                    <FaPhone
                        className="text-primary-400 mr-3"
                        size={20}
                    />
                    <span className="max-w-[80%] text-gray-400 font-medium text-sm lg:text-base">
                        {contato}
                    </span>
                </div>
                <RedesSociaisParceiros redes={redesSociais} />
            </div>
        </li>
    );
}
