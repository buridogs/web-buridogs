"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { HeaderMobile } from "./HeaderMobile";
import { getAuthenticatedLinks, headerMenuLink } from "./utils";
import { generateImgURL } from "@/utils/methods";
import { useAuth } from "@/providers/auth/AuthProvider";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";

export function Header() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
    const pathname = usePathname();
    const authLinks = getAuthenticatedLinks(user);

    useEffect(() => {
        setIsNavOpen(false);
        setShowUserMenu(false);
    }, [pathname]);

    return (
        <div className="w-[100%] bg-white py-8 px-8 shadow fixed z-10 xl:px-0">
            <section className="max-w-screen-xl flex justify-between items-center m-auto">
                <Link href="/">
                    <Image
                        src={generateImgURL("logo-buridogs.png")}
                        alt="Buridogs logo"
                        width={150}
                        height={40}
                        priority
                    />
                </Link>
                <nav>
                    <HeaderMobile
                        isOpen={isNavOpen}
                        setIsOpen={setIsNavOpen}
                    />

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
                            <li className="relative ml-4">
                                <button
                                    className="flex items-center gap-2 text-gray-700 hover:text-primary-400 transition-colors py-2 px-3 rounded-full hover:bg-gray-100"
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                >
                                    <FaUser />
                                    <span>{user?.name.split(" ")[0]}</span>
                                </button>

                                {showUserMenu && (
                                    <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-xl z-20">
                                        {authLinks.map((link) => (
                                            <Link
                                                href={link.path}
                                                key={link.label}
                                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            >
                                                {link.label}
                                            </Link>
                                        ))}
                                        <hr className="my-1 border-gray-200" />
                                        <button
                                            onClick={logout}
                                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            <div className="flex items-center gap-2">
                                                <FaSignOutAlt size={14} />
                                                <span>Sair</span>
                                            </div>
                                        </button>
                                    </div>
                                )}
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
                </nav>
            </section>
        </div>
    );
}
