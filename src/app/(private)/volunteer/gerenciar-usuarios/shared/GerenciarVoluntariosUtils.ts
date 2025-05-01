import { UserRole } from "@/interfaces/authInterfaces";

export const getFilterOptionsPermissions = () => {
    return [
        { value: "all", label: "Todas" },
        { value: UserRole.ADMIN, label: "Administrador" },
        { value: UserRole.VOLUNTEER, label: "Voluntário" },
    ];
};
