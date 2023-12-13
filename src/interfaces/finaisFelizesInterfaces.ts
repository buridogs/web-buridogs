export interface IFinalFeliz {
    id: number;
    nome: string;
    idade: string;
    porte: string;
    genero: string;
    dataAcolhimento: string;
    localAcolhimento: string;
    descricaoAntes: string;
    descricaoDepois: string;
    dataAdocao: string;
    adotadoPor: string;
    tratamentosRealizados?: string;
    imagemPrincipal?: string;
    imagensUrlAntes?: string[];
    imagensUrlDepois?: string[];
    youtubeUrlIdAntes?: string;
    youtubeUrlIdDepois?: string;
}
