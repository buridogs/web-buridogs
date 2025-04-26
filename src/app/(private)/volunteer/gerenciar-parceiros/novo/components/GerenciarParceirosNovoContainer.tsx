"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LuArrowLeft } from "react-icons/lu";
import { toast } from "react-toastify";
import Form from "@/components/Form/Form";
import { useEffect } from "react";
import { parceiros } from "@/mock/parceirosMock";
import { IParceiros } from "@/interfaces/parceirosInterfaces";
import { getFormConfig, schema } from "../shared/GerenciarParceirosNovoUtils";
import { IPartnerForm } from "../shared/GerenciarParceirosNovoTypes";

export default function GerenciarParceirosNovoContainer() {
    const router = useRouter();
    const partnerId = useSearchParams().get("id");

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
            const foundPartner = parceiros.find((partner) => partner.id?.toString() === partnerId);
            if (foundPartner) {
                console.log("Partner found for edit mode:", foundPartner);
                setValue("nome", foundPartner.nome);
                setValue("endereco", foundPartner.endereco || "");
                setValue("contato", foundPartner.contato || "");
                setValue("descricao", foundPartner.descricao || "");
                setValue("categoria", foundPartner.categoria);

                // Set social media values if they exist
                if (foundPartner.redesSociais) {
                    setValue("instagram", foundPartner.redesSociais.instagram || "");
                    setValue("facebook", foundPartner.redesSociais.facebook || "");
                    setValue("website", foundPartner.redesSociais.site || "");
                }

                // Note: Can't pre-fill image, but we could show it separately
            }
        }
    }, [partnerId, setValue]);

    const onSubmit = async (data: IPartnerForm) => {
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // This is where you would handle image uploading and API request
            const partnerData: IParceiros = {
                id: partnerId ?? "",
                nome: data.nome,
                endereco: data.endereco,
                contato: data.contato,
                descricao: data.descricao,
                categoria: data.categoria,
                imagemSrc: "/placeholder.jpg", // Would come from uploaded image
                redesSociais: {
                    instagram: data.instagram || undefined,
                    facebook: data.facebook || undefined,
                    site: data.website || undefined,
                },
            };

            console.log("Submitted partner data:", partnerData);

            toast.success(
                partnerId ? "Parceiro atualizado com sucesso!" : "Parceiro cadastrado com sucesso!"
            );
            router.push("/volunteer/gerenciar-parceiros");
            router.refresh();
        } catch (error) {
            console.error("Erro ao salvar parceiro:", error);
            toast.error("Erro ao salvar parceiro. Tente novamente.");
        }
    };

    const formFields = getFormConfig();
    const title = partnerId ? "Editar Parceiro" : "Adicionar Parceiro";
    const buttonLabel = partnerId ? "Salvar Alterações" : "Salvar Parceiro";

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-screen-xl mx-auto px-8 py-11 flex flex-col w-full">
                <div className="flex items-center mb-6">
                    <Link
                        href="/volunteer/gerenciar-parceiros"
                        className="bg-primary-400 hover:bg-gray-200 text-gray-700 p-2 rounded-full mr-4 transition-colors"
                    >
                        <LuArrowLeft className="h-5 w-5" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                </div>

                <div className="bg-gray-200 shadow-md rounded-lg p-6">
                    <Form<IPartnerForm>
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
