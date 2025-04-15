export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}

export enum UserRole {
    ADMIN = "ADMIN",
    VOLUNTEER = "VOLUNTEER",
    EDITOR = "EDITOR",
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
    checkAuth: () => Promise<boolean>;
}
