import { generateImgURL } from "@/utils/methods";
import Image from "next/image";

export function ApadrinhamentoInstrucoes() {
    const instrucoes = [
        "Mantenha-se Informado: Acompanhe as atualizações fornecidos pelo Buridogs nas redes sociais. Isso ajuda você a se manter conectado e informado sobre o progresso do cão que você apadrinha.",
        "Comunique-se: Entre em contato com a organização se tiver alguma dúvida ou preocupação sobre seu apadrinhamento ou o bem-estar do cão.",
        "Seja Paciente: Alguns cães podem demorar mais para se recuperar ou se ajustar. Seu apoio é crucial nesses momentos, então mantenha-se paciente e compreensivo.",
        "Envolva-se: Participe de eventos e atividades organizados pelo Buridogs. É uma ótima maneira de se engajar com a comunidade e apoiar outros cães também.",
        "Considere o Voluntariado: Se você tiver tempo, considere ser voluntário no abrigo. Sua ajuda prática pode fazer uma grande diferença.",
        "Incentive a Adoção: Se conhecer alguém que esteja procurando adotar um cão, compartilhe informações sobre o abrigo e os cães disponíveis para adoção.",
        "Use as Redes Sociais: Compartilhe atualizações e histórias sobre o cão que você patrocina nas redes sociais para aumentar a conscientização e atrair mais padrinhos(as).",
    ];

    return (
        <section className="flex flex-col-reverse items-center lg:flex-row">
            <div className="flex flex-col items-center md:items-start">
                <h1 className="text-primary-400 text-3xl leading-10 font-bold mt-8 md:text-4xl md:mt-0">
                    Apadrinhamento
                </h1>
                <h2 className="text-gray-400 text-2xl font-bold leading-9 my-6 text-left">
                    Entenda como funciona o apadrinhamento
                </h2>
                <p className="text-gray-400 text-xl font-medium leading-6 text-left">
                    Ao se tornar um padrinho(a), você está fazendo uma diferença significativa na
                    vida de cães necessitados. Seu apoio ajuda a fornecer alimentação, cuidados
                    médicos, abrigo e o amor que eles merecem. Aqui está um guia para ajudá-lo a
                    entender como funciona o processo de patrocínio e como você pode se envolver.
                </p>
                <strong className="text-gray-100 text-lg uppercase my-6">
                    Dicas para quem apadrinha um cãozinho
                </strong>
                <ul className="list-disc [&>li+li]:mt-4 ml-4">
                    {instrucoes.map((instruction) => (
                        <li className="text-gray-400 text-base font-medium">{instruction}</li>
                    ))}
                </ul>
            </div>
            <Image
                src={generateImgURL("sobre-nos-homenagem-camara-5.jpg")}
                alt="Equipe do Buridogs"
                width={300}
                height={300}
                className="object-cover rounded-full lg:w-[470px] lg:h-[470px] lg:ml-4"
            />
        </section>
    );
}
