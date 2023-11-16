import { SobreNosSecao } from "@/components/app/home/SobreNosSecao";
import { ContatoSecao } from "@/components/app/home/ContatoSecao/ContatoSecao";
import { FinaisFelizesSecao } from "@/components/app/home/FinaisFelizesSecao/FinaisFelizesSecao";
import { SecaoPrincipal } from "@/components/app/home/SecaoPrincipal";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home | Buridogs",
    description: "Generated by create next app",
};

export default function Home() {
    return (
        <div>
            <SecaoPrincipal />
            <SobreNosSecao />
            <FinaisFelizesSecao />
            <ContatoSecao />
        </div>
    );
}
