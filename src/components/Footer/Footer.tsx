"use client";

import { BURIDOGS_FACEBOOK_LINK, BURIDOGS_INSTAGRAM_LINK } from "@/utils/consts";
import { FaInstagram, FaFacebook } from "react-icons/fa6";
import { Button } from "../Button/Button";
import { useState } from "react";
import { Modal } from "../Modal/Modal";
import Link from "next/link";

export function Footer() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <footer className="w-[100%] flex flex-col items-center">
            <section className="w-[100%] bg-primary-400 py-10">
                <div className="px-8 flex flex-col items-start justify-between lg:flex-row lg:items-center lg:max-w-screen-xl lg:m-auto xl:px-0">
                    <div className="flex flex-col items-start">
                        <span className="text-white max-w-[560px] mb-3">
                            Acompanhe mais de perto o nosso trabalho através das nossas redes
                            sociais
                        </span>
                        <ul className="flex justify-start items-center p-0 [&>li+li]:ml-3">
                            <li>
                                <a
                                    href={BURIDOGS_INSTAGRAM_LINK}
                                    target="_blank"
                                >
                                    <FaInstagram
                                        size={32}
                                        color="white"
                                    />
                                </a>
                            </li>
                            <li>
                                <a
                                    href={BURIDOGS_FACEBOOK_LINK}
                                    target="_blank"
                                >
                                    <FaFacebook
                                        size={32}
                                        color="white"
                                    />
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col items-start pt-6 lg:pt-0">
                        <span className="text-base text-white mb-4 lg:text-lg">
                            Entre em contato com a gente
                        </span>
                        <Link href="/contato">
                            <Button label="Deixe sua mensagem" />
                        </Link>
                    </div>
                </div>
            </section>
            <div className="w-[100%] bg-grey-400 flex justify-center py-3">
                <button onClick={() => setIsOpen(true)}>
                    <strong className="text-base text-white underline cursor-pointer lg:text-lg">
                        Desenvolvido por voluntários
                    </strong>
                </button>
            </div>
            {isOpen && <Modal setIsOpen={setIsOpen} />}
        </footer>
    );
}
