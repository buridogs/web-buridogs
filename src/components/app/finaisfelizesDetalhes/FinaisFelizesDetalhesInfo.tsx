import { FaDog } from "react-icons/fa6";
import { BsGenderAmbiguous } from "react-icons/bs";
import { MdBedroomBaby } from "react-icons/md";
import { returnFormattedOptionLabel } from "@/utils/methods";
import { AdocaoFiltrosEnum } from "@/interfaces/adocaoInterfaces";
import { IDog } from "@/interfaces/dogInterfaces";

interface FinaisFelizesDetalhesInfoProps {
    finalFelizSelecionado: IDog;
}

export default function FinaisFelizesDetalhesInfo({
    finalFelizSelecionado,
}: FinaisFelizesDetalhesInfoProps) {
    return (
        <div className="w-full max-w-[800px] flex flex-col items-center lg:flex-row lg:justify-between lg:mx-auto">
            <div className="flex flex-col items-center pb-8">
                <h1 className="text-primary-400 text-3xl font-medium">
                    {finalFelizSelecionado.nomeExibicao}
                </h1>
                <span className="w-full text-gray-400 text-lg font-medium flex justify-start items-center mt-3">
                    <BsGenderAmbiguous
                        size={30}
                        className="text-primary-400 mr-2"
                    />
                    {returnFormattedOptionLabel(
                        AdocaoFiltrosEnum.genero,
                        finalFelizSelecionado.genero
                    )}
                </span>
                <span className="w-full text-gray-400 text-lg font-medium flex justify-start items-center mt-2">
                    <MdBedroomBaby
                        size={30}
                        className="text-primary-400 mr-2"
                    />
                    {returnFormattedOptionLabel(
                        AdocaoFiltrosEnum.idade,
                        finalFelizSelecionado.idade
                    )}
                </span>
                <span className="w-full text-gray-400 text-lg font-medium flex justify-start items-center mt-2">
                    <FaDog
                        size={30}
                        className="text-primary-400 mr-2"
                    />
                    {returnFormattedOptionLabel(
                        AdocaoFiltrosEnum.porte,
                        finalFelizSelecionado.porte
                    )}
                </span>
            </div>
            <div className="flex flex-col items-start">
                <p>
                    <strong className="text-primary-400 font-medium"> Local Acolhimento:</strong>{" "}
                    {finalFelizSelecionado.localAcolhimento}
                </p>
                <p>
                    <strong className="text-primary-400 font-medium">
                        Tratamentos realizados:
                    </strong>{" "}
                    {finalFelizSelecionado.tratamentosRealizados}
                </p>
            </div>
        </div>
    );
}
