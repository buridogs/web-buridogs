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

export function returnFormattedOptionLabel(category: string, option: string) {
    if (category === AdocaoFiltrosEnum.genero) {
        switch (option) {
            case AdocaoGeneroEnum.macho:
                return "Macho";
            case AdocaoGeneroEnum.femea:
                return "Fêmea";
            default:
                return "Fêmea";
        }
    } else if (category === AdocaoFiltrosEnum.idade) {
        switch (option) {
            case AdocaoIdadeEnum.filhote:
                return "Filhote";
            case AdocaoIdadeEnum.ate1Ano:
                return "Até 1 ano";
            case AdocaoIdadeEnum.adulto:
                return "Adulto";
            case AdocaoIdadeEnum.idoso:
                return "Idoso";
            default:
                return "Filhote";
        }
    } else if (category === AdocaoFiltrosEnum.porte) {
        switch (option) {
            case AdocaoPorteEnum.mini:
                return "Mini";
            case AdocaoPorteEnum.pequenoPorte:
                return "Pequeno Porte";
            case AdocaoPorteEnum.medioPorte:
                return "Médio Porte";
            case AdocaoPorteEnum.grandePorte:
                return "Grande Porte";
            default:
                return "Mini";
        }
    }
}
