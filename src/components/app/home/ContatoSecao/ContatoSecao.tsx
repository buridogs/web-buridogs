import Link from "next/link";
import { ParceiroCardResumo } from "./ParceiroCardResumo";
import { Button } from "@/components/Button/Button";
import { parceiros } from "@/mock/parceirosMock";

export function ContatoSecao() {
    return (
        <section className="bg-grey-50">
            <div className="max-w-screen-xl mx-auto px-8 py-8 flex flex-col item-center md:py-12 lg:flex-row">
                <div className="flex flex-col items-start md:items-center lg:max-w-[330px]">
                    <h3 className="text-grey-700 text-3xl leading-10 font-bold md:text-4xl">
                        Conte também com nossos parceiros
                    </h3>
                    <span className="text-justify text-grey-700 text-xl leading-10 font-medium mt-6 mb-10 md:mr-14">
                        Para que o Buri Dogs se mantenha na ativa, contamos com uma rede de
                        profissionais e empresas parceiras. Eles fazem descontos, permutas, doam
                        produtos, facilitam pagamentos e tornam possível o atendimento aos nossos
                        resgatados. Queremos agradecê-los e também recomendá-los!
                    </span>
                    <Link
                        href="/parceiros"
                        className="w-full mb-10 lg:mb-0"
                    >
                        <Button
                            label="Acessar Parceiros"
                            customBorderColor="border-grey-400"
                            customTextColor="text-grey-400"
                            customCss="w-full"
                        />
                    </Link>
                </div>
                <ul className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                    {parceiros.map((p) => (
                        <ParceiroCardResumo
                            key={p.nome}
                            parceiro={p}
                        />
                    ))}
                </ul>
            </div>
        </section>
    );
}
