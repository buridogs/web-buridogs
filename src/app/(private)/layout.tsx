"use client";
import "react-alice-carousel/lib/alice-carousel.css";
import "../globals.css";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { PrivateHeaderMobile } from "@/components/Header/PrivateHeader/PrivateHeaderMobile";
import { useAuth } from "@/providers/auth/AuthProvider";
import PrivateHeaderDesktop from "@/components/Header/PrivateHeader/PrivateHeaderDesktop";
import { getAuthenticatedLinks } from "@/components/Header/utils";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const pathname = usePathname();
    const { isAuthenticated, logout, user } = useAuth();
    const authLinks = getAuthenticatedLinks(user);

    // Initialize state from localStorage only after component mounts (client-side)
    useEffect(() => {
        setIsClient(true);
        const storedCollapsedState = localStorage.getItem("isCollapsed") === "true";
        setIsCollapsed(storedCollapsedState);
    }, []);

    // Check if we're on mobile when component mounts and when window resizes
    useEffect(() => {
        if (!isClient) return;

        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 1024);
            // Auto-collapse sidebar on mobile
            if (window.innerWidth < 1024) {
                handleCollapsed(true);
            }
        };

        // Check initially
        checkIfMobile();

        // Add resize listener
        window.addEventListener("resize", checkIfMobile);

        // Clean up
        return () => window.removeEventListener("resize", checkIfMobile);
    }, []);

    const handleLogout = () => {
        logout();
        setIsNavOpen(false);
    };

    const handleCollapsed = (value: boolean) => {
        localStorage.setItem("isCollapsed", JSON.stringify(value));
        setIsCollapsed(value);
    };

    if (!isAuthenticated) return null;

    return (
        <div className="flex flex-grow bg-gray-50">
            {/* Desktop Sidebar */}
            <PrivateHeaderDesktop
                isCollapsed={isCollapsed}
                setIsCollapsed={handleCollapsed}
                pathname={pathname}
                handleLogout={handleLogout}
                authenticatedLinks={authLinks}
            />

            {/* Mobile Header Bar */}
            <PrivateHeaderMobile
                isOpen={isNavOpen}
                setIsOpen={setIsNavOpen}
                pathname={pathname}
                handleLogout={handleLogout}
                user={user}
                authenticatedLinks={authLinks}
            />

            {/* Main Content */}
            <div
                className={`flex-1 ${
                    isMobile ? "pt-[110px]" : isCollapsed ? "lg:ml-16" : "lg:ml-64"
                } transition-all duration-300`}
            >
                <main className="h-full">{children}</main>
            </div>
        </div>
    );
}
