import { IVoluntarios, PermissaoEnum } from "@/interfaces/voluntariosInterfaces";

export const voluntarios: IVoluntarios[] = [
    {
        id: "1",
        nome: "Ana Silva",
        email: "ana.silva@buridogs.org",
        apelido: "Ana",
        permissao: PermissaoEnum.ADMIN,
    },
    {
        id: "2",
        nome: "Pedro Santos",
        email: "pedro.santos@buridogs.org",
        apelido: "Pedro",
        permissao: PermissaoEnum.VOLUNTEER,
    },
    {
        id: "3",
        nome: "Carla Oliveira",
        email: "carla.oliveira@buridogs.org",
        apelido: "Carlinha",
        permissao: PermissaoEnum.EDITOR,
    },
    {
        id: "4",
        nome: "Roberto Gomes",
        email: "roberto.gomes@buridogs.org",
        apelido: "Beto",
        permissao: PermissaoEnum.VOLUNTEER,
    },
    {
        id: "5",
        nome: "Juliana Costa",
        email: "juliana.costa@buridogs.org",
        apelido: "Ju",
        permissao: PermissaoEnum.VOLUNTEER,
    },
];
