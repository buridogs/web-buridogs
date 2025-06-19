"use client";

import { useCallback, useEffect, useState } from "react";

import { toast } from "react-toastify";
import { ApiError } from "@/services/api/core/base-service-api";
import {
    CreateFormRequestDto,
    FormRequestStatusEnum,
    FormRequestTypeEnum,
    IFormRequest,
} from "@/services/api/modules/form-requests/types";
import { formRequestsService } from "@/services/api/modules/form-requests/form-requests-service";
import {
    FormAvailableEnum,
    IFormAdoption,
    IFormContact,
    IFormSponsorship,
    IFormUI,
} from "@/interfaces/formularioInterfaces";

type RequestServiceStatus = "idle" | "loading" | "success" | "error";

interface UseFormRequestsProps {
    shouldFetch?: boolean;
    requestStatusToFetch?: FormRequestStatusEnum;
}

export const useFormRequests = ({
    shouldFetch = true,
    requestStatusToFetch,
}: UseFormRequestsProps) => {
    const [formRequests, setFormRequests] = useState<IFormUI[]>([]);
    const [status, setStatus] = useState<RequestServiceStatus>("idle");
    const [error, setError] = useState<string | null>(null);

    const convertFormRequestToUI = (formRequest: IFormRequest): IFormUI => {
        const baseFields = {
            id: formRequest.id,
            createdAt: formRequest.createdAt,
            name: formRequest.detailsForm.nome || "",
            phone_number: formRequest.detailsForm.contato || "",
            status: formRequest.requestStatus as FormRequestStatusEnum,
        };

        switch (formRequest.requestType) {
            case FormRequestTypeEnum.adoption:
                return {
                    ...baseFields,
                    form_type: FormAvailableEnum.ADOPTION,
                    zip_code: formRequest.detailsForm.endereco_cep || "",
                    street:
                        formRequest.detailsForm.endereco_rua ||
                        formRequest.detailsForm.address ||
                        "",
                    number: formRequest.detailsForm.endereco_numero || "",
                    complement: formRequest.detailsForm.endereco_complemento || "",
                    neighborhood: formRequest.detailsForm.endereco_bairro || "",
                    city: formRequest.detailsForm.endereco_cidade || "",
                    state: formRequest.detailsForm.endereco_estado || "",
                    facebook_url: formRequest.detailsForm.facebook_url || "",
                    instagram_url: formRequest.detailsForm.instagram_url || "",
                    first_adoption: !!formRequest.detailsForm.primeira_adocao,
                    reason_for_adoption: formRequest.detailsForm.motivo_adocao || "",
                    number_of_people_in_house:
                        formRequest.detailsForm.quantidade_pessoas_moradia || "",
                    people_agree_with_adoption: !!formRequest.detailsForm.pessoas_de_acordo_adocao,
                    has_children_or_elderly: formRequest.detailsForm.ha_criancas_idosos || [],
                    lives_in_house_or_apartment: formRequest.detailsForm.mora_casa_apt || "",
                    number_of_people_working:
                        formRequest.detailsForm.quantidade_pessoas_trabalham || "",
                    home_has_adoption_structure:
                        formRequest.detailsForm.moradia_tem_estrutura_adocao || "",
                    has_other_animals: formRequest.detailsForm.ha_outros_animais || "",
                    has_had_other_animals: formRequest.detailsForm.ja_teve_outros_animais || "",
                    aware_of_expenses: !!formRequest.detailsForm.esta_ciente_gastos,
                    animal_place_description: formRequest.detailsForm.descricao_lugar_animal || "",
                    return_adoption_situation:
                        formRequest.detailsForm.situacao_devolucao_adocao || "",
                    aware_of_responsibility_term:
                        !!formRequest.detailsForm.consciente_termo_responsabilidade,
                    dog_name:
                        formRequest.dog?.name || formRequest.detailsForm.nomeCachorroAdocao || "",
                    dog_photo: formRequest.dog?.assets[0].urlLink || "",
                    images: formRequest.detailsForm.arquivos || [],
                } as IFormAdoption;

            case FormRequestTypeEnum.sponsorship:
                return {
                    ...baseFields,
                    form_type: FormAvailableEnum.SPONSORSHIP,
                    email: formRequest.detailsForm.email || "",
                    dog_name: formRequest.dog?.name || formRequest.detailsForm.nome_animal || "",
                    contact_method_preference: formRequest.detailsForm.preferencia_contato || [],
                    allow_receiving_news: !!formRequest.detailsForm.quero_receber_contatos,
                    sponsorship_method: formRequest.detailsForm.apadrinhar_com || [],
                } as IFormSponsorship;

            case FormRequestTypeEnum.contact:
                return {
                    ...baseFields,
                    form_type: FormAvailableEnum.CONTACT,
                    email: formRequest.detailsForm.email || "",
                    message: formRequest.detailsForm.mensagem || "",
                } as IFormContact;

            default:
                // eslint-disable-next-line no-console
                console.warn(`Unknown form request type: ${formRequest.requestType}`);
                return {
                    ...baseFields,
                    form_type: FormAvailableEnum.CONTACT,
                    email: formRequest.detailsForm.email || "",
                    message: "",
                } as IFormContact;
        }
    };

    // Function to fetch all form requests
    const fetchFormRequests = useCallback(async (requestStatus?: FormRequestStatusEnum) => {
        setStatus("loading");
        setError(null);

        try {
            const params = requestStatus ? { filter: { requestStatus } } : undefined;
            const data = await formRequestsService.getFormRequests(params);
            setFormRequests(data.map(convertFormRequestToUI));
            setStatus("success");
        } catch (err) {
            setStatus("error");
            const message = err instanceof ApiError ? err.message : "Erro ao buscar formulários";
            setError(message);
            toast.error(message);
            // eslint-disable-next-line no-console
            console.error("Error fetching form requests:", err);
        }
    }, []);

    // Function to create a form request
    const createFormRequest = useCallback(async (data: CreateFormRequestDto) => {
        setStatus("loading");
        setError(null);

        try {
            const newFormRequest = await formRequestsService.createFormRequest(data);
            setFormRequests((prev) => [...prev, convertFormRequestToUI(newFormRequest)]);
            setStatus("success");
            toast.success("Formulário enviado com sucesso!");
            return newFormRequest;
        } catch (err) {
            setStatus("error");
            const message = err instanceof ApiError ? err.message : "Erro ao enviar formulário";
            setError(message);
            toast.error(message);
            throw err;
        }
    }, []);

    // Function to update a form request status
    const updateFormRequestStatus = useCallback(
        async (id: string, requestStatus: FormRequestStatusEnum) => {
            setStatus("loading");
            setError(null);

            try {
                const updatedFormRequest = await formRequestsService.updateFormRequest(id, {
                    requestStatus,
                });
                setFormRequests((prev) =>
                    prev.map((request) =>
                        String(request.id) === id
                            ? convertFormRequestToUI(updatedFormRequest)
                            : request
                    )
                );
                setStatus("success");
                toast.success("Status do formulário atualizado com sucesso!");
                return updatedFormRequest;
            } catch (err) {
                setStatus("error");
                const message =
                    err instanceof ApiError
                        ? err.message
                        : `Erro ao atualizar status do formulário com ID ${id}`;
                setError(message);
                toast.error(message);
                throw err;
            }
        },
        []
    );

    // Load form requests when the component mounts
    useEffect(() => {
        if (!shouldFetch) return;

        fetchFormRequests(requestStatusToFetch);
    }, [fetchFormRequests, shouldFetch, requestStatusToFetch]);

    return {
        formRequests,
        isLoading: status === "loading",
        isError: status === "error",
        error,
        fetchFormRequests,
        createFormRequest,
        updateFormRequestStatus,
    };
};
