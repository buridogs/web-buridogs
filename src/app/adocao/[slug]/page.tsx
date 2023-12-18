import AdocaoDetalhesContainer from "@/components/app/adocaoDetalhes/AdocaoDetalhesContainer";
import { cachorrosAdocao, cachorrosAdocaoEspecial } from "@/mock/adocaoMock";
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
    // read route params
    const slug = params.slug;

    const idAnimalSelecionado = slug.split("-")[0];

    // fetch data
    const cachorro = cachorrosAdocao
        .concat(cachorrosAdocaoEspecial)
        .find((c) => c.id.toString() === idAnimalSelecionado);

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: `${cachorro?.nome} | Adoção Detalhes`,
        description: `${cachorro?.descricaoLonga}`,
        openGraph: {
            images: [
                `${generateImgURL(cachorro?.imageSrc ?? "")}`,
                ...previousImages.map((pi) => generateImgURL(pi as string)),
            ],
        },
    };
}
