import Form from "@/components/Form/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CONTATO_FORMS_CONFIG, schemaContatoForm } from "./ContatoUtils";
import { IContatoFormData } from "./ContatoTypes";
// import { sendEmailFunctionContato } from "@/services/azure-function/send-email-contato/send-email-contato-form";
import { toast } from "react-toastify";
import { FormRequestTypeEnum } from "@/services/api/modules/form-requests/types";
import { useFormRequests } from "@/hooks/form-requests-hook";

export function ContatoDetalhesForm() {
    const { createFormRequest, isLoading: formRequestsLoading } = useFormRequests({
        shouldFetch: false,
    });

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
            // await sendEmailFunctionContato({
            //     ...data,
            // });
            await createFormRequest({
                detailsForm: { ...data },
                requestType: FormRequestTypeEnum.contact,
            });
            reset();
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err);
            toast.error("Houve um erro no envio do formulário");
        }
    };

    return (
        <Form<IContatoFormData>
            handleSubmit={handleSubmit(onSubmit)}
            formFields={CONTATO_FORMS_CONFIG}
            register={register}
            errors={errors}
            submitLabel="Enviar Mensagem"
            disabledSubmit={formRequestsLoading}
        />
    );
}
