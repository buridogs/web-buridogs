"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import { ADOCAO_FORMS_CONFIG, schemaAdocaoForm } from "./AdocaoDetalhesUtils";
import { IAdocaoForm } from "./AdocaoDetalhesTypes";
import Form from "@/components/Form/Form";
import { blobServiceClient, uploadBlobFromBuffer } from "@/services/azure-blob/azure-blob";
import { sendEmailFunctionAdocaoForm } from "@/services/azure-function/send-email-adocao/send-email-function-adocao-form";
import { IDog } from "@/interfaces/dogInterfaces";

interface AdocaoDetalhesFormProps {
    cachorroSelecionado: IDog;
}

export default function AdocaoDetalhesForm({ cachorroSelecionado }: AdocaoDetalhesFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm<IAdocaoForm>({
        resolver: yupResolver(schemaAdocaoForm),
    });

    const onSubmit = async (data: IAdocaoForm) => {
        const containerClient = blobServiceClient.getContainerClient("adoption-form");

        try {
            const linksArquivosAzureBlob: string[] = [];
            if (data.arquivos.length > 0) {
                const bufferPromise = Array(data.arquivos?.length)
                    .fill(data.arquivos?.length)
                    .map((_arquivo, index) => {
                        return data.arquivos.item(index)?.arrayBuffer();
                    });

                const bufferResponse = (await Promise.all([...bufferPromise])) as ArrayBuffer[];

                const uploadPromise = Array(data.arquivos?.length)
                    .fill(data.arquivos?.length)
                    .map((_arquivo, index) => {
                        const filename = data.arquivos.item(index)?.name ?? "";
                        linksArquivosAzureBlob.push(
                            `https://${process.env.NEXT_PUBLIC_AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${process.env.NEXT_PUBLIC_AZURE_STORAGE_CONTAINER_NAME}/${filename}`
                        );

                        return uploadBlobFromBuffer(
                            containerClient,
                            filename,
                            Buffer.from(bufferResponse[index])
                        );
                    });

                await Promise.all([...uploadPromise]);
            }

            await sendEmailFunctionAdocaoForm({
                ...data,
                nomeCachorroAdocao: cachorroSelecionado.nomeExibicao,
                linksArquivosAzureBlob,
            });
            toast.success("Formulário enviado com sucesso!");
            reset();
        } catch (err: any) {
            console.warn(err.message);
            toast.error("Houve um erro no envio do formulário");
        }
    };

    const shouldDisabledSubmitButton = String(watch("consciente_termo_responsabilidade")) === "0";

    return (
        <section className="flex flex-col items-center">
            <h2 className="text-primary-400 text-2xl font-bold">
                Quer adotar? Preencha o formulário abaixo e entraremos em contato com você!
            </h2>
            <div className="flex flex-col">
                <span className="text-gray-400 mt-4 mb-4">
                    Nós, protetores, realizamos essa entrevista para conhecer um pouco mais sobre
                    o(s) interessado(s) em adotar um cão resgatado que foi tirado das ruas, saber
                    sobre os motivos da adoção, sobre o ambiente no qual o bichinho vai morar e
                    sobre experiências prévias que eles possam já ter tido com outros animais. Após
                    a entrevista,{" "}
                    <strong className="text-gray-700">
                        sendo aprovada a adoção pelas protetoras
                    </strong>
                    , será formalizado um Termo de Adoção e Responsabilidades. Neste termo estarão
                    as diretrizes básicas de cuidados com o animal, os dados completos do adotante e
                    do protetor tutor (endereço, telefone e e-mail de contato, nome completo e
                    documentos), assinado por ambos, de forma a garantir o bem estar do animalzinho
                    adotado.
                </span>
                <p className="text-gray-400 mb-4">
                    Após a adoção,{" "}
                    <strong className="text-gray-700">
                        os protetores irão esporadicamente monitorar as condições de adaptação e
                        vida do animal, até que todos estejam completamente adaptados e felizes.
                    </strong>{" "}
                    Por gentileza, responda as perguntas abaixo. Assim que nos enviar, iremos
                    analisar, responder e retornar o mais breve possível.{" "}
                    <strong className="text-gray-700">
                        Por meio do número de celular disponibilizado abaixo, pediremos imagens da
                        futura casa do cão, de forma que possamos averiguar se ele(a) estará em
                        condições adequadas.
                    </strong>
                </p>
                <Form<IAdocaoForm>
                    handleSubmit={handleSubmit(onSubmit)}
                    formFields={ADOCAO_FORMS_CONFIG}
                    register={register}
                    errors={errors}
                    submitLabel="Enviar formulário"
                    disabledSubmit={shouldDisabledSubmitButton}
                />
            </div>
        </section>
    );
}
