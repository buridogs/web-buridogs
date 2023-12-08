import { MENSAGENS_ERRO } from "@/components/Form/FormConsts";
import { GeneralFormsType, InputFormEnum } from "@/components/Form/FormTypes";
import * as yup from "yup";

export const ADOCAO_FORMS_CONFIG: GeneralFormsType[] = [
    {
        section: [
            {
                key: "nome",
                label: "Nome responsável",
                placeholder: "Exemplo: José da Silva",
                type: InputFormEnum.text,
            },
        ],
    },
    {
        section: [
            {
                key: "endereco_cep",
                label: "CEP",
                placeholder: "Formato XX.XXX-XXX",
                type: InputFormEnum.text,
            },
            {
                key: "endereco_rua",
                label: "Logradouro",
                placeholder: "Exemplo: Avenida Mário Werneck",
                type: InputFormEnum.text,
            },
        ],
    },
    {
        section: [
            {
                key: "endereco_numero",
                label: "Número",
                placeholder: "Exemplo: 365",
                type: InputFormEnum.text,
            },
            {
                key: "endereco_complemento",
                label: "Complemento",
                placeholder: "Exemplo: Esquina",
                type: InputFormEnum.text,
            },
        ],
    },
    {
        section: [
            {
                key: "endereco_bairro",
                label: "Bairro",
                placeholder: "Exemplo: Centro",
                type: InputFormEnum.text,
            },
            {
                key: "endereco_cidade",
                label: "Cidade",
                placeholder: "Exemplo: Belo Horizonte",
                type: InputFormEnum.text,
            },
        ],
    },
    {
        section: [
            {
                key: "endereco_estado",
                label: "Estado",
                placeholder: "Exemplo: Minas Gerais",
                type: InputFormEnum.text,
            },
        ],
    },
    {
        section: [
            { key: "facebook_url", label: "Facebook Link", type: InputFormEnum.text },
            { key: "instagram_url", label: "Instagram Link", type: InputFormEnum.text },
        ],
    },
    {
        section: [
            {
                key: "primeira_adocao",
                label: "Primeira adoção?",
                type: InputFormEnum.radio,
                options: [
                    {
                        key: "primeira_adocao",
                        label: "Sim, é a primeira",
                        value: 1,
                    },
                    {
                        key: "adotou_antes",
                        label: "Já adotei antes",
                        value: 0,
                    },
                ],
            },
            {
                key: "motivo_adocao",
                label: "Motivo adoção",
                placeholder: "Exemplo: Para me fazer companhia",
                type: InputFormEnum.text,
            },
        ],
    },
    {
        section: [
            {
                key: "quantidade_pessoas_moradia",
                label: "Quantas pessoas moram?",
                placeholder: "Exemplo: 3 pessoas",
                type: InputFormEnum.text,
            },
            {
                key: "pessoas_de_acordo_adocao",
                label: "As pessoas estão de acordo?",
                type: InputFormEnum.radio,
                options: [
                    {
                        key: "de_acordo",
                        label: "De acordo",
                        value: 1,
                    },
                    {
                        key: "desacordo",
                        label: "Não sabem ou não estão de acordo",
                        value: 0,
                    },
                ],
            },
            {
                key: "ha_criancas_idosos",
                label: "Há crianças ou idosos?",
                type: InputFormEnum.checkbox,
                options: [
                    {
                        key: "criancas",
                        label: "Há crianças",
                        value: "criancas",
                    },
                    {
                        key: "idosos",
                        label: "Há idosos",
                        value: "idosos",
                    },
                ],
            },
        ],
    },
    {
        section: [
            {
                key: "mora_casa_apt",
                label: "Mora em casa ou apartamento?",
                type: InputFormEnum.radio,
                options: [
                    {
                        key: "casa",
                        label: "Moro em casa",
                        value: "Casa",
                    },
                    {
                        key: "apt",
                        label: "Moro em apartamento",
                        value: "Apartamento",
                    },
                ],
            },
            {
                key: "quantidade_pessoas_trabalham",
                label: "Quantas pessoas trabalham?",
                placeholder: "Somente eu",
                type: InputFormEnum.text,
            },
            {
                key: "moradia_tem_estrutura_adocao",
                label: "O lugar tem estrutura para acolher o animal?",
                type: InputFormEnum.radio,
                options: [
                    {
                        key: "tem_estrutura",
                        label: "Tem estrutura",
                        value: "O lugar tem estrutura",
                    },
                    {
                        key: "nao_tem_estrutura",
                        label: "Não tem estrutura",
                        value: "Não tem estrutura",
                    },
                ],
            },
        ],
    },
    {
        section: [
            {
                key: "ha_outros_animais",
                label: "Você possui outros animais? Se sim, quantos?",
                placeholder: "Exemplo: Há outros 3 animais",
                type: InputFormEnum.text,
            },
            {
                key: "ja_teve_outros_animais",
                label: "Já teve outros animais?",
                type: InputFormEnum.radio,
                options: [
                    {
                        key: "sim",
                        label: "Já tive",
                        value: "Já tive",
                    },
                    {
                        key: "nao",
                        label: "Nunca tive um animal",
                        value: "Nunca tive um animal",
                    },
                ],
            },
            {
                key: "esta_ciente_gastos",
                label: "Você está ciente dos gastos?",
                type: InputFormEnum.radio,
                options: [
                    {
                        key: "ciente",
                        label: "Estou ciente dos gastos",
                        value: 1,
                    },
                    {
                        key: "nao_ciente",
                        label: "Não estou ciente",
                        value: 0,
                    },
                ],
            },
        ],
    },
    {
        section: [
            {
                key: "descricao_lugar_animal",
                label: "Descreva o lugar que o animal ficará",
                placeholder: "Exemplo: Apartamento possui tela de proteção",
                type: InputFormEnum.textarea,
            },
        ],
    },
    {
        section: [
            {
                key: "situacao_devolucao_adocao",
                label: "Pensa em devolver o animal em alguma situação?",
                type: InputFormEnum.textarea,
            },
        ],
    },
    {
        section: [
            {
                key: "consciente_termo_responsabilidade",
                label: "Está ciente em assinar o Termo de Responsabilidade?",
                type: InputFormEnum.radio,
                options: [
                    {
                        key: "estou_ciente",
                        label: "Estou ciente",
                        value: 1,
                    },
                    {
                        key: "nao_estou_ciente",
                        label: "Não estou ciente",
                        value: 0,
                    },
                ],
            },
        ],
    },
];

