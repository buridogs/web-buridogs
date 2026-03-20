import { IUser } from "@/types/auth";

export interface Auth {
    user: IUser;
    token: string;
}
