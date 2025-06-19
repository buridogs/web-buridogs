"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LuArrowLeft } from "react-icons/lu";
import Form from "@/components/Form/Form";
import { useEffect } from "react";
import { getFormConfig, schema } from "../shared/GerenciarUsuariosNovoUtils";
import { IVolunteerForm } from "../shared/GerenciarUsuariosNovoTypes";
import { PrivateRoutes } from "@/components/Header/routes-ui";
import { useVolunteers } from "@/hooks/users-hook";
import { UpdateVolunteerDto } from "@/services/api/modules/users/types";
import { Spinner } from "@/components/Spinner/Spinner";

export default function GerenciarVoluntariosNovoContainer() {
    const router = useRouter();
    const volunteerId = useSearchParams().get("id");

    const {
        getVolunteerById,
        createVolunteer,
        updateVolunteer,
        isLoading: volunteersLoading,
    } = useVolunteers();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<IVolunteerForm>({
        resolver: yupResolver(schema),
        context: { isEditionMode: !!volunteerId },
    });

    useEffect(() => {
        const fetchVolunteerData = async () => {
            if (volunteerId) {
                // Fetch volunteer data by ID and set default values
                const foundVolunteer = await getVolunteerById(volunteerId);
                if (foundVolunteer) {
                    setValue("name", foundVolunteer.name);
                    setValue("email", foundVolunteer.email);
                    setValue("nickname", foundVolunteer.nickname);
                    setValue("role", foundVolunteer.role);
                }
            }
        };

        fetchVolunteerData();
    }, [volunteerId, setValue]);

    const onSubmit = async (data: IVolunteerForm) => {
        try {
            if (volunteerId) {
                // Update existing volunteer
                const updatePayload: UpdateVolunteerDto = {
                    name: data.name,
                    nickname: data.nickname,
                    role: data.role,
                };
                await updateVolunteer(volunteerId, updatePayload);
            } else {
                // Create new volunteer
                await createVolunteer(data);
            }

            router.push(PrivateRoutes.MANAGE_USERS);
            router.refresh();
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error("Erro ao salvar voluntário:", error);
        }
    };

    const formFields = getFormConfig(!!volunteerId);
    const title = volunteerId ? "Editar Voluntário" : "Adicionar Voluntário";
    const buttonLabel = volunteerId ? "Salvar Alterações" : "Salvar Voluntário";

    const renderContent = () => {
        if (volunteersLoading) {
            return (
                <div className="flex justify-center items-center min-h-screen">
                    <Spinner />
                </div>
            );
        }

        return (
            <div className="bg-gray-200 shadow-md rounded-lg p-6">
                <Form<IVolunteerForm>
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
                        href={PrivateRoutes.MANAGE_USERS}
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
