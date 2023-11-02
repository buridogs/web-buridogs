export enum AdocaoGeneroEnum {
    macho = "macho",
    femea = "femea",
}

export type AdocaoGeneroType = "macho" | "femea";

export enum AdocaoIdadeEnum {
    filhote = "filhote",
    ate1Ano = "ate-1-ano",
    adulto = "adulto",
    idoso = "idoso",
}

export type AdocaoIdadeType = "filhote" | "ate-1-ano" | "adulto" | "idoso";

export enum AdocaoPorteEnum {
    mini = "mini",
    pequenoPorte = "pequeno-porte",
    medioPorte = "medio-porte",
    grandePorte = "grande-porte",
}

export type AdocaoPorteType = "mini" | "pequeno-porte" | "medio-porte" | "grande-porte";

export interface IAdocaoCard {
    id: number;
    imageSrc: string;
    nome: string;
    genero: AdocaoGeneroType;
    idade: AdocaoIdadeType;
    porte: AdocaoPorteType;
    descricao: string;
}

export interface IAdocaoDetails extends IAdocaoCard {
    descricaoLonga?: string;
    imagesSrc?: string[];
    youtubeSrcUrl?: string;
}

export enum AdocaoFiltrosEnum {
    genero = "genero",
    idade = "idade",
    porte = "porte",
}
