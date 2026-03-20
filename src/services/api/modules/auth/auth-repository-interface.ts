import { ILoginCredentials, IUser } from "@/types/auth";

export interface IAuthRepository {
    login(credentials: ILoginCredentials): Promise<{ user: IUser; token: string }>;
    verify(token: string): Promise<IUser>;
    logout(): Promise<void>;
}
