import { LIMITE_TAMANHO_MENSAGEM, MENSAGENS_ERRO } from "@/components/Form/FormConsts";
import { GeneralFormsType, InputFormEnum } from "@/components/Form/FormTypes";

import * as yup from "yup";
import { IDogForm } from "./GerenciarCachorrosNovoTypes";
import {
    CreateDogDto,
    DogAgeEnum,
    DogAsset,
    DogGenderEnum,
    DogSizeEnum,
    DogStatusEnum,
    UpdateDogDto,
} from "@/services/api/modules/dogs/types";
import { AzureBlobStorageContainerNames } from "@/services/azure-blob/azure-blob";
import { IDogUI, Img } from "@/interfaces/dogInterfaces";

export const schema = yup
    .object({
        nomeExibicao: yup
            .string()
            .max(
                LIMITE_TAMANHO_MENSAGEM.medio,
                MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.medio).tamanhoMaximo
            )
            .required(MENSAGENS_ERRO().campoObrigatorio),
        genero: yup
            .string()
            .oneOf(Object.values(DogGenderEnum), "Selecione um gênero válido")
            .required(MENSAGENS_ERRO().campoObrigatorio),
        idade: yup
            .string()
            .oneOf(Object.values(DogAgeEnum), "Selecione uma idade válida")
            .required(MENSAGENS_ERRO().campoObrigatorio),
        porte: yup
            .string()
            .oneOf(Object.values(DogSizeEnum), "Selecione um porte válido")
            .required(MENSAGENS_ERRO().campoObrigatorio),
        descricao: yup
            .string()
            .max(
                LIMITE_TAMANHO_MENSAGEM.grande,
                MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.grande).tamanhoMaximo
            )
            .required(MENSAGENS_ERRO().campoObrigatorio),
        status: yup
            .string()
            .oneOf(Object.values(DogStatusEnum), "Selecione uma opção válida")
            .required(MENSAGENS_ERRO().campoObrigatorio),
        possuiAlgumaInaptidao: yup
            .string()
            .oneOf(["true", "false"], "Selecione uma opção válida")
            .required(MENSAGENS_ERRO().campoObrigatorio),
        inaptidaoDescricao: yup.string().when("possuiAlgumaInaptidao", {
            is: "true",
            then: () =>
                yup
                    .string()
                    .max(
                        LIMITE_TAMANHO_MENSAGEM.grande,
                        MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.grande).tamanhoMaximo
                    )
                    .required(MENSAGENS_ERRO().campoObrigatorio + " (caso possua inaptidão)"),
            otherwise: () => yup.string().optional(),
        }),
        // Images
        imagensPrincipais: yup
            .mixed<FileList>()
            .test(
                "imagensPrincipais",
                MENSAGENS_ERRO().campoObrigatorio,
                (files: FileList | undefined) => (files?.length ?? 0) > 0
            )
            .required(MENSAGENS_ERRO().campoObrigatorio),
        // Advanced fields (conditional validation based on showExtendedFields)
        descricaoLonga: yup.string().when("$showExtendedFields", {
            is: true,
            then: () =>
                yup
                    .string()
                    .max(
                        LIMITE_TAMANHO_MENSAGEM.grande,
                        MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.grande).tamanhoMaximo
                    )
                    .required(MENSAGENS_ERRO().campoObrigatorio),
            otherwise: () => yup.string().optional(),
        }),
        localAcolhimento: yup.string().when("$showExtendedFields", {
            is: true,
            then: () =>
                yup
                    .string()
                    .max(
                        LIMITE_TAMANHO_MENSAGEM.medio,
                        MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.medio).tamanhoMaximo
                    )
                    .required(MENSAGENS_ERRO().campoObrigatorio),
            otherwise: () => yup.string().optional(),
        }),
        tratamentosRealizados: yup.string().when("$showExtendedFields", {
            is: true,
            then: () =>
                yup
                    .string()
                    .max(
                        LIMITE_TAMANHO_MENSAGEM.grande,
                        MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.grande).tamanhoMaximo
                    )
                    .required(MENSAGENS_ERRO().campoObrigatorio),
            otherwise: () => yup.string().optional(),
        }),
        youtubeSrcUrlAntes: yup.string().url("Digite uma URL válida").optional(),
        youtubeSrcUrlDepois: yup.string().url("Digite uma URL válida").optional(),
        imagensAntes: yup.mixed<FileList>().optional(),
        imagensDepois: yup.mixed<FileList>().optional(),
    })
    .required();