export const schemaAdocaoForm = yup
    .object({
        nome: yup.string().required(MENSAGENS_ERRO.campoObrigatorio),
        endereco_cep: yup.string().required(MENSAGENS_ERRO.campoObrigatorio),
        endereco_rua: yup.string().required(MENSAGENS_ERRO.campoObrigatorio),
        endereco_numero: yup.string().required(MENSAGENS_ERRO.campoObrigatorio),
        endereco_complemento: yup.string(),
        endereco_bairro: yup.string().required(MENSAGENS_ERRO.campoObrigatorio),
        endereco_cidade: yup.string().required(MENSAGENS_ERRO.campoObrigatorio),
        endereco_estado: yup.string().required(MENSAGENS_ERRO.campoObrigatorio),
        facebook_url: yup.string().required(MENSAGENS_ERRO.campoObrigatorio),
        instagram_url: yup.string().required(MENSAGENS_ERRO.campoObrigatorio),
        primeira_adocao: yup.boolean().required(MENSAGENS_ERRO.campoObrigatorio),
        motivo_adocao: yup.string().required(MENSAGENS_ERRO.campoObrigatorio),
        quantidade_pessoas_moradia: yup.string().required(MENSAGENS_ERRO.campoObrigatorio),
        pessoas_de_acordo_adocao: yup.boolean().required(MENSAGENS_ERRO.campoObrigatorio),
        ha_criancas_idosos: yup.array().of(yup.string()).typeError("").optional(),
        mora_casa_apt: yup.string().required(MENSAGENS_ERRO.campoObrigatorio),
        quantidade_pessoas_trabalham: yup.string().required(MENSAGENS_ERRO.campoObrigatorio),
        moradia_tem_estrutura_adocao: yup.string().required(MENSAGENS_ERRO.campoObrigatorio),
        ha_outros_animais: yup.string().required(MENSAGENS_ERRO.campoObrigatorio),
        ja_teve_outros_animais: yup.string().required(MENSAGENS_ERRO.campoObrigatorio),
        esta_ciente_gastos: yup.boolean().required(MENSAGENS_ERRO.campoObrigatorio),
        descricao_lugar_animal: yup.string().required(MENSAGENS_ERRO.campoObrigatorio),
        situacao_devolucao_adocao: yup.string().required(MENSAGENS_ERRO.campoObrigatorio),
        consciente_termo_responsabilidade: yup.boolean().required(MENSAGENS_ERRO.campoObrigatorio),
    })
    .required();
