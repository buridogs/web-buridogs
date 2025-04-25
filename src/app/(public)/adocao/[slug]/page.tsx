import AdocaoDetalhesContainer from "@/components/app/adocaoDetalhes/AdocaoDetalhesContainer";
import { dogs } from "@/mock/dogsMock";
import { generateImgURL } from "@/utils/methods";
import { Metadata } from "next";
import { ResolvingMetadata } from "next/dist/lib/metadata/types/metadata-interface";

type Props = {
    params: { slug: string };
};

export default function AdocaoDetalhesPage({ params }: Props) {
    return <AdocaoDetalhesContainer slug={params.slug} />;
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const slug = params.slug;

    const idAnimalSelecionado = slug.split("-")[0];

    const cachorro = dogs.find(
        (c) => c.status === "adocao" && c.id.toString() === idAnimalSelecionado
    );

    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: `${cachorro?.nomeExibicao} | Adoção Detalhes`,
        description: `${cachorro?.descricao}`,
        openGraph: {
            images: [
                `${generateImgURL(cachorro?.images?.find((i) => i.type === "main")?.src ?? "")}`,
                ...previousImages.map((pi) => generateImgURL(pi as string)),
            ],
        },
    };
}
