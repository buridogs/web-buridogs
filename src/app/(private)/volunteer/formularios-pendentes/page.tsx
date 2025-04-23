import { Metadata } from "next";
import FormulariosPendentesContainer from "@/components/app/volunteer/formularios-pendentes/FormulariosPendentesContainer";

export const metadata: Metadata = {
    title: "Formulários Pendentes | Admin Buridogs",
    description: "Gerenciamento de solicitações pendentes",
};

export default function FormulariosPendentesPage() {
    return <FormulariosPendentesContainer />;
}
