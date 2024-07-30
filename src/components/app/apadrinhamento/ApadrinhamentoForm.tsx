"use client";
import Form from "@/components/Form/Form";
import { IApadrinhamentoForm } from "./ApadrinhamentoTypes";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
    APADRINHAMENTO_CHECKBOX_FIELD,
    APADRINHAMENTO_FORMS_COM_NOME_ANIMAL_CONFIG,
    APADRINHAMENTO_FORMS_CONFIG,
    estadoInicialFiltrosApadrinhamento,
    filtrosApadrinhamento,
    schemaApadrinhamentoComAnimalForm,
    schemaApadrinhamentoForm,
} from "./ApadrinhamentoUtils";
import MultipleTags from "@/components/MultipleTags/MultipleTags";
import {
    ApadrinhamentoEscolherOpcaoEnum,
    ApadrinhamentoFiltrosEnum,
    ApadrinhamentoOpcoesEnum,
} from "@/interfaces/apadrinhamentoInterfaces";
import { useCallback, useEffect, useState } from "react";
import { sendEmailFunctionApadrinhamentoForm } from "@/services/azure-function/send-email-apadrinhamento/send-email-function-apadrinhamento-form";

export default function ApadrinhamentoForm() {
    const [filtrosSelecionados, setFiltrosSelecionados] = useState<Record<string, string[]>>({
        ...estadoInicialFiltrosApadrinhamento,
    });

    const opcaoEscolherQuemApadrinharFiltros =
        filtrosSelecionados[ApadrinhamentoFiltrosEnum.escolher_quem_apadrinhar][0];

    const schemaApadrinhamento =
        opcaoEscolherQuemApadrinharFiltros === ApadrinhamentoEscolherOpcaoEnum.sim
            ? schemaApadrinhamentoComAnimalForm
            : schemaApadrinhamentoForm;

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        resetField,
        setValue,
        watch,
    } = useForm<IApadrinhamentoForm>({
        resolver: yupResolver(schemaApadrinhamento),
    });

    const onSubmit = async (data: IApadrinhamentoForm) => {
        try {
            await sendEmailFunctionApadrinhamentoForm({
                ...data,
            });
            toast.success("Formulário enviado com sucesso!");
            reset();
            setFiltrosSelecionados({ ...estadoInicialFiltrosApadrinhamento });
        } catch (err: unknown) {
            if (typeof err === "string") {
                console.warn(err);
            } else if (err instanceof Error) {
                console.warn(err.message);
            }
            toast.error("Houve um erro no envio do formulário");
        }
    };

    type ApadrinhamentoEnums =
        | ApadrinhamentoFiltrosEnum
        | ApadrinhamentoOpcoesEnum
        | ApadrinhamentoEscolherOpcaoEnum;

    function onSetFiltrosSelecionados(filtroValue: string, optionValue: string) {
        const filtroSelecionado = filtrosSelecionados[filtroValue].includes(optionValue);
        setFiltrosSelecionados((old) => ({
            ...old,
            [filtroValue]: filtroSelecionado
                ? [...old[filtroValue].filter((a) => a !== optionValue)]
                : filtroValue === ApadrinhamentoFiltrosEnum.escolher_quem_apadrinhar
                  ? [optionValue]
                  : [...old[filtroValue], optionValue],
        }));
    }

    const shouldShowApadrinhamentoForms =
        !!filtrosSelecionados[ApadrinhamentoFiltrosEnum.apadrinhar_com].length &&
        !!filtrosSelecionados[ApadrinhamentoFiltrosEnum.escolher_quem_apadrinhar].length;

    const APADRINHAMENTO_FORMS = useCallback(() => {
        const forms =
            opcaoEscolherQuemApadrinharFiltros === ApadrinhamentoEscolherOpcaoEnum.sim
                ? APADRINHAMENTO_FORMS_COM_NOME_ANIMAL_CONFIG
                : APADRINHAMENTO_FORMS_CONFIG;

        if (
            !forms[0].section.rightSide.find((key) => key.key === APADRINHAMENTO_CHECKBOX_FIELD.key)
        ) {
            forms[0].section.rightSide = [
                ...forms[0].section.rightSide.concat([APADRINHAMENTO_CHECKBOX_FIELD]),
            ];
        }

        return forms;
    }, [opcaoEscolherQuemApadrinharFiltros]);

    const shouldDisabledSubmitButton =
        !watch("preferencia_contato")?.length ||
        !watch("nome") ||
        !watch("email") ||
        !watch("telefone_contato");

    useEffect(() => {
        setValue(
            "escolher_quem_apadrinhar",
            filtrosSelecionados[ApadrinhamentoFiltrosEnum.escolher_quem_apadrinhar][0]
        );
        resetField("nome_animal");
    }, [opcaoEscolherQuemApadrinharFiltros]);

    useEffect(() => {
        setValue("apadrinhar_com", [
            ...filtrosSelecionados[ApadrinhamentoFiltrosEnum.apadrinhar_com],
        ]);
    }, [filtrosSelecionados[ApadrinhamentoFiltrosEnum.apadrinhar_com]]);

    const renderApadrinhamentoForms = () => {
        if (!shouldShowApadrinhamentoForms) return null;

        return (
            <div className="flex flex-col mt-8 md:mt-10">
                <h2 className="text-primary-400 text-3xl leading-10 font-bold md:text-4xl">
                    Falta pouco! Agora é sé deixar aqui seu contato e pronto
                </h2>
                <div>
                    <Form<IApadrinhamentoForm>
                        handleSubmit={handleSubmit(onSubmit)}
                        formFields={APADRINHAMENTO_FORMS()}
                        register={register}
                        errors={errors}
                        submitLabel="Apadrinhar"
                        disabledSubmit={shouldDisabledSubmitButton}
                    />
                </div>
            </div>
        );
    };

    return (
        <section className="flex flex-col w-full mt-6">
            <div className="flex flex-col items-start">
                <h2 className="text-primary-400 text-3xl leading-10 font-bold md:text-4xl">
                    Encontre a sua forma de ajudar
                </h2>
                <p className="text-gray-400 text-lg mt-3">
                    Aqui você encontra algumas formas de realizar o apadrinhamento:
                </p>
                <div className="w-full flex flex-col items-start mt-6 [&>div+div]:mt-6">
                    {filtrosApadrinhamento.map((f) => {
                        return (
                            <MultipleTags<ApadrinhamentoEnums>
                                key={f.filtro.label}
                                filtroItem={f}
                                filtrosSelecionados={filtrosSelecionados}
                                setFiltrosSelecionados={setFiltrosSelecionados}
                                customSetFiltrosSelecionados={onSetFiltrosSelecionados}
                            />
                        );
                    })}
                </div>
                {renderApadrinhamentoForms()}
            </div>
        </section>
    );
}
