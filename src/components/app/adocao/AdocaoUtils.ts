import { AdocaoFiltrosEnum } from "@/interfaces/adocaoInterfaces";
import { DogAgeEnum, DogGenderEnum, DogSizeEnum } from "@/services/api/modules/dogs/types";
import { FiltroOptionsType } from "@/utils/types";

export const SLUG_CHARACTER_SEPARATOR = "__";

export const filtrosAdocao: FiltroOptionsType<
    AdocaoFiltrosEnum | DogGenderEnum | DogAgeEnum | DogSizeEnum
>[] = [
    {
        filtro: {
            label: "Gênero",
            value: AdocaoFiltrosEnum.genero,
        },
        opcoes: [
            {
                label: "Macho",
                value: DogGenderEnum.macho,
            },
            {
                label: "Fêmea",
                value: DogGenderEnum.femea,
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
                value: DogAgeEnum.filhote,
            },
            {
                label: "Até 1 ano",
                value: DogAgeEnum.jovem,
            },
            {
                label: "Adulto",
                value: DogAgeEnum.adulto,
            },
            {
                label: "Idoso",
                value: DogAgeEnum.idoso,
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
                value: DogSizeEnum.mini,
            },
            {
                label: "Pequeno Porte",
                value: DogSizeEnum.pequeno,
            },
            {
                label: "Médio Porte",
                value: DogSizeEnum.medio,
            },
            {
                label: "Grande Porte",
                value: DogSizeEnum.grande,
            },
        ],
    },
];

export const estadoInicialFiltrosAdocao = {
    [AdocaoFiltrosEnum.genero]: [],
    [AdocaoFiltrosEnum.idade]: [],
    [AdocaoFiltrosEnum.porte]: [],
};
