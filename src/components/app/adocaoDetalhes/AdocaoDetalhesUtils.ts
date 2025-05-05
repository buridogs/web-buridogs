import { LIMITE_TAMANHO_MENSAGEM, MENSAGENS_ERRO } from "@/components/Form/FormConsts";
import { GeneralFormsType, InputFormEnum } from "@/components/Form/FormTypes";
import * as yup from "yup";
import { IAdocaoForm } from "./AdocaoDetalhesTypes";

export const ADOCAO_FORMS_CONFIG: GeneralFormsType<IAdocaoForm>[] = [
    {
        section: {
            leftSide: [
                {
                    key: "nome",
                    label: "Nome responsável",
                    placeholder: "Exemplo: José da Silva",
                    type: InputFormEnum.text,
                },
            ],
            rightSide: [
                {
                    key: "contato",
                    label: "Celular (c/ WhatsApp, de preferência)",
                    placeholder: "Exemplo: 31 9 9999-8888",
                    type: InputFormEnum.text,
                },
            ],
        },
    },
    {
        section: {
            leftSide: [
                {
                    key: "endereco_cep",
                    label: "CEP",
                    placeholder: "Formato XX.XXX-XXX",
                    type: InputFormEnum.text,
                },
            ],
            rightSide: [
                {
                    key: "endereco_rua",
                    label: "Logradouro",
                    placeholder: "Exemplo: Avenida Mário Werneck",
                    type: InputFormEnum.text,
                },
            ],
        },
    },
    {
        section: {
            leftSide: [
                {
                    key: "endereco_numero",
                    label: "Número",
                    placeholder: "Exemplo: 365",
                    type: InputFormEnum.text,
                },
            ],
            rightSide: [
                {
                    key: "endereco_complemento",
                    label: "Complemento",
                    placeholder: "Exemplo: Esquina",
                    type: InputFormEnum.text,
                },
            ],
        },
    },
    {
        section: {
            leftSide: [
                {
                    key: "endereco_bairro",
                    label: "Bairro",
                    placeholder: "Exemplo: Centro",
                    type: InputFormEnum.text,
                },
            ],
            rightSide: [
                {
                    key: "endereco_cidade",
                    label: "Cidade",
                    placeholder: "Exemplo: Belo Horizonte",
                    type: InputFormEnum.text,
                },
            ],
        },
    },
    {
        section: {
            leftSide: [
                {
                    key: "endereco_estado",
                    label: "Estado",
                    placeholder: "Exemplo: Minas Gerais",
                    type: InputFormEnum.text,
                },
            ],
            rightSide: [],
        },
    },
    {
        section: {
            leftSide: [{ key: "facebook_url", label: "Facebook Link", type: InputFormEnum.text }],
            rightSide: [
                { key: "instagram_url", label: "Instagram Link", type: InputFormEnum.text },
            ],
        },
    },
    {
        section: {
            leftSide: [
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
            ],
            rightSide: [
                {
                    key: "motivo_adocao",
                    label: "Motivo adoção",
                    placeholder: "Exemplo: Para me fazer companhia",
                    type: InputFormEnum.text,
                },
            ],
        },
    },
    {
        section: {
            leftSide: [
                {
                    key: "quantidade_pessoas_moradia",
                    label: "Quantas pessoas moram?",
                    placeholder: "Exemplo: 3 pessoas",
                    type: InputFormEnum.text,
                },
            ],
            rightSide: [
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
    },
    {
        section: {
            leftSide: [
                {
                    key: "quantidade_pessoas_trabalham",
                    label: "Quantas pessoas trabalham?",
                    placeholder: "Somente eu",
                    type: InputFormEnum.text,
                },
            ],
            rightSide: [
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
    },
    {
        section: {
            leftSide: [
                {
                    key: "ha_outros_animais",
                    label: "Você possui outros animais? Se sim, quantos?",
                    placeholder: "Exemplo: Há outros 3 animais",
                    type: InputFormEnum.text,
                },
            ],
            rightSide: [
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
    },
    {
        section: {
            leftSide: [
                {
                    key: "descricao_lugar_animal",
                    label: "Descreva o lugar que o animal ficará",
                    placeholder: "Exemplo: Apartamento possui tela de proteção",
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
                    key: "situacao_devolucao_adocao",
                    label: "Pensa em devolver o animal em alguma situação?",
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
            rightSide: [],
        },
    },
    {
        section: {
            leftSide: [
                {
                    key: "arquivos",
                    label: "Adicione fotos do futuro lar do cãozinho. As imagens nos ajudarão a entender quão bem ele/ela estará 😄",
                    type: InputFormEnum.multipleFiles,
                    fileSettings: {
                        isMultiple: true,
                        filesQuantityLimit: 3,
                        filesSizeLimit: 1024 * 1000,
                        supportedExtensions: ["image/png", "image/jpeg", "image/jpg"],
                    },
                },
            ],
            rightSide: [],
        },
    },
];

export const schemaAdocaoForm = yup
    .object({
        nome: yup
            .string()
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
        endereco_cep: yup
            .string()
            .max(
                LIMITE_TAMANHO_MENSAGEM.pequeno,
                MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.pequeno).tamanhoMaximo
            )
            .required(MENSAGENS_ERRO().campoObrigatorio),
        endereco_rua: yup
            .string()
            .max(
                LIMITE_TAMANHO_MENSAGEM.medio,
                MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.medio).tamanhoMaximo
            )
            .required(MENSAGENS_ERRO().campoObrigatorio),
        endereco_numero: yup.string().required(MENSAGENS_ERRO().campoObrigatorio),
        endereco_complemento: yup
            .string()
            .max(
                LIMITE_TAMANHO_MENSAGEM.medio,
                MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.medio).tamanhoMaximo
            ),
        endereco_bairro: yup
            .string()
            .max(
                LIMITE_TAMANHO_MENSAGEM.pequenoMedio,
                MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.pequenoMedio).tamanhoMaximo
            )
            .required(MENSAGENS_ERRO().campoObrigatorio),
        endereco_cidade: yup
            .string()
            .max(
                LIMITE_TAMANHO_MENSAGEM.medio,
                MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.medio).tamanhoMaximo
            )
            .required(MENSAGENS_ERRO().campoObrigatorio),
        endereco_estado: yup
            .string()
            .max(
                LIMITE_TAMANHO_MENSAGEM.medio,
                MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.medio).tamanhoMaximo
            )
            .required(MENSAGENS_ERRO().campoObrigatorio),
        facebook_url: yup
            .string()
            .max(
                LIMITE_TAMANHO_MENSAGEM.medio,
                MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.medio).tamanhoMaximo
            )
            .required(MENSAGENS_ERRO().campoObrigatorio),
        instagram_url: yup
            .string()
            .max(
                LIMITE_TAMANHO_MENSAGEM.medio,
                MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.medio).tamanhoMaximo
            )
            .required(MENSAGENS_ERRO().campoObrigatorio),
        primeira_adocao: yup.boolean().required(MENSAGENS_ERRO().campoObrigatorio),
        motivo_adocao: yup
            .string()
            .max(
                LIMITE_TAMANHO_MENSAGEM.grande,
                MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.grande).tamanhoMaximo
            )
            .required(MENSAGENS_ERRO().campoObrigatorio),
        quantidade_pessoas_moradia: yup
            .string()
            .max(
                LIMITE_TAMANHO_MENSAGEM.medio,
                MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.medio).tamanhoMaximo
            )
            .required(MENSAGENS_ERRO().campoObrigatorio),
        pessoas_de_acordo_adocao: yup.boolean().required(MENSAGENS_ERRO().campoObrigatorio),
        ha_criancas_idosos: yup.array().of(yup.string()).typeError("").optional(),
        mora_casa_apt: yup
            .string()
            .max(
                LIMITE_TAMANHO_MENSAGEM.medio,
                MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.medio).tamanhoMaximo
            )
            .required(MENSAGENS_ERRO().campoObrigatorio),
        quantidade_pessoas_trabalham: yup
            .string()
            .max(
                LIMITE_TAMANHO_MENSAGEM.medio,
                MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.medio).tamanhoMaximo
            )
            .required(MENSAGENS_ERRO().campoObrigatorio),
        moradia_tem_estrutura_adocao: yup
            .string()
            .max(
                LIMITE_TAMANHO_MENSAGEM.medio,
                MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.medio).tamanhoMaximo
            )
            .required(MENSAGENS_ERRO().campoObrigatorio),
        ha_outros_animais: yup
            .string()
            .max(
                LIMITE_TAMANHO_MENSAGEM.medio,
                MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.medio).tamanhoMaximo
            )
            .required(MENSAGENS_ERRO().campoObrigatorio),
        ja_teve_outros_animais: yup
            .string()
            .max(
                LIMITE_TAMANHO_MENSAGEM.medio,
                MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.medio).tamanhoMaximo
            )
            .required(MENSAGENS_ERRO().campoObrigatorio),
        esta_ciente_gastos: yup.boolean().required(MENSAGENS_ERRO().campoObrigatorio),
        descricao_lugar_animal: yup
            .string()
            .max(
                LIMITE_TAMANHO_MENSAGEM.grande,
                MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.grande).tamanhoMaximo
            )
            .required(MENSAGENS_ERRO().campoObrigatorio),
        situacao_devolucao_adocao: yup
            .string()
            .max(
                LIMITE_TAMANHO_MENSAGEM.grande,
                MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.grande).tamanhoMaximo
            )
            .required(MENSAGENS_ERRO().campoObrigatorio),
        consciente_termo_responsabilidade: yup
            .boolean()
            .required(MENSAGENS_ERRO().campoObrigatorio),
        arquivos: yup
            .mixed<FileList>()
            .test(
                "arquivos",
                MENSAGENS_ERRO().campoObrigatorio,
                (files: FileList | undefined) => (files?.length ?? 0) > 0
            )
            .required(MENSAGENS_ERRO().campoObrigatorio),
    })
    .required();
