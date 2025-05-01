import { DogAge, DogGender, DogSize, DogStatus } from "@/services/api/modules/dogs/types";

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
export interface IDogUI {
    id: string;
    nomeExibicao: string;
    status: DogStatus;
    slug: string;
    genero: DogGender;
    idade: DogAge;
    porte: DogSize;
    descricao: string;
    possuiAlgumaInaptidao?: boolean;
    images?: Img[];
    youtubeVideos?: Video[];
    // Happy Ending fields
    descricaoHappyEnding?: string;
    localAcolhimento?: string;
    tratamentosRealizados?: string;
}
