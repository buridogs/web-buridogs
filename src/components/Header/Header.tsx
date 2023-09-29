"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { HeaderMobile } from "./HeaderMobile";
import { headerMenuLink } from "./utils";
import logoBuridogs from "../../../public/static/images/logo-buridogs.png";

export function Header() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const pathname = usePathname();

    useEffect(() => {
        setIsNavOpen(false);
    }, [pathname]);

    return (
        <div className="w-[100%] bg-white py-8 px-8 xl:px-0">
            <section className="max-w-screen-xl flex justify-between items-center m-auto">
                <Link href="/">
                    <Image
                        src={logoBuridogs}
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

                    <ul className="hidden space-x-8 lg:flex">
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
                </nav>
            </section>
        </div>
    );
}
