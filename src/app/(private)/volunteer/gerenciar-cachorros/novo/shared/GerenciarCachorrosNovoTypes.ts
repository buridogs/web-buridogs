import { DogAge, DogGender, DogSize, DogStatus } from "@/services/api/modules/dogs/types";

// TODO: SHOULD MATCH THE IDOG INTERFACE
export interface IDogForm {
    nomeExibicao: string;
    genero: DogGender;
    idade: DogAge;
    porte: DogSize;
    status: DogStatus;
    descricao: string;
    possuiAlgumaInaptidao: "true" | "false";
    inaptidaoDescricao?: string;
    // Advanced fields
    descricaoLonga?: string;
    localAcolhimento?: string;
    tratamentosRealizados?: string;
    youtubeSrcUrlAntes?: string;
    youtubeSrcUrlDepois?: string;
    // Images
    imagensPrincipais?: FileList; // TODO: FIX IT
    imagensAntes?: FileList;
    imagensDepois?: FileList;
}
