"use client";

import {
    CreatePartnerDto,
    IPartner,
    UpdatePartnetDto,
} from "@/services/api/modules/partners/types";
import { useCallback, useEffect, useState } from "react";
import { ApiError } from "@/services/api/core/base-service-api";
import { IPartnerUI } from "@/interfaces/parceirosInterfaces";
import { partnerService } from "@/services/api/modules/partners/partners-service";
import { toast } from "react-toastify";

type RequestStatus = "idle" | "loading" | "success" | "error";

export const usePartners = () => {
    const [partners, setPartners] = useState<IPartnerUI[]>([]);
    const [status, setStatus] = useState<RequestStatus>("idle");
    const [error, setError] = useState<string | null>(null);

    const convertToPartnerUI = (partner: IPartner): IPartnerUI => {
        // Extract social media links into a more UI-friendly format
        const socialMedia = partner.socialMedia?.map((sm) => ({
            id: sm.id,
            socialMedia: sm.socialMedia,
            urlLink: sm.urlLink,
        }));

        return {
            id: partner.id,
            nome: partner.name,
            endereco: partner.address,
            contato: partner.phone ?? "",
            categoria: partner.category,
            redesSociais: socialMedia,
            imagemSrc: partner.imageSrc,
        };
    };

    // Function to fetch all partners
    const fetchPartners = useCallback(async () => {
        setStatus("loading");
        setError(null);

        try {
            const data = await partnerService.getPartners();
            const partnersUI: IPartnerUI[] = data.map(convertToPartnerUI);

            setPartners(partnersUI);
            setStatus("success");
        } catch (err) {
            setStatus("error");
            const message = err instanceof ApiError ? err.message : "Erro ao buscar parceiros";
            setError(message);
            toast.error(message);
            // eslint-disable-next-line no-console
            console.error("Error fetching partners:", err);
        }
    }, []);

    // Function to get a single partner by ID
    const getPartnerById = useCallback(async (id: string) => {
        setStatus("loading");
        setError(null);

        try {
            const partner = await partnerService.getPartnerById(id);
            const partnerUI = convertToPartnerUI(partner);
            setStatus("success");
            return partnerUI;
        } catch (err) {
            setStatus("error");
            const message =
                err instanceof ApiError ? err.message : `Erro ao buscar parceiro com ID ${id}`;
            setError(message);
            toast.error(message);
            // eslint-disable-next-line no-console
            console.error("Error fetching partner by ID:", err);
            throw err;
        }
    }, []);

    // Function to create a partner
    const createPartner = useCallback(async (data: CreatePartnerDto) => {
        setStatus("loading");
        setError(null);

        try {
            const newPartner = await partnerService.createPartner(data);
            setPartners((prev) => [...prev, convertToPartnerUI(newPartner)]);
            setStatus("success");
            toast.success("Parceiro cadastrado com sucesso!");
            return newPartner;
        } catch (err) {
            setStatus("error");
            const message = err instanceof ApiError ? err.message : "Erro ao cadastrar parceiro";
            setError(message);
            toast.error(message);
            throw err;
        }
    }, []);

    // Function to update a partner
    const updatePartner = useCallback(async (id: string, data: UpdatePartnetDto) => {
        setStatus("loading");
        setError(null);

        try {
            const updatedPartner = await partnerService.updatePartner(id, data);
            setPartners((prev) =>
                prev.map((partner) =>
                    String(partner.id) === id ? convertToPartnerUI(updatedPartner) : partner
                )
            );
            setStatus("success");
            toast.success("Parceiro atualizado com sucesso!");
            return updatedPartner;
        } catch (err) {
            setStatus("error");
            const message =
                err instanceof ApiError ? err.message : `Erro ao atualizar parceiro com ID ${id}`;
            setError(message);
            toast.error(message);
            throw err;
        }
    }, []);

    // Function to delete a partner
    const deletePartner = useCallback(async (id: string) => {
        setStatus("loading");
        setError(null);

        try {
            await partnerService.deletePartner(id);
            setPartners((prev) => prev.filter((partner) => String(partner.id) !== id));
            setStatus("success");
            toast.success("Parceiro excluído com sucesso!");
        } catch (err) {
            setStatus("error");
            const message =
                err instanceof ApiError ? err.message : `Erro ao deletar parceiro com ID ${id}`;
            setError(message);
            toast.error(message);
            throw err;
        }
    }, []);

    // Load partners when the component mounts
    useEffect(() => {
        fetchPartners();
    }, [fetchPartners]);

    return {
        partners,
        isLoading: status === "loading",
        isError: status === "error",
        error,
        fetchPartners,
        getPartnerById,
        createPartner,
        updatePartner,
        deletePartner,
    };
};
