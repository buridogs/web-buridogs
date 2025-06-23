import { Metadata } from "next";
import GerenciarVoluntariosNovoContainer from "./components/GerenciarVoluntariosNovoContainer";

export const metadata: Metadata = {
    title: "Gerenciar Voluntário | Admin Buridogs",
    description: "Adicionar ou editar voluntário",
};

export default function GerenciarVoluntariosNovoPage() {
    return <GerenciarVoluntariosNovoContainer />;
}
