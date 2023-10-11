import { PartnerShortCard } from "./PartnerShortCard";

export function ContactSection() {
    return (
        <section className="bg-grey-50">
            <div className="max-w-screen-xl mx-auto px-8 py-8 flex flex-col item-center md:py-12 lg:flex-row">
                <div className="flex flex-col items-start md:items-center lg:max-w-[330px]">
                    <h3 className="text-grey-700 text-3xl leading-10 font-bold md:text-4xl">
                        Conte também com nossos parceiros
                    </h3>
                    <span className="text-grey-700 text-xl leading-10 font-medium mt-6 mb-10 md:text-center lg:text-start">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor
                        sit amet, consectetur adipiscing elit.
                    </span>
                </div>
                <ul className="w-full flex flex-col justify-evenly flex-wrap [&>li+li]:mt-6 lg:flex-row lg:[&>li+li]:mt-0">
                    <PartnerShortCard
                        name="Nome do Parceiro"
                        address="Endereço"
                        contactData="Contato"
                    />
                    <PartnerShortCard
                        name="Nome do Parceiro"
                        address="Endereço"
                        contactData="Contato"
                    />
                    <PartnerShortCard
                        name="Nome do Parceiro"
                        address="Endereço"
                        contactData="Contato"
                    />
                </ul>
            </div>
        </section>
    );
}
