"use client";

import Select from "@/components/Select/Select";
import { IVoluntarios, PermissaoEnum } from "@/interfaces/voluntariosInterfaces";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";

interface GerenciarVoluntariosTableProps {
    volunteers: IVoluntarios[];
    onViewDetails: (volunteer: IVoluntarios) => void;
    onDelete: (volunteer: IVoluntarios) => void;
}

export function GerenciarVoluntariosTable({
    volunteers,
    onViewDetails,
    onDelete,
}: GerenciarVoluntariosTableProps) {
    const [permissionFilter, setPermissionFilter] = useState<string>("all");
    const [searchTerm, setSearchTerm] = useState<string>("");

    const router = useRouter();

    const filteredVolunteers = useMemo(() => {
        return volunteers.filter((volunteer) => {
            const matchesPermission =
                permissionFilter === "all" || volunteer.permissao?.toString() === permissionFilter;
            const matchesSearch =
                volunteer.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                volunteer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                volunteer.apelido.toLowerCase().includes(searchTerm.toLowerCase());

            return matchesPermission && matchesSearch;
        });
    }, [permissionFilter, searchTerm, volunteers]);

    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                <Select
                    id="permissionFilter"
                    options={[
                        { value: "all", label: "Todas" },
                        { value: PermissaoEnum.ADMIN, label: "Administrador" },
                        { value: PermissaoEnum.VOLUNTEER, label: "Voluntário" },
                        { value: PermissaoEnum.EDITOR, label: "Editor" },
                    ]}
                    value={permissionFilter}
                    onChange={(value) => setPermissionFilter(value)}
                    label="Permissão"
                />
                <div className="w-full md:w-auto">
                    <input
                        type="text"
                        placeholder="Buscar por nome, email ou apelido"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="text-gray-500 border border-gray-300 rounded px-3 py-2 w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-primary-400"
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
                                Nome
                            </th>
                            <th
                                scope="col"
                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                            >
                                Email
                            </th>
                            <th
                                scope="col"
                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                            >
                                Apelido
                            </th>
                            <th
                                scope="col"
                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                            >
                                Permissão
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
                        {filteredVolunteers.length > 0 ? (
                            filteredVolunteers.map((volunteer) => (
                                <tr
                                    key={volunteer.id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {volunteer.nome}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {volunteer.email}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {volunteer.apelido}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {volunteer.permissao}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => onViewDetails(volunteer)}
                                                className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100 transition-colors"
                                                title="Ver detalhes"
                                            >
                                                <FaEye size={16} />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    router.push(
                                                        `/volunteer/gerenciar-usuarios/novo?id=${volunteer.id}`
                                                    )
                                                }
                                                className="text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-100 transition-colors"
                                                title="Editar"
                                            >
                                                <FaPencil size={16} />
                                            </button>
                                            <button
                                                onClick={() => onDelete(volunteer)}
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
                                    colSpan={5}
                                    className="px-4 py-8 text-center text-gray-500 italic"
                                >
                                    Nenhum voluntário encontrado
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
