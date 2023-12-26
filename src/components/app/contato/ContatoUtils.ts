import { LIMITE_TAMANHO_MENSAGEM, MENSAGENS_ERRO } from "@/components/Form/FormConsts";
import { GeneralFormsType, InputFormEnum } from "@/components/Form/FormTypes";
import * as yup from "yup";
import { IContatoFormData } from "./ContatoTypes";

export const CONTATO_FORMS_CONFIG: GeneralFormsType<IContatoFormData>[] = [
    {
        section: [
            {
                key: "nome",
                label: "Nome Completo",
                placeholder: "Exemplo: José da Silva",
                type: InputFormEnum.text,
            },
        ],
    },
    {
        section: [
            {
                key: "email",
                label: "E-mail",
                placeholder: "Exemplo: jose@email.com",
                type: InputFormEnum.text,
            },
        ],
    },
    {
        section: [
            {
                key: "contato",
                label: "Contato",
                placeholder: "Exemplo: xx-xxxxx-xxxx",
                type: InputFormEnum.text,
            },
        ],
    },
    {
        section: [
            {
                key: "mensagem",
                label: "Mensagem",
                placeholder: "Digite sua mensagem",
                type: InputFormEnum.textarea,
            },
        ],
    },
];

export const schemaContatoForm = yup
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
                LIMITE_TAMANHO_MENSAGEM.pequenoMedio,
                MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.pequenoMedio).tamanhoMaximo
            )
            .required(MENSAGENS_ERRO().campoObrigatorio),
        contato: yup
            .string()
            .max(
                LIMITE_TAMANHO_MENSAGEM.pequenoMedio,
                MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.pequenoMedio).tamanhoMaximo
            )
            .required(MENSAGENS_ERRO().campoObrigatorio),
        mensagem: yup
            .string()
            .max(
                LIMITE_TAMANHO_MENSAGEM.grande,
                MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.grande).tamanhoMaximo
            )
            .optional(),
    })
    .required();
