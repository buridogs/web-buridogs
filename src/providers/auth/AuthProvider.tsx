"use client";

import { AuthContextType, LoginCredentials, User } from "@/interfaces/authInterfaces";
import { loginUser, verifyToken } from "@/services/api/auth/service/authService";
import {
    clearAuthData,
    getToken,
    getUser,
    isValidToken,
    setToken,
    setUser,
} from "@/utils/authUtils";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUserState] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();

    // Initialize auth state from storage
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const token = getToken();
                if (isValidToken(token)) {
                    const storedUser = getUser();
                    if (storedUser) {
                        setUserState(storedUser);
                        setIsAuthenticated(true);
                    } else {
                        // If we have a valid token but no user, try to get user information
                        const userData = await verifyToken(token);
                        setUserState(userData);
                        setUser(userData);
                        setIsAuthenticated(true);
                    }
                } else {
                    // Clear invalid auth data
                    clearAuthData();
                    setUserState(null);
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Auth initialization error:", error);
                clearAuthData();
                setUserState(null);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, []);

    // Login function
    const login = async (credentials: LoginCredentials): Promise<void> => {
        setIsLoading(true);
        try {
            const { user, token } = await loginUser(credentials);

            // Store auth data
            setToken(token);
            setUser(user);

            // Update state
            setUserState(user);
            setIsAuthenticated(true);
            toast.success("Login realizado com sucesso!");

            // Redirect to homepage or dashboard
            router.push("/volunteer");
        } catch (error: any) {
            console.error("Login error:", error);
            toast.error(error.message || "Falha na autenticação");
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    // Logout function
    const logout = (): void => {
        setIsLoading(true);
        clearAuthData();
        setUserState(null);
        setIsAuthenticated(false);
        setIsLoading(false);
        router.push("/login");
        toast.info("Você foi desconectado");
    };

    // Check if user is authenticated (useful for protecting routes)
    const checkAuth = async (): Promise<boolean> => {
        // If we already know the user is authenticated, return true
        if (isAuthenticated && user) return true;

        // Otherwise, check the token
        try {
            const token = getToken();
            if (!token) return false;

            if (isValidToken(token)) {
                // If token is valid but we don't have user data, get it
                if (!user) {
                    const userData = await verifyToken(token);
                    setUserState(userData);
                    setUser(userData);
                    setIsAuthenticated(true);
                }
                return true;
            } else {
                // Invalid token
                clearAuthData();
                setUserState(null);
                setIsAuthenticated(false);
                return false;
            }
        } catch (error) {
            console.error("Auth check error:", error);
            clearAuthData();
            setUserState(null);
            setIsAuthenticated(false);
            return false;
        }
    };

    // Create the context value
    const contextValue: AuthContextType = {
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        checkAuth,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// Hook to use the auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
