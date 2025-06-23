import { FormAvailableEnum } from "@/interfaces/formularioInterfaces";
import { FormRequestStatusEnum } from "@/services/api/modules/form-requests/types";

export const getStatusBadgeClass = (status: string) => {
    switch (status) {
        case FormRequestStatusEnum.pending:
            return "bg-yellow-100 text-yellow-800";
        case FormRequestStatusEnum.solved:
            return "bg-green-100 text-green-800";
        case FormRequestStatusEnum.rejected:
            return "bg-red-100 text-red-800";
        case FormRequestStatusEnum.in_progress:
            return "bg-blue-100 text-blue-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

export const getStatusText = (status: FormRequestStatusEnum) => {
    switch (status) {
        case FormRequestStatusEnum.pending:
            return "Pendente";
        case FormRequestStatusEnum.solved:
            return "Resolvido";
        case FormRequestStatusEnum.rejected:
            return "Rejeitado";
        case FormRequestStatusEnum.in_progress:
            return "Em Análise";
        default:
            return status;
    }
};

export const getTypeBadgeClass = (status: string) => {
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

export const getTypeText = (status: string) => {
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

export const getFilterOptionsStatus = () => {
    return [
        { value: "all", label: "Todos" },
        { value: FormRequestStatusEnum.pending, label: "Pendente" },
        { value: FormRequestStatusEnum.solved, label: "Resolvido" },
        { value: FormRequestStatusEnum.rejected, label: "Rejeitado" },
        { value: FormRequestStatusEnum.in_progress, label: "Em Análise" },
    ];
};

export const getFilterOptionsFormType = () => {
    return [
        { value: "all", label: "Todos" },
        { value: FormAvailableEnum.ADOPTION, label: "Adoção" },
        { value: FormAvailableEnum.SPONSORSHIP, label: "Apadrinhamento" },
        { value: FormAvailableEnum.CONTACT, label: "Contato" },
    ];
};
