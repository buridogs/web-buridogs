import { generateImgURL } from "@/utils/methods";
import Image from "next/image";

export function ApadrinhamentoInstrucoes() {
    return (
        <section className="flex flex-col-reverse items-center lg:flex-row">
            <div className="flex flex-col items-center md:items-start">
                <h1 className="text-primary-400 text-3xl leading-10 font-bold mt-8 md:text-4xl md:mt-0">
                    Apadrinhamento
                </h1>
                <h2 className="text-grey-400 text-2xl font-bold leading-9 my-6 text-left">
                    Entenda como funciona o apadrinhamento
                </h2>
                <p className="text-grey-400 text-xl font-medium leading-6 text-left">
                    Para adotar um cãozinho é bastante simples. Você escolhe o animal que tem as
                    características que você deseja. Opta por ele clicando no botão &quot;Quero
                    adotar esse&quot;. Você será direcionado para um formulário com perguntas sobre
                    as expectativas e como será o ambiente em que o cão viverá. Vamos analisar se
                    suas demandas combinam com o perfil do animal escolhido.
                </p>
                <strong className="text-grey-100 text-lg uppercase my-6">
                    Dicas para quem adota um cãozinho
                </strong>
                <ul className="list-disc [&>li+li]:mt-4 ml-4">
                    <li className="text-grey-400 text-base font-medium">
                        Não há mistério na adoção de um cãozinho, a regra é ser amoroso e paciente.
                    </li>
                </ul>
            </div>
            <Image
                src={generateImgURL("sobre-nos-foto-equipe-2.jpg")}
                alt="Equipe do Buridogs"
                width={300}
                height={300}
                className="object-cover rounded-full lg:w-[470px] lg:h-[470px] lg:ml-4"
            />
        </section>
    );
}
