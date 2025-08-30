import { FormAvailableEnum, IFormUI } from "@/interfaces/formularioInterfaces";
import { FormRequestStatusEnum } from "@/services/api/modules/form-requests/types";

interface FormulariosPendentesModalFooterProps {
    onUpdateStatus: (id: string, status: FormRequestStatusEnum) => void;
    onClose: () => void;
    formRequest: IFormUI;
}

export default function FormulariosPendentesModalFooter({
    onUpdateStatus,
    onClose,
    formRequest,
}: FormulariosPendentesModalFooterProps) {
    {
        /* Footer with action buttons */
    }
    return (
        <div className="border-t p-4 bg-gray-50 rounded-b-lg flex flex-wrap gap-2 justify-end">
            <button
                onClick={() => onUpdateStatus(formRequest.id, FormRequestStatusEnum.solved)}
                disabled={formRequest.status === FormRequestStatusEnum.solved}
                className={`px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 transition-colors ${
                    formRequest.status === FormRequestStatusEnum.solved
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                }`}
            >
                Resolvido
            </button>
            <button
                onClick={() => onUpdateStatus(formRequest.id, FormRequestStatusEnum.pending)}
                disabled={formRequest.status === FormRequestStatusEnum.pending}
                className={`px-4 py-2 text-white bg-yellow-600 rounded hover:bg-yellow-700 transition-colors ${
                    formRequest.status === FormRequestStatusEnum.pending
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                }`}
            >
                Pendente
            </button>
            {formRequest.form_type === FormAvailableEnum.ADOPTION && (
                <button
                    onClick={() =>
                        onUpdateStatus(formRequest.id, FormRequestStatusEnum.in_progress)
                    }
                    disabled={formRequest.status === FormRequestStatusEnum.in_progress}
                    className={`px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors ${
                        formRequest.status === FormRequestStatusEnum.in_progress
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                    }`}
                >
                    Em Análise
                </button>
            )}
            {formRequest.form_type === FormAvailableEnum.ADOPTION && (
                <button
                    onClick={() => onUpdateStatus(formRequest.id, FormRequestStatusEnum.rejected)}
                    disabled={formRequest.status === FormRequestStatusEnum.rejected}
                    className={`px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 transition-colors ${
                        formRequest.status === FormRequestStatusEnum.rejected
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
    );
}
