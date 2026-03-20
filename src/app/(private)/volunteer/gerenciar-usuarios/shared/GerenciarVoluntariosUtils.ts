import { UserRole } from "@/types/auth";

export const getFilterOptionsPermissions = () => {
    return [
        { value: "all", label: "Todas" },
        { value: UserRole.ADMIN, label: "Administrador" },
        { value: UserRole.VOLUNTEER, label: "Voluntário" },
    ];
};
