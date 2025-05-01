"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LuArrowLeft } from "react-icons/lu";
import Form from "@/components/Form/Form";
import {
    getBaseFormConfig,
    getExtendedFormConfig,
    schema,
} from "../shared/GerenciarCachorrosNovoUtils";
import { IDogForm } from "../shared/GerenciarCachorrosNovoTypes";
import { useEffect, useState } from "react";
import { PrivateRoutes } from "@/components/Header/routes-ui";
import { useDogs } from "@/hooks/dogs-hook";
import { CreateDogDto, DogStatusEnum, UpdateDogDto } from "@/services/api/modules/dogs/types";
import { Spinner } from "@/components/Spinner/Spinner";
import { useAuth } from "@/providers/auth/AuthProvider";
import { IDogUI } from "@/interfaces/dogInterfaces";

export default function GerenciarCachorrosNovoContainer() {
    const { user } = useAuth();
    const router = useRouter();
    const dogIdEditMode = useSearchParams().get("dogId");
    const [isHappyEndingMode, setIsHappyEndingMode] = useState(false);
    const [dogToEdit, setDogToEdit] = useState<IDogUI | null>(null);

    const { getDogById, createDog, updateDog, isLoading: dogsLoading } = useDogs();

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
        if (watchDogStatus === DogStatusEnum.adotado) {
            setIsHappyEndingMode(true);
        } else {
            setIsHappyEndingMode(false);
        }
    }, [watchDogStatus]);

    useEffect(() => {
        const fetchDogData = async () => {
            if (dogIdEditMode) {
                // Fetch dog data by ID and set default values
                const foundDog = await getDogById(dogIdEditMode);
                if (foundDog) {
                    setDogToEdit(foundDog);
                    setIsHappyEndingMode(foundDog?.status === "adopted");
                    setValue("nomeExibicao", foundDog.nomeExibicao);
                    setValue("status", foundDog.status);
                    setValue("genero", foundDog.genero);
                    setValue("idade", foundDog.idade);
                    setValue("porte", foundDog.porte);
                    setValue("descricao", foundDog.descricao);
                    setValue(
                        "possuiAlgumaInaptidao",
                        foundDog.possuiAlgumaInaptidao ? "true" : "false"
                    );
                    setValue("descricaoLonga", foundDog.descricaoHappyEnding);
                    setValue("localAcolhimento", foundDog.localAcolhimento);
                    setValue("tratamentosRealizados", foundDog.tratamentosRealizados);
                    setValue("youtubeSrcUrlAntes", foundDog.youtubeVideos?.[0]?.src);
                    setValue("youtubeSrcUrlDepois", foundDog.youtubeVideos?.[1]?.src);
                }
            }
        };

        fetchDogData();
    }, [dogIdEditMode, register]);

    const onSubmit = async (data: IDogForm) => {
        try {
            if (dogIdEditMode) {
                // Update existing dog
                const updatePayload: UpdateDogDto = {
                    name:
                        dogToEdit?.nomeExibicao === data.nomeExibicao
                            ? undefined
                            : data.nomeExibicao,
                    dogStatus: dogToEdit?.status === data.status ? undefined : data.status,
                    gender: dogToEdit?.genero === data.genero ? undefined : data.genero,
                    age: dogToEdit?.idade === data.idade ? undefined : data.idade,
                    size: dogToEdit?.porte === data.porte ? undefined : data.porte,
                    description:
                        dogToEdit?.descricao === data.descricao ? undefined : data.descricao,
                    needsSpecialCare:
                        dogToEdit?.possuiAlgumaInaptidao === (data.possuiAlgumaInaptidao === "true")
                            ? undefined
                            : data.possuiAlgumaInaptidao === "true",
                    happyEndingDescription:
                        dogToEdit?.descricaoHappyEnding === data.descricaoLonga
                            ? undefined
                            : data.descricaoLonga,
                    shelterLocation:
                        dogToEdit?.localAcolhimento === data.localAcolhimento
                            ? undefined
                            : data.localAcolhimento,
                    treatmentsPerformed:
                        dogToEdit?.tratamentosRealizados === data.tratamentosRealizados
                            ? undefined
                            : data.tratamentosRealizados,
                    updatedById: user?.id,
                };
                await updateDog(dogIdEditMode, updatePayload);
            } else {
                const dataPayload: CreateDogDto = {
                    name: data.nomeExibicao,
                    dogStatus: data.status,
                    gender: data.genero,
                    age: data.idade,
                    size: data.porte,
                    description: data.descricao,
                    needsSpecialCare: data.possuiAlgumaInaptidao === "true",
                    assets: [],
                    createdById: user?.id ?? "",
                    updatedById: user?.id ?? "",
                };
                // Create new dog
                await createDog(dataPayload);
            }
            router.push(PrivateRoutes.MANAGE_DOGS);
            router.refresh();
        } catch (error) {
            console.error("Erro ao cadastrar cachorro:", error);
        }
    };

    const formFields = [
        ...getBaseFormConfig(),
        ...(isHappyEndingMode ? getExtendedFormConfig() : []),
    ];

    const title = dogIdEditMode ? "Editar Cachorro" : "Adicionar Cachorro";
    const buttonLabel = dogIdEditMode ? "Salvar Alterações" : "Salvar Cachorro";

    const renderContent = () => {
        if (dogsLoading) {
            return <Spinner />;
        }

        return (
            <div className="bg-gray-200 shadow-md rounded-lg p-6">
                <Form<IDogForm>
                    handleSubmit={handleSubmit(onSubmit)}
                    formFields={formFields}
                    register={register}
                    errors={errors}
                    submitLabel={buttonLabel}
                />
            </div>
        );
    };

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-screen-xl mx-auto px-8 py-11 flex flex-col w-full">
                <div className="flex items-center mb-6">
                    <Link
                        href={PrivateRoutes.MANAGE_DOGS}
                        className="bg-primary-400 hover:bg-gray-200 text-gray-700 p-2 rounded-full mr-4 transition-colors"
                    >
                        <LuArrowLeft className="h-5 w-5" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                </div>

                {renderContent()}
            </div>
        </div>
    );
}