export const getBaseFormConfig = (): GeneralFormsType<IDogForm>[] => [
    {
        section: {
            leftSide: [
                {
                    key: "nomeExibicao",
                    label: "Nome do Cachorro",
                    placeholder: "Ex: Thor",
                    type: InputFormEnum.text,
                },
                {
                    key: "status",
                    label: "Status",
                    type: InputFormEnum.radio,
                    options: [
                        {
                            key: "adocao",
                            label: "Adoção",
                            value: DogStatusEnum.aguardando_adocao,
                        },
                        {
                            key: "finais-felizes",
                            label: "Finais Felizes",
                            value: DogStatusEnum.adotado,
                        },
                    ],
                },
            ],
            rightSide: [
                {
                    key: "genero",
                    label: "Sexo",
                    type: InputFormEnum.radio,
                    options: [
                        {
                            key: "macho",
                            label: "Macho",
                            value: DogGenderEnum.macho,
                        },
                        {
                            key: "femea",
                            label: "Fêmea",
                            value: DogGenderEnum.femea,
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
                    key: "idade",
                    label: "Idade",
                    type: InputFormEnum.radio,
                    options: [
                        {
                            key: "filhote",
                            label: "Filhote",
                            value: DogAgeEnum.filhote,
                        },
                        {
                            key: "ate1Ano",
                            label: "Até 1 ano",
                            value: DogAgeEnum.jovem,
                        },
                        {
                            key: "adulto",
                            label: "Adulto",
                            value: DogAgeEnum.adulto,
                        },
                        {
                            key: "idoso",
                            label: "Idoso",
                            value: DogAgeEnum.idoso,
                        },
                    ],
                },
            ],
            rightSide: [
                {
                    key: "porte",
                    label: "Porte",
                    type: InputFormEnum.radio,
                    options: [
                        {
                            key: "mini",
                            label: "Mini",
                            value: DogSizeEnum.mini,
                        },
                        {
                            key: "pequenoPorte",
                            label: "Pequeno Porte",
                            value: DogSizeEnum.pequeno,
                        },
                        {
                            key: "medioPorte",
                            label: "Médio Porte",
                            value: DogSizeEnum.medio,
                        },
                        {
                            key: "grandePorte",
                            label: "Grande Porte",
                            value: DogSizeEnum.grande,
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
                    key: "descricao",
                    label: "Descrição Curta",
                    placeholder: "Uma breve descrição do cachorro para exibição nos cards",
                    type: InputFormEnum.textarea,
                },
            ],
            rightSide: [
                {
                    key: "possuiAlgumaInaptidao",
                    label: "Possui alguma inaptidão?",
                    type: InputFormEnum.radio,
                    options: [
                        {
                            key: "possui",
                            label: "Sim",
                            value: "true",
                        },
                        {
                            key: "naoPossui",
                            label: "Não",
                            value: "false",
                        },
                    ],
                },
                {
                    key: "inaptidaoDescricao",
                    label: "Detalhes da inaptidão",
                    type: InputFormEnum.textarea,
                    placeholder: "Ex: Cega de um olho, surda, etc.",
                },
            ],
        },
    },
    {
        section: {
            leftSide: [
                {
                    key: "imagensPrincipais",
                    label: "Fotos Principais",
                    type: InputFormEnum.multipleFiles,
                    fileSettings: {
                        isMultiple: true,
                        filesQuantityLimit: 3,
                        filesSizeLimit: 1024 * 1000,
                        supportedExtensions: ["image/png", "image/jpeg", "image/jpg"],
                        domainContainerName: AzureBlobStorageContainerNames.DOGS,
                    },
                },
            ],
            rightSide: [],
        },
    },
];

export const getExtendedFormConfig = (): GeneralFormsType<IDogForm>[] => [
    {
        section: {
            leftSide: [
                {
                    key: "descricaoLonga",
                    label: "Descrição Longa",
                    placeholder: "Descrição detalhada do cachorro para a página individual",
                    type: InputFormEnum.textarea,
                },
            ],
            rightSide: [],
        },
    },
    {
        section: {
            leftSide: [
                {
                    key: "localAcolhimento",
                    label: "Local de Acolhimento",
                    placeholder: "Ex: Lar temporário em Betim",
                    type: InputFormEnum.text,
                },
            ],
            rightSide: [
                {
                    key: "tratamentosRealizados",
                    label: "Tratamentos Realizados",
                    placeholder: "Ex: Castração, vacinação e vermifugação",
                    type: InputFormEnum.textarea,
                },
            ],
        },
    },
    {
        section: {
            leftSide: [
                {
                    key: "imagensAntes",
                    label: "Fotos de Antes",
                    type: InputFormEnum.multipleFiles,
                    fileSettings: {
                        isMultiple: true,
                        filesQuantityLimit: 3,
                        filesSizeLimit: 1024 * 1000,
                        supportedExtensions: ["image/png", "image/jpeg", "image/jpg"],
                        domainContainerName: AzureBlobStorageContainerNames.DOGS,
                    },
                },
            ],
            rightSide: [
                {
                    key: "imagensDepois",
                    label: "Fotos de Depois",
                    type: InputFormEnum.multipleFiles,
                    fileSettings: {
                        isMultiple: true,
                        filesQuantityLimit: 3,
                        filesSizeLimit: 1024 * 1000,
                        supportedExtensions: ["image/png", "image/jpeg", "image/jpg"],
                        domainContainerName: AzureBlobStorageContainerNames.DOGS,
                    },
                },
            ],
        },
    },
    {
        section: {
            leftSide: [
                {
                    key: "youtubeSrcUrlAntes",
                    label: "URL do Vídeo de Antes (YouTube)",
                    placeholder: "https://www.youtube.com/embed/...",
                    type: InputFormEnum.text,
                },
            ],
            rightSide: [
                {
                    key: "youtubeSrcUrlDepois",
                    label: "URL do Vídeo de Depois (YouTube)",
                    placeholder: "https://www.youtube.com/embed/...",
                    type: InputFormEnum.text,
                },
            ],
        },
    },
];

export function mapPayloadUpdateDog(
    dogToEdit: IDogUI | null,
    data: IDogForm,
    images: Img[],
    userId?: string
): UpdateDogDto {
    return {
        name: dogToEdit?.nomeExibicao === data.nomeExibicao ? undefined : data.nomeExibicao,
        dogStatus: dogToEdit?.status === data.status ? undefined : data.status,
        gender: dogToEdit?.genero === data.genero ? undefined : data.genero,
        age: dogToEdit?.idade === data.idade ? undefined : data.idade,
        size: dogToEdit?.porte === data.porte ? undefined : data.porte,
        description: dogToEdit?.descricao === data.descricao ? undefined : data.descricao,
        needsSpecialCare:
            dogToEdit?.possuiAlgumaInaptidao === (data.possuiAlgumaInaptidao === "true")
                ? undefined
                : data.possuiAlgumaInaptidao === "true",
        specialCareDescription:
            data.possuiAlgumaInaptidao === "true"
                ? dogToEdit?.inaptidaoDescricao === data.inaptidaoDescricao
                    ? undefined
                    : data.inaptidaoDescricao
                : undefined,
        happyEndingDescription:
            dogToEdit?.descricaoHappyEnding === data.descricaoLonga
                ? undefined
                : data.descricaoLonga,
        shelterLocation:
            dogToEdit?.localAcolhimento === data.localAcolhimento
                ? undefined
                : data.localAcolhimento,
        treatmentsPerformed:
            dogToEdit?.tratamentosRealizados === data.tratamentosRealizados
                ? undefined
                : data.tratamentosRealizados,
        updatedById: userId,
        assets: [
            ...(images?.map((img: Img) => ({
                urlLink: img.src,
                assetType: img.type === "common" ? "none" : img.type,
                sourceType: "image",
            })) ?? []),
            !data.youtubeSrcUrlAntes
                ? undefined
                : {
                      urlLink: data.youtubeSrcUrlAntes,
                      sourceType: "video",
                      assetType: "before",
                  },
            !data.youtubeSrcUrlDepois
                ? undefined
                : {
                      urlLink: data.youtubeSrcUrlDepois,
                      assetType: "after",
                      sourceType: "video",
                  },
        ].filter(Boolean) as DogAsset[],
        happyEndingDate:
            data.status === DogStatusEnum.adotado ? new Date().toISOString() : undefined,
    };
}

export function mapPayloadCreateDogData(
    dog: IDogForm,
    images: Img[],
    userId: string
): CreateDogDto {
    const needsSpecialCare = dog.possuiAlgumaInaptidao === "true";
    return {
        name: dog.nomeExibicao,
        dogStatus: dog.status,
        gender: dog.genero,
        age: dog.idade,
        size: dog.porte,
        description: dog.descricao,
        needsSpecialCare,
        specialCareDescription: needsSpecialCare ? dog.inaptidaoDescricao : undefined,
        createdById: userId,
        updatedById: userId,
        happyEndingDescription: dog.descricaoLonga,
        happyEndingDate:
            dog.status === DogStatusEnum.adotado ? new Date().toISOString() : undefined,
        shelterLocation: dog.localAcolhimento,
        treatmentsPerformed: dog.tratamentosRealizados,
        assets: [
            ...(images?.map((img: Img) => ({
                urlLink: img.src,
                assetType: img.type === "common" ? "none" : img.type,
                sourceType: "image",
            })) ?? []),
            !dog.youtubeSrcUrlAntes
                ? undefined
                : {
                      urlLink: dog.youtubeSrcUrlAntes,
                      sourceType: "video",
                      assetType: "before",
                  },
            !dog.youtubeSrcUrlDepois
                ? undefined
                : {
                      urlLink: dog.youtubeSrcUrlDepois,
                      assetType: "after",
                      sourceType: "video",
                  },
        ].filter(Boolean) as DogAsset[],
    };
}
