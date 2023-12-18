import {
    AdocaoFiltrosEnum,
    AdocaoGeneroEnum,
    AdocaoIdadeEnum,
    AdocaoPorteEnum,
} from "@/interfaces/adocaoInterfaces";
import { BLOGO_STORAGE_URL_LINK } from "@/services/storage";

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

export function generateImgURL(imgSrc: string) {
    if (process.env.NODE_ENV === "development") {
        return `/${imgSrc}`;
    }

    return `${BLOGO_STORAGE_URL_LINK}/${imgSrc}`;
}

export function formatDatetimePTBR(dateValue: string) {
    return Intl.DateTimeFormat("pt-BR").format(new Date(dateValue));
}
