import { UserRole } from "@/interfaces/authInterfaces";

export interface IVolunteer {
    id: string;
    name: string;
    email: string;
    nickname: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
    password?: string;
}

export type CreateVolunteerDto = Omit<IVolunteer, "id" | "createdAt" | "updatedAt">;

export type UpdateVolunteerDto = Partial<
    Omit<IVolunteer, "id" | "createdAt" | "updatedAt" | "password" | "email">
>;
