import Form from "@/components/Form/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CONTATO_FORMS_CONFIG, schemaContatoForm } from "./ContatoUtils";
import { IContatoFormData } from "./ContatoTypes";

export function ContatoDetalhesForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IContatoFormData>({
        resolver: yupResolver(schemaContatoForm),
    });

    const onSubmit = (data: IContatoFormData) => {
        alert(JSON.stringify(data));
        console.log(data);
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
