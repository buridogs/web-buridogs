"use client";

import { AdocaoStatusEnum, IPendingAdoption } from "@/interfaces/adocaoInterfaces";
import { formatDatetimePTBR, generateImgURL } from "@/utils/methods";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { BsClipboard, BsGenderAmbiguous, BsCheck2Square, BsXSquare } from "react-icons/bs";
import { MdOutlineHouse, MdPerson } from "react-icons/md";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";

interface AdocoesPendentesModalProps {
    adoption: IPendingAdoption;
    onClose: () => void;
    onUpdateStatus: (id: string, status: string) => void;
}

export function AdocoesPendentesModal({
    adoption,
    onClose,
    onUpdateStatus,
}: AdocoesPendentesModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    // Handle clicking outside to close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    // Handle ESC key to close
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscKey);
        return () => {
            document.removeEventListener("keydown", handleEscKey);
        };
    }, [onClose]);

    // Prevent body scrolling when modal is open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`${label} copiado para a área de transferência`);
    };

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

    const renderBooleanValue = (value: boolean) => {
        return value ? (
            <span className="flex items-center text-green-600">
                <BsCheck2Square className="mr-1" /> Sim
            </span>
        ) : (
            <span className="flex items-center text-red-600">
                <BsXSquare className="mr-1" /> Não
            </span>
        );
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div
                ref={modalRef}
                className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col"
            >
                {/* Header */}
                <div className="flex justify-between items-center border-b p-4 bg-gray-50 rounded-t-lg">
                    <h3 className="text-xl font-semibold text-gray-900">
                        Detalhes da solicitação de adoção
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none p-1 rounded-full hover:bg-gray-200"
                    >
                        <IoMdClose size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto">
                    <div className="flex flex-col md:flex-row gap-6 mb-8">
                        {/* Left column - Applicant info */}
                        <div className="w-full md:w-1/2">
                            <h4 className="text-lg font-semibold text-primary-400 mb-4">
                                Informações do Solicitante
                            </h4>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <MdPerson
                                            className="mr-2 text-gray-500"
                                            size={18}
                                        />
                                        <span className="text-gray-700">{adoption.nome}</span>
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(adoption.nome, "Nome")}
                                        className="text-blue-600 p-1 rounded hover:bg-blue-50"
                                        title="Copiar nome"
                                    >
                                        <BsClipboard size={14} />
                                    </button>
                                </div>

                                {adoption.email && (
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <FaEnvelope
                                                className="mr-2 text-gray-500"
                                                size={16}
                                            />
                                            <span className="text-gray-700">{adoption.email}</span>
                                        </div>
                                        <button
                                            onClick={() =>
                                                copyToClipboard(adoption.email || "", "Email")
                                            }
                                            className="text-blue-600 p-1 rounded hover:bg-blue-50"
                                            title="Copiar email"
                                        >
                                            <BsClipboard size={14} />
                                        </button>
                                    </div>
                                )}

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <FaPhone
                                            className="mr-2 text-gray-500"
                                            size={16}
                                        />
                                        <span className="text-gray-700">{adoption.celular}</span>
                                    </div>
                                    <button
                                        onClick={() =>
                                            copyToClipboard(adoption.celular, "Telefone")
                                        }
                                        className="text-blue-600 p-1 rounded hover:bg-blue-50"
                                        title="Copiar telefone"
                                    >
                                        <BsClipboard size={14} />
                                    </button>
                                </div>

                                <div className="flex items-center">
                                    <FaMapMarkerAlt
                                        className="mr-2 text-gray-500"
                                        size={16}
                                    />
                                    <span className="text-gray-700">
                                        {adoption.formData.endereco_rua},{" "}
                                        {adoption.formData.endereco_numero}
                                        {adoption.formData.endereco_complemento
                                            ? `, ${adoption.formData.endereco_complemento}`
                                            : ""}{" "}
                                        - {adoption.formData.endereco_bairro},{" "}
                                        {adoption.formData.endereco_cidade}/
                                        {adoption.formData.endereco_estado}
                                    </span>
                                </div>

                                <div className="flex items-center">
                                    <MdOutlineHouse
                                        className="mr-2 text-gray-500"
                                        size={18}
                                    />
                                    <span className="text-gray-700">
                                        Mora em: {adoption.formData.mora_casa_apt}
                                    </span>
                                </div>

                                <div className="pt-2 border-t">
                                    <p className="text-gray-700">
                                        <span className="font-medium">Redes sociais:</span>
                                        <br />
                                        <a
                                            href={adoption.formData.facebook_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            Facebook
                                        </a>
                                        {" | "}
                                        <a
                                            href={adoption.formData.instagram_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            Instagram
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right column - Dog and request info */}
                        <div className="w-full md:w-1/2">
                            <h4 className="text-lg font-semibold text-primary-400 mb-4">
                                Detalhes da Adoção
                            </h4>

                            <div className="mb-4">
                                <span
                                    className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadgeClass(adoption.status)}`}
                                >
                                    {getStatusText(adoption.status)}
                                </span>
                                <span className="ml-2 text-gray-500 text-sm">
                                    Enviado em {formatDatetimePTBR(adoption.dataEnvio)}
                                </span>
                            </div>

                            <div className="flex items-center mb-4">
                                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                                    {adoption.fotos && adoption.fotos.length > 0 ? (
                                        <Image
                                            src={generateImgURL(adoption.fotos[0])}
                                            alt={adoption.nomeCachorroAdocao}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                            <span className="text-xs text-gray-500">Sem foto</span>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h5 className="font-medium text-gray-900">
                                        {adoption.nomeCachorroAdocao}
                                    </h5>
                                </div>
                            </div>

                            <div className="space-y-3 text-sm">
                                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                    <div>
                                        <span className="text-gray-500">Primeira adoção:</span>
                                        <div>
                                            {renderBooleanValue(adoption.formData.primeira_adocao)}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Ciente dos gastos:</span>
                                        <div>
                                            {renderBooleanValue(
                                                adoption.formData.esta_ciente_gastos
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Pessoas de acordo:</span>
                                        <div>
                                            {renderBooleanValue(
                                                adoption.formData.pessoas_de_acordo_adocao
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">
                                            Termo de responsabilidade:
                                        </span>
                                        <div>
                                            {renderBooleanValue(
                                                adoption.formData.consciente_termo_responsabilidade
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <span className="text-gray-500">Outros animais:</span>
                                    <p className="text-gray-700">
                                        {adoption.formData.ha_outros_animais}
                                    </p>
                                </div>

                                <div>
                                    <span className="text-gray-500">Já teve outros animais:</span>
                                    <p className="text-gray-700">
                                        {adoption.formData.ja_teve_outros_animais}
                                    </p>
                                </div>

                                <div>
                                    <span className="text-gray-500">Motivo da adoção:</span>
                                    <p className="text-gray-700">
                                        {adoption.formData.motivo_adocao}
                                    </p>
                                </div>

                                <div>
                                    <span className="text-gray-500">Descrição do local:</span>
                                    <p className="text-gray-700">
                                        {adoption.formData.descricao_lugar_animal}
                                    </p>
                                </div>

                                <div>
                                    <span className="text-gray-500">
                                        Considerações sobre devolução:
                                    </span>
                                    <p className="text-gray-700">
                                        {adoption.formData.situacao_devolucao_adocao}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Photos from Azure Blob */}
                    {adoption.formData.linksArquivosAzureBlob &&
                        adoption.formData.linksArquivosAzureBlob.length > 0 && (
                            <div className="mt-6 border-t pt-6">
                                <h4 className="text-lg font-semibold text-primary-400 mb-4">
                                    Fotos do ambiente
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {adoption.formData.linksArquivosAzureBlob.map((url, index) => (
                                        <div
                                            key={index}
                                            className="relative h-48 rounded-lg overflow-hidden"
                                        >
                                            <a
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Image
                                                    src={url}
                                                    alt={`Foto ${index + 1} do ambiente`}
                                                    fill
                                                    className="object-cover hover:opacity-90 transition-opacity"
                                                />
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                </div>

                {/* Footer with action buttons */}
                <div className="border-t p-4 bg-gray-50 rounded-b-lg flex flex-wrap gap-2 justify-end">
                    <button
                        onClick={() => onUpdateStatus(adoption.id, AdocaoStatusEnum.APROVADO)}
                        disabled={adoption.status === AdocaoStatusEnum.APROVADO}
                        className={`px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 transition-colors ${
                            adoption.status === AdocaoStatusEnum.APROVADO
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                        }`}
                    >
                        Aprovar
                    </button>
                    <button
                        onClick={() => onUpdateStatus(adoption.id, AdocaoStatusEnum.EM_ANALISE)}
                        disabled={adoption.status === AdocaoStatusEnum.EM_ANALISE}
                        className={`px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors ${
                            adoption.status === AdocaoStatusEnum.EM_ANALISE
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                        }`}
                    >
                        Em Análise
                    </button>
                    <button
                        onClick={() => onUpdateStatus(adoption.id, AdocaoStatusEnum.REJEITADO)}
                        disabled={adoption.status === AdocaoStatusEnum.REJEITADO}
                        className={`px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 transition-colors ${
                            adoption.status === AdocaoStatusEnum.REJEITADO
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                        }`}
                    >
                        Rejeitar
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
