import { LIMITE_TAMANHO_MENSAGEM, MENSAGENS_ERRO } from "@/components/Form/FormConsts";
import { FieldFormsType, GeneralFormsType, InputFormEnum } from "@/components/Form/FormTypes";
import * as yup from "yup";
import { IApadrinhamentoForm } from "./ApadrinhamentoTypes";
import { FiltroOptionsType } from "@/utils/types";
import {
    ApadrinhamentoEscolherOpcaoEnum,
    ApadrinhamentoFiltrosEnum,
    ApadrinhamentoOpcoesEnum,
} from "@/interfaces/apadrinhamentoInterfaces";

export const filtrosApadrinhamento: FiltroOptionsType<
    ApadrinhamentoFiltrosEnum | ApadrinhamentoOpcoesEnum | ApadrinhamentoEscolherOpcaoEnum
>[] = [
    {
        filtro: {
            label: "Apadrinhar com",
            value: ApadrinhamentoFiltrosEnum.apadrinhar_com,
        },
        opcoes: [
            {
                label: "Dinheiro",
                value: ApadrinhamentoOpcoesEnum.dinheiro,
            },
            {
                label: "Ração",
                value: ApadrinhamentoOpcoesEnum.racao,
            },
            {
                label: "Lar Temporário",
                value: ApadrinhamentoOpcoesEnum.lar_temporario,
            },
        ],
    },
    {
        filtro: {
            label: "Escolher quem apadrinhar",
            value: ApadrinhamentoFiltrosEnum.escolher_quem_apadrinhar,
        },
        opcoes: [
            {
                label: "Sim, quero escolher um animal para ajudar",
                value: ApadrinhamentoEscolherOpcaoEnum.sim,
            },
            {
                label: "Não, quero ajudar quem estiver precisando",
                value: ApadrinhamentoEscolherOpcaoEnum.nao,
            },
        ],
    },
];

export const estadoInicialFiltrosApadrinhamento = {
    ["apadrinhar-com"]: [],
    ["escolher-quem-apadrinhar"]: [],
};

export const APADRINHAMENTO_FORMS_CONFIG: GeneralFormsType<IApadrinhamentoForm>[] = [
    {
        section: {
            leftSide: [
                {
                    key: "preferencia_contato",
                    label: "Como prefere que a gente entre em contato com você?",
                    type: InputFormEnum.checkbox,
                    options: [
                        {
                            key: "email",
                            label: "E-mail",
                            value: "email",
                        },
                        {
                            key: "whatsapp",
                            label: "Whatsapp",
                            value: "whatsapp",
                        },
                        {
                            key: "telefone",
                            label: "Telefone",
                            value: "telefone",
                        },
                    ],
                },
            ],
            rightSide: [
                {
                    key: "nome",
                    label: "Nome completo",
                    placeholder: "Exemplo: José da Silva",
                    type: InputFormEnum.text,
                },
                {
                    key: "email",
                    label: "E-mail",
                    placeholder: "Exemplo: josesilva@gmail.com",
                    type: InputFormEnum.text,
                },
                {
                    key: "contato",
                    label: "Telefone para contato",
                    placeholder: "Exemplo: 31 9 9999-8888",
                    type: InputFormEnum.text,
                },
                {
                    key: "instagram_url",
                    label: "Instagram (opcional)",
                    placeholder: "Exemplo: @usuario_instagram",
                    type: InputFormEnum.text,
                },
            ],
        },
    },
];

export const APADRINHAMENTO_FORMS_COM_NOME_ANIMAL_CONFIG: GeneralFormsType<IApadrinhamentoForm>[] =
    [
        {
            section: {
                leftSide: [...APADRINHAMENTO_FORMS_CONFIG[0].section.leftSide],
                rightSide: [
                    ...APADRINHAMENTO_FORMS_CONFIG[0].section.rightSide,
                    {
                        key: "nome_animal",
                        label: "Nome do animal que quer apadrinhar",
                        placeholder: "Exemplo: Juca",
                        type: InputFormEnum.text,
                    },
                ],
            },
        },
    ];

export const APADRINHAMENTO_CHECKBOX_FIELD: FieldFormsType<IApadrinhamentoForm> = {
    key: "quero_receber_contatos",
    label: "Aceita receber contatos e informações sobre o projeto Buridogs?",
    type: InputFormEnum.radio,
    options: [
        {
            key: "quero_receber",
            label: "Aceito",
            value: 1,
        },
        {
            key: "nao_quero_receber",
            label: "Não aceito",
            value: 0,
        },
    ],
};

