import { Metadata } from "next";
import GerenciarVoluntariosContainer from "./components/GerenciarVoluntariosContainer";

export const metadata: Metadata = {
    title: "Gerenciar Voluntários | Admin Buridogs",
    description: "Gerenciamento de voluntários",
};

export default function GerenciarVoluntariosPage() {
    return <GerenciarVoluntariosContainer />;
}
