export interface IParceiros {
    nome: string;
    endereco: string;
    imagemSrc: string;
    contato: string;
    descricao?: string;
    linkURL?: string;
    categoria?: string;
    redesSociais?: {
        instagram?: string;
        facebook?: string;
        site?: string;
    };
}
