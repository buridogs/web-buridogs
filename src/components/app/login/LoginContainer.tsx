"use client";

import { LoginForm } from "./LoginForm";

export default function LoginContainer() {
    return (
        <div className="flex flex-col">
            <section className="max-w-screen-xl px-8 mx-auto h-full">
                <div className="py-11 grow flex items-center lg:py-[56px]">
                    <div className="flex flex-col items-center md:items-start lg:max-w-[500px]">
                        <h1 className="text-gray-700 text-3xl leading-10 font-bold md:text-4xl pt-6">
                            <span className="text-primary-400">Acesse sua conta</span>
                        </h1>
                        <strong className="py-5 text-gray-700 font-medium text-xl">
                            Entre com suas credenciais para acessar o sistema Buridogs
                        </strong>

                        <LoginForm />
                    </div>
                </div>
            </section>
        </div>
    );
}
