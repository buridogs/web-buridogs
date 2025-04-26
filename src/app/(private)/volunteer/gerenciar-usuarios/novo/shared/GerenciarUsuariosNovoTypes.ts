import { IVolunteer } from "@/services/api/modules/users/types";

// Define partner form interface
// TODO: CHECk   THIS INTERFACE
export type IUsuariosForm = Pick<IVolunteer, "nome" | "email" | "apelido" | "role">;
