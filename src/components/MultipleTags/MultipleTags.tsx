import { FiltroOptionsType } from "@/utils/types";
import { Dispatch, SetStateAction } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

interface MultipleTagsProps<T> {
    filtroItem: FiltroOptionsType<T>;
    filtrosSelecionados: Record<string, string[]>;
    setFiltrosSelecionados: Dispatch<SetStateAction<Record<string, string[]>>>;
    customSetFiltrosSelecionados?: (filtroValue: string, optionValue: string) => void;
}

export default function MultipleTags<T>({
    filtroItem,
    filtrosSelecionados,
    setFiltrosSelecionados,
    customSetFiltrosSelecionados,
}: MultipleTagsProps<T>) {
    const { filtro, opcoes } = filtroItem as FiltroOptionsType<string>;

    return (
        <div
            key={filtro.value}
            className="flex flex-col justify-start w-full md:flex-row"
        >
            <strong className="text-gray-400 text-lg font-bold">{filtro.label}</strong>
            <ul className="flex items-center flex-wrap gap-2 mt-2 md:mt-0 md:ml-8 md:[&>li+li]:ml-3">
                {opcoes.map((o) => {
                    const filtroSelecionado = filtrosSelecionados[filtro.value].includes(o.value);
                    return (
                        <li
                            key={o.value}
                            className={`flex w-full items-center justify-between text-center border-solid ${
                                filtroSelecionado
                                    ? "border-primary-400 bg-primary-400 text-white"
                                    : "border-gray-400 bg-transparent text-gray-400"
                            } border rounded-2xl p-2 px-4 text-sm cursor-pointer transition duration-150 ${
                                !filtroSelecionado
                                    ? "hover:border-primary-400 hover:bg-primary-400 hover:text-white"
                                    : ""
                            } md:w-fit md:justify-center md:px-2`}
                            onClick={() =>
                                customSetFiltrosSelecionados
                                    ? customSetFiltrosSelecionados(filtro.value, o.value)
                                    : filtroSelecionado
                                      ? setFiltrosSelecionados((old) => ({
                                            ...old,
                                            [filtro.value]: [
                                                ...old[filtro.value].filter((a) => a !== o.value),
                                            ],
                                        }))
                                      : setFiltrosSelecionados((old) => ({
                                            ...old,
                                            [filtro.value]: [...old[filtro.value], o.value],
                                        }))
                            }
                        >
                            {o.label}
                            {filtroSelecionado ? (
                                <AiOutlineCloseCircle
                                    size={18}
                                    className="text-gray-700 ml-2 min-w-[18px]"
                                />
                            ) : null}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
