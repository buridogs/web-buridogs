import { PartnerCategoryEnum } from "@/interfaces/parceirosInterfaces";

// Define partner form interface
export interface IPartnerForm {
    nome: string;
    endereco: string;
    contato: string;
    descricao?: string;
    categoria: PartnerCategoryEnum;
    instagram?: string;
    facebook?: string;
    website?: string;
    imagem: FileList;
}
