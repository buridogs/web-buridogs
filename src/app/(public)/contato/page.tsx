import { Metadata } from "next";
import { ContatoContainer } from "@/components/app/contato/ContatoContainer";

export const metadata: Metadata = {
    title: "Contato",
    description:
        "Gostaria de falar conosco? Entre em contato conosco por meio de nosso formulário. Assim que possível te chamaremos.",
    openGraph: {
        images: ["logo-buridogs.png"],
    },
};

export default function ContatoPage() {
    return <ContatoContainer />;
}
