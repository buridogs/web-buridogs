import { IAdocaoDetails } from "@/interfaces/adocaoInterfaces";

export const cachorrosAdocao: IAdocaoDetails[] = [
    {
        id: 1,
        imageSrc: "image-banner.png",
        nome: "Nome do animal",
        genero: "macho",
        idade: "adulto",
        porte: "medio-porte",
        descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
        descricaoLonga:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
        imagesSrc: ["image-banner.png", "image-banner.png", "image-banner.png"],
        youtubeSrcUrl: "MPHEFxeFFQE",
    },
    {
        id: 2,
        imageSrc: "image-banner.png",
        nome: "Nome do animal",
        genero: "macho",
        idade: "idoso",
        porte: "medio-porte",
        descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
    {
        id: 3,
        imageSrc: "image-banner.png",
        nome: "Nome do animal",
        genero: "femea",
        idade: "adulto",
        porte: "pequeno-porte",
        descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
];

export const cachorrosAdocaoEspecial = [
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
    {
        id: 2,
        imageSrc: "image-banner.png",
        nome: "Nome do animal",
        genero: "macho",
        idade: "idoso",
        porte: "medio-porte",
        motivoEspecial: "Idoso",
        descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
    {
        id: 3,
        imageSrc: "image-banner.png",
        nome: "Nome do animal",
        genero: "femea",
        idade: "adulto",
        porte: "pequeno-porte",
        motivoEspecial: "Muito tempo em LT",
        descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
];
