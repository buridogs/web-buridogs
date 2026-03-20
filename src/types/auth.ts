export interface IUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}

export enum UserRole {
    ADMIN = "admin",
    VOLUNTEER = "volunteer",
}

export interface IAuthState {
    user: IUser | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export interface ILoginCredentials {
    email: string;
    password: string;
}

export interface IAuthContextType {
    user: IUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: ILoginCredentials) => Promise<void>;
    logout: () => void;
    checkAuth: () => Promise<boolean>;
}
