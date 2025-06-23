import { IDogUI } from "@/interfaces/dogInterfaces";
import {
    DogAgeEnum,
    DogGenderEnum,
    DogSizeEnum,
    DogStatusEnum,
} from "@/services/api/modules/dogs/types";

export const dogs: IDogUI[] = [
    {
        id: "3",
        nomeExibicao: "Zazá",
        status: DogStatusEnum.aguardando_adocao,
        slug: "zaza",
        genero: DogGenderEnum.femea,
        idade: DogAgeEnum.adulto,
        porte: DogSizeEnum.medio,
        descricao:
            "Chow-chow vacinada e castrada. É dócil, carinhosa e adora um chamego. Possui cerca de 2 anos.",
        possuiAlgumaInaptidao: false,
        images: [
            {
                src: "adocao-zaza-1.jpg",
                alt: "Zazá",
                type: "main",
            },
        ],
    },
    {
        id: "6",
        nomeExibicao: "Guga",
        status: DogStatusEnum.aguardando_adocao,
        slug: "guga",
        genero: DogGenderEnum.macho,
        idade: DogAgeEnum.filhote,
        porte: DogSizeEnum.pequeno,
        descricao:
            "Cerca de 1 a 2 anos. Com pelagem do tipo estopinha, Guga é um doguinho adorável.",
        possuiAlgumaInaptidao: false,
        images: [
            {
                src: "adocao-guga-1.PNG",
                alt: "Guga",
                type: "main",
            },
        ],
    },
    {
        id: "7",
        nomeExibicao: "Florzinha",
        status: DogStatusEnum.aguardando_adocao,
        slug: "florzinha",
        genero: DogGenderEnum.femea,
        idade: DogAgeEnum.filhote,
        porte: DogSizeEnum.medio,
        descricao:
            "Cerca de 1 ano. Uma simpatia de doguinha, vacinada e castrada. Florzinha é carinhosa e esperta.",
        possuiAlgumaInaptidao: false,
        images: [
            {
                src: "adocao-florzinha-1.PNG",
                alt: "Florzinha",
                type: "main",
            },
        ],
    },
    {
        id: "8",
        nomeExibicao: "Hércules",
        status: DogStatusEnum.aguardando_adocao,
        slug: "hercules",
        genero: DogGenderEnum.macho,
        idade: DogAgeEnum.filhote,
        porte: DogSizeEnum.medio,
        descricao:
            "Cerca de 1 ano. Um príncipe, doce, educado e brincalhão. Já está vacinado e castrado. Uma fofura!",
        possuiAlgumaInaptidao: false,
        images: [
            {
                src: "adocao-hercules-1.PNG",
                alt: "Hércules",
                type: "main",
            },
        ],
    },
    {
        id: "9",
        nomeExibicao: "Mike",
        status: DogStatusEnum.aguardando_adocao,
        slug: "mike",
        genero: DogGenderEnum.macho,
        idade: DogAgeEnum.jovem,
        porte: DogSizeEnum.pequeno,
        descricao:
            "O cãozinho mais simpático de BH, Mike é o rei da simpatia. Vacinado e castrado, espera ansiosamente por um lar.",
        possuiAlgumaInaptidao: false,
        images: [
            {
                src: "adocao-mike-1.PNG",
                alt: "Mike",
                type: "main",
            },
        ],
    },
    {
        id: "10",
        nomeExibicao: "Kiara",
        status: DogStatusEnum.aguardando_adocao,
        slug: "kiara",
        genero: DogGenderEnum.macho,
        idade: DogAgeEnum.adulto,
        porte: DogSizeEnum.medio,
        descricao:
            "Cerca de 1 a 2 anos, um filhotão ativo e muito brincalhão. Um verdadeiro companheiro.",
        possuiAlgumaInaptidao: false,
        images: [
            {
                src: "adocao-kiara-1.PNG",
                alt: "Kiara",
                type: "main",
            },
        ],
    },
    {
        id: "11",
        nomeExibicao: "Mel",
        status: DogStatusEnum.aguardando_adocao,
        slug: "mel",
        genero: DogGenderEnum.macho,
        idade: DogAgeEnum.adulto,
        porte: DogSizeEnum.grande,
        descricao:
            "Cerca de 2 anos. Um amor de cachorro, carinhoso, sociável e companheiro. Castrado e vacinado.",
        possuiAlgumaInaptidao: false,
        images: [
            {
                src: "adocao-mel-1.PNG",
                alt: "Mel",
                type: "main",
            },
        ],
    },
    {
        id: "13",
        nomeExibicao: "Loki",
        status: DogStatusEnum.aguardando_adocao,
        slug: "loki",
        genero: DogGenderEnum.macho,
        idade: DogAgeEnum.adulto,
        porte: DogSizeEnum.medio,
        descricao:
            "Cerca de 2 anos. Muito simpático e esperto, adora correr e brincar. Está castrado e vacinado.",
        possuiAlgumaInaptidao: false,
        images: [
            {
                src: "adocao-loki-1.PNG",
                alt: "Loki",
                type: "main",
            },
        ],
    },
    {
        id: "1",
        nomeExibicao: "Leo",
        status: DogStatusEnum.aguardando_adocao,
        slug: "leo",
        genero: DogGenderEnum.macho,
        idade: DogAgeEnum.filhote,
        porte: DogSizeEnum.medio,
        descricao:
            "Cerca de 1 ano. É um espetáculo de doguinho! Temperamento excelente, boa convivência com outros animais, brincalhão e carinhoso.",
        possuiAlgumaInaptidao: false,
        images: [
            {
                src: "adocao-leo-1.PNG",
                alt: "Leo",
                type: "main",
            },
        ],
    },
    {
        id: "14",
        nomeExibicao: "Kiara II",
        status: DogStatusEnum.aguardando_adocao,
        slug: "kiara-ii",
        genero: DogGenderEnum.macho,
        idade: DogAgeEnum.filhote,
        porte: DogSizeEnum.medio,
        descricao:
            "Cerca de 1 ano. É super sociável, brincalhona e amável. Está castrada e vacinada.",
        possuiAlgumaInaptidao: false,
        images: [
            {
                src: "adocao-kiara-ii-1.PNG",
                alt: "Kiara II",
                type: "main",
            },
        ],
    },
    {
        id: "15",
        nomeExibicao: "Bob",
        status: DogStatusEnum.aguardando_adocao,
        slug: "bob",
        genero: DogGenderEnum.macho,
        idade: DogAgeEnum.adulto,
        porte: DogSizeEnum.medio,
        descricao: "Cerca de 2 anos. É super carinhoso e obediente. Castrado e vacinado.",
        possuiAlgumaInaptidao: false,
        images: [
            {
                src: "adocao-bob-1.PNG",
                alt: "Bob",
                type: "main",
            },
        ],
    },
    {
        id: "18",
        nomeExibicao: "Chiquinho",
        status: DogStatusEnum.aguardando_adocao,
        slug: "chiquinho",
        genero: DogGenderEnum.macho,
        idade: DogAgeEnum.adulto,
        porte: DogSizeEnum.grande,
        descricao:
            "Cerca de 2 a 3 anos. Um cachorro dócil, obediente e muito companheiro. Está castrado e vacinado.",
        possuiAlgumaInaptidao: false,
        images: [
            {
                src: "adocao-chiquinho-1.PNG",
                alt: "Chiquinho",
                type: "main",
            },
        ],
    },
    {
        id: "19",
        nomeExibicao: "Wilson",
        status: DogStatusEnum.aguardando_adocao,
        slug: "wilson",
        genero: DogGenderEnum.macho,
        idade: DogAgeEnum.filhote,
        porte: DogSizeEnum.medio,
        descricao:
            "Cerca de 1 ano. É muito agitado, brincalhão e cheio de energia. Já está castrado e vacinado.",
        possuiAlgumaInaptidao: false,
        images: [
            {
                src: "adocao-wilson-1.PNG",
                alt: "Wilson",
                type: "main",
            },
        ],
    },
    {
        id: "20",
        nomeExibicao: "Luna",
        status: DogStatusEnum.aguardando_adocao,
        slug: "luna",
        genero: DogGenderEnum.macho,
        idade: DogAgeEnum.filhote,
        porte: DogSizeEnum.medio,
        descricao:
            "Cerca de 1 ano. É uma menina muito dócil, meiga e tranquila. Está castrada e vacinada.",
        possuiAlgumaInaptidao: false,
        images: [
            {
                src: "adocao-luna-1.PNG",
                alt: "Luna",
                type: "main",
            },
        ],
    },
    {
        id: "21",
        nomeExibicao: "Chico",
        status: DogStatusEnum.aguardando_adocao,
        slug: "chico",
        genero: DogGenderEnum.macho,
        idade: DogAgeEnum.adulto,
        porte: DogSizeEnum.medio,
        descricao:
            "Cerca de 2 anos. É um dog muito sociável e carinhoso. Está castrado e vacinado.",
        possuiAlgumaInaptidao: false,
        images: [
            {
                src: "adocao-chico-1.PNG",
                alt: "Chico",
                type: "main",
            },
        ],
    },
    {
        id: "4",
        nomeExibicao: "Branquinho",
        status: DogStatusEnum.aguardando_adocao,
        slug: "branquinho",
        genero: DogGenderEnum.macho,
        idade: DogAgeEnum.adulto,
        porte: DogSizeEnum.medio,
        descricao:
            "Cerca de 2 a 3 anos. É um fofo, muito dócil e atencioso. Adora brincar e é super sociável. Já está castrado e vacinado.",
        possuiAlgumaInaptidao: false,
        images: [
            {
                src: "adocao-branquinho-1.PNG",
                alt: "Branquinho",
                type: "main",
            },
        ],
    },
    {
        id: "5",
        nomeExibicao: "Tequila",
        status: DogStatusEnum.aguardando_adocao,
        slug: "tequila",
        genero: DogGenderEnum.macho,
        idade: DogAgeEnum.adulto,
        porte: DogSizeEnum.medio,
        descricao:
            "Cerca de 2 anos. É muito inteligente, protetor e leal. Adora fazer agrados para receber carinho.",
        possuiAlgumaInaptidao: false,
        images: [
            {
                src: "adocao-tequila-1.PNG",
                alt: "Tequila",
                type: "main",
            },
        ],
    },
    {
        id: "12",
        nomeExibicao: "Totó",
        status: DogStatusEnum.aguardando_adocao,
        slug: "toto",
        genero: DogGenderEnum.macho,
        idade: DogAgeEnum.adulto,
        porte: DogSizeEnum.medio,
        descricao:
            "Doguinho especial de três patinhas, mas valente como qualquer outro. Vacinado e castrado. Está há muito tempo em busca de um lar sem sucesso, possivelmente por sua condição especial, mas que não o limita em nada.",
        possuiAlgumaInaptidao: true,
        images: [
            {
                src: "adocao-toto-1.PNG",
                alt: "Totó",
                type: "main",
            },
        ],
    },
    {
        id: "16",
        nomeExibicao: "Chocolate",
        status: DogStatusEnum.aguardando_adocao,
        slug: "chocolate",
        genero: DogGenderEnum.macho,
        idade: DogAgeEnum.jovem,
        porte: DogSizeEnum.medio,
        descricao:
            "Cerca de 1 a 2 anos. Chegou como apoio voluntário e acabou ficando. É um amor e muito companheiro.",
        possuiAlgumaInaptidao: false,
        images: [
            {
                src: "adocao-chocolate-1.PNG",
                alt: "Chocolate",
                type: "main",
            },
        ],
    },
    {
        id: "17",
        nomeExibicao: "Scott",
        status: DogStatusEnum.aguardando_adocao,
        slug: "scott",
        genero: DogGenderEnum.macho,
        idade: DogAgeEnum.adulto,
        porte: DogSizeEnum.medio,
        descricao:
            "Cerca de 1 a 2 anos. É super brincalhão e agitado. Um fofo que adora se divertir e brincar.",
        possuiAlgumaInaptidao: false,
        images: [
            {
                src: "adocao-scott-1.PNG",
                alt: "Scott",
                type: "main",
            },
        ],
    },
    {
        id: "22",
        nomeExibicao: "Fred",
        status: DogStatusEnum.aguardando_adocao,
        slug: "fred",
        genero: DogGenderEnum.macho,
        idade: DogAgeEnum.adulto,
        porte: DogSizeEnum.pequeno,
        descricao:
            "Cerca de 2 anos. Um fofo tranquilo que adora um chamego. Está castrado e vacinado.",
        possuiAlgumaInaptidao: false,
        images: [
            {
                src: "adocao-fred-1.PNG",
                alt: "Fred",
                type: "main",
            },
        ],
    },
    {
        id: "23",
        nomeExibicao: "Nina",
        status: DogStatusEnum.aguardando_adocao,
        slug: "nina",
        genero: DogGenderEnum.femea,
        idade: DogAgeEnum.adulto,
        porte: DogSizeEnum.medio,
        descricao:
            "Cerca de 2 anos. É super dócil, extremamente carinhosa e adora ficar no colo. Está castrada e vacinada.",
        possuiAlgumaInaptidao: false,
        images: [
            {
                src: "adocao-nina-1.PNG",
                alt: "Nina",
                type: "main",
            },
        ],
    },
    {
        id: "24",
        nomeExibicao: "Xuxa",
        status: DogStatusEnum.aguardando_adocao,
        slug: "xuxa",
        genero: DogGenderEnum.femea,
        idade: DogAgeEnum.filhote,
        porte: DogSizeEnum.medio,
        descricao:
            "Cerca de 6 meses. É super ativa, bem brincalhona, amorosa e extremamente inteligente!",
        possuiAlgumaInaptidao: false,
        images: [
            {
                src: "adocao-xuxa-1.PNG",
                alt: "Xuxa",
                type: "main",
            },
        ],
    },
];

