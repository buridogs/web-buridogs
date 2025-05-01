import { UserRole } from "@/interfaces/authInterfaces";
import { IVoluntarios } from "@/interfaces/voluntariosInterfaces";

export const voluntarios: IVoluntarios[] = [
    {
        id: "1",
        name: "Ana Silva",
        email: "ana.silva@buridogs.org",
        nickname: "Ana",
        role: UserRole.ADMIN,
    },
    {
        id: "2",
        name: "Pedro Santos",
        email: "pedro.santos@buridogs.org",
        nickname: "Pedro",
        role: UserRole.VOLUNTEER,
    },
    {
        id: "4",
        name: "Roberto Gomes",
        email: "roberto.gomes@buridogs.org",
        nickname: "Beto",
        role: UserRole.VOLUNTEER,
    },
    {
        id: "5",
        name: "Juliana Costa",
        email: "juliana.costa@buridogs.org",
        nickname: "Ju",
        role: UserRole.VOLUNTEER,
    },
];
