import { LIMITE_TAMANHO_MENSAGEM, MENSAGENS_ERRO } from "@/components/Form/FormConsts";
import { GeneralFormsType, InputFormEnum } from "@/components/Form/FormTypes";
import * as yup from "yup";
import { IPartnerForm } from "./GerenciarParceirosNovoTypes";
import {
    CreatePartnerDto,
    PartnerCategoryEnum,
    PartnetSocialMediaEnum,
    SocialMedia,
    UpdatePartnetDto,
} from "@/services/api/modules/partners/types";
import { IPartnerUI } from "@/interfaces/parceirosInterfaces";
import { AzureBlobStorageContainerNames } from "@/services/azure-blob/azure-blob";

export const schema = yup
    .object({
        nome: yup.string().required("Nome é obrigatório"),
        endereco: yup
            .string()
            .max(
                LIMITE_TAMANHO_MENSAGEM.grande,
                MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.grande).tamanhoMaximo
            )
            .required("Endereço é obrigatório"),
        contato: yup
            .string()
            .max(
                LIMITE_TAMANHO_MENSAGEM.medio,
                MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.grande).tamanhoMaximo
            )
            .required("Contato é obrigatório"),
        descricao: yup
            .string()
            .max(
                LIMITE_TAMANHO_MENSAGEM.grande,
                MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.grande).tamanhoMaximo
            )
            .optional(),
        categoria: yup
            .string()
            .oneOf(Object.values(PartnerCategoryEnum), "Selecione uma categoria válida")
            .required(MENSAGENS_ERRO().campoObrigatorio),
        instagram: yup.string().url("Formato de URL inválido").optional(),
        facebook: yup.string().url("Formato de URL inválido").optional(),
        website: yup.string().url("Formato de URL inválido").optional(),
        imagem: yup
            .mixed<FileList>()
            .test(
                "imagem",
                MENSAGENS_ERRO().campoObrigatorio,
                (files: FileList | undefined) => (files?.length ?? 0) > 0
            )
            .required(MENSAGENS_ERRO().campoObrigatorio),
    })
    .required();

// Form fields configuration
export const getFormConfig = (): GeneralFormsType<IPartnerForm>[] => [
    {
        section: {
            leftSide: [
                {
                    key: "nome",
                    label: "Nome do Parceiro",
                    type: InputFormEnum.text,
                    placeholder: "Nome do parceiro",
                },
            ],
            rightSide: [
                {
                    key: "categoria",
                    label: "Categoria",
                    type: InputFormEnum.radio,
                    options: [
                        {
                            key: PartnerCategoryEnum.petShop,
                            value: PartnerCategoryEnum.petShop,
                            label: "Pet Shop",
                        },
                        {
                            key: PartnerCategoryEnum.veterinary,
                            value: PartnerCategoryEnum.veterinary,
                            label: "Veterinário",
                        },
                        {
                            key: PartnerCategoryEnum.clothing,
                            value: PartnerCategoryEnum.clothing,
                            label: "Loja de Roupas",
                        },
                        {
                            key: PartnerCategoryEnum.vehicleProtection,
                            value: PartnerCategoryEnum.vehicleProtection,
                            label: "Proteção Veicular",
                        },
                    ],
                },
            ],
        },
    },
    {
        section: {
            leftSide: [
                {
                    key: "endereco",
                    label: "Endereço",
                    type: InputFormEnum.text,
                    placeholder: "Endereço completo",
                },
            ],
            rightSide: [
                {
                    key: "contato",
                    label: "Contato",
                    type: InputFormEnum.text,
                    placeholder: "Telefone",
                },
            ],
        },
    },
    {
        section: {
            leftSide: [
                {
                    key: "descricao",
                    label: "Descrição",
                    type: InputFormEnum.text,
                    placeholder: "Descrição do parceiro",
                },
            ],
            rightSide: [],
        },
    },
    {
        section: {
            leftSide: [
                {
                    key: "instagram",
                    label: "Instagram",
                    type: InputFormEnum.text,
                    placeholder: "URL do Instagram",
                },
                {
                    key: "facebook",
                    label: "Facebook",
                    type: InputFormEnum.text,
                    placeholder: "URL do Facebook",
                },
                {
                    key: "website",
                    label: "Website",
                    type: InputFormEnum.text,
                    placeholder: "URL do website",
                },
            ],
            rightSide: [],
        },
    },
    {
        section: {
            leftSide: [
                {
                    key: "imagem",
                    label: "Imagem do Parceiro",
                    type: InputFormEnum.singleFile,
                    fileSettings: {
                        supportedExtensions: ["image/jpeg", "image/png", "image/jpg"],
                        filesQuantityLimit: 1,
                        filesSizeLimit: 5 * 1024 * 1024, // 5MB
                        domainContainerName: AzureBlobStorageContainerNames.PARTNERS,
                    },
                },
            ],
            rightSide: [],
        },
    },
];

export function mapPayloadCreateData(partner: IPartnerForm, fileName: string): CreatePartnerDto {
    return {
        name: partner.nome,
        address: partner.endereco,
        phone: partner.contato,
        category: partner.categoria,
        description: partner.descricao,
        imageSrc: fileName,
        socialMedia: [
            partner.instagram
                ? {
                      urlLink: partner.instagram ?? "",
                      socialMedia: PartnetSocialMediaEnum.instagram,
                  }
                : undefined,
            partner.facebook
                ? {
                      urlLink: partner.facebook ?? "",
                      socialMedia: PartnetSocialMediaEnum.facebook,
                  }
                : undefined,
            partner.website
                ? {
                      urlLink: partner.website ?? "",
                      socialMedia: PartnetSocialMediaEnum.website,
                  }
                : undefined,
        ].filter(Boolean) as SocialMedia[],
    };
}

export function mapPayloadUpdateData(
    partner: IPartnerForm,
    partnerToEdit: IPartnerUI | null,
    imageName: string
): UpdatePartnetDto {
    return {
        name: partnerToEdit?.nome === partner.nome ? undefined : partner.nome,
        address: partnerToEdit?.endereco === partner.endereco ? undefined : partner.endereco,
        phone: partnerToEdit?.contato === partner.contato ? undefined : partner.contato,
        category: partnerToEdit?.categoria === partner.categoria ? undefined : partner.categoria,
        description: partnerToEdit?.descricao === partner.descricao ? undefined : partner.descricao,
        imageSrc: partnerToEdit?.imagemSrc === partner.imagem.item(0)?.name ? undefined : imageName,
        socialMedia: [
            partner.instagram
                ? {
                      id: partnerToEdit?.redesSociais?.find(
                          (sm) => sm.socialMedia === PartnetSocialMediaEnum.instagram
                      )?.id,
                      urlLink: partner.instagram ?? "",
                      socialMedia: PartnetSocialMediaEnum.instagram,
                  }
                : undefined,
            partner.facebook
                ? {
                      id: partnerToEdit?.redesSociais?.find(
                          (sm) => sm.socialMedia === PartnetSocialMediaEnum.facebook
                      )?.id,
                      urlLink: partner.facebook ?? "",
                      socialMedia: PartnetSocialMediaEnum.facebook,
                  }
                : undefined,
            partner.website
                ? {
                      id: partnerToEdit?.redesSociais?.find(
                          (sm) => sm.socialMedia === PartnetSocialMediaEnum.website
                      )?.id,
                      urlLink: partner.website ?? "",
                      socialMedia: PartnetSocialMediaEnum.website,
                  }
                : undefined,
        ].filter(Boolean) as SocialMedia[],
    };
}
