import { PartnerCategoryEnum } from "@/services/api/modules/partners/types";

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
    imagem?: FileList; // TODO: CHANGE THIS
}
