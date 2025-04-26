export interface IParceiros {
    id: string;
    nome: string;
    endereco: string;
    imagemSrc: string;
    contato: string;
    descricao?: string;
    linkURL?: string;
    categoria: PartnerCategoryEnum;
    redesSociais?: {
        instagram?: string;
        facebook?: string;
        site?: string;
    };
}

export enum PartnerCategoryEnum {
    veteriary = "Veterinário",
    petShop = "Pet Shop",
    clothing = "Vestuário",
    vehicleProtection = "Proteção Veicular",
}
