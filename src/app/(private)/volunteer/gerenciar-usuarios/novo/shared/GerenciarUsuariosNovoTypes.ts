import { PermissaoEnum } from "@/interfaces/voluntariosInterfaces";

// Define partner form interface
// TODO: CHECk   THIS INTERFACE
export interface IUsuariosForm {
    nome: string;
    email: string;
    apelido: string;
    permissao: PermissaoEnum;
}
