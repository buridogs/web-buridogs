import { UserRole } from "@/interfaces/authInterfaces";
import { IVoluntarios } from "@/interfaces/voluntariosInterfaces";

export const voluntarios: IVoluntarios[] = [
    {
        id: "1",
        nome: "Ana Silva",
        email: "ana.silva@buridogs.org",
        apelido: "Ana",
        role: UserRole.ADMIN,
    },
    {
        id: "2",
        nome: "Pedro Santos",
        email: "pedro.santos@buridogs.org",
        apelido: "Pedro",
        role: UserRole.VOLUNTEER,
    },
    {
        id: "4",
        nome: "Roberto Gomes",
        email: "roberto.gomes@buridogs.org",
        apelido: "Beto",
        role: UserRole.VOLUNTEER,
    },
    {
        id: "5",
        nome: "Juliana Costa",
        email: "juliana.costa@buridogs.org",
        apelido: "Ju",
        role: UserRole.VOLUNTEER,
    },
];
