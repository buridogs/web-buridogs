"use client";

import Link from "next/link";
import { ParceiroCardResumo } from "./ParceiroCardResumo";
import { Button } from "@/components/Button/Button";
import { usePartners } from "@/hooks/partners-hook";
import { Spinner } from "@/components/Spinner/Spinner";

export function ParceirosSecao() {
    const { partners, isLoading: partnersLoading } = usePartners();

    const renderContent = () => {
        if (partnersLoading) {
            return <Spinner />;
        }

        if (partners.length === 0) {
            return null;
        }

        return (
            <ul className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {partners.map((p) => (
                    <ParceiroCardResumo
                        key={p.nome}
                        parceiro={p}
                    />
                ))}
            </ul>
        );
    };

    return (
        <section className="bg-gray-50">
            <div className="max-w-screen-xl mx-auto px-8 py-8 flex flex-col item-center md:py-12 lg:flex-row">
                <div className="flex flex-col items-start md:items-center lg:max-w-[330px] md:mr-14">
                    <h3 className="text-gray-700 text-3xl leading-10 font-bold md:text-4xl">
                        Conte também com nossos parceiros
                    </h3>
                    <span className="text-justify text-gray-700 text-xl leading-8 mt-6 mb-10">
                        Para que o Buri Dogs se mantenha na ativa, contamos com uma rede de
                        profissionais e empresas parceiras. Eles fazem descontos, permutas, doam
                        produtos, facilitam pagamentos e tornam possível o atendimento aos nossos
                        resgatados. Queremos agradecê-los e também recomendá-los!
                    </span>
                    <Link
                        href="/parceiros"
                        className="w-full mb-10 lg:mb-0 flex justify-end"
                    >
                        <Button
                            label="Acessar Parceiros"
                            customBorderColor="border-gray-400"
                            customTextColor="text-gray-400"
                            customCss="w-full"
                        />
                    </Link>
                </div>
                {renderContent()}
            </div>
        </section>
    );
}
