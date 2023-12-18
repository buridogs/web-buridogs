"use client";

import Image from "next/image";
import ContatoDetalhesForm from "./ContatoDetalhesForm";
import { generateImgURL } from "@/utils/methods";

export default function ContatoContainer() {
    return (
        <section className="max-w-screen-xl px-8 mx-auto h-full flex flex-col">
            <div className="py-11 grow flex flex-col-reverse items-center lg:flex-row lg:items-center lg:justify-between lg:py-[56px]">
                <div className="flex flex-col items-center md:items-start lg:max-w-[600px]">
                    <h1 className="text-grey-700 text-3xl leading-10 font-bold md:text-4xl">
                        <span className="text-primary-400 mr-1">
                            Quer fazer parte da nossa rede e apoiar o nosso trabalho?
                        </span>
                    </h1>
                    <strong className="py-5 text-grey-700 font-medium text-xl">
                        Se você tem vontade de ajudar o nosso grupo a continuar realizando o
                        trabalho de proteção aos animais, preenche aqui os seus dados que a gente
                        entra em contato com você!!
                    </strong>

                    <ContatoDetalhesForm />
                </div>
                <Image
                    src={generateImgURL("cachorrinho-fofo-Contato.jpg")}
                    alt="Banner"
                    width={300}
                    height={300}
                    className="w-auto saturate-200 rounded-full lg:w-[470px] lg:h-[470px] lg:ml-4"
                />
            </div>
        </section>
    );
}
