/* eslint-disable no-unused-vars */
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

export interface IAdocaoDetails {
    id: number;
    imageSrc: string;
    nomeExibicao: string;
    nomeURL: string;
    genero: AdocaoGeneroType;
    idade: AdocaoIdadeType;
    porte: AdocaoPorteType;
    descricao: string;
    possuiAlgumaInaptidao?: boolean;
    imagesSrc?: string[];
    descricaoLonga?: string;
    youtubeSrcUrl?: string;
}

export enum AdocaoFiltrosEnum {
    genero = "genero",
    idade = "idade",
    porte = "porte",
}

// TODO: ADJUST THIS
export enum AdocaoStatusEnum {
    PENDENTE = "PENDENTE",
    APROVADO = "APROVADO",
    REJEITADO = "REJEITADO",
    EM_ANALISE = "EM_ANALISE",
}

export type AdocaoStatusType = "PENDENTE" | "APROVADO" | "REJEITADO" | "EM_ANALISE";

export interface IPendingAdoption {
    id: string;
    dataEnvio: string;
    nome: string;
    celular: string;
    nomeCachorroAdocao: string;
    status: AdocaoStatusType;
    email?: string;
    fotos?: string[];
    formData: {
        endereco_cep: string;
        endereco_rua: string;
        endereco_numero: string;
        endereco_complemento?: string;
        endereco_bairro: string;
        endereco_cidade: string;
        endereco_estado: string;
        facebook_url: string;
        instagram_url: string;
        primeira_adocao: boolean;
        motivo_adocao: string;
        quantidade_pessoas_moradia: string;
        pessoas_de_acordo_adocao: boolean;
        ha_criancas_idosos?: string[];
        mora_casa_apt: string;
        quantidade_pessoas_trabalham: string;
        moradia_tem_estrutura_adocao: string;
        ha_outros_animais: string;
        ja_teve_outros_animais: string;
        esta_ciente_gastos: boolean;
        descricao_lugar_animal: string;
        situacao_devolucao_adocao: string;
        consciente_termo_responsabilidade: boolean;
        linksArquivosAzureBlob: string[];
    };
}
