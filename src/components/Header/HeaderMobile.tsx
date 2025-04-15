import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { getAuthenticatedLinks, headerMenuLink } from "./utils";
import { useAuth } from "@/providers/auth/AuthProvider";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

interface HeaderMobileProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function HeaderMobile({ isOpen, setIsOpen }: HeaderMobileProps) {
    const { user, isAuthenticated, logout } = useAuth();
    const authLinks = getAuthenticatedLinks(user);

    const handleLogout = () => {
        logout();
        setIsOpen(false);
    };

    return (
        <section className="flex lg:hidden">
            <div
                className="space-y-2 cursor-pointer"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            </div>

            <div className={isOpen ? "showMenuNav" : "hideMenuNav"}>
                <div
                    className="absolute top-0 right-0 px-8 py-8 cursor-pointer"
                    onClick={() => setIsOpen(false)}
                >
                    <svg
                        className="h-8 w-8 text-gray-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line
                            x1="18"
                            y1="6"
                            x2="6"
                            y2="18"
                        />
                        <line
                            x1="6"
                            y1="6"
                            x2="18"
                            y2="18"
                        />
                    </svg>
                </div>
                <ul className="flex flex-col items-center justify-between min-h-[250px]">
                    {headerMenuLink.map((menuOption) => (
                        <li
                            key={menuOption.label}
                            className="my-2"
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
                        <>
                            <li className="h-px w-full bg-gray-200 my-4"></li>

                            {/* User name */}
                            <li className="my-2">
                                <span className="text-gray-600 font-medium">{user?.name}</span>
                            </li>

                            {/* Auth-specific links */}
                            {authLinks.map((link) => (
                                <li
                                    key={link.label}
                                    className="my-2"
                                >
                                    <Link
                                        href={link.path}
                                        className="text-primary-700 transition-color ease-in-out delay-800 hover:text-primary-400"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}

                            {/* Logout button */}
                            <li className="my-2">
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 text-red-600 hover:text-red-800"
                                >
                                    <FaSignOutAlt size={16} />
                                    <span>Sair</span>
                                </button>
                            </li>
                        </>
                    ) : (
                        <li className="my-4">
                            <Link
                                href="/login"
                                className="flex items-center gap-2 bg-primary-400 text-white transition-colors py-2 px-6 rounded-full hover:bg-primary-700"
                            >
                                <FaSignInAlt />
                                <span>Login</span>
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
            <style>
                {`
                .hideMenuNav {
                    display: none;
                }
                .showMenuNav {
                    display: block;
                    position: absolute;
                    width: 100%;
                    height: 100vh;
                    top: 0;
                    left: 0;
                    background: white;
                    z-index: 10;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                    align-items: center;
                }
            `}
            </style>
        </section>
    );
}
