import { LIMITE_TAMANHO_MENSAGEM, MENSAGENS_ERRO } from "@/components/Form/FormConsts";
import { GeneralFormsType, InputFormEnum } from "@/components/Form/FormTypes";
import * as yup from "yup";
import { IContatoFormData } from "./ContatoTypes";

export const CONTATO_FORMS_CONFIG: GeneralFormsType<IContatoFormData>[] = [
    {
        section: {
            leftSide: [
                {
                    key: "nome",
                    label: "Nome Completo",
                    placeholder: "Exemplo: José da Silva",
                    type: InputFormEnum.text,
                },
                {
                    key: "email",
                    label: "E-mail",
                    placeholder: "Exemplo: jose@email.com",
                    type: InputFormEnum.text,
                },
            ],
            rightSide: [
                {
                    key: "contato",
                    label: "Contato",
                    placeholder: "Exemplo: xx-xxxxx-xxxx",
                    type: InputFormEnum.text,
                },
                {
                    key: "instagram_url",
                    label: "Instagram (opcional)",
                    placeholder: "Exemplo: @usuario_instagram",
                    type: InputFormEnum.text,
                },
                {
                    key: "mensagem",
                    label: "Mensagem",
                    placeholder: "Digite sua mensagem",
                    type: InputFormEnum.textarea,
                },
            ],
        },
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
