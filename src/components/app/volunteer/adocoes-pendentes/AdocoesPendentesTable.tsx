"use client";

import { IPendingAdoption, AdocaoStatusEnum } from "@/interfaces/adocaoInterfaces";
import { formatDatetimePTBR } from "@/utils/methods";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { MdPending } from "react-icons/md";
import { TbZoomQuestion } from "react-icons/tb";

interface AdocoesPendentesTableProps {
    adoptions: IPendingAdoption[];
    onViewDetails: (adoption: IPendingAdoption) => void;
    onUpdateStatus: (id: string, status: string) => void;
}

export function AdocoesPendentesTable({
    adoptions,
    onViewDetails,
    onUpdateStatus,
}: AdocoesPendentesTableProps) {
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [searchTerm, setSearchTerm] = useState<string>("");

    const filteredAdoptions = adoptions.filter((adoption) => {
        const matchesStatus = statusFilter === "all" || adoption.status === statusFilter;

        const matchesSearch =
            adoption.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            adoption.nomeCachorroAdocao.toLowerCase().includes(searchTerm.toLowerCase()) ||
            adoption.celular.includes(searchTerm);

        return matchesStatus && matchesSearch;
    });

    const getStatusBadgeClass = (status: string) => {
        switch (status) {
            case AdocaoStatusEnum.PENDENTE:
                return "bg-yellow-100 text-yellow-800";
            case AdocaoStatusEnum.APROVADO:
                return "bg-green-100 text-green-800";
            case AdocaoStatusEnum.REJEITADO:
                return "bg-red-100 text-red-800";
            case AdocaoStatusEnum.EM_ANALISE:
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case AdocaoStatusEnum.PENDENTE:
                return "Pendente";
            case AdocaoStatusEnum.APROVADO:
                return "Aprovado";
            case AdocaoStatusEnum.REJEITADO:
                return "Rejeitado";
            case AdocaoStatusEnum.EM_ANALISE:
                return "Em Análise";
            default:
                return status;
        }
    };

    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                <div className="flex items-center">
                    <label
                        htmlFor="statusFilter"
                        className="mr-2 text-gray-700"
                    >
                        Status:
                    </label>
                    <select
                        id="statusFilter"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
                    >
                        <option value="all">Todos</option>
                        <option value={AdocaoStatusEnum.PENDENTE}>Pendente</option>
                        <option value={AdocaoStatusEnum.EM_ANALISE}>Em Análise</option>
                        <option value={AdocaoStatusEnum.APROVADO}>Aprovado</option>
                        <option value={AdocaoStatusEnum.REJEITADO}>Rejeitado</option>
                    </select>
                </div>
                <div className="w-full md:w-auto">
                    <input
                        type="text"
                        placeholder="Buscar por nome, cachorro ou telefone"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-primary-400"
                    />
                </div>
            </div>

            <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                            >
                                Data
                            </th>
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
                                Cachorro
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
                                Status
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
                        {filteredAdoptions.length > 0 ? (
                            filteredAdoptions.map((adoption) => (
                                <tr
                                    key={adoption.id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {formatDatetimePTBR(adoption.dataEnvio)}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {adoption.nome}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {adoption.nomeCachorroAdocao}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {adoption.celular}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(adoption.status)}`}
                                        >
                                            {getStatusText(adoption.status)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => onViewDetails(adoption)}
                                                className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100 transition-colors"
                                                title="Ver detalhes"
                                            >
                                                <FaEye size={16} />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    onUpdateStatus(
                                                        adoption.id,
                                                        AdocaoStatusEnum.APROVADO
                                                    )
                                                }
                                                disabled={
                                                    adoption.status === AdocaoStatusEnum.APROVADO
                                                }
                                                className={`text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-100 transition-colors ${
                                                    adoption.status === AdocaoStatusEnum.APROVADO
                                                        ? "opacity-50 cursor-not-allowed"
                                                        : ""
                                                }`}
                                                title="Aprovar adoção"
                                            >
                                                <FaCheck size={16} />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    onUpdateStatus(
                                                        adoption.id,
                                                        AdocaoStatusEnum.REJEITADO
                                                    )
                                                }
                                                disabled={
                                                    adoption.status === AdocaoStatusEnum.REJEITADO
                                                }
                                                className={`text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 transition-colors ${
                                                    adoption.status === AdocaoStatusEnum.REJEITADO
                                                        ? "opacity-50 cursor-not-allowed"
                                                        : ""
                                                }`}
                                                title="Rejeitar adoção"
                                            >
                                                {/* <FaTimes size={16} /> */}
                                            </button>
                                            <button
                                                onClick={() =>
                                                    onUpdateStatus(
                                                        adoption.id,
                                                        AdocaoStatusEnum.EM_ANALISE
                                                    )
                                                }
                                                disabled={
                                                    adoption.status === AdocaoStatusEnum.EM_ANALISE
                                                }
                                                className={`text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100 transition-colors ${
                                                    adoption.status === AdocaoStatusEnum.EM_ANALISE
                                                        ? "opacity-50 cursor-not-allowed"
                                                        : ""
                                                }`}
                                                title="Marcar como em análise"
                                            >
                                                <TbZoomQuestion size={16} />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    onUpdateStatus(
                                                        adoption.id,
                                                        AdocaoStatusEnum.PENDENTE
                                                    )
                                                }
                                                disabled={
                                                    adoption.status === AdocaoStatusEnum.PENDENTE
                                                }
                                                className={`text-yellow-600 hover:text-yellow-800 p-1 rounded-full hover:bg-yellow-100 transition-colors ${
                                                    adoption.status === AdocaoStatusEnum.PENDENTE
                                                        ? "opacity-50 cursor-not-allowed"
                                                        : ""
                                                }`}
                                                title="Marcar como pendente"
                                            >
                                                <MdPending size={16} />
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
