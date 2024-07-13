import ApadrinhamentoForm from "@/components/app/apadrinhamento/ApadrinhamentoForm";
import { ApadrinhamentoInstrucoes } from "@/components/app/apadrinhamento/ApadrinhamentoInstrucoes";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Apadrinhamento",
    description:
        "Gostaria de falar conosco? Entre em contato conosco por meio de nosso formulário. Assim que possível te chamaremos.",
    openGraph: {
        images: ["logo-buridogs.png"],
    },
};

export default function ApadrinhamentoPage() {
    return (
        <main className="bg-white">
            <div className="max-w-screen-xl mx-auto px-8 py-11 flex flex-col item-center md:py-12">
                <ApadrinhamentoInstrucoes />
                <ApadrinhamentoForm />
            </div>
        </main>
    );
}

// TODO: Document process of creating a new lambda
// TODO: Fix grey typo
// TODO: Improve form to have 2 sides
// TODO: Implement unit tests
// TODO: Add the right photo and description for Apadrinhamento
// TODO: Custom checkbox css
