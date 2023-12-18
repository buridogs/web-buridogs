import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contato",
    description:
        "Gostaria de falar conosco? Entre em contato conosco por meio de nosso formulário e, assim que possível, te chamaremos.",
    openGraph: {
        images: ["logo-buridogs.png"],
    },
};

export default function ContatoPage() {
    return <h1>Contato Page</h1>;
}
