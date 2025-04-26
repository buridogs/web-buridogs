import { LIMITE_TAMANHO_MENSAGEM, MENSAGENS_ERRO } from "@/components/Form/FormConsts";
import { GeneralFormsType, InputFormEnum } from "@/components/Form/FormTypes";
import * as yup from "yup";
import { IUsuariosForm } from "./GerenciarUsuariosNovoTypes";
import { UserRole } from "@/interfaces/authInterfaces";

export const schema = yup
    .object({
        nome: yup.string().required("Nome é obrigatório"),
        email: yup
            .string()
            .email("Formato de e-mail inválido")
            .max(
                LIMITE_TAMANHO_MENSAGEM.grande,
                MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.grande).tamanhoMaximo
            )
            .required("E-mail é obrigatório"),
        apelido: yup
            .string()
            .max(
                LIMITE_TAMANHO_MENSAGEM.medio,
                MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.grande).tamanhoMaximo
            )
            .required("Contato é obrigatório"),
        role: yup
            .string()
            .oneOf(Object.values(UserRole), "Selecione uma permissão válida")
            .required(MENSAGENS_ERRO().campoObrigatorio),
    })
    .required();

// Form fields configuration
export const getFormConfig = (): GeneralFormsType<IUsuariosForm>[] => [
    {
        section: {
            leftSide: [
                {
                    key: "nome",
                    label: "Nome",
                    type: InputFormEnum.text,
                    placeholder: "Nome do voluntário",
                },
            ],
            rightSide: [
                {
                    key: "role",
                    label: "Permissão",
                    type: InputFormEnum.radio,
                    options: [
                        {
                            key: UserRole.ADMIN,
                            value: UserRole.ADMIN,
                            label: "Administrador",
                        },
                        {
                            key: UserRole.VOLUNTEER,
                            value: UserRole.VOLUNTEER,
                            label: "Voluntário",
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
                    key: "email",
                    label: "Email",
                    type: InputFormEnum.text,
                    placeholder: "E-mail do voluntário",
                },
            ],
            rightSide: [
                {
                    key: "apelido",
                    label: "Apelido",
                    type: InputFormEnum.text,
                    placeholder: "Apelido do voluntário",
                },
            ],
        },
    },
];
