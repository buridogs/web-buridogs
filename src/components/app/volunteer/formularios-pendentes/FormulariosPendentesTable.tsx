"use client";

import Select from "@/components/Select/Select";
import { FormAvailableEnum, FormStatusEnum, IForm } from "@/interfaces/formularioInterfaces";
import { formatDatetimePTBR } from "@/utils/methods";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdPending } from "react-icons/md";
import { TbZoomQuestion } from "react-icons/tb";

interface FormulariosPendentesTableProps {
    adoptions: IForm[];
    onViewDetails: (adoption: IForm) => void;
    onUpdateStatus: (id: string, status: string) => void;
}

export function FormulariosPendentesTable({
    adoptions,
    onViewDetails,
    onUpdateStatus,
}: FormulariosPendentesTableProps) {
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [typeFilter, setTypeFilter] = useState<string>("all");
    const [searchTerm, setSearchTerm] = useState<string>("");

    const queryForm = useSearchParams().get("formulario");

    const filteredAdoptions = useMemo(() => {
        return adoptions.filter((adoption) => {
            const matchesStatus =
                (statusFilter === "all" || adoption.status.toString() === statusFilter) &&
                (typeFilter === "all" || adoption.form_type.toString() === typeFilter);
            console.log({ adoption, typeFilter, statusFilter, matchesStatus });
            const matchesSearch =
                adoption.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                adoption.dog_name.toLowerCase().includes(searchTerm.toLowerCase());

            return matchesStatus && matchesSearch;
        });
    }, [statusFilter, typeFilter, searchTerm, adoptions]);

    console.log("filteredAdoptions", filteredAdoptions);

    useEffect(() => {
        if (queryForm) {
            const formType = queryForm.toUpperCase() as FormAvailableEnum;
            console.log("formType", formType);
            setTypeFilter(formType);
        }
    }, [queryForm]);

    const getStatusBadgeClass = (status: string) => {
        switch (status) {
            case FormStatusEnum.PENDENT:
                return "bg-yellow-100 text-yellow-800";
            case FormStatusEnum.APPROVED:
                return "bg-green-100 text-green-800";
            case FormStatusEnum.REJECTED:
                return "bg-red-100 text-red-800";
            case FormStatusEnum.IN_PROCESS:
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getTypeBadgeClass = (status: string) => {
        switch (status) {
            case FormAvailableEnum.ADOPTION:
                return "bg-yellow-100 text-yellow-800";
            case FormAvailableEnum.SPONSORSHIP:
                return "bg-green-100 text-green-800";
            case FormAvailableEnum.CONTACT:
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case FormStatusEnum.PENDENT:
                return "Pendente";
            case FormStatusEnum.APPROVED:
                return "Aprovado";
            case FormStatusEnum.REJECTED:
                return "Rejeitado";
            case FormStatusEnum.IN_PROCESS:
                return "Em Análise";
            default:
                return status;
        }
    };

    const getTypeText = (status: string) => {
        switch (status) {
            case FormAvailableEnum.ADOPTION:
                return "Adoção";
            case FormAvailableEnum.SPONSORSHIP:
                return "Apadrinhamento";
            case FormAvailableEnum.CONTACT:
                return "Contato";
            default:
                return status;
        }
    };

    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                <Select
                    id="statusFilter"
                    options={[
                        { value: "all", label: "Todos" },
                        { value: FormStatusEnum.PENDENT, label: "Pendente" },
                        { value: FormStatusEnum.APPROVED, label: "Aprovado" },
                        { value: FormStatusEnum.REJECTED, label: "Rejeitado" },
                        { value: FormStatusEnum.IN_PROCESS, label: "Em Análise" },
                    ]}
                    value={statusFilter}
                    onChange={(value) => setStatusFilter(value)}
                    label="Status"
                />
                <Select
                    id="typeFilter"
                    options={[
                        { value: "all", label: "Todos" },
                        { value: FormAvailableEnum.ADOPTION, label: "Adoção" },
                        { value: FormAvailableEnum.SPONSORSHIP, label: "Apadrinhamento" },
                        { value: FormAvailableEnum.CONTACT, label: "Contato" },
                    ]}
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
                        {filteredAdoptions.length > 0 ? (
                            filteredAdoptions.map((adoption) => (
                                <tr
                                    key={adoption.id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {formatDatetimePTBR(adoption.createdAt)}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {adoption.name}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {adoption.dog_name}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getTypeBadgeClass(adoption.form_type)}`}
                                        >
                                            {getTypeText(adoption.form_type)}
                                        </span>
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
                                                        FormStatusEnum.APPROVED
                                                    )
                                                }
                                                disabled={
                                                    adoption.status === FormStatusEnum.APPROVED
                                                }
                                                className={`text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-100 transition-colors ${
                                                    adoption.status === FormStatusEnum.APPROVED
                                                        ? "opacity-50 cursor-not-allowed"
                                                        : ""
                                                }`}
                                                title="Aprovar"
                                            >
                                                <FaCheck size={16} />
                                            </button>
                                            {adoption.form_type !== FormAvailableEnum.CONTACT && (
                                                <button
                                                    onClick={() =>
                                                        onUpdateStatus(
                                                            adoption.id,
                                                            FormStatusEnum.REJECTED
                                                        )
                                                    }
                                                    disabled={
                                                        adoption.status === FormStatusEnum.REJECTED
                                                    }
                                                    className={`text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 transition-colors ${
                                                        adoption.status === FormStatusEnum.REJECTED
                                                            ? "opacity-50 cursor-not-allowed"
                                                            : ""
                                                    }`}
                                                    title="Rejeitar adoção"
                                                >
                                                    <FaDeleteLeft size={16} />
                                                </button>
                                            )}
                                            {adoption.form_type !== FormAvailableEnum.CONTACT && (
                                                <button
                                                    onClick={() =>
                                                        onUpdateStatus(
                                                            adoption.id,
                                                            FormStatusEnum.IN_PROCESS
                                                        )
                                                    }
                                                    disabled={
                                                        adoption.status ===
                                                        FormStatusEnum.IN_PROCESS
                                                    }
                                                    className={`text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100 transition-colors ${
                                                        adoption.status ===
                                                        FormStatusEnum.IN_PROCESS
                                                            ? "opacity-50 cursor-not-allowed"
                                                            : ""
                                                    }`}
                                                    title="Marcar como em análise"
                                                >
                                                    <TbZoomQuestion size={16} />
                                                </button>
                                            )}
                                            <button
                                                onClick={() =>
                                                    onUpdateStatus(
                                                        adoption.id,
                                                        FormStatusEnum.PENDENT
                                                    )
                                                }
                                                disabled={
                                                    adoption.status === FormStatusEnum.PENDENT
                                                }
                                                className={`text-yellow-600 hover:text-yellow-800 p-1 rounded-full hover:bg-yellow-100 transition-colors ${
                                                    adoption.status === FormStatusEnum.PENDENT
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
