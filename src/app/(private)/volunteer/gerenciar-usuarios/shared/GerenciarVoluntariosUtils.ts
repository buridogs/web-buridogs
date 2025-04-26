import { PermissaoEnum } from "@/interfaces/voluntariosInterfaces";

export const getFilterOptionsPermissions = () => {
    return [
        { value: "all", label: "Todas" },
        { value: PermissaoEnum.ADMIN, label: "Administrador" },
        { value: PermissaoEnum.VOLUNTEER, label: "Voluntário" },
    ];
};
