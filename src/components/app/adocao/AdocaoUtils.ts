import {
    AdocaoFiltrosEnum,
    AdocaoGeneroEnum,
    AdocaoIdadeEnum,
    AdocaoPorteEnum,
} from "@/interfaces/adocaoInterfaces";

export const filtrosAdocao = [
    {
        filtro: {
            label: "Gênero",
            value: AdocaoFiltrosEnum.genero,
        },
        opcoes: [
            {
                label: "Macho",
                value: AdocaoGeneroEnum.macho,
            },
            {
                label: "Fêmea",
                value: AdocaoGeneroEnum.femea,
            },
        ],
    },
    {
        filtro: {
            label: "Idade",
            value: AdocaoFiltrosEnum.idade,
        },
        opcoes: [
            {
                label: "Filhote",
                value: AdocaoIdadeEnum.filhote,
            },
            {
                label: "Até 1 ano",
                value: AdocaoIdadeEnum.ate1Ano,
            },
            {
                label: "Adulto",
                value: AdocaoIdadeEnum.adulto,
            },
            {
                label: "Idoso",
                value: AdocaoIdadeEnum.idoso,
            },
        ],
    },
    {
        filtro: {
            label: "Porte",
            value: AdocaoFiltrosEnum.porte,
        },
        opcoes: [
            {
                label: "Mini",
                value: AdocaoPorteEnum.mini,
            },
            {
                label: "Pequeno Porte",
                value: AdocaoPorteEnum.pequenoPorte,
            },
            {
                label: "Médio Porte",
                value: AdocaoPorteEnum.medioPorte,
            },
            {
                label: "Grande Porte",
                value: AdocaoPorteEnum.grandePorte,
            },
        ],
    },
];

export const estadoInicialFiltrosAdocao = {
    genero: [],
    idade: [],
    porte: [],
};
