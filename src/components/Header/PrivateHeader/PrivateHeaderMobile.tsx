import Link from "next/link";
import Image from "next/image";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { generateImgURL } from "@/utils/methods";
import { User } from "@/interfaces/authInterfaces";
import { PrivateRoutes } from "../utils";

interface HeaderMobileProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    pathname: string;
    handleLogout: () => void;
    user: User | null;
    authenticatedLinks: {
        // TODO: UNIFY TYPES
        title: string;
        href: string;
        icon: ReactNode;
    }[];
}

export function PrivateHeaderMobile({
    isOpen,
    setIsOpen,
    pathname,
    handleLogout,
    user,
    authenticatedLinks,
}: HeaderMobileProps) {
    return (
        <div className="w-[100%] bg-white py-8 px-8 shadow fixed z-10 xl:px-0 lg:hidden">
            <section className="max-w-screen-xl flex justify-between items-center m-auto">
                <Link href={PrivateRoutes.DASHBOARD}>
                    <Image
                        src={generateImgURL("logo-buridogs.png")}
                        alt="Buridogs logo"
                        width={150}
                        height={40}
                        priority
                    />
                </Link>
                <nav>
                    <section className="flex">
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
                                {/* Authentication Links */}
                                <li className="my-2">
                                    <span className="text-gray-600 font-medium">{user?.name}</span>
                                </li>
                                <li className="h-px w-full bg-gray-200 my-4"></li>

                                {/* Auth-specific links */}
                                {authenticatedLinks.map((link) => (
                                    <li
                                        key={link.href}
                                        className="w-full"
                                    >
                                        <Link
                                            href={link.href}
                                            className={`w-full flex items-center gap-x-3 px-3 py-2 rounded-lg ${
                                                pathname === link.href
                                                    ? "bg-primary text-primary-400"
                                                    : "text-gray-700 hover:bg-gray-100"
                                            } transition-colors`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <span>{link.icon}</span>
                                            <span>{link.title}</span>
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
                </nav>
            </section>
        </div>
    );
}