export const APADRINHAMENTO_FORMS_COM_CAMPOS_COMPLEMENTARES_CONFIG: GeneralFormsType<IApadrinhamentoForm>[] =
    [
        {
            section: {
                leftSide: [...APADRINHAMENTO_FORMS_COM_NOME_ANIMAL_CONFIG[0].section.leftSide],
                rightSide: [
                    ...APADRINHAMENTO_FORMS_COM_NOME_ANIMAL_CONFIG[0].section.rightSide,
                    {
                        key: "apadrinhar_com",
                        label: "Apadrinhar com",
                        type: InputFormEnum.text,
                    },
                    {
                        key: "escolher_quem_apadrinhar",
                        label: "Quero apadrinhar algum animal específico?",
                        type: InputFormEnum.text,
                    },
                    { ...APADRINHAMENTO_CHECKBOX_FIELD },
                ],
            },
        },
    ];

// TODO: Improve logic
export const schemaApadrinhamentoForm = yup
    .object({
        nome: yup
            .string()
            .max(
                LIMITE_TAMANHO_MENSAGEM.medio,
                MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.medio).tamanhoMaximo
            )
            .required(MENSAGENS_ERRO().campoObrigatorio),
        email: yup
            .string()
            .email(MENSAGENS_ERRO().emailInvalido)
            .max(
                LIMITE_TAMANHO_MENSAGEM.medio,
                MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.medio).tamanhoMaximo
            )
            .required(MENSAGENS_ERRO().campoObrigatorio),
        contato: yup
            .string()
            .max(
                LIMITE_TAMANHO_MENSAGEM.pequeno,
                MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.pequeno).tamanhoMaximo
            )
            .required(MENSAGENS_ERRO().campoObrigatorio),
        preferencia_contato: yup
            .array()
            .of(yup.string().required(MENSAGENS_ERRO().campoObrigatorio))
            .min(1, MENSAGENS_ERRO().campoObrigatorio)
            .required(MENSAGENS_ERRO().campoObrigatorio),
        quero_receber_contatos: yup.boolean().required(MENSAGENS_ERRO().campoObrigatorio),
        apadrinhar_com: yup
            .array()
            .of(yup.string().required())
            .min(1, MENSAGENS_ERRO().campoObrigatorio)
            .required(MENSAGENS_ERRO().campoObrigatorio),
        escolher_quem_apadrinhar: yup
            .string()
            .max(
                LIMITE_TAMANHO_MENSAGEM.pequeno,
                MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.pequeno).tamanhoMaximo
            )
            .required(MENSAGENS_ERRO().campoObrigatorio),
        instagram_url: yup
            .string()
            .min(2, MENSAGENS_ERRO().campoObrigatorio)
            .max(
                LIMITE_TAMANHO_MENSAGEM.pequenoMedio,
                MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.pequenoMedio).tamanhoMaximo
            )
            .optional(),
    })
    .required();

export const schemaApadrinhamentoComAnimalForm = yup
    .object({
        nome: yup
            .string()
            .max(
                LIMITE_TAMANHO_MENSAGEM.medio,
                MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.medio).tamanhoMaximo
            )
            .required(MENSAGENS_ERRO().campoObrigatorio),
        email: yup
            .string()
            .email(MENSAGENS_ERRO().emailInvalido)
            .max(
                LIMITE_TAMANHO_MENSAGEM.medio,
                MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.medio).tamanhoMaximo
            )
            .required(MENSAGENS_ERRO().campoObrigatorio),
        contato: yup
            .string()
            .max(
                LIMITE_TAMANHO_MENSAGEM.pequeno,
                MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.pequeno).tamanhoMaximo
            )
            .required(MENSAGENS_ERRO().campoObrigatorio),
        nome_animal: yup
            .string()
            .max(
                LIMITE_TAMANHO_MENSAGEM.pequeno,
                MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.pequeno).tamanhoMaximo
            )
            .required(MENSAGENS_ERRO().campoObrigatorio),
        preferencia_contato: yup
            .array()
            .of(yup.string().required(MENSAGENS_ERRO().campoObrigatorio))
            .min(1, MENSAGENS_ERRO().campoObrigatorio)
            .required(MENSAGENS_ERRO().campoObrigatorio),
        quero_receber_contatos: yup.boolean().required(MENSAGENS_ERRO().campoObrigatorio),
        apadrinhar_com: yup
            .array()
            .of(yup.string().required())
            .min(1, MENSAGENS_ERRO().campoObrigatorio)
            .required(MENSAGENS_ERRO().campoObrigatorio),
        escolher_quem_apadrinhar: yup
            .string()
            .max(
                LIMITE_TAMANHO_MENSAGEM.pequeno,
                MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.pequeno).tamanhoMaximo
            )
            .required(MENSAGENS_ERRO().campoObrigatorio),
        instagram_url: yup
            .string()
            .min(2, MENSAGENS_ERRO().campoObrigatorio)
            .max(
                LIMITE_TAMANHO_MENSAGEM.pequenoMedio,
                MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.pequenoMedio).tamanhoMaximo
            )
            .optional(),
    })
    .required();
