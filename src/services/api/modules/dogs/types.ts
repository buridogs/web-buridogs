export interface IDog {
    id: string;
    name: string;
    gender: DogGender;
    size: DogSize;
    age: DogAge;
    dogStatus: DogStatus;
    description: string;
    needsSpecialCare: boolean;
    specialCareDescription?: string;
    happyEndingDescription?: string;
    happyEndingDate?: string;
    shelterLocation?: string;
    treatmentsPerformed?: string;
    assets: DogAsset[];
    createdAt: string;
    updatedAt: string;
    createdById: string;
    updatedById: string;
}

export type CreateDogDto = Omit<IDog, "id" | "createdAt" | "updatedAt">;

export type UpdateDogDto = Partial<Omit<IDog, "id" | "createdAt" | "updatedAt">>;

export enum DogGenderEnum {
    macho = "male",
    femea = "female",
}

export enum DogSizeEnum {
    mini = "mini",
    pequeno = "small",
    medio = "medium",
    grande = "large",
}

export enum DogAgeEnum {
    filhote = "puppy",
    jovem = "young",
    adulto = "adult",
    idoso = "senior",
}

export enum DogStatusEnum {
    aguardando_adocao = "waiting_for_adoption",
    adotado = "adopted",
}

export type DogGender = DogGenderEnum.macho | DogGenderEnum.femea;

export type DogSize =
    | DogSizeEnum.mini
    | DogSizeEnum.pequeno
    | DogSizeEnum.medio
    | DogSizeEnum.grande;

export type DogAge = DogAgeEnum.filhote | DogAgeEnum.jovem | DogAgeEnum.adulto | DogAgeEnum.idoso;

export type DogStatus = DogStatusEnum.aguardando_adocao | DogStatusEnum.adotado;

type DogAsset = {
    id: string;
    urlLink: string;
    sourceType: "image" | "video";
    assetType: "before" | "after" | "none";
};
