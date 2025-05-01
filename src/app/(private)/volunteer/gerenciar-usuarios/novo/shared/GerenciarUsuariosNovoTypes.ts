import { IVolunteer } from "@/services/api/modules/users/types";

export type IVolunteerForm = Pick<IVolunteer, "name" | "email" | "nickname" | "role" | "password">;
