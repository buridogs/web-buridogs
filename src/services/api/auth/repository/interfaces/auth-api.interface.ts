import { LoginCredentials, User } from "@/interfaces/authInterfaces";

// TODO: CHECK NAMES
export interface IAuthApi {
    login(credentials: LoginCredentials): Promise<{ user: User; token: string }>;
    verify(token: string): Promise<User>;
    logout(): Promise<void>;
}
