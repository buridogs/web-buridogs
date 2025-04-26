export interface IVoluntarios {
    id: string;
    nome: string;
    email: string;
    apelido: string;
    permissao: PermissaoEnum;
}

export enum PermissaoEnum {
    ADMIN = "Administrador",
    VOLUNTEER = "Voluntário",
    EDITOR = "Editor",
}
