import { AdocaoGeneroType, AdocaoIdadeType, AdocaoPorteType } from "./adocaoInterfaces";

interface Img {
    src: string;
    alt: string;
    type: "main" | "before" | "after" | "common";
}

interface Video {
    src: string;
    type: "before" | "after" | "common";
}

// TODO: APPLY THIS INTERFACE TO THE WHOLE PROJECT
export interface IDog {
    id: number;
    nomeExibicao: string;
    status: "adocao" | "finais-felizes";
    slug: string;
    genero: AdocaoGeneroType;
    idade: AdocaoIdadeType;
    porte: AdocaoPorteType;
    descricao: string;
    possuiAlgumaInaptidao?: boolean;
    images?: Img[];
    youtubeVideos?: Video[];
    // Happy Ending fields
    descricaoHappyEnding?: string;
    localAcolhimento?: string;
    tratamentosRealizados?: string;
}
