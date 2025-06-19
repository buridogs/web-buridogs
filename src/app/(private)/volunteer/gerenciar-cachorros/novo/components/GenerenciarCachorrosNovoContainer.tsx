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
    mapPayloadCreateDogData,
    mapPayloadUpdateDog,
    schema,
} from "../shared/GerenciarCachorrosNovoUtils";
import { IDogForm } from "../shared/GerenciarCachorrosNovoTypes";
import { useEffect, useState } from "react";
import { PrivateRoutes } from "@/components/Header/routes-ui";
import { useDogs } from "@/hooks/dogs-hook";
import { DogStatusEnum } from "@/services/api/modules/dogs/types";
import { Spinner } from "@/components/Spinner/Spinner";
import { useAuth } from "@/providers/auth/AuthProvider";
import { IDogUI, Img } from "@/interfaces/dogInterfaces";
import { combineFileLists, urlToFileList } from "@/utils/methods";
import {
    AzureBlobStorageContainerNames,
    convertFileToBufferAndUpload,
    deleteBlob,
} from "@/services/azure-blob/azure-blob";

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
                    setValue("inaptidaoDescricao", foundDog.inaptidaoDescricao || "");
                    setValue("descricaoLonga", foundDog.descricaoHappyEnding);
                    setValue("localAcolhimento", foundDog.localAcolhimento);
                    setValue("tratamentosRealizados", foundDog.tratamentosRealizados);
                    setValue(
                        "youtubeSrcUrlAntes",
                        foundDog.youtubeVideos?.find((video) => video.type === "before")?.src
                    );
                    setValue(
                        "youtubeSrcUrlDepois",
                        foundDog.youtubeVideos?.find((video) => video.type === "after")?.src
                    );
                    if (foundDog.images && foundDog.images.length > 0) {
                        const fileListImagensPricipais = foundDog.images
                            .filter((img) => img.type === "main" || img.type === "common")
                            .map((img) => urlToFileList(img.src, img.src));
                        const filesImagensPricipais = await Promise.all(fileListImagensPricipais);
                        const fileListImagensAntes = foundDog.images
                            .filter((img) => img.type === "before")
                            .map((img) => urlToFileList(img.src, img.src));
                        const filesImagensAntes = await Promise.all(fileListImagensAntes);
                        const fileListImagensDepois = foundDog.images
                            .filter((img) => img.type === "after")
                            .map((img) => urlToFileList(img.src, img.src));
                        const filesImagensDepois = await Promise.all(fileListImagensDepois);
                        // create a new FileList from the array of files

                        setValue("imagensPrincipais", combineFileLists(filesImagensPricipais));
                        setValue("imagensAntes", combineFileLists(filesImagensAntes));
                        setValue("imagensDepois", combineFileLists(filesImagensDepois));
                    }
                }
            }
        };

        fetchDogData();
    }, [dogIdEditMode, register]);

    const onSubmit = async (currentFormData: IDogForm) => {
        const formattedFiles: Img[] = [];
        try {
            const processImageType = async (
                imageType: "main" | "before" | "after",
                currentFormImages: FileList | undefined,
                oldDogImages?: Img[]
            ): Promise<Img[]> => {
                if (!currentFormImages) return [];

                const filterType =
                    imageType === "main"
                        ? (img: Img) => img.type === "main" || img.type === "common"
                        : (img: Img) => img.type === imageType;

                const oldImagesSrc = oldDogImages?.filter(filterType).map((img) => img.src);
                const currentImagesSrc = Array.from({ length: currentFormImages.length }).map(
                    (_, idx) => currentFormImages.item(idx)?.name
                );

                const imagesToDelete = oldDogImages
                    ?.filter(filterType)
                    .map((img) => img.src)
                    .filter((src) => !currentImagesSrc?.includes(src));

                const dataTransfer = new DataTransfer();

                Array.from({ length: currentFormImages.length })
                    .filter((_, idx) =>
                        oldImagesSrc?.length
                            ? !oldImagesSrc?.includes(currentFormImages.item(idx)?.name ?? "")
                            : true
                    )
                    .forEach((_, idx) => {
                        dataTransfer.items.add(currentFormImages.item(idx) as File);
                    });

                const imagesToUpload = dataTransfer.files;

                if (imagesToDelete?.length && imagesToDelete.length > 0) {
                    const imagesToDeletePromise =
                        imagesToDelete
                            .filter((src) => !!src)
                            .map((img) => deleteBlob(AzureBlobStorageContainerNames.DOGS, img)) ||
                        [];

                    await Promise.all(imagesToDeletePromise);
                }

                if (imagesToUpload.length > 0) {
                    const imagesAfterUploaded = await convertFileToBufferAndUpload(
                        AzureBlobStorageContainerNames.DOGS,
                        imagesToUpload
                    );

                    return imagesAfterUploaded.flat().map((file) => ({
                        src: file,
                        alt: imageType === "main" ? "main" : imageType,
                        type: imageType === "main" ? "common" : imageType,
                    }));
                } else {
                    return [...(oldDogImages?.filter(filterType) ?? [])];
                }

                // Upload new images
            };

            if (dogIdEditMode) {
                // Process all image types
                const mainImages = await processImageType(
                    "main",
                    currentFormData.imagensPrincipais,
                    dogToEdit?.images
                );
                const beforeImages = await processImageType(
                    "before",
                    currentFormData.imagensAntes,
                    dogToEdit?.images
                );
                const afterImages = await processImageType(
                    "after",
                    currentFormData.imagensDepois,
                    dogToEdit?.images
                );

                formattedFiles.push(...mainImages, ...beforeImages, ...afterImages);

                // Update existing dog
                const updatePayload = mapPayloadUpdateDog(
                    dogToEdit,
                    currentFormData,
                    formattedFiles,
                    user?.id ?? ""
                );
                await updateDog(dogIdEditMode, updatePayload);
            } else {
                // Process all image types
                const mainImages = await processImageType(
                    "main",
                    currentFormData.imagensPrincipais
                );
                const beforeImages = await processImageType("before", currentFormData.imagensAntes);
                const afterImages = await processImageType("after", currentFormData.imagensDepois);

                formattedFiles.push(...mainImages, ...beforeImages, ...afterImages);

                const dataPayload = mapPayloadCreateDogData(
                    currentFormData,
                    formattedFiles,
                    user?.id ?? ""
                );
                // Create new dog
                await createDog(dataPayload);
            }
            router.push(PrivateRoutes.MANAGE_DOGS);
            router.refresh();
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error("Erro ao cadastrar cachorro:", error);
            // Clean up uploaded files if an error occurs
            if (formattedFiles.length > 0) {
                // eslint-disable-next-line no-console
                console.error("Limpando arquivos", formattedFiles);
                const deleteFilesPromises = formattedFiles.map((file) =>
                    deleteBlob(AzureBlobStorageContainerNames.DOGS, file.src)
                );
                await Promise.all(deleteFilesPromises);
            }
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

        const defaultValues = {
            imagensPrincipais: watch("imagensPrincipais"),
            imagensAntes: watch("imagensAntes"),
            imagensDepois: watch("imagensDepois"),
        };

        return (
            <div className="bg-gray-200 shadow-md rounded-lg p-6">
                <Form<IDogForm>
                    handleSubmit={handleSubmit(onSubmit)}
                    formFields={formFields}
                    register={register}
                    errors={errors}
                    submitLabel={buttonLabel}
                    defaultValues={defaultValues}
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
