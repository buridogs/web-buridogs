import Image from "next/image";

export function AdocaoInstrucoes() {
    return (
        <section className="flex flex-col-reverse items-center lg:flex-row">
            <div className="flex flex-col items-center">
                <h1 className="text-primary-400 text-3xl leading-10 font-bold md:text-4xl mt-8">
                    Adoção
                </h1>
                <h2 className="text-grey-400 text-2xl font-bold leading-9 my-6 text-left">
                    Entenda como acontece a adoção de um animalzinho
                </h2>
                <p className="text-grey-400 text-xl font-medium leading-6 text-left">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida, eros vitae
                    venenatis volutpat, tellus odio tincidunt odio, et porttitor orci dui in ante.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida, eros vitae
                    venenatis volutpat, tellus odio tincidunt odio, et porttitor orci dui in ante.
                </p>
                <strong className="text-grey-100 text-lg uppercase my-6">Regras para adoção</strong>
                <ul className="list-disc [&>li+li]:mt-4">
                    <li className="text-grey-400 text-base font-medium">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida, eros
                        vitae venenatis volutpat, tellus odio tincidunt odio, et porttitor orci dui
                        in ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                        gravida, eros vitae venenatis volutpat, tellus odio tincidunt odio, et
                        porttitor orci dui in ante.
                    </li>
                    <li>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida, eros
                        vitae venenatis volutpat, tellus odio tincidunt odio, et porttitor orci dui
                        in ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                        gravida, eros vitae venenatis volutpat, tellus odio tincidunt odio, et
                        porttitor orci dui in ante.
                    </li>
                </ul>
            </div>
            <Image
                src="/image-banner.png"
                alt="Banner"
                width={300}
                height={300}
                className="rounded-full lg:w-[470px] lg:h-[470px] lg:ml-4"
            />
        </section>
    );
}
