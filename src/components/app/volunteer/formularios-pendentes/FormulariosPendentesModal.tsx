"use client";

import { formatDatetimePTBR } from "@/utils/methods";
import { useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { BsClipboard, BsCheck2Square, BsXSquare } from "react-icons/bs";
import { MdOutlineHouse, MdPerson } from "react-icons/md";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import {
    FormAvailableEnum,
    FormStatusEnum,
    IForm,
    IFormAdoption,
    IFormContact,
    IFormSponsorship,
} from "@/interfaces/formularioInterfaces";
import { getStatusBadgeClass, getStatusText } from "./FormulariosPendentesUtils";

interface FormulariosPendentesModalProps {
    adoption: IForm;
    onClose: () => void;
    onUpdateStatus: (id: string, status: string) => void;
}

export function FormulariosPendentesModal({
    adoption,
    onClose,
    onUpdateStatus,
}: FormulariosPendentesModalProps) {
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

    const renderApplicantInfo = (adoptionData: IForm) => {
        let adoption: IForm = {} as IForm;

        if (adoptionData.form_type === FormAvailableEnum.ADOPTION) {
            adoption = adoptionData as IFormAdoption;
            return (
                <>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <FaPhone
                                className="mr-2 text-gray-500"
                                size={16}
                            />
                            <span className="text-gray-700">{adoption.phone_number}</span>
                        </div>
                        <button
                            onClick={() => copyToClipboard(adoption.phone_number, "Telefone")}
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
                            {adoption.street}, {adoption.number}
                            {adoption.complement ? `, ${adoption.complement}` : ""} -{" "}
                            {adoption.neighborhood}, {adoption.city}/{adoption.state}
                        </span>
                    </div>

                    <div className="flex items-center">
                        <MdOutlineHouse
                            className="mr-2 text-gray-500"
                            size={18}
                        />
                        <span className="text-gray-700">
                            Mora em: {adoption.lives_in_house_or_apartment}
                        </span>
                    </div>

                    <div className="pt-2 border-t">
                        <p className="text-gray-700">
                            <span className="font-medium">Redes sociais:</span>
                            <br />
                            <a
                                href={adoption.facebook_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                Facebook
                            </a>
                            {" | "}
                            <a
                                href={adoption.instagram_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                Instagram
                            </a>
                        </p>
                    </div>
                </>
            );
        } else if (adoptionData.form_type === FormAvailableEnum.SPONSORSHIP) {
            adoption = adoptionData as IFormSponsorship;
            return (
                <>
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
                                onClick={() => copyToClipboard(adoption.email || "", "Email")}
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
                            <span className="text-gray-700">{adoption.phone_number}</span>
                        </div>
                        <button
                            onClick={() => copyToClipboard(adoption.phone_number, "Telefone")}
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
                            Método de contato: {adoption.contact_method_preference.join(", ")}
                        </span>
                    </div>

                    <div className="flex items-center">
                        <MdOutlineHouse
                            className="mr-2 text-gray-500"
                            size={18}
                        />
                        <span className="text-gray-700">
                            Quer apadrinhar{" "}
                            <strong className="text-gray-900 font-extrabold">
                                {" "}
                                {adoption.dog_name}{" "}
                            </strong>{" "}
                            com {adoption.sponsorship_method.join(", ")}
                        </span>
                    </div>

                    <div className="pt-2 border-t">
                        <p className="text-gray-700">
                            <span className="font-medium">Aceita receber novidades:</span>
                            <br />
                            <div>{renderBooleanValue(adoption.allow_receiving_news)}</div>
                        </p>
                    </div>
                </>
            );
        } else {
            adoption = adoptionData as IFormContact;
            return (
                <>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <FaEnvelope
                                className="mr-2 text-gray-500"
                                size={16}
                            />
                            <span className="text-gray-700">{adoption.email}</span>
                        </div>
                        <button
                            onClick={() => copyToClipboard(adoption.email || "", "Email")}
                            className="text-blue-600 p-1 rounded hover:bg-blue-50"
                            title="Copiar email"
                        >
                            <BsClipboard size={14} />
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <FaPhone
                                className="mr-2 text-gray-500"
                                size={16}
                            />
                            <span className="text-gray-700">{adoption.phone_number}</span>
                        </div>
                        <button
                            onClick={() => copyToClipboard(adoption.phone_number, "Telefone")}
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
                        <span className="text-gray-700">Mensagem: {adoption.message}</span>
                    </div>
                </>
            );
        }
    };

    const renderAdoptionDetails = (adoptionData: IForm) => {
        const adoption = adoptionData as IFormAdoption;

        return (
            <div className="w-full md:w-1/2">
                <h4 className="text-lg font-semibold text-primary-400 mb-4">
                    Detalhes da solicitação
                </h4>

                <div className="mb-4">
                    <span
                        className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadgeClass(adoption.status)}`}
                    >
                        {getStatusText(adoption.status)}
                    </span>
                    <span className="ml-2 text-gray-500 text-sm">
                        Enviado em {formatDatetimePTBR(adoption.createdAt)}
                    </span>
                </div>

                {adoptionData.form_type === FormAvailableEnum.ADOPTION && (
                    <>
                        <div className="flex items-center mb-4">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                                {adoption.images && adoption.images.length > 0 ? (
                                    <></>
                                ) : (
                                    // <Image
                                    //     src={generateImgURL(adoption.fotos[0])}
                                    //     alt={adoption.nomeCachorroAdocao}
                                    //     fill
                                    //     className="object-cover"
                                    // />
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                        <span className="text-xs text-gray-500">Sem foto</span>
                                    </div>
                                )}
                            </div>
                            <div>
                                <h5 className="font-medium text-gray-900">{adoption.dog_name}</h5>
                            </div>
                        </div>

                        <div className="space-y-3 text-sm">
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                <div>
                                    <span className="text-gray-500">Primeira adoção:</span>
                                    <div>{renderBooleanValue(adoption.first_adoption)}</div>
                                </div>
                                <div>
                                    <span className="text-gray-500">Ciente dos gastos:</span>
                                    <div>{renderBooleanValue(adoption.aware_of_expenses)}</div>
                                </div>
                                <div>
                                    <span className="text-gray-500">Pessoas de acordo:</span>
                                    <div>
                                        {renderBooleanValue(adoption.people_agree_with_adoption)}
                                    </div>
                                </div>
                                <div>
                                    <span className="text-gray-500">
                                        Termo de responsabilidade:
                                    </span>
                                    <div>
                                        {renderBooleanValue(adoption.aware_of_responsibility_term)}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <span className="text-gray-500">Outros animais:</span>
                                <p className="text-gray-700">{adoption.has_other_animals}</p>
                            </div>

                            <div>
                                <span className="text-gray-500">Já teve outros animais:</span>
                                <p className="text-gray-700">{adoption.has_had_other_animals}</p>
                            </div>

                            <div>
                                <span className="text-gray-500">Motivo da adoção:</span>
                                <p className="text-gray-700">{adoption.reason_for_adoption}</p>
                            </div>

                            <div>
                                <span className="text-gray-500">Descrição do local:</span>
                                <p className="text-gray-700">{adoption.animal_place_description}</p>
                            </div>

                            <div>
                                <span className="text-gray-500">
                                    Considerações sobre devolução:
                                </span>
                                <p className="text-gray-700">
                                    {adoption.return_adoption_situation}
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    };

    const renderImages = (formData: IForm) => {
        if (formData.form_type !== FormAvailableEnum.ADOPTION) return;

        const adoption = formData as IFormAdoption;

        if (!adoption.images || adoption.images.length === 0) return null;

        return (
            <div className="mt-6 border-t pt-6">
                <h4 className="text-lg font-semibold text-primary-400 mb-4">Fotos do ambiente</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {adoption.images.map((url, index) => (
                        <div
                            key={index}
                            className="relative h-48 rounded-lg overflow-hidden"
                        >
                            <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <></>
                                {/* <Image
                                            src={url}
                                            alt={`Foto ${index + 1} do ambiente`}
                                            fill
                                            className="object-cover hover:opacity-90 transition-opacity"
                                        /> */}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderTitle = (formData: IForm) => {
        if (formData.form_type === FormAvailableEnum.ADOPTION) {
            return "Detalhes da solicitação de adoção";
        } else if (formData.form_type === FormAvailableEnum.SPONSORSHIP) {
            return "Detalhes da solicitação de apadrinhamento";
        } else if (formData.form_type === FormAvailableEnum.CONTACT) {
            return "Detalhes da solicitação de contato";
        }
        return "Detalhes da solicitação";
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div
                ref={modalRef}
                className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col"
            >
                {/* Header */}
                <div className="flex justify-between items-center border-b p-4 bg-gray-50 rounded-t-lg">
                    <h3 className="text-xl font-semibold text-gray-900">{renderTitle(adoption)}</h3>
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
                                        <span className="text-gray-700">{adoption.name}</span>
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(adoption.name, "Nome")}
                                        className="text-blue-600 p-1 rounded hover:bg-blue-50"
                                        title="Copiar nome"
                                    >
                                        <BsClipboard size={14} />
                                    </button>
                                </div>
                                {renderApplicantInfo(adoption)}
                            </div>
                        </div>

                        {/* Right column - Dog and request info */}
                        {renderAdoptionDetails(adoption)}
                    </div>

                    {/* Photos from Azure Blob */}
                    {renderImages(adoption)}
                </div>

                {/* Footer with action buttons */}
                <div className="border-t p-4 bg-gray-50 rounded-b-lg flex flex-wrap gap-2 justify-end">
                    <button
                        onClick={() => onUpdateStatus(adoption.id, FormStatusEnum.APPROVED)}
                        disabled={adoption.status === FormStatusEnum.APPROVED}
                        className={`px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 transition-colors ${
                            adoption.status === FormStatusEnum.APPROVED
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                        }`}
                    >
                        Aprovar
                    </button>
                    <button
                        onClick={() => onUpdateStatus(adoption.id, FormStatusEnum.PENDENT)}
                        disabled={adoption.status === FormStatusEnum.PENDENT}
                        className={`px-4 py-2 text-white bg-yellow-600 rounded hover:bg-yellow-700 transition-colors ${
                            adoption.status === FormStatusEnum.PENDENT
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                        }`}
                    >
                        Pendente
                    </button>
                    {adoption.form_type === FormAvailableEnum.ADOPTION && (
                        <button
                            onClick={() => onUpdateStatus(adoption.id, FormStatusEnum.IN_PROCESS)}
                            disabled={adoption.status === FormStatusEnum.IN_PROCESS}
                            className={`px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors ${
                                adoption.status === FormStatusEnum.IN_PROCESS
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                            }`}
                        >
                            Em Análise
                        </button>
                    )}
                    {adoption.form_type === FormAvailableEnum.ADOPTION && (
                        <button
                            onClick={() => onUpdateStatus(adoption.id, FormStatusEnum.REJECTED)}
                            disabled={adoption.status === FormStatusEnum.REJECTED}
                            className={`px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 transition-colors ${
                                adoption.status === FormStatusEnum.REJECTED
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                            }`}
                        >
                            Rejeitar
                        </button>
                    )}
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
