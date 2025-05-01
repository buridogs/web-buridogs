import { UserRole } from "./authInterfaces";

// TODO: CHECK User interface from authInterfaces.ts and IVolunteer interface from api/modules/users/types.ts
export interface IVoluntarios {
    id: string;
    name: string;
    email: string;
    nickname: string;
    role: UserRole;
}
