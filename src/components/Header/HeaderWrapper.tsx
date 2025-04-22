"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { HeaderMobile } from "./PublicHeader/HeaderMobile";
import { generateImgURL } from "@/utils/methods";
import { HeaderDesktop } from "./PublicHeader/HeaderDesktop";
import { useAuth } from "@/providers/auth/AuthProvider";

export function Header() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const pathname = usePathname();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        setIsNavOpen(false);
    }, [pathname]);

    if (isAuthenticated) return null;

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
                    <HeaderDesktop />
                </nav>
            </section>
        </div>
    );
}
