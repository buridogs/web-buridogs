"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ADOCAO_FORMS_CONFIG, schemaAdocaoForm } from "./AdocaoDetalhesUtils";
import { IAdocaoForm } from "./AdocaoDetalhesTypes";

export default function AdocaoDetalhesForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IAdocaoForm>({
        resolver: yupResolver(schemaAdocaoForm),
    });
    const onSubmit = (data) => console.log(data);

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
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col items-end"
                >
                    {ADOCAO_FORMS_CONFIG.map((adocaoKey) => (
                        <div
                            key={adocaoKey.section[0].key}
                            className="w-full flex flex-col items-center justify-around md:flex-row"
                        >
                            {adocaoKey.section.map((field) => (
                                <div
                                    key={field.key}
                                    className="w-full flex flex-col items-start mt-4"
                                >
                                    <label
                                        htmlFor={field.key}
                                        className="text-sm text-grey-100 font-medium"
                                    >
                                        {field.label}
                                    </label>
                                    {field.type === "text" ? (
                                        <input
                                            id={field.key}
                                            placeholder={field.placeholder ?? ""}
                                            className="w-[80%] py-2 px-2 border-2 border-grey-100 border-solid rounded mt-1"
                                            {...register(field.key as keyof IAdocaoForm)}
                                        />
                                    ) : field.type === "textarea" ? (
                                        <textarea
                                            id={field.key}
                                            placeholder={field.placeholder ?? ""}
                                            className="w-[80%] py-2 px-2 border-2 border-grey-100 border-solid rounded mt-1"
                                            {...register(field.key as keyof IAdocaoForm)}
                                            rows={4}
                                        />
                                    ) : field.type === "radio" ? (
                                        field.options?.map((opt) => (
                                            <div
                                                key={opt.key}
                                                className="w-full flex items-center justify-start"
                                            >
                                                <input
                                                    id={opt.key}
                                                    type="radio"
                                                    value={opt.value}
                                                    className="mr-2"
                                                    {...register(field.key as keyof IAdocaoForm)}
                                                />
                                                <label
                                                    htmlFor={opt.key}
                                                    className="w-full text-sm text-grey-100 font-normal"
                                                >
                                                    {opt.label}
                                                </label>
                                            </div>
                                        ))
                                    ) : field.type === "checkbox" ? (
                                        field.options?.map((opt) => (
                                            <div
                                                key={opt.key}
                                                className="w-full flex items-center justify-start"
                                            >
                                                <input
                                                    id={opt.key}
                                                    type="checkbox"
                                                    value={opt.value}
                                                    className="mr-2"
                                                    {...register(field.key as keyof IAdocaoForm)}
                                                />
                                                <label
                                                    htmlFor={opt.key}
                                                    className="w-full text-sm text-grey-100 font-normal"
                                                >
                                                    {opt.label}
                                                </label>
                                            </div>
                                        ))
                                    ) : (
                                        <></>
                                    )}
                                    <p className="text-sm font-semibold text-red-400">
                                        {errors[field.key as keyof IAdocaoForm]?.message}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ))}

                    <input
                        type="submit"
                        value="Enviar forms"
                        className="uppercase font-medium py-2 px-4 rounded border-grey-400 border-solid border-2 mt-8 cursor-pointer transition duration-150 hover:bg-primary-100 hover:text-white hover:border-primary-100"
                    />
                </form>
            </div>
        </section>
    );
}
