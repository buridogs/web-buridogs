import { LoginCredentials, User } from "@/interfaces/authInterfaces";

export interface IAuthRepository {
    login(credentials: LoginCredentials): Promise<{ user: User; token: string }>;
    verify(token: string): Promise<User>;
    logout(): Promise<void>;
}
