import { AdocaoFiltrosEnum } from "@/interfaces/adocaoInterfaces";
import { DogAgeEnum, DogGenderEnum, DogSizeEnum } from "@/services/api/modules/dogs/types";
import { BLOGO_STORAGE_URL_LINK } from "@/services/storage";

export function returnFormattedOptionLabel(category: string, option: string) {
    if (category === AdocaoFiltrosEnum.genero) {
        switch (option) {
            case DogGenderEnum.macho:
                return "Macho";
            case DogGenderEnum.femea:
                return "Fêmea";
            default:
                return "Fêmea";
        }
    } else if (category === AdocaoFiltrosEnum.idade) {
        switch (option) {
            case DogAgeEnum.filhote:
                return "Filhote";
            case DogAgeEnum.jovem:
                return "Até 1 ano";
            case DogAgeEnum.adulto:
                return "Adulto";
            case DogAgeEnum.idoso:
                return "Idoso";
            default:
                return "Filhote";
        }
    } else if (category === AdocaoFiltrosEnum.porte) {
        switch (option) {
            case DogSizeEnum.mini:
                return "Mini";
            case DogSizeEnum.pequeno:
                return "Pequeno Porte";
            case DogSizeEnum.medio:
                return "Médio Porte";
            case DogSizeEnum.grande:
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
    return Intl.DateTimeFormat("pt-BR", {
        dateStyle: "full",
        timeStyle: "long",
    }).format(new Date(dateValue));
}
