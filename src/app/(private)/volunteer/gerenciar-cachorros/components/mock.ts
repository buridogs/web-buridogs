import { IDogUI } from "@/interfaces/dogInterfaces";
import {
    DogAgeEnum,
    DogGenderEnum,
    DogSizeEnum,
    DogStatusEnum,
} from "@/services/api/modules/dogs/types";

// Mock data - replace with API call in production
export const cachorrosMock: IDogUI[] = [
    {
        id: "1",
        nomeExibicao: "Thor",
        status: DogStatusEnum.adotado,
        slug: "thor",
        genero: DogGenderEnum.macho,
        idade: DogAgeEnum.filhote,
        porte: DogSizeEnum.medio,
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
        id: "2",
        nomeExibicao: "Zazá",
        status: DogStatusEnum.aguardando_adocao,
        slug: "zaza",
        genero: DogGenderEnum.femea,
        idade: DogAgeEnum.adulto,
        porte: DogSizeEnum.grande,
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
        id: "3",
        nomeExibicao: "Yasmin",
        status: DogStatusEnum.adotado,
        slug: "yasmin",
        genero: DogGenderEnum.femea,
        idade: DogAgeEnum.idoso,
        porte: DogSizeEnum.grande,
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
