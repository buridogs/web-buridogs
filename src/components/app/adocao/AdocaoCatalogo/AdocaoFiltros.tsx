import { Button } from "@/components/Button/Button";
import { filtrosAdocao } from "../AdocaoUtils";
import { Dispatch, SetStateAction } from "react";

import { MdCleaningServices } from "react-icons/md";
import MultipleTags from "@/components/MultipleTags/MultipleTags";
import { AdocaoFiltrosEnum } from "@/interfaces/adocaoInterfaces";
import { DogAgeEnum, DogGenderEnum, DogSizeEnum } from "@/services/api/modules/dogs/types";

interface AdocaoFiltrosProps {
    filtrosSelecionados: Record<string, string[]>;
    setFiltrosSelecionados: Dispatch<SetStateAction<Record<string, string[]>>>;
    onResetFiltros: () => void;
}

export function AdocaoFiltros({
    filtrosSelecionados,
    setFiltrosSelecionados,
    onResetFiltros,
}: AdocaoFiltrosProps) {
    type AdocaoEnums = AdocaoFiltrosEnum | DogGenderEnum | DogAgeEnum | DogSizeEnum;
    return (
        <>
            <div className="w-full flex flex-col items-start my-6 [&>div+div]:mt-6">
                {filtrosAdocao.map((f) => {
                    return (
                        <MultipleTags<AdocaoEnums>
                            key={f.filtro.label}
                            filtroItem={f}
                            filtrosSelecionados={filtrosSelecionados}
                            setFiltrosSelecionados={setFiltrosSelecionados}
                        />
                    );
                })}
            </div>
            <div className="flex items-center [&>button+button]:ml-4">
                {Object.values(filtrosSelecionados).some((x) => x.length) ? (
                    <Button
                        label="Limpar filtros"
                        customBorderColor="border-primary-400"
                        customTextColor="text-primary-400"
                        onClick={onResetFiltros}
                        icon={
                            <MdCleaningServices
                                size={22}
                                className="ml-3"
                            />
                        }
                    />
                ) : null}
            </div>
        </>
    );
}
