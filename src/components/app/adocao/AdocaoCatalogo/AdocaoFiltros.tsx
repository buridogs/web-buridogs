import { Button } from "@/components/Button/Button";
import { filtrosAdocao } from "../AdocaoUtils";
import { Dispatch, SetStateAction } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

import { MdCleaningServices } from "react-icons/md";
import MultipleTags from "@/components/MultipleTags/MultipleTags";
import {
    AdocaoFiltrosEnum,
    AdocaoGeneroEnum,
    AdocaoIdadeEnum,
    AdocaoPorteEnum,
} from "@/interfaces/adocaoInterfaces";

interface AdocaoFiltrosProps {
    filtrosSelecionados: Record<string, string[]>;
    setFiltrosSelecionados: Dispatch<SetStateAction<Record<string, string[]>>>;
    onSearch: () => void;
    onResetFiltros: () => void;
}

export function AdocaoFiltros({
    filtrosSelecionados,
    setFiltrosSelecionados,
    onResetFiltros,
    onSearch,
}: AdocaoFiltrosProps) {
    type AdocaoEnums = AdocaoFiltrosEnum | AdocaoGeneroEnum | AdocaoIdadeEnum | AdocaoPorteEnum;
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
                <Button
                    label="Buscar"
                    customBorderColor="border-primary-400"
                    customTextColor="text-primary-400"
                    onClick={onSearch}
                    icon={
                        <FaMagnifyingGlass
                            size={22}
                            className="ml-3"
                        />
                    }
                />
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
