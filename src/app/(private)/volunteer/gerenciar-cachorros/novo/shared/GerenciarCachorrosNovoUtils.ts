import { LIMITE_TAMANHO_MENSAGEM, MENSAGENS_ERRO } from "@/components/Form/FormConsts";
import { GeneralFormsType, InputFormEnum } from "@/components/Form/FormTypes";
import { AdocaoGeneroEnum, AdocaoIdadeEnum, AdocaoPorteEnum } from "@/interfaces/adocaoInterfaces";

import * as yup from "yup";
import { IDogForm } from "./GerenciarCachorrosNovoTypes";

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
            .oneOf(Object.values(AdocaoGeneroEnum), "Selecione um gênero válido")
            .required(MENSAGENS_ERRO().campoObrigatorio),
        idade: yup
            .string()
            .oneOf(Object.values(AdocaoIdadeEnum), "Selecione uma idade válida")
            .required(MENSAGENS_ERRO().campoObrigatorio),
        porte: yup
            .string()
            .oneOf(Object.values(AdocaoPorteEnum), "Selecione um porte válido")
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
            .oneOf(["adocao", "finais-felizes"], "Selecione uma opção válida")
            .required(MENSAGENS_ERRO().campoObrigatorio),
        possuiAlgumaInaptidao: yup
            .string()
            .oneOf(["true", "false"], "Selecione uma opção válida")
            .required(MENSAGENS_ERRO().campoObrigatorio),
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
                            value: "adocao",
                        },
                        {
                            key: "finais-felizes",
                            label: "Finais Felizes",
                            value: "finais-felizes",
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
                            value: AdocaoGeneroEnum.macho,
                        },
                        {
                            key: "femea",
                            label: "Fêmea",
                            value: AdocaoGeneroEnum.femea,
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
                            value: AdocaoIdadeEnum.filhote,
                        },
                        {
                            key: "ate1Ano",
                            label: "Até 1 ano",
                            value: AdocaoIdadeEnum.ate1Ano,
                        },
                        {
                            key: "adulto",
                            label: "Adulto",
                            value: AdocaoIdadeEnum.adulto,
                        },
                        {
                            key: "idoso",
                            label: "Idoso",
                            value: AdocaoIdadeEnum.idoso,
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
                            value: AdocaoPorteEnum.mini,
                        },
                        {
                            key: "pequenoPorte",
                            label: "Pequeno Porte",
                            value: AdocaoPorteEnum.pequenoPorte,
                        },
                        {
                            key: "medioPorte",
                            label: "Médio Porte",
                            value: AdocaoPorteEnum.medioPorte,
                        },
                        {
                            key: "grandePorte",
                            label: "Grande Porte",
                            value: AdocaoPorteEnum.grandePorte,
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
                        filesQuantityLimit: 5,
                        filesSizeLimit: 1024 * 1000,
                        supportedExtensions: ["image/png", "image/jpeg", "image/jpg"],
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
