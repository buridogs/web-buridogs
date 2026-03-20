import { PartnerCategoryEnum } from "@/services/api/modules/partners/types";

export interface IPartnerUI {
    id: string;
    nome: string;
    endereco: string;
    imagemSrc: string;
    contato: string;
    descricao?: string;
    linkURL?: string;
    categoria: PartnerCategoryEnum;
    redesSociais?: SocialMediaUI[];
}

export type SocialMediaUI = {
    id?: string;
    socialMedia: string;
    urlLink: string;
};
