import { LIMITE_TAMANHO_MENSAGEM, MENSAGENS_ERRO } from "@/components/Form/FormConsts";
import { GeneralFormsType, InputFormEnum } from "@/components/Form/FormTypes";
import * as yup from "yup";
import { IVolunteerForm } from "./GerenciarUsuariosNovoTypes";
import { UserRole } from "@/interfaces/authInterfaces";

export const schema = yup
    .object({
        name: yup.string().required("Nome é obrigatório"),
        email: yup
            .string()
            .email("Formato de e-mail inválido")
            .max(
                LIMITE_TAMANHO_MENSAGEM.grande,
                MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.grande).tamanhoMaximo
            )
            .required("E-mail é obrigatório"),
        nickname: yup
            .string()
            .max(
                LIMITE_TAMANHO_MENSAGEM.medio,
                MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.grande).tamanhoMaximo
            )
            .required("Apelido é obrigatório"),
        role: yup
            .string()
            .oneOf(Object.values(UserRole), "Selecione uma permissão válida")
            .required(MENSAGENS_ERRO().campoObrigatorio),
        password: yup.string().when("$isEditionMode", {
            is: true,
            then: () => yup.string().optional(),
            otherwise: () =>
                yup
                    .string()
                    .min(8, "A senha deve ter pelo menos 8 caracteres")
                    .max(
                        LIMITE_TAMANHO_MENSAGEM.grande,
                        MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.grande).tamanhoMaximo
                    )
                    .required("Senha é obrigatória"),
        }),
    })
    .required();

// Form fields configuration
export const getFormConfig = (isEditionMode?: boolean): GeneralFormsType<IVolunteerForm>[] => [
    {
        section: {
            leftSide: [
                {
                    key: "name",
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
                    disabled: isEditionMode,
                },
            ],
            rightSide: [
                {
                    key: "nickname",
                    label: "Apelido",
                    type: InputFormEnum.text,
                    placeholder: "Apelido do voluntário",
                },
            ],
        },
    },
    {
        section: {
            leftSide: [
                {
                    key: "password",
                    label: "Senha",
                    type: InputFormEnum.text,
                    placeholder: isEditionMode ? "********" : "Mínimo 8 caracteres",
                    disabled: isEditionMode,
                },
            ],
            rightSide: [],
        },
    },
];
