import { ParceirosContainer } from "@/components/app/parceiros/ParceirosContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Parceiros",
    description:
        "Estes são os nossos parceiros de caminhada presente em nosso dia a dia. Nos ajudam a continuar ajudando quem mais precisa!",
    openGraph: {
        images: ["logo-buridogs.png"],
    },
};

export default function ParceirosPage() {
    return <ParceirosContainer />;
}
