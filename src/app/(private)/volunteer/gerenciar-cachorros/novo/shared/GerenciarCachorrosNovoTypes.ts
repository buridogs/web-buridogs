import { AdocaoGeneroEnum, AdocaoIdadeEnum, AdocaoPorteEnum } from "@/interfaces/adocaoInterfaces";

// TODO: CHECK IT
export interface IDogForm {
    nomeExibicao: string;
    genero: AdocaoGeneroEnum;
    idade: AdocaoIdadeEnum;
    porte: AdocaoPorteEnum;
    descricao: string;
    possuiAlgumaInaptidao: "true" | "false";
    // Advanced fields
    descricaoLonga?: string;
    localAcolhimento?: string;
    tratamentosRealizados?: string;
    youtubeSrcUrlAntes?: string;
    youtubeSrcUrlDepois?: string;
    // Images
    imagensPrincipais: FileList;
    imagensAntes?: FileList;
    imagensDepois?: FileList;
}
