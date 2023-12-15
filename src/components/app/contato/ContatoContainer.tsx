"use client";

import ContatoDetalhesForm from "./ContatoDetalhesForm";

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
                <div className="w-[200px] h-[200px] rounded-[50%] bg-primary-100 mb-10 lg:mb-0 lg:ml-10 lg:w-[300px] lg:h-[300px] xl:w-[400px] xl:h-[400px]" />
            </div>
        </section>
    );
}
