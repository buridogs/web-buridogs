"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LuArrowLeft } from "react-icons/lu";
import { AdocaoGeneroEnum, AdocaoIdadeEnum, AdocaoPorteEnum } from "@/interfaces/adocaoInterfaces";
import { toast } from "react-toastify";
import Form from "@/components/Form/Form";
import {
    getBaseFormConfig,
    getExtendedFormConfig,
    schema,
} from "../shared/GerenciarCachorrosNovoUtils";
import { IDogForm } from "../shared/GerenciarCachorrosNovoTypes";
import { useEffect, useState } from "react";
import { cachorrosMock } from "../../components/mock";
import { IDog } from "@/interfaces/dogInterfaces";

export default function GerenciarCachorrosNovoContainer() {
    const router = useRouter();
    const dogIdEditMode = useSearchParams().get("dogId");
    const [isHappyEndingMode, setIsHappyEndingMode] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<IDogForm>({
        resolver: yupResolver(schema),
        context: { showExtendedFields: isHappyEndingMode },
        defaultValues: {
            possuiAlgumaInaptidao: "false",
        },
    });

    const watchDogStatus = watch("status");

    useEffect(() => {
        if (watchDogStatus === "finais-felizes") {
            setIsHappyEndingMode(true);
        } else {
            setIsHappyEndingMode(false);
        }
    }, [watchDogStatus]);

    useEffect(() => {
        if (dogIdEditMode) {
            // Fetch dog data by ID and set default values
            const foundDog = cachorrosMock.find((dog) => dog.id.toString() === dogIdEditMode);
            if (foundDog) {
                setIsHappyEndingMode(foundDog?.status === "finais-felizes");
                console.log("Dog found for edit mode:", foundDog);
                setValue("nomeExibicao", foundDog.nomeExibicao);
                setValue("status", foundDog.status);
                setValue("genero", foundDog.genero as AdocaoGeneroEnum);
                setValue("idade", foundDog.idade as AdocaoIdadeEnum);
                setValue("porte", foundDog.porte as AdocaoPorteEnum);
                setValue("descricao", foundDog.descricao);
                setValue(
                    "possuiAlgumaInaptidao",
                    foundDog.possuiAlgumaInaptidao ? "true" : "false"
                );
            }
        }
    }, [dogIdEditMode, register]);

    const onSubmit = async (data: IDogForm) => {
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // This is where you would handle image uploading and API request
            // Example structure of data to match IAdocaoDetails
            const dogData: IDog = {
                id: Math.floor(Math.random() * 1000),
                nomeExibicao: data.nomeExibicao,
                slug: data.nomeExibicao.toLowerCase().replace(/\s+/g, "-"),
                status: data.status,
                genero: data.genero as AdocaoGeneroEnum,
                idade: data.idade as AdocaoIdadeEnum,
                porte: data.porte as AdocaoPorteEnum,
                descricao: data.descricao,
                possuiAlgumaInaptidao: data.possuiAlgumaInaptidao === "true",
                images: [
                    {
                        src: "/placeholder.jpg",
                        alt: "Placeholder image",
                        type: "main",
                    },
                ], // Would come from uploaded image
                youtubeVideos: [
                    {
                        src: data.youtubeSrcUrlAntes ?? "",
                        type: "common",
                    },
                ],
            };

            console.log("Submitted dog data:", dogData);

            toast.success("Cachorro cadastrado com sucesso!");
            router.push("/volunteer/gerenciar-cachorros");
            router.refresh();
        } catch (error) {
            console.error("Erro ao cadastrar cachorro:", error);
            toast.error("Erro ao cadastrar cachorro. Tente novamente.");
        }
    };

    const formFields = [
        ...getBaseFormConfig(),
        ...(isHappyEndingMode ? getExtendedFormConfig() : []),
    ];

    const title = dogIdEditMode ? "Editar Cachorro" : "Adicionar Cachorro";
    const buttonLabel = dogIdEditMode ? "Salvar Alterações" : "Salvar Cachorro";

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-screen-xl mx-auto px-8 py-11 flex flex-col w-full">
                <div className="flex items-center mb-6">
                    <Link
                        href="/volunteer/gerenciar-cachorros"
                        className="bg-primary-400 hover:bg-gray-200 text-gray-700 p-2 rounded-full mr-4 transition-colors"
                    >
                        <LuArrowLeft className="h-5 w-5" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                </div>

                <div className="bg-gray-200 shadow-md rounded-lg p-6">
                    <Form<IDogForm>
                        handleSubmit={handleSubmit(onSubmit)}
                        formFields={formFields}
                        register={register}
                        errors={errors}
                        submitLabel={buttonLabel}
                    />
                </div>
            </div>
        </div>
    );
}
