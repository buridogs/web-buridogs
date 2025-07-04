"use client";
import Link from "next/link";
import { headerMenuLink } from "../utils";
import { FaSignInAlt } from "react-icons/fa";
import { useAuth } from "@/providers/auth/AuthProvider";
import { UserRole } from "@/interfaces/authInterfaces";
import { PrivateRoutes } from "../routes-ui";

export function HeaderDesktop() {
    const { isAuthenticated, user } = useAuth();

    const routeToAdmin =
        user?.role === UserRole.ADMIN ? PrivateRoutes.DASHBOARD : PrivateRoutes.REQUESTS_PENDING;

    return (
        <ul className="hidden lg:flex items-center">
            {headerMenuLink.map((menuOption) => (
                <li
                    key={menuOption.label}
                    className="mx-4"
                >
                    <Link
                        href={menuOption.path}
                        className="text-gray-700 transition-color ease-in-out delay-800 hover:text-primary-400"
                    >
                        {menuOption.label}
                    </Link>
                </li>
            ))}

            {/* Authentication Links */}
            {isAuthenticated ? (
                <li className="ml-4">
                    <Link
                        href={routeToAdmin}
                        className="flex items-center gap-2 bg-primary-400 text-white transition-colors py-2 px-4 rounded-full hover:bg-primary-700"
                    >
                        <span>Admin</span>
                    </Link>
                </li>
            ) : (
                <li className="ml-4">
                    <Link
                        href="/login"
                        className="flex items-center gap-2 bg-primary-400 text-white transition-colors py-2 px-4 rounded-full hover:bg-primary-700"
                    >
                        <FaSignInAlt />
                        <span>Login</span>
                    </Link>
                </li>
            )}
        </ul>
    );
}
