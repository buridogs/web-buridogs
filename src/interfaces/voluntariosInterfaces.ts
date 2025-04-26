import { UserRole } from "./authInterfaces";

export interface IVoluntarios {
    id: string;
    nome: string;
    email: string;
    apelido: string;
    role: UserRole;
}

export enum PermissaoEnum {
    ADMIN = "Administrador",
    VOLUNTEER = "Voluntário",
    EDITOR = "Editor",
}
