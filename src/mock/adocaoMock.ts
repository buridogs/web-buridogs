import { IAdocaoDetails, IAdocaoEspecialDetails } from "@/interfaces/adocaoInterfaces";

export const cachorrosAdocao: IAdocaoDetails[] = [
    {
        id: 1,
        imageSrc: "adocao-maria-flor.jpg",
        nome: "Maria flor",
        genero: "femea",
        idade: "adulto",
        porte: "medio-porte",
        descricao:
            "Doguinha dócil, cativante e carinhosa. Está castrada e vacinada. Possui entre 3 e 4 anos de idade.",
        descricaoLonga:
            "Doguinha dócil, cativante e carinhosa. Está castrada e vacinada. Possui entre 3 e 4 anos de idade.",
        imagesSrc: ["adocao-maria-flor.jpg"],
        youtubeSrcUrl: "",
    },
    {
        id: 2,
        imageSrc: "adocao-yasmin.jpg",
        nome: "Yasmin(Branquinha)",
        genero: "femea",
        idade: "idoso",
        porte: "pequeno-porte",
        imagesSrc: ["adocao-yasmin.jpg"],
        descricao:
            "Doguinha vacinada e com castração agendada. Porte excelente para quem mora em apartamento.",
    },
];

export const cachorrosAdocaoEspecial: IAdocaoEspecialDetails[] = [
    {
        id: 1,
        imageSrc: "image-banner.png",
        nome: "Nome do animal",
        genero: "macho",
        idade: "idoso",
        porte: "medio-porte",
        motivoEspecial: "Deficiente Físico",
        descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
];
