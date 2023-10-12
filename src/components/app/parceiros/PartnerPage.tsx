import { parceiros } from "@/utils/consts";
import { PartnerCard } from "./PartnerCard";

export function PartnerPage() {
    return (
        <div>
            <section className="bg-white">
                <div className="max-w-screen-xl mx-auto px-8 py-11 flex flex-col item-center md:py-12 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-col items-start md:items-center lg:max-w-[600px]">
                        <h3 className="text-grey-700 text-3xl leading-10 font-bold md:text-4xl">
                            Conte também com nossos parceiros
                        </h3>
                        <span className="text-grey-700 text-xl leading-10 font-medium mt-6 mb-10 md:text-center lg:text-start">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
                            dolor sit amet, consectetur adipiscing elit.
                        </span>
                    </div>
                    <ul className="w-full flex flex-col justify-evenly items-end flex-wrap [&>li+li]:mt-6">
                        {parceiros.map((p) => (
                            <PartnerCard
                                key={p.nome}
                                name={p.nome}
                                address={p.endereco}
                                contactData={p.contato}
                                category="Teste"
                            />
                        ))}
                    </ul>
                </div>
            </section>
            <section className="bg-primary-50 py-10">
                <div className="max-w-screen-xl mx-auto px-8 py-11 flex flex-col-reverse item-center md:py-12 lg:flex-row lg:items-center lg:justify-between">
                    <ul className="flex flex-col justify-evenly flex-wrap [&>li+li]:mt-6 ">
                        {parceiros.map((p) => (
                            <PartnerCard
                                key={p.nome}
                                name={p.nome}
                                address={p.endereco}
                                contactData={p.contato}
                                category="Teste"
                            />
                        ))}
                    </ul>
                    <div className="flex flex-col items-start md:items-center lg:max-w-[600px]">
                        <h3 className="text-grey-700 text-3xl leading-10 font-bold md:text-4xl">
                            Nossos Buriamigos também estão presente nessa caminhada
                        </h3>
                        <span className="text-grey-700 text-xl leading-10 font-medium mt-6 mb-10 md:text-center lg:text-start">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
                            dolor sit amet, consectetur adipiscing elit.
                        </span>
                    </div>
                </div>
            </section>
        </div>
    );
}
