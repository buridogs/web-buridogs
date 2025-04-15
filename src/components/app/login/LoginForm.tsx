"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LIMITE_TAMANHO_MENSAGEM, MENSAGENS_ERRO } from "@/components/Form/FormConsts";
import { toast } from "react-toastify";
import { Spinner } from "@/components/Spinner/Spinner";
import { LoginCredentials } from "@/interfaces/authInterfaces";
import { useAuth } from "@/providers/auth/AuthProvider";

const schemaLoginForm = yup.object({
    email: yup
        .string()
        .email(MENSAGENS_ERRO().emailInvalido)
        .max(
            LIMITE_TAMANHO_MENSAGEM.medio,
            MENSAGENS_ERRO(LIMITE_TAMANHO_MENSAGEM.medio).tamanhoMaximo
        )
        .required(MENSAGENS_ERRO().campoObrigatorio),
    password: yup.string().required(MENSAGENS_ERRO().campoObrigatorio),
});

export function LoginForm() {
    const { login, isLoading } = useAuth();
    const [formSubmitting, setFormSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<LoginCredentials>({
        resolver: yupResolver(schemaLoginForm),
    });

    const onSubmit = async (data: LoginCredentials) => {
        setFormSubmitting(true);

        try {
            await login(data);
            reset();
        } catch (err: any) {
            console.error(err);
            // The error toast is already handled in the auth context
        } finally {
            setFormSubmitting(false);
        }
    };

    const isSubmitting = isLoading || formSubmitting;

    return (
        <div className="w-full max-w-lg">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full flex flex-col"
            >
                <div className="mb-4 w-full">
                    <label
                        htmlFor="email"
                        className="block text-sm text-gray-100 font-medium mb-1"
                    >
                        E-mail
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="exemplo@email.com"
                        className="w-full py-2 px-3 border-2 border-gray-100 border-solid rounded text-gray-700 placeholder-primary-100"
                        {...register("email")}
                        disabled={isSubmitting}
                    />
                    {errors.email && (
                        <p className="text-sm font-semibold text-red-400 mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div className="mb-4 w-full">
                    <label
                        htmlFor="password"
                        className="block text-sm text-gray-100 font-medium mb-1"
                    >
                        Senha
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="w-full py-2 px-3 border-2 border-gray-100 border-solid rounded text-gray-700 placeholder-primary-100"
                        {...register("password")}
                        disabled={isSubmitting}
                    />
                    {errors.password && (
                        <p className="text-sm font-semibold text-red-400 mt-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center uppercase font-medium py-3 px-4 rounded-3xl border-solid border-2 mt-6 text-white bg-primary-400 border-primary-400 transition duration-150 hover:bg-primary-700 hover:border-primary-700 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? <Spinner /> : "Entrar"}
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-gray-400 text-sm">
                    Para novos cadastros, entrar em contato com a equipe de desenvolvimento.
                </p>
            </div>
        </div>
    );
}
