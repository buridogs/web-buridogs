import { UserRole } from "@/interfaces/authInterfaces";

export interface IVolunteer {
    id: string;
    nome: string;
    email: string;
    apelido: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
}

export type CreateVolunteerDto = Omit<IVolunteer, "id" | "createdAt" | "updatedAt">;

export type UpdateVolunteerDto = Partial<Omit<IVolunteer, "id" | "createdAt" | "updatedAt">>;
