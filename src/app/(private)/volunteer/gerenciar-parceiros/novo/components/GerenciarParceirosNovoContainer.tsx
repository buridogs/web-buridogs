"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LuArrowLeft } from "react-icons/lu";
import Form from "@/components/Form/Form";
import { useEffect, useState } from "react";
import {
    getFormConfig,
    mapPayloadCreateData,
    mapPayloadUpdateData,
    schema,
} from "../shared/GerenciarParceirosNovoUtils";
import { IPartnerForm } from "../shared/GerenciarParceirosNovoTypes";
import { PrivateRoutes } from "@/components/Header/routes-ui";
import { usePartners } from "@/hooks/partners-hook";
import { PartnetSocialMediaEnum } from "@/services/api/modules/partners/types";
import { Spinner } from "@/components/Spinner/Spinner";
import { IPartnerUI } from "@/interfaces/parceirosInterfaces";

export default function GerenciarParceirosNovoContainer() {
    const router = useRouter();
    const partnerId = useSearchParams().get("id");
    const [partnerToEdit, setPartnerToEdit] = useState<IPartnerUI | null>(null);

    const {
        getPartnerById,
        createPartner,
        updatePartner,
        isLoading: partnersLoading,
    } = usePartners();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<IPartnerForm>({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (partnerId) {
            // Fetch partner data by ID and set default values
            const fetchPartnerData = async () => {
                const foundPartner = await getPartnerById(partnerId);
                if (foundPartner) {
                    setPartnerToEdit(foundPartner);
                    setValue("nome", foundPartner.nome);
                    setValue("endereco", foundPartner.endereco || "");
                    setValue("contato", foundPartner.contato || "");
                    setValue("descricao", foundPartner.descricao || "");
                    setValue("categoria", foundPartner.categoria);

                    // Set social media values if they exist
                    if (foundPartner.redesSociais) {
                        setValue(
                            "instagram",
                            foundPartner.redesSociais.find(
                                (sm) => sm.socialMedia === PartnetSocialMediaEnum.instagram
                            )?.urlLink || ""
                        );
                        setValue(
                            "facebook",
                            foundPartner.redesSociais.find(
                                (sm) => sm.socialMedia === PartnetSocialMediaEnum.facebook
                            )?.urlLink || ""
                        );
                        setValue(
                            "website",
                            foundPartner.redesSociais.find(
                                (sm) => sm.socialMedia === PartnetSocialMediaEnum.website
                            )?.urlLink || ""
                        );
                    }
                }
            };

            fetchPartnerData();
        }
    }, [partnerId, setValue]);

    const onSubmit = async (data: IPartnerForm) => {
        try {
            if (partnerId) {
                // Update existing partner
                const updatedPartner = mapPayloadUpdateData(data, partnerToEdit);
                await updatePartner(partnerId, updatedPartner);
            } else {
                // Create new partner
                const newPartner = mapPayloadCreateData(data);
                await createPartner(newPartner);
            }
            router.push(PrivateRoutes.MANAGE_PARTNERS);
            router.refresh();
        } catch (error) {
            console.error("Erro ao salvar parceiro:", error);
        }
    };

    const formFields = getFormConfig();
    const title = partnerId ? "Editar Parceiro" : "Adicionar Parceiro";
    const buttonLabel = partnerId ? "Salvar Alterações" : "Salvar Parceiro";

    const renderContent = () => {
        if (partnersLoading) {
            return <Spinner />;
        }

        return (
            <div className="bg-gray-200 shadow-md rounded-lg p-6">
                <Form<IPartnerForm>
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
                        href={PrivateRoutes.MANAGE_PARTNERS}
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
