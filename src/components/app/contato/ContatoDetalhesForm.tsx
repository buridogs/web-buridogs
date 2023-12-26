import Form from "@/components/Form/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CONTATO_FORMS_CONFIG, schemaContatoForm } from "./ContatoUtils";
import { IContatoFormData } from "./ContatoTypes";
import { sendEmailFunctionContato } from "@/services/azure-function/send-email-contato/send-email-contato-api";
import { toast } from "react-toastify";

export function ContatoDetalhesForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IContatoFormData>({
        resolver: yupResolver(schemaContatoForm),
    });

    const onSubmit = async (data: IContatoFormData) => {
        try {
            await sendEmailFunctionContato({
                ...data,
            });
            toast.success("Formulário enviado com sucesso!");
        } catch (err: any) {
            console.warn(err.message);
            toast.error("Houve um erro no envio do formulário");
        } finally {
            reset();
        }
    };

    return (
        <Form
            handleSubmit={handleSubmit(onSubmit)}
            formFields={CONTATO_FORMS_CONFIG}
            register={register}
            errors={errors}
            submitLabel="Enviar Mensagem"
        />
    );
}
