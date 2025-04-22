import { SobreNosContainer } from "@/components/app/sobre-nos/SobreNosContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sobre nós",
    description:
        "Somos o Buri Dogs! Em 4 anos já ajudamos mais de 700 cachorros em situação de rua. Conheça nossa história!",
    openGraph: {
        images: ["logo-buridogs.png"],
    },
};

export default function SobreNosPage() {
    return <SobreNosContainer />;
}
