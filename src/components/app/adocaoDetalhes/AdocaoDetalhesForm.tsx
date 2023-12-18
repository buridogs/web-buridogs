"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import { ADOCAO_FORMS_CONFIG, schemaAdocaoForm } from "./AdocaoDetalhesUtils";
import { IAdocaoForm } from "./AdocaoDetalhesTypes";
import Form from "@/components/Form/Form";
import { sendEmailFunction } from "@/services/azure-function/send-email-function/send-email-function";
import { IAdocaoDetails } from "@/interfaces/adocaoInterfaces";

interface AdocaoDetalhesFormProps {
    cachorroSelecionado: IAdocaoDetails;
}

export default function AdocaoDetalhesForm({ cachorroSelecionado }: AdocaoDetalhesFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IAdocaoForm>({
        resolver: yupResolver(schemaAdocaoForm),
    });
    const onSubmit = async (data: IAdocaoForm) => {
        try {
            await sendEmailFunction({
                ...data,
                nomeCachorroAdocao: cachorroSelecionado.nome,
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
        <section className="flex flex-col items-center">
            <h2 className="text-primary-400 text-2xl font-bold">
                Quer adotar? Preencha o formulário abaixo e entraremos em contato com você!
            </h2>
            <div className="flex flex-col">
                <span className="text-grey-400 mt-4 mb-4">
                    Nós, protetores, realizamos essa entrevista para conhecer um pouco mais sobre
                    o(s) interessado(s) em adotar um cão resgatado que foi tirado das ruas, saber
                    sobre os motivos da adoção, sobre o ambiente no qual o bichinho vai morar e
                    sobre experiências prévias que eles possam já ter tido com outros animais. Após
                    a entrevista,{" "}
                    <strong className="text-grey-700">
                        sendo aprovada a adoção pelas protetoras
                    </strong>
                    , será formalizado um Termo de Adoção e Responsabilidades. Neste termo estarão
                    as diretrizes básicas de cuidados com o animal, os dados completos do adotante e
                    do protetor tutor (endereço, telefone e e-mail de contato, nome completo e
                    documentos), assinado por ambos, de forma a garantir o bem estar do animalzinho
                    adotado.
                </span>
                <p className="text-grey-400 mb-4">
                    Após a adoção,{" "}
                    <strong className="text-grey-700">
                        os protetores irão esporadicamente monitorar as condições de adaptação e
                        vida do animal, até que todos estejam completamente adaptados e felizes.
                    </strong>{" "}
                    Por gentileza, responda as perguntas abaixo. Assim que nos enviar, iremos
                    analisar e responder o mais breve possível. Sendo aprovada a adoção, marcamos
                    uma visita para que o interessado conheça o animal e interaja com ele antes que
                    seja levado ao adotante.
                </p>
                <Form
                    handleSubmit={handleSubmit(onSubmit)}
                    formFields={ADOCAO_FORMS_CONFIG}
                    register={register}
                    errors={errors}
                    submitLabel="Enviar formulário"
                />
            </div>
        </section>
    );
}
