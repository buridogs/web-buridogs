import { Button } from "@/components/Button/Button";
import { filtrosAdocao } from "../AdocaoUtils";
import { Dispatch, SetStateAction } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaMagnifyingGlass } from "react-icons/fa6";

import { MdCleaningServices } from "react-icons/md";

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
    return (
        <>
            <div className="w-full flex flex-col items-start my-6 [&>div+div]:mt-6">
                {filtrosAdocao.map((f) => {
                    return (
                        <div
                            key={f.filtro.value}
                            className="flex justify-start w-full"
                        >
                            <strong className="text-grey-400 text-lg font-bold">
                                {f.filtro.label}
                            </strong>
                            <ul className="flex items-center flex-wrap gap-2 ml-8 [&>li+li]:ml-3">
                                {f.opcoes.map((o) => {
                                    const filtroSelecionado = filtrosSelecionados[
                                        f.filtro.value
                                    ].includes(o.value);
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
                                                filtroSelecionado
                                                    ? setFiltrosSelecionados((old) => ({
                                                          ...old,
                                                          [f.filtro.value]: [
                                                              ...old[f.filtro.value].filter(
                                                                  (a) => a !== o.value
                                                              ),
                                                          ],
                                                      }))
                                                    : setFiltrosSelecionados((old) => ({
                                                          ...old,
                                                          [f.filtro.value]: [
                                                              ...old[f.filtro.value],
                                                              o.value,
                                                          ],
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
