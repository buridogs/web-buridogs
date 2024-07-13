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
            className="flex justify-start w-full"
        >
            <strong className="text-grey-400 text-lg font-bold">{filtro.label}</strong>
            <ul className="flex items-center flex-wrap gap-2 ml-8 [&>li+li]:ml-3">
                {opcoes.map((o) => {
                    const filtroSelecionado = filtrosSelecionados[filtro.value].includes(o.value);
                    return (
                        <li
                            key={o.value}
                            className={`flex items-center justify-center text-center border-solid ${
                                filtroSelecionado
                                    ? "border-primary-400 bg-primary-400 text-white"
                                    : "border-grey-400 bg-transparent text-grey-400"
                            } border rounded-2xl p-2 text-sm cursor-pointer transition duration-150 ${
                                !filtroSelecionado
                                    ? "hover:border-primary-400 hover:bg-primary-400 hover:text-white"
                                    : ""
                            }`}
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
                                    className="text-grey-700 ml-2"
                                />
                            ) : null}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
