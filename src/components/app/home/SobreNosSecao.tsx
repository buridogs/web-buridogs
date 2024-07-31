import { Button } from "@/components/Button/Button";
import { generateImgURL } from "@/utils/methods";
import Image from "next/image";
import Link from "next/link";

export function SobreNosSecao() {
    return (
        <section className="w-full bg-primary-50">
            <div className="max-w-screen-xl mx-auto flex flex-col items-center justify-evenly lg:flex-row px-8 py-8">
                <div className="flex flex-col py-8 max-w-[500px] md:pr-8 lg:ml-10">
                    <h1 className="text-primary-400 text-3xl font-bold leading-[40px] mb-4 lg:text-4xl lg:leading-[52px]">
                        Conheça mais do nosso trabalho
                    </h1>
                    <span className="text-gray-400 text-xl leading-8 mb-8 lg:3xl">
                        A partir de uma ideia e de pessoas comprometidas e apaixonadas pelos
                        animais, o grupo iniciou e foi crescendo aos poucos. Nossa história vem
                        sendo construída a cada ano que passa!
                    </span>
                    <Link
                        href="/sobre-nos"
                        className="w-full"
                    >
                        <Button
                            label="Conheça o Buridogs"
                            customBorderColor="border-gray-400"
                            customTextColor="text-gray-400"
                            customCss="w-full"
                        />
                    </Link>
                </div>
                <Image
                    src={generateImgURL("sobre-nos-foto-equipe-3.jpg")}
                    alt="Cachorro"
                    width={430}
                    height={430}
                    className="hidden rounded-3xl lg:block"
                />
            </div>
        </section>
    );
}
