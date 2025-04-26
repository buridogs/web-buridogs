import Image from "next/image";
import { ReactNode } from "react";
import { LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu";
import Link from "next/link";
import { FaSignOutAlt } from "react-icons/fa";
import { generateImgURL } from "@/utils/methods";

interface PrivateHeaderDesktopProps {
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
    pathname: string;
    handleLogout: () => void;
    authenticatedLinks: {
        title: string;
        href: string;
        icon: ReactNode;
    }[];
}

export default function PrivateHeaderDesktop({
    isCollapsed,
    setIsCollapsed,
    pathname,
    handleLogout,
    authenticatedLinks,
}: PrivateHeaderDesktopProps) {
    return (
        <div
            className={`${
                isCollapsed ? "w-16" : "w-64"
            } bg-white shadow-md transition-all duration-300 hidden lg:block fixed left-0 z-20 h-screen`}
        >
            <div className="flex flex-col h-full">
                {/* Sidebar Header */}
                <div className="flex items-center justify-between px-4 py-4 border-b">
                    {!isCollapsed && (
                        <Image
                            src={generateImgURL("logo-buridogs.png")}
                            alt="Buridogs logo"
                            width={150}
                            height={40}
                            priority
                        />
                    )}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-1.5 rounded-lg bg-gray-100 hover:bg-primary-100 transition-colors"
                        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {isCollapsed ? (
                            <LuPanelLeftOpen className="w-5 h-5" />
                        ) : (
                            <LuPanelLeftClose className="w-5 h-5" />
                        )}
                    </button>
                </div>

                {/* Navigation Menu */}
                <nav className="h-full flex flex-col justify-between pt-4 pb-4 overflow-y-auto">
                    <ul className="px-2 space-y-1">
                        {authenticatedLinks.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-x-3 px-3 py-3 rounded-lg ${
                                        pathname === item.href
                                            ? "bg-primary text-primary-400"
                                            : "text-gray-700 hover:bg-gray-100"
                                    } transition-colors`}
                                    onClick={() => setIsCollapsed(false)}
                                >
                                    <span>{item.icon}</span>
                                    {!isCollapsed && <span className="truncate">{item.title}</span>}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <ul className="px-2">
                        {/* Logout button */}
                        <li>
                            <button
                                onClick={handleLogout}
                                className="flex items-center px-3 py-3 gap-2  text-red-600 hover:text-red-800"
                            >
                                <FaSignOutAlt size={16} />
                                {!isCollapsed && <span className="truncate">Sair</span>}
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
