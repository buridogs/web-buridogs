import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { headerMenuLink } from "./utils";

interface HeaderMobileProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function HeaderMobile({ isOpen, setIsOpen }: HeaderMobileProps) {
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
                        <li key={menuOption.label}>
                            <Link
                                href={menuOption.path}
                                className="text-grey-700 transition-color ease-in-out delay-800 hover:text-primary-400"
                            >
                                {menuOption.label}
                            </Link>
                        </li>
                    ))}
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
