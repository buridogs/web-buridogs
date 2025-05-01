"use client";

import { useAuth } from "@/providers/auth/AuthProvider";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/Spinner/Spinner";
import { useRouter } from "next/navigation";
import { UserRole } from "@/interfaces/authInterfaces";
import { PublicRoutes } from "@/components/Header/routes-ui";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: UserRole[]; // Optional roles that can access this route
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
    const { isAuthenticated, isLoading, user, checkAuth } = useAuth();
    const [checking, setChecking] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const isAuth = await checkAuth();

                if (!isAuth) {
                    // User is not authenticated, redirect to login
                    router.push(PublicRoutes.LOGIN);
                    return;
                }

                // If allowed roles are specified, check if user has the required role
                if (allowedRoles && allowedRoles.length > 0 && user) {
                    if (!allowedRoles.includes(user.role)) {
                        // User doesn't have the required role
                        router.push(PublicRoutes.NAO_AUTORIZADO);
                    }
                }
            } catch (error) {
                console.error("Auth verification error:", error);
                router.push(PublicRoutes.LOGIN);
            } finally {
                setChecking(false);
            }
        };

        if (!isLoading) {
            verifyAuth();
        }
    }, [isLoading, isAuthenticated, router, user, allowedRoles, checkAuth]);

    // Show loading spinner while checking authentication
    if (isLoading || checking) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Spinner />
            </div>
        );
    }

    // Render children only if authenticated
    return <>{children}</>;
}
