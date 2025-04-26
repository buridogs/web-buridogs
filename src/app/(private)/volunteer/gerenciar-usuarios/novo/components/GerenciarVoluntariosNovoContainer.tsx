"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LuArrowLeft } from "react-icons/lu";
import { toast } from "react-toastify";
import Form from "@/components/Form/Form";
import { useEffect } from "react";
import { voluntarios } from "@/mock/voluntariosMock";
import { IVoluntarios } from "@/interfaces/voluntariosInterfaces";
import { getFormConfig, schema } from "../shared/GerenciarUsuariosNovoUtils";
import { IUsuariosForm } from "../shared/GerenciarUsuariosNovoTypes";
import { PrivateRoutes } from "@/components/Header/routes-ui";

export default function GerenciarVoluntariosNovoContainer() {
    const router = useRouter();
    const volunteerId = useSearchParams().get("id");

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<IUsuariosForm>({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (volunteerId) {
            // Fetch volunteer data by ID and set default values
            const foundVolunteer = voluntarios.find(
                (volunteer) => volunteer.id?.toString() === volunteerId
            );
            if (foundVolunteer) {
                console.log("Volunteer found for edit mode:", foundVolunteer);
                setValue("nome", foundVolunteer.nome);
                setValue("email", foundVolunteer.email);
                setValue("apelido", foundVolunteer.apelido);
                setValue("permissao", foundVolunteer.permissao);
            }
        }
    }, [volunteerId, setValue]);

    const onSubmit = async (data: IUsuariosForm) => {
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // This is where you would handle API request
            const volunteerData: IVoluntarios = {
                id: volunteerId ?? "",
                nome: data.nome,
                email: data.email,
                apelido: data.apelido,
                permissao: data.permissao,
            };

            console.log("Submitted volunteer data:", volunteerData);

            toast.success(
                volunteerId
                    ? "Voluntário atualizado com sucesso!"
                    : "Voluntário cadastrado com sucesso!"
            );
            router.push(PrivateRoutes.MANAGE_USERS);
            router.refresh();
        } catch (error) {
            console.error("Erro ao salvar voluntário:", error);
            toast.error("Erro ao salvar voluntário. Tente novamente.");
        }
    };

    const formFields = getFormConfig();
    const title = volunteerId ? "Editar Voluntário" : "Adicionar Voluntário";
    const buttonLabel = volunteerId ? "Salvar Alterações" : "Salvar Voluntário";

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-screen-xl mx-auto px-8 py-11 flex flex-col w-full">
                <div className="flex items-center mb-6">
                    <Link
                        href={PrivateRoutes.MANAGE_USERS}
                        className="bg-primary-400 hover:bg-gray-200 text-gray-700 p-2 rounded-full mr-4 transition-colors"
                    >
                        <LuArrowLeft className="h-5 w-5" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                </div>

                <div className="bg-gray-200 shadow-md rounded-lg p-6">
                    <Form<IUsuariosForm>
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
