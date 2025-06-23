import { DogAgeEnum, DogGenderEnum, DogSizeEnum } from "@/services/api/modules/dogs/types";

export const getFilterOptionsDogGender = () => {
    return [
        { value: "", label: "Todos" },
        { value: DogGenderEnum.macho, label: "Macho" },
        { value: DogGenderEnum.femea, label: "Fêmea" },
    ];
};

export const getFilterOptionsDogAge = () => {
    return [
        { value: "", label: "Todos" },
        { value: DogAgeEnum.filhote, label: "Filhote" },
        { value: DogAgeEnum.jovem, label: "Jovem" },
        { value: DogAgeEnum.adulto, label: "Adulto" },
        { value: DogAgeEnum.idoso, label: "Idoso" },
    ];
};

export const getFilterOptionsDogSize = () => {
    return [
        { value: "", label: "Todos" },
        { value: DogSizeEnum.mini, label: "Pequeno" },
        { value: DogSizeEnum.pequeno, label: "Pequeno Porte" },
        { value: DogSizeEnum.medio, label: "Médio Porte" },
        { value: DogSizeEnum.grande, label: "Grande Porte" },
    ];
};
