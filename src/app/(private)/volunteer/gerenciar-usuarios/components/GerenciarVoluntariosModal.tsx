"use client";

import { useEffect, useRef } from "react";
import { IoMdClose, IoMdCreate, IoMdTrash } from "react-icons/io";
import { FaEnvelope, FaUser, FaTag } from "react-icons/fa";
import { IVoluntarios } from "@/interfaces/voluntariosInterfaces";
import { useRouter } from "next/navigation";
import { IUsuariosForm } from "../novo/shared/GerenciarUsuariosNovoTypes";

interface GerenciarVoluntariosModalProps {
    volunteer: IVoluntarios;
    onClose: () => void;
    onDelete?: (volunteer: IUsuariosForm) => void;
}

export function GerenciarVoluntariosModal({
    volunteer,
    onClose,
    onDelete,
}: GerenciarVoluntariosModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEscKey);
        return () => document.removeEventListener("keydown", handleEscKey);
    }, [onClose]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div
                ref={modalRef}
                className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] flex flex-col"
            >
                {/* Header */}
                <div className="flex justify-between items-center border-b p-4 bg-gray-50 rounded-t-lg">
                    <h3 className="text-xl font-semibold text-gray-900">Detalhes do Voluntário</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none p-1 rounded-full hover:bg-gray-200"
                    >
                        <IoMdClose size={24} />
                    </button>
                </div>
                {/* Content */}
                <div className="p-6 overflow-y-auto">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-full">
                            <div className="text-gray-600 mb-4 flex items-center">
                                <FaUser className="mr-2 text-gray-500" />
                                <span>
                                    <span className="text-primary-400 font-semibold">Nome: </span>
                                    {volunteer.nome}
                                </span>
                            </div>
                            <div className="text-gray-600 mb-4 flex items-center">
                                <FaEnvelope className="mr-2 text-gray-500" />
                                <span>
                                    <span className="text-primary-400 font-semibold">Email: </span>
                                    {volunteer.email}
                                </span>
                            </div>
                            <div className="text-gray-600 mb-4 flex items-center">
                                <FaTag className="mr-2 text-gray-500" />
                                <span>
                                    <span className="text-primary-400 font-semibold">
                                        Apelido:{" "}
                                    </span>
                                    {volunteer.apelido}
                                </span>
                            </div>
                            <div className="text-gray-600 mb-4">
                                <span className="text-primary-400 font-semibold">Permissão: </span>
                                {volunteer.role}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Footer with action buttons */}
                <div className="border-t p-4 bg-gray-50 rounded-b-lg flex gap-2 justify-end">
                    <button
                        onClick={() =>
                            router.push(`/volunteer/gerenciar-usuarios/novo?id=${volunteer.id}`)
                        }
                        className="flex items-center px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
                    >
                        <IoMdCreate className="mr-2" /> Editar
                    </button>
                    <button
                        onClick={() => onDelete && onDelete(volunteer)}
                        className="flex items-center px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 transition-colors"
                    >
                        <IoMdTrash className="mr-2" /> Excluir
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition-colors ml-2"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
}
