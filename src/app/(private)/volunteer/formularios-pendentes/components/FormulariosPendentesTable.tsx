"use client";

import Select from "@/components/Select/Select";
import { FormAvailableEnum, IFormUI } from "@/interfaces/formularioInterfaces";
import { formatDatetimePTBR } from "@/utils/methods";
import { useMemo, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { MdPending } from "react-icons/md";
import { TbZoomQuestion } from "react-icons/tb";
import {
    getFilterOptionsFormType,
    getFilterOptionsStatus,
    getStatusBadgeClass,
    getStatusText,
    getTypeBadgeClass,
    getTypeText,
} from "../shared/FormulariosPendentesUtils";
import { FormRequestStatusEnum } from "@/services/api/modules/form-requests/types";

interface FormulariosPendentesTableProps {
    formRequests: IFormUI[];
    onViewDetails: (formRequest: IFormUI) => void;
    onUpdateStatus: (id: string, status: FormRequestStatusEnum) => void;
}

export function FormulariosPendentesTable({
    formRequests,
    onViewDetails,
    onUpdateStatus,
}: FormulariosPendentesTableProps) {
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [typeFilter, setTypeFilter] = useState<string>("all");
    const [searchTerm, setSearchTerm] = useState<string>("");

    const filteredFormRequests = useMemo(() => {
        return formRequests.filter((formRequest) => {
            const matchesStatus =
                (statusFilter === "all" || formRequest.status.toString() === statusFilter) &&
                (typeFilter === "all" || formRequest.form_type.toString() === typeFilter);
            const matchesSearch =
                formRequest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ("dog_name" in formRequest &&
                    formRequest.dog_name?.toLowerCase().includes(searchTerm.toLowerCase()));

            return matchesStatus && matchesSearch;
        });
    }, [statusFilter, typeFilter, searchTerm, formRequests]);

    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                <Select
                    id="statusFilter"
                    options={getFilterOptionsStatus()}
                    value={statusFilter}
                    onChange={(value) => setStatusFilter(value)}
                    label="Status"
                />
                <Select
                    id="typeFilter"
                    options={getFilterOptionsFormType()}
                    value={typeFilter}
                    onChange={(value) => setTypeFilter(value)}
                    label="Tipo Formulário"
                />
                <div className="w-full md:w-auto">
                    <input
                        type="text"
                        placeholder="Buscar por nome ou cachorro"
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
                                Tipo
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
                        {filteredFormRequests.length > 0 ? (
                            filteredFormRequests.map((formRequest) => (
                                <tr
                                    key={`${formRequest.id}-${formRequest.name}`}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {formatDatetimePTBR(formRequest.createdAt)}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {formRequest.name}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {"dog_name" in formRequest ? formRequest.dog_name : ""}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getTypeBadgeClass(formRequest.form_type)}`}
                                        >
                                            {getTypeText(formRequest.form_type)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(formRequest.status)}`}
                                        >
                                            {getStatusText(formRequest.status)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => onViewDetails(formRequest)}
                                                className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100 transition-colors"
                                                title="Ver detalhes"
                                            >
                                                <FaEye size={16} />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    onUpdateStatus(
                                                        formRequest.id,
                                                        FormRequestStatusEnum.solved
                                                    )
                                                }
                                                disabled={
                                                    formRequest.status ===
                                                    FormRequestStatusEnum.solved
                                                }
                                                className={`text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-100 transition-colors ${
                                                    formRequest.status ===
                                                    FormRequestStatusEnum.solved
                                                        ? "opacity-50 cursor-not-allowed"
                                                        : ""
                                                }`}
                                                title={
                                                    formRequest.status ===
                                                    FormRequestStatusEnum.solved
                                                        ? "Marcar como resolvido desabilitado"
                                                        : "Marcar como resolvido"
                                                }
                                            >
                                                <FaCheck size={16} />
                                            </button>
                                            {formRequest.form_type ===
                                                FormAvailableEnum.ADOPTION && (
                                                <button
                                                    onClick={() =>
                                                        onUpdateStatus(
                                                            formRequest.id,
                                                            FormRequestStatusEnum.rejected
                                                        )
                                                    }
                                                    disabled={
                                                        formRequest.status ===
                                                        FormRequestStatusEnum.rejected
                                                    }
                                                    className={`text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 transition-colors ${
                                                        formRequest.status ===
                                                        FormRequestStatusEnum.rejected
                                                            ? "opacity-50 cursor-not-allowed"
                                                            : ""
                                                    }`}
                                                    title={
                                                        formRequest.status ===
                                                        FormRequestStatusEnum.rejected
                                                            ? "Marcar como rejeitado desabilitado"
                                                            : "Marcar como rejeitado"
                                                    }
                                                >
                                                    <IoMdClose size={16} />
                                                </button>
                                            )}
                                            {formRequest.form_type ===
                                                FormAvailableEnum.ADOPTION && (
                                                <button
                                                    onClick={() =>
                                                        onUpdateStatus(
                                                            formRequest.id,
                                                            FormRequestStatusEnum.in_progress
                                                        )
                                                    }
                                                    disabled={
                                                        formRequest.status ===
                                                        FormRequestStatusEnum.in_progress
                                                    }
                                                    className={`text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100 transition-colors ${
                                                        formRequest.status ===
                                                        FormRequestStatusEnum.in_progress
                                                            ? "opacity-50 cursor-not-allowed"
                                                            : ""
                                                    }`}
                                                    title={
                                                        formRequest.status ===
                                                        FormRequestStatusEnum.in_progress
                                                            ? "Marcar como pendente desabilitado"
                                                            : "Marcar como pendente"
                                                    }
                                                >
                                                    <TbZoomQuestion size={16} />
                                                </button>
                                            )}
                                            <button
                                                onClick={() =>
                                                    onUpdateStatus(
                                                        formRequest.id,
                                                        FormRequestStatusEnum.pending
                                                    )
                                                }
                                                disabled={
                                                    formRequest.status ===
                                                    FormRequestStatusEnum.pending
                                                }
                                                className={`text-yellow-600 hover:text-yellow-800 p-1 rounded-full hover:bg-yellow-100 transition-colors ${
                                                    formRequest.status ===
                                                    FormRequestStatusEnum.pending
                                                        ? "opacity-50 cursor-not-allowed"
                                                        : ""
                                                }`}
                                                title={
                                                    formRequest.status ===
                                                    FormRequestStatusEnum.pending
                                                        ? "Marcar como pendente desabilitado"
                                                        : "Marcar como pendente"
                                                }
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
