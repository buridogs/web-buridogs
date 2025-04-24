"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LuArrowLeft, LuLoader2, LuSave, LuUpload } from "react-icons/lu";
import { cachorrosMock } from "../page";
import { IAdocaoDetails } from "@/interfaces/adocaoInterfaces";

export default function NovoCachorroPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [images, setImages] = useState<File[]>([]);
    const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
    const [dogData, setDogData] = useState<IAdocaoDetails | null>(null); // State to hold dog data

    const queryParamsDogId = useSearchParams().get("dogId");
    console.log("queryParamsDogId", queryParamsDogId);

    useEffect(() => {
        if (queryParamsDogId) {
            // Fetch dog data from API using queryParamsDogId
            // and populate the form fields with the data.
            const dogFound = cachorrosMock.find((dog) => String(dog.id) === queryParamsDogId);
            if (dogFound) {
                setDogData(dogFound);
            }
        }
    }, [queryParamsDogId]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);

        // Mock API call - would be replaced with actual API integration
        try {
            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Redirect to the dog list after successful creation
            router.push("/volunteer/gerenciar-cachorros");
            router.refresh();
        } catch (error) {
            console.error("Error creating dog record:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);
            const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file));

            setImages((prevImages) => [...prevImages, ...newFiles]);
            setImagePreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls]);
        }
    };

    const removeImage = (index: number) => {
        setImages((prevImages) => {
            const newImages = [...prevImages];
            newImages.splice(index, 1);
            return newImages;
        });

        setImagePreviewUrls((prevUrls) => {
            const newUrls = [...prevUrls];
            URL.revokeObjectURL(newUrls[index]); // Clean up memory
            newUrls.splice(index, 1);
            return newUrls;
        });
    };

    //TODO: CHECK THE SAME WRAPPER FOR ALL THE SCREENS. WHY DONT WE STANDARDIZE IT?
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
                    <h1 className="text-2xl font-bold text-gray-900">Adicionar Cachorro</h1>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-200 shadow-md rounded-lg p-6"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col">
                            <label
                                htmlFor="nome"
                                className="text-sm text-gray-600 mb-1"
                            >
                                Nome
                            </label>
                            <input
                                id="nome"
                                type="text"
                                className="border border-gray-300 rounded-lg p-2"
                                required
                            />
                        </div>

                        <div className="flex flex-col">
                            <label
                                htmlFor="genero"
                                className="text-sm text-gray-600 mb-1"
                            >
                                Gênero
                            </label>
                            <select
                                id="genero"
                                className="border border-gray-300 rounded-lg p-2"
                                required
                            >
                                <option value="">Selecione</option>
                                <option value="macho">Macho</option>
                                <option value="femea">Fêmea</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label
                                htmlFor="idade"
                                className="text-sm text-gray-600 mb-1"
                            >
                                Idade
                            </label>
                            <select
                                id="idade"
                                className="border border-gray-300 rounded-lg p-2"
                                required
                            >
                                <option value="">Selecione</option>
                                <option value="filhote">Filhote</option>
                                <option value="adulto">Adulto</option>
                                <option value="senior">Sênior</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label
                                htmlFor="porte"
                                className="text-sm text-gray-600 mb-1"
                            >
                                Porte
                            </label>
                            <select
                                id="porte"
                                className="border border-gray-300 rounded-lg p-2"
                                required
                            >
                                <option value="">Selecione</option>
                                <option value="pequeno">Pequeno</option>
                                <option value="medio">Médio</option>
                                <option value="grande">Grande</option>
                            </select>
                        </div>

                        <div className="flex flex-col md:col-span-2">
                            <label
                                htmlFor="descricao"
                                className="text-sm text-gray-600 mb-1"
                            >
                                Descrição
                            </label>
                            <textarea
                                id="descricao"
                                className="border border-gray-300 rounded-lg p-2 min-h-[120px]"
                                required
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-sm text-gray-600 mb-3 block">Fotos</label>

                            <div className="flex flex-wrap gap-4 mb-4">
                                {imagePreviewUrls.map((url, index) => (
                                    <div
                                        key={index}
                                        className="relative w-32 h-32"
                                    >
                                        <img
                                            src={url}
                                            alt={`Preview ${index}`}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}

                                <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                                    <LuUpload className="h-8 w-8 text-gray-400 mb-2" />
                                    <span className="text-sm text-gray-500">Adicionar foto</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                        multiple
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-8">
                        <Link
                            href="/volunteer/gerenciar-cachorros"
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-6 rounded-lg transition-colors"
                        >
                            Cancelar
                        </Link>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-primary-700 hover:bg-primary-400 text-white py-2 px-6 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-70"
                        >
                            {isSubmitting ? (
                                <>
                                    <LuLoader2 className="h-5 w-5 animate-spin" />
                                    Salvando...
                                </>
                            ) : (
                                <>
                                    <LuSave className="h-5 w-5" />
                                    Salvar
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
