"use client";

import { useMemo, useState } from "react";
import SearchInput from "@/components/SearchInput/SearchInput";
import Select from "@/components/Select/Select";
import { IPartnerUI } from "@/interfaces/parceirosInterfaces";
import { PartnerCategoryEnum } from "@/services/api/modules/partners/types";
import { mapPartnerCategoryLabels } from "@/utils/partnersUtils";
import { useRouter } from "next/navigation";
import { FaPencil, FaRegTrashCan } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";

interface GerenciarParceirosTableProps {
    partners: IPartnerUI[];
    onViewDetails: (partner: IPartnerUI) => void;
    onDelete: (partner: IPartnerUI) => void;
}

export function GerenciarParceirosTable({
    partners,
    onViewDetails,
    onDelete,
}: GerenciarParceirosTableProps) {
    const [categoryFilter, setCategoryFilter] = useState<string>("all");
    const [searchTerm, setSearchTerm] = useState<string>("");

    const router = useRouter();

    const filteredPartners = useMemo(() => {
        return partners.filter((partner) => {
            const matchesStatus =
                categoryFilter === "all" || partner.categoria?.toString() === categoryFilter;
            const matchesSearch = partner.nome.toLowerCase().includes(searchTerm.toLowerCase());

            return matchesStatus && matchesSearch;
        });
    }, [categoryFilter, searchTerm, partners]);

    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                <SearchInput
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Buscar por nome"
                    shouldExpand
                />
                <Select
                    id="categoryFilter"
                    options={[
                        { value: "all", label: "Todas" },
                        { value: PartnerCategoryEnum.veterinary, label: "Veterinaria" },
                        { value: PartnerCategoryEnum.petShop, label: "Pet Shop" },
                        { value: PartnerCategoryEnum.clothing, label: "Vestuário" },
                        {
                            value: PartnerCategoryEnum.vehicleProtection,
                            label: "Proteção Veicular",
                        },
                    ]}
                    value={categoryFilter}
                    onChange={(value) => setCategoryFilter(value)}
                    label="Categoria"
                />
            </div>

            <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                            >
                                Nome
                            </th>
                            <th
                                scope="col"
                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                            >
                                Categoria
                            </th>
                            <th
                                scope="col"
                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                            >
                                Telefone
                            </th>
                            <th
                                scope="col"
                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                            >
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredPartners.length > 0 ? (
                            filteredPartners.map((partner) => (
                                <tr
                                    key={partner.id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {partner.nome}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {mapPartnerCategoryLabels[partner.categoria]}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {partner.contato}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => onViewDetails(partner)}
                                                className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100 transition-colors"
                                                title="Ver detalhes"
                                            >
                                                <FaEye size={16} />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    router.push(
                                                        `/volunteer/gerenciar-parceiros/novo?id=${partner.id}`
                                                    )
                                                }
                                                className="text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-100 transition-colors"
                                                title="Editar"
                                            >
                                                <FaPencil size={16} />
                                            </button>
                                            <button
                                                onClick={() => onDelete(partner)}
                                                className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 transition-colors"
                                                title="Excluir"
                                            >
                                                <FaRegTrashCan size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-4 py-8 text-center text-gray-500 italic"
                                >
                                    Nenhuma adoção encontrada
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
