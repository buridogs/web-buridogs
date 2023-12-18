import { Button } from "@/components/Button/Button";
import { generateImgURL } from "@/utils/methods";
import Image from "next/image";
import Link from "next/link";

export function SecaoPrincipal() {
    return (
        <section className="max-w-screen-xl  mx-auto">
            <div className="flex flex-col items-center lg:flex-row-reverse px-8 py-8">
                <div className="max-w-[600px] lg:ml-10">
                    <div className="flex flex-col py-8">
                        <h1 className="text-grey-400 text-3xl font-bold leading-[40px] mb-4 lg:text-4xl lg:leading-[52px]">
                            Prazer, somos o <strong className="text-primary-400">Buri Dogs</strong>!
                        </h1>
                        <span className="text-grey-400 text-xl leading-8 lg:3xl">
                            O Buri Dogs é um grupo de proteção animal fundado no bairro Buritis, em
                            Belo Horizonte, que acolhe, cuida e busca adoção para cães abandonados.
                            Em quatro anos de atuação já tirou das ruas e encaminhou cerca de 700
                            cães.
                            <br />
                            Em 2022, o trabalho do Buri Dogs foi reconhecido pela Câmara de
                            Vereadores de BH e o grupo recebeu o Diploma de Honra ao Mérito, por
                            sugestão do vereador Miltinho.
                        </span>
                    </div>
                    <div className="flex flex-col justify-center items-center [&>*]:mb-6 mb-8 md:flex-row md:[&>*]:mb-0 md:[&>*]:mr-8">
                        <Link
                            href="/adocao"
                            className="w-full"
                        >
                            <Button
                                label="Quero adotar"
                                customBorderColor="border-primary-400"
                                customTextColor="text-primary-400"
                                customCss="w-full"
                            />
                        </Link>
                        <Link
                            href="/contato"
                            className="w-full"
                        >
                            <Button
                                label="Quero contribuir"
                                customBorderColor="border-primary-400"
                                customTextColor="text-primary-400"
                                customCss="w-full"
                            />
                        </Link>
                    </div>
                </div>
                <Image
                    src={generateImgURL("home-first-section.png")}
                    alt="Cachorro"
                    width={460}
                    height={460}
                    className="rounded-[50%]"
                />
            </div>
        </section>
    );
}
