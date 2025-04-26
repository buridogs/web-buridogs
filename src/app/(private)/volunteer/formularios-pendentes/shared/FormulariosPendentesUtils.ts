import { FormAvailableEnum, FormStatusEnum } from "@/interfaces/formularioInterfaces";

export const getStatusBadgeClass = (status: string) => {
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

export const getStatusText = (status: string) => {
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
