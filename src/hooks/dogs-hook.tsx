"use client";

import { useCallback, useEffect, useState } from "react";

import { toast } from "react-toastify";
import { ApiError } from "@/services/api/core/base-service-api";
import { dogService } from "@/services/api/modules/dogs/dogs-service";
import { CreateDogDto, IDog, UpdateDogDto } from "@/services/api/modules/dogs/types";
import { IDogUI } from "@/interfaces/dogInterfaces";

type RequestStatus = "idle" | "loading" | "success" | "error";

export const useDogs = () => {
    const [dogs, setDogs] = useState<IDogUI[]>([]);
    const [status, setStatus] = useState<RequestStatus>("idle");
    const [error, setError] = useState<string | null>(null);

    const convertToDogUI = (dog: IDog): IDogUI => ({
        id: dog.id,
        nomeExibicao: dog.name,
        status: dog.dogStatus,
        slug: dog.name.toLowerCase().replace(/\s+/g, "_"),
        genero: dog.gender,
        idade: dog.age,
        porte: dog.size,
        descricao: dog.description,
        possuiAlgumaInaptidao: dog.needsSpecialCare,
        inaptidaoDescricao: dog.specialCareDescription ?? "",
        descricaoHappyEnding: dog.happyEndingDescription ?? "",
        localAcolhimento: dog.shelterLocation ?? "",
        tratamentosRealizados: dog.treatmentsPerformed ?? "",
        images: dog.assets
            ?.filter((asset) => asset.sourceType === "image")
            .map((asset) => ({
                src: asset.urlLink,
                alt: asset.assetType,
                type: asset.assetType === "none" ? "common" : asset.assetType, // TODO: FIX IT
            })),
        youtubeVideos: dog.assets
            ?.filter((asset) => asset.sourceType === "video")
            .map((asset) => ({
                src: asset.urlLink,
                type: asset.assetType === "before" ? "before" : "after",
            })),
    });

    // Function to fetch all dogs
    const fetchDogs = useCallback(async () => {
        setStatus("loading");
        setError(null);

        try {
            const data = await dogService.getDogs();
            const dogsUi: IDogUI[] = data.map(convertToDogUI);

            setDogs(dogsUi);
            setStatus("success");
        } catch (err) {
            setStatus("error");
            const message = err instanceof ApiError ? err.message : "Erro ao buscar cachorros";
            setError(message);
            toast.error(message);
            // eslint-disable-next-line no-console
            console.error("Error fetching dogs:", err);
        }
    }, [toast]);

    // Function to get a single dog by ID
    const getDogById = useCallback(
        async (id: string) => {
            setStatus("loading");
            setError(null);

            try {
                const dog = await dogService.getDogById(id);
                const dogUi = convertToDogUI(dog);
                setStatus("success");
                return dogUi;
            } catch (err) {
                setStatus("error");
                const message =
                    err instanceof ApiError ? err.message : `Erro ao buscar cachorro com ID ${id}`;
                setError(message);
                toast.error(message);
                // eslint-disable-next-line no-console
                console.error("Error fetching dog by ID:", err);
                throw err;
            }
        },
        [toast]
    );

    // Function to create a dog
    const createDog = useCallback(
        async (data: CreateDogDto) => {
            setStatus("loading");
            setError(null);

            try {
                const newDog = await dogService.createDog(data);
                setDogs((prev) => [...prev, convertToDogUI(newDog)]);
                setStatus("success");
                toast.success("Cachorro cadastrado com sucesso!");
                return newDog;
            } catch (err) {
                setStatus("error");
                const message =
                    err instanceof ApiError ? err.message : "Erro ao cadastrar cachorro";
                setError(message);
                toast.error(message);
                throw err;
            }
        },
        [toast]
    );

    // Function to update a dog
    const updateDog = useCallback(
        async (id: string, data: UpdateDogDto) => {
            setStatus("loading");
            setError(null);

            try {
                const updatedVolunteer = await dogService.updateDog(id, data);
                setDogs((prev) =>
                    prev.map((dogs) =>
                        String(dogs.id) === id ? convertToDogUI(updatedVolunteer) : dogs
                    )
                );
                setStatus("success");
                toast.success("Cachorro atualizado com sucesso!");
                return updatedVolunteer;
            } catch (err) {
                setStatus("error");
                const message =
                    err instanceof ApiError
                        ? err.message
                        : `Erro ao atualizar cachorro com ID ${id}`;
                setError(message);
                toast.error(message);
                throw err;
            }
        },
        [toast]
    );

    // Function to delete a dog
    const deleteDog = useCallback(
        async (id: string) => {
            setStatus("loading");
            setError(null);

            try {
                await dogService.deleteDog(id);
                setDogs((prev) => prev.filter((dog) => String(dog.id) !== id));
                setStatus("success");
                toast.success("Cachorro excluído com sucesso!");
            } catch (err) {
                setStatus("error");
                const message =
                    err instanceof ApiError ? err.message : `Erro ao deletar cachorro com ID ${id}`;
                setError(message);
                toast.error(message);
                throw err;
            }
        },
        [toast]
    );

    // Load dogs when the component mounts
    useEffect(() => {
        fetchDogs();
    }, [fetchDogs]);

    return {
        dogs,
        isLoading: status === "loading",
        isError: status === "error",
        error,
        fetchDogs,
        getDogById,
        createDog,
        updateDog,
        deleteDog,
    };
};
