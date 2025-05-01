import { SLUG_CHARACTER_SEPARATOR } from "@/components/app/adocao/AdocaoUtils";
import AdocaoDetalhesContainer from "@/components/app/adocaoDetalhes/AdocaoDetalhesContainer";
import { dogService } from "@/services/api/modules/dogs/dogs-service";
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

    const idAnimalSelecionado = slug.split(SLUG_CHARACTER_SEPARATOR)[0];

    const dog = await dogService.getDogById(idAnimalSelecionado);

    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: `${dog?.name} | Adoção Detalhes`,
        description: `${dog?.description} | Adoção Detalhes`,
        openGraph: {
            images: [
                `${generateImgURL(dog?.assets?.find((i) => i.assetType === "none")?.urlLink ?? "")}`,
                ...previousImages.map((pi) => generateImgURL(pi as string)),
            ],
        },
    };
}
