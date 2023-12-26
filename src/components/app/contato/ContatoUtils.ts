import { MENSAGENS_ERRO } from "@/components/Form/FormConsts";
import { GeneralFormsType, InputFormEnum } from "@/components/Form/FormTypes";
import * as yup from "yup";

export const CONTATO_FORMS_CONFIG: GeneralFormsType[] = [
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
        nome: yup.string().required(MENSAGENS_ERRO.campoObrigatorio),
        email: yup
            .string()
            .email(MENSAGENS_ERRO.emailInvalido)
            .required(MENSAGENS_ERRO.campoObrigatorio),
        contato: yup.string().required(MENSAGENS_ERRO.campoObrigatorio),
        mensagem: yup.string().optional(),
    })
    .required();
