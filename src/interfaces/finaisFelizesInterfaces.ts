export interface IFinalFeliz {
    id: number;
    nome: string;
    idade: string;
    porte: string;
    genero: string;
    localAcolhimento: string;
    descricao: string;
    tratamentosRealizados?: string;
    imagemPrincipal?: string;
    imagensUrlAntes?: string[];
    imagensUrlDepois?: string[];
    youtubeUrlIdAntes?: string;
    youtubeUrlIdDepois?: string;
}
