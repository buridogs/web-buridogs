import AdocaoDetalhesContainer from "@/components/app/adocaoDetalhes/AdocaoDetalhesContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Adoção Detalhes | Buridogs",
    description: "Generated by create next app",
};

export default function AdocaoDetails({ params }: { params: { slug: string } }) {
    return <AdocaoDetalhesContainer slug={params.slug} />;
}
