import { SobreNosSecao } from "@/components/app/home/SobreNosSecao";
import { ParceirosSecao } from "@/components/app/home/ParceirosSecao/ParceirosSecao";
import { FinaisFelizesSecao } from "@/components/app/home/FinaisFelizesSecao/FinaisFelizesSecao";
import { SecaoPrincipal } from "@/components/app/home/SecaoPrincipal";
import { Metadata } from "next";
import { QRCodeSecao } from "@/components/app/home/QRCodeSecao";
import { generateImgURL } from "@/utils/methods";

export const metadata: Metadata = {
    title: "Home | Buri Dogs",
    description:
        "Bem vindo ao Buri Dogs, um grupo de proteção animal fundado no bairro Buritis, Belo Horizonte. ",
    openGraph: {
        images: [generateImgURL("logo-buridogs.png")],
    },
};

export default function Home() {
    return (
        <div>
            <SecaoPrincipal />
            <QRCodeSecao />
            <SobreNosSecao />
            <FinaisFelizesSecao />
            <ParceirosSecao />
        </div>
    );
}
