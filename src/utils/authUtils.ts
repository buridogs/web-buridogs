import { User } from "@/interfaces/authInterfaces";

// Cookie helper functions
export function setCookie(name: string, value: string, days: number = 1) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

export function getCookie(name: string): string | null {
    if (typeof window === "undefined") return null;

    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

export function removeCookie(name: string) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}

// Auth token functions
export const getToken = (): string | null => {
    return getCookie("auth-token");
};

export const setToken = (token: string): void => {
    setCookie("auth-token", token, 1); // 1 day expiry
};

export const removeToken = (): void => {
    removeCookie("auth-token");
};

// User functions
export const getUser = (): User | null => {
    const userJson = getCookie("auth-user");
    return userJson ? JSON.parse(decodeURIComponent(userJson)) : null;
};

export const setUser = (user: User): void => {
    // URI encode to handle special characters in JSON
    setCookie("auth-user", encodeURIComponent(JSON.stringify(user)), 1);
};

export const removeUser = (): void => {
    removeCookie("auth-user");
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
        const payload = JSON.parse(atob(tokenParts[1]));
        if (payload.exp && Date.now() >= payload.exp * 1000) {
            return false;
        }

        return true;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error validating token:", error);
        return false;
    }
};