export const finaisFelizosCachorros: IDogUI[] = [
    {
        id: "1",
        nomeExibicao: "Billy",
        status: DogStatusEnum.adotado,
        slug: "billy",
        genero: DogGenderEnum.macho,
        idade: DogAgeEnum.idoso,
        porte: DogSizeEnum.medio,
        descricao:
            "Billy foi adotado em fevereiro de 2017. Um dog idoso que encantou seus tutores pelo olhar. Um olhar que refletia anos de abandono, mas que encontrou uma família que o recebeu de coração aberto. Ganhou uma vida nova e cheia de aventuras.",
        possuiAlgumaInaptidao: false,
        images: [
            {
                src: "finais-felizes-billy.png",
                alt: "Billy",
                type: "main",
            },
        ],
    },
    {
        id: "2",
        nomeExibicao: "Felipo",
        status: DogStatusEnum.adotado,
        slug: "felipo",
        genero: DogGenderEnum.macho,
        idade: DogAgeEnum.filhote,
        porte: DogSizeEnum.medio,
        descricao:
            "Felipo foi adotado em junho de 2021. Passou cerca de 3 anos no abrigo esperando por um lar, mas valeu a pena! Foi adotado por uma linda família, que nos dá notícias frequentemente. Está muito bem, com uma vida bastante confortável.",
        possuiAlgumaInaptidao: false,
        images: [
            {
                src: "finais-felizes-felipo.png",
                alt: "Felipo",
                type: "main",
            },
        ],
    },
    {
        id: "3",
        nomeExibicao: "Marley",
        status: DogStatusEnum.adotado,
        slug: "marley",
        genero: DogGenderEnum.macho,
        idade: DogAgeEnum.filhote,
        porte: DogSizeEnum.medio,
        descricao:
            "Marley foi adotado em novembro de 2017. Foi muito esperado por sua tutora, que sempre sonhou em ter um Golden. Ela tinha certeza que quando fosse adotar um cachorro, seria esse modelo, mas acabou encontrando o Marley e se apaixonou. Uma história linda de amor.",
        possuiAlgumaInaptidao: false,
        images: [
            {
                src: "finais-felizes-marley.png",
                alt: "Marley",
                type: "main",
            },
        ],
    },
];
