import React from "react";
import { BsClipboard } from "react-icons/bs";

interface FormulariosPendentesModalApplicantInfoProps {
    applicant: {
        icon: React.ReactNode;
        label?: string;
        value: string;
        type: "string" | "number" | "date" | "boolean";
        copyButtonConfig?: {
            title: string;
            onClick: () => void;
        };
    }[];
    applicantInfoFooter?: React.ReactNode;
}

export default function FormulariosPendentesModalApplicantInfo({
    applicant,
    applicantInfoFooter,
}: FormulariosPendentesModalApplicantInfoProps) {
    if (!applicant || Object.keys(applicant).length === 0) {
        return (
            <div className="p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Informações do Solicitante</h2>
                <p>Nenhuma informação disponível.</p>
            </div>
        );
    }

    return (
        <>
            {applicant.map((info, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between"
                >
                    <div className="flex items-center">
                        {info.icon}
                        <span className="text-gray-700">{info.value}</span>
                    </div>
                    {info.copyButtonConfig && (
                        <button
                            onClick={info.copyButtonConfig.onClick}
                            className="text-blue-600 p-1 rounded hover:bg-blue-50"
                            title={info.copyButtonConfig.title}
                        >
                            <BsClipboard size={14} />
                        </button>
                    )}
                </div>
            ))}
            {applicantInfoFooter && <>{applicantInfoFooter}</>}
        </>
    );
}
