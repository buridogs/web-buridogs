import { IDogUI } from "@/interfaces/dogInterfaces";

// Mock data - replace with API call in production
export const cachorrosMock: IDogUI[] = [
    {
        id: 1,
        nomeExibicao: "Thor",
        status: "adocao",
        slug: "thor",
        genero: "macho",
        idade: "filhote",
        porte: "medio-porte",
        descricao:
            "Thor é um cachorro muito brincalhão e cheio de energia. Ele adora correr e brincar com bolas.",
        images: [
            {
                src: "",
                alt: "Thor brincando no parque",
                type: "main",
            },
            {
                src: "",
                alt: "Thor em casa",
                type: "common",
            },
        ],
        possuiAlgumaInaptidao: false,
    },
    {
        id: 2,
        nomeExibicao: "Zazá",
        status: "finais-felizes",
        slug: "zaza",
        genero: "femea",
        idade: "adulto",
        porte: "grande-porte",
        descricao:
            "Zazá é uma cachorrinha dócil e carinhosa. Adora ficar no colo e receber carinho.",
        images: [
            {
                src: "",
                alt: "Zazá descansando",
                type: "main",
            },
        ],
        possuiAlgumaInaptidao: false,
    },
    {
        id: 3,
        nomeExibicao: "Yasmin",
        status: "adocao",
        slug: "yasmin",
        genero: "femea",
        idade: "idoso",
        porte: "grande-porte",
        descricao:
            "Yasmin é uma senhora tranquila e muito amorosa. Gosta de passar o dia dormindo ao lado do seu tutor.",
        images: [
            {
                src: "",
                alt: "Yasmin deitada na cama",
                type: "main",
            },
        ],
        possuiAlgumaInaptidao: true,
        localAcolhimento: "Lar temporário em Contagem",
        tratamentosRealizados: "Castração, vacinação antirrábica e tratamento para artrite",
    },
];
