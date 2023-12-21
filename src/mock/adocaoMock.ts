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
    {
        id: 3,
        imageSrc: "adocao-zaza-1.jpg",
        nome: "Zaza",
        genero: "femea",
        idade: "adulto",
        porte: "medio-porte",
        imagesSrc: ["adocao-zaza-1.jpg"],
        descricao:
            "Chow-chow vacinada e castrada. É dócil, carinhosa e adora um chamego. Possui cerca de 2 anos.",
    },
    {
        id: 4,
        imageSrc: "",
        nome: "Simba",
        genero: "macho",
        idade: "adulto",
        porte: "medio-porte",
        imagesSrc: [""],
        descricao:
            "Uma simpatia de doguinho, vacinado e castrado. agendada. Simba é carinhoso, companheiro e adora uma aventura. Possui cerca de 2 anos.",
    },
];

export const cachorrosAdocaoEspecial: IAdocaoEspecialDetails[] = [
    {
        id: 5,
        imageSrc: "adocao-tigrao-1.jpg",
        nome: "Tigrão",
        genero: "macho",
        idade: "adulto",
        porte: "medio-porte",
        imagesSrc: ["adocao-tigrao-1.jpg", "adocao-tigrao-2.jpg"],
        motivoEspecial: "Deficiente Físico",
        descricao:
            "Doguinho especial de três patinhas, mas valente como qualquer outro. Vacinado e castrado. Está há muito tempo em busca de um lar sem sucesso, possivelmente por sua condição especial, mas que não o limita em nada.",
    },
];
