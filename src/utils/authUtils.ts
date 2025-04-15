import { User } from "@/interfaces/authInterfaces";

// Storage keys
const TOKEN_KEY = "@buridogs:token";
const USER_KEY = "@buridogs:user";

// Auth token functions
export const getToken = (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = (): void => {
    localStorage.removeItem(TOKEN_KEY);
};

// User functions
export const getUser = (): User | null => {
    if (typeof window === "undefined") return null;
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
};

export const setUser = (user: User): void => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const removeUser = (): void => {
    localStorage.removeItem(USER_KEY);
};

// Clean up all auth data
export const clearAuthData = (): void => {
    removeToken();
    removeUser();
};

// Check if token is valid and not expired
export const isValidToken = (token: string | null): boolean => {
    if (!token) return false;

    try {
        // Simple check for JWT token structure
        const tokenParts = token.split(".");
        if (tokenParts.length !== 3) return false;

        // Check expiration if the token is a JWT
        // This is a simplified check - in a real app you'd decode and verify
        const payload = JSON.parse(atob(tokenParts[1]));
        if (payload.exp && Date.now() >= payload.exp * 1000) {
            return false;
        }

        return true;
    } catch (error) {
        console.error("Error validating token:", error);
        return false;
    }
};
