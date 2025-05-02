export interface IPartner {
    id: string;
    name: string;
    address: string;
    phone?: string;
    category: PartnerCategoryEnum;
    description?: string;
    imageSrc?: string;
    socialMedia?: SocialMedia[];
    createdAt: string;
    updatedAt: string;
}

export type SocialMedia = {
    id?: string;
    socialMedia: PartnetSocialMediaEnum;
    urlLink: string;
};

export type CreatePartnerDto = Omit<IPartner, "id" | "createdAt" | "updatedAt">;

export type UpdatePartnetDto = Partial<Omit<IPartner, "id" | "createdAt" | "updatedAt">>;

export enum PartnerCategoryEnum {
    veterinary = "veterinarian",
    petShop = "pet_store",
    clothing = "clothing",
    vehicleProtection = "carProtection",
}

export enum PartnetSocialMediaEnum {
    facebook = "facebook",
    instagram = "instagram",
    website = "website",
}

export type PartnerCategory =
    | PartnerCategoryEnum.veterinary
    | PartnerCategoryEnum.petShop
    | PartnerCategoryEnum.clothing
    | PartnerCategoryEnum.vehicleProtection;
export type PartnerSocialMedia =
    | PartnetSocialMediaEnum.facebook
    | PartnetSocialMediaEnum.instagram
    | PartnetSocialMediaEnum.website;
