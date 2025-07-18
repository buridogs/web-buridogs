"use client";

import { Spinner } from "@/components/Spinner/Spinner";
import { ParceiroCard } from "./ParceiroCard";
import { usePartners } from "@/hooks/partners-hook";

export function ParceirosContainer() {
    const { partners, isLoading: partnersLoading } = usePartners();

    const renderContent = () => {
        if (partnersLoading) {
            return <Spinner />;
        }

        if (partners.length === 0) {
            return null;
        }

        return (
            <ul className="w-full grid grid-cols-1 sm:grid-cols-2 gap-8 justify-items-center mt-8">
                {partners.map((p) => (
                    <ParceiroCard
                        key={p.nome}
                        parceiro={p}
                    />
                ))}
            </ul>
        );
    };

    return (
        <div>
            <section className="bg-white">
                <div className="max-w-screen-xl mx-auto px-8 py-11 flex flex-col items-center md:py-12">
                    <div className="w-full flex flex-col items-start md:items-center">
                        <h3 className="text-gray-700 text-3xl leading-10 font-bold md:text-4xl">
                            Conheça nossos parceiros
                        </h3>
                        <span className="text-gray-700 text-base md:text-xl leading-6 md:leading-10 font-medium mt-6 mb-4 md:text-center lg:text-start md:max-w-[80%]">
                            Sempre nos ajudando em nosso dia a dia, seja com descontos, doações e
                            facilidades nos pagamentos. Com certeza, nos fizeram mais fortes na
                            nossa caminhada e serão muito importantes para a existência do projeto!
                        </span>
                        <span className="text-primary-700 text-base md:text-xl leading-6 md:leading-10 font-semibold mb-6">
                            Gostaríamos muito de agradecer pela confiança. Vocês nos permitem
                            continuar sonhando e ajudando cada vez mais!
                        </span>
                    </div>
                    {renderContent()}
                </div>
            </section>
            <section className="bg-primary-50 py-10">
                <div className="max-w-screen-xl mx-auto px-8 py-11 flex item-center justify-center md:py-12">
                    <div className="w-full flex flex-col items-center lg:max-w-[600px]">
                        <h3 className="text-gray-700 text-2xl md:text-3xl leading-10 font-bold">
                            Nossos Buriamigos também estão presente nessa caminhada
                        </h3>
                        <span className="text-gray-700 text-base md:text-xl leading-6 md:leading-10 font-medium mt-6 mb-10 md:text-center lg:text-start">
                            Para que o Buri Dogs se mantenha na ativa são essenciais as doações
                            financeiras dos nossos “buriamigos”. Há aqueles que contribuem
                            mensalmente, os que são padrinhos e madrinhas de nossos doguinhos,
                            financiam tratamentos veterinários e medicamentos. Felizmente, a lista é
                            longa, e corremos o risco de deixar de citar alguns, então, se faltar
                            algum abaixo, nos perdoem e sintam-se também incluídos.
                            <br />
                            <strong className="text-primary-400">
                                Também agradecemos aos canais midiáticos do bairro
                            </strong>
                            , que contribuem divulgando nosso trabalho e os buridoguinhos para
                            adoção.
                        </span>
                    </div>
                </div>
            </section>
        </div>
    );
}
