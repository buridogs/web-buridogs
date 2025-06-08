"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HeaderMobile } from "./PublicHeader/HeaderMobile";
import { generateImgURL } from "@/utils/methods";
import { HeaderDesktop } from "./PublicHeader/HeaderDesktop";
import { isPublicRouteHook } from "@/hooks/is-public-route-hook";

export function Header() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    useEffect(() => {
        setIsNavOpen(false);
    }, []);

    const isPublicRoute = isPublicRouteHook();
    if (!isPublicRoute) {
        return null;
    }

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
