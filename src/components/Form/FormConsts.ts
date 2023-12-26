export const MENSAGENS_ERRO = (tamanho?: number) => ({
    campoObrigatorio: "Campo Obrigatório",
    emailInvalido: "E-mail Inválido",
    tamanhoMaximo: `Limite de ${tamanho} caracteres atingido`,
});

export const LIMITE_TAMANHO_MENSAGEM = {
    pequeno: 15,
    pequenoMedio: 25,
    medio: 50,
    grande: 150,
};
