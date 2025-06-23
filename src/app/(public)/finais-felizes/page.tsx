import { Metadata } from "next";
import FinaisFelizesContainer from "@/components/app/finais-felizes/FinaisFelizesContainer";

export const metadata: Metadata = {
    title: "Finais Felizes",
    description:
        "Conheça as histórias dos cachorrinhos resgatados pelo grupo ao longo dos anos de trabalho.",
    openGraph: {
        images: ["logo-buridogs.png"],
    },
};

export default function FinaisFelizesPage() {
    return <FinaisFelizesContainer />;
}
