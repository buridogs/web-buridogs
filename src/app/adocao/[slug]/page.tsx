import AdocaoDetalhesContainer from "@/components/app/adocaoDetalhes/AdocaoDetalhesContainer";
import { cachorrosAdocao } from "@/mock/adocaoMock";
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
    const cachorro = cachorrosAdocao.find((c) => c.id.toString() === idAnimalSelecionado);

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: `${cachorro?.nome} | Adoção Detalhes`,
        openGraph: {
            images: [`${cachorro?.imageSrc ?? ""}`, ...previousImages],
        },
    };
}
