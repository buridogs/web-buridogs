import { Metadata } from "next";
import GerenciarParceirosNovoContainer from "./components/GerenciarParceirosNovoContainer";

export const metadata: Metadata = {
    title: "Gerenciar Parceiro | Admin Buridogs",
    description: "Adicionar ou editar parceiro",
};

export default function GerenciarParceirosNovoPage() {
    return <GerenciarParceirosNovoContainer />;
}
