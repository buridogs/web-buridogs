import { generateImgURL } from "@/utils/methods";
import Image from "next/image";

export function AdocaoInstrucoes() {
    return (
        <section className="flex flex-col-reverse items-center lg:flex-row">
            <div className="flex flex-col items-center md:items-start">
                <h1 className="text-primary-400 text-3xl leading-10 font-bold mt-8 md:text-4xl md:mt-0">
                    Adoção
                </h1>
                <h2 className="text-grey-400 text-2xl font-bold leading-9 my-6 text-left">
                    Entenda como acontece a adoção de um animalzinho
                </h2>
                <p className="text-grey-400 text-xl font-medium leading-6 text-left">
                    Para adotar um cãozinho é bastante simples. Você escolhe o animal que tem as
                    características que você deseja. Opta por ele clicando no botão &quot;Quero
                    adotar esse&quot;. Você será direcionado para um formulário com perguntas sobre
                    as expectativas e como será o ambiente em que o cão viverá. Vamos analisar se
                    suas demandas combinam com o perfil do animal escolhido.
                    <br />
                    <br />
                    Estando tudo alinhado, nós vamos te chamar e acertar a entrega do animal e
                    assinatura de um termo por meio do qual você se compromete a ser um tutor
                    responsável. Lembrando que os nossos <strong>cães adultos</strong> são entregues{" "}
                    <strong>castrados e vacinados</strong>. Já os <strong>filhotes</strong>, também
                    são entregues
                    <strong> vacinados</strong>, porém{" "}
                    <strong>castrados, somente se já tiverem 6 meses</strong>, idade mínima para a
                    esterelização.
                </p>
                <strong className="text-grey-100 text-lg uppercase my-6">
                    Dicas para quem adota um cãozinho
                </strong>
                <ul className="list-disc [&>li+li]:mt-4 ml-4">
                    <li className="text-grey-400 text-base font-medium">
                        Não há mistério na adoção de um cãozinho, a regra é ser amoroso e paciente.
                    </li>
                    <li className="text-grey-400 text-base font-medium">
                        Lembre que o animal pode ficar arredio nos primeiros dias. É normal ficar
                        apático ou até agitado. O tutor não deve ficar ansioso, isso vai ser
                        contornado com o passar dos dias.
                    </li>
                    <li className="text-grey-400 text-base font-medium">
                        Saia pelo menos uma vez com o cachorro para a rua para ele fazer suas
                        necessidades.
                    </li>
                    <li className="text-grey-400 text-base font-medium">
                        Mesmo saindo, mantenha um tapete higiênico sempre no mesmo local para que
                        ele possa também fazer as necessidades dentro de casa, em lugar apropriado.
                    </li>
                    <li className="text-grey-400 text-base font-medium">
                        Alimente-o com ração sem corante e vale misturar alguma proteína se ele não
                        estiver acostumado com o produto, o que é normal com cães que viviam nas
                        ruas.
                    </li>
                    <li className="text-grey-400 text-base font-medium">
                        Os comedouros devem ficar separados dos tapetinhos higiênicos.
                    </li>
                    <li className="text-grey-400 text-base font-medium">
                        Brinquedinhos de morder e bolinhas costumam ser uma boa distração pros
                        cãezinhos.
                    </li>
                    <li className="text-grey-400 text-base font-medium">
                        Não saia com o cãozinho quando o sol estiver forte pra evitar que o
                        calçamento fira as patinhas.
                    </li>
                    <li className="text-grey-400 text-base font-medium">
                        Deixe água gelada nos dias de calor intenso.
                    </li>
                    <li className="text-grey-400 text-base font-medium">
                        Acostume o cãozinho a dormir na sua própria caminha.
                    </li>
                    <li className="text-grey-400 text-base font-medium">
                        Ao leva-lo ao veterinário, lembre do cartão de vacina.
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
