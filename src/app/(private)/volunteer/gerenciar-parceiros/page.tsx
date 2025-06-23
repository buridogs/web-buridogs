import { Metadata } from "next";
import GerenciarParceirosContainer from "./components/GerenciarParceirosContainer";

export const metadata: Metadata = {
    title: "Formulários Pendentes | Admin Buridogs",
    description: "Gerenciamento de solicitações pendentes",
};

export default function GerenciarParceirosPage() {
    return <GerenciarParceirosContainer />;
}
