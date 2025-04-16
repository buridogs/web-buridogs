import { Metadata } from "next";
import AdocoesPendentesContainer from "@/components/app/volunteer/adocoes-pendentes/AdocoesPendentesContainer";

export const metadata: Metadata = {
    title: "Adoções Pendentes | Admin Buridogs",
    description: "Gerenciamento de solicitações de adoção pendentes",
};

export default function AdocoesPendentesPage() {
    return <AdocoesPendentesContainer />;
}
