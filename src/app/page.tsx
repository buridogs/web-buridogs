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
        title: "Home | Buri Dogs",
        type: "website",
        description:
            "Bem vindo ao Buri Dogs, um grupo de proteção animal fundado no bairro Buritis, Belo Horizonte.",
        locale: "pt-BR",
        url: "https://buridogs.com.br",
        siteName: "Buri Dogs",
        images: [
            {
                url: generateImgURL("logo-buridogs.png"),
                alt: "Página principal do Buri Dogs",
                width: "200",
                height: "100",
            },
        ],
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
