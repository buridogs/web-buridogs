import { Metadata } from "next";
import { AdocaoContainer } from "@/components/app/adocao/AdocaoContainer";

export const metadata: Metadata = {
    title: "Adoção",
    description:
        "Veja os nossos cachorrinhos acolhidos disponíveis para adoção e mude a história de um deles!",
    openGraph: {
        images: ["logo-buridogs.png"],
    },
};

export default function AdocaoPage() {
    return <AdocaoContainer />;
}
