"use client";

import { BURIDOGS_FACEBOOK_LINK, BURIDOGS_INSTAGRAM_LINK } from "@/utils/consts";
import { FaInstagram, FaFacebook } from "react-icons/fa6";
import { Button } from "../Button/Button";
import { useState } from "react";
import { Modal } from "../Modal/Modal";
import Link from "next/link";
import Image from "next/image";
import { BLOGO_STORAGE_URL_LINK } from "@/services/storage";
import { FaRegHandshake } from "react-icons/fa6";

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
            {isOpen && (
                <Modal
                    setIsOpen={setIsOpen}
                    content={
                        <div className="bg-primary-100 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="flex flex-col items-center">
                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary-700 sm:mx-0 sm:h-16 sm:w-16">
                                    <FaRegHandshake
                                        color="white"
                                        size={40}
                                    />
                                </div>
                                <div className="w-[80%] mt-3 flex justify-evenly">
                                    <div className="bg-white flex flex-col justify-center items-center px-4 py-4 border-[1.5px] border-solid border-primary-100 rounded-lg">
                                        <Image
                                            src={`${BLOGO_STORAGE_URL_LINK}/voluntario-diogo.png`}
                                            alt="Voluntário Diogo Almazan"
                                            width={50}
                                            height={50}
                                            className="rounded-[50%] mb-2"
                                            priority
                                        />
                                        <strong className="max-w-[80px] text-sm font-semibold text-center leading-5 text-gray-900">
                                            Diogo de P. Almazan
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                />
            )}
        </footer>
    );
}
