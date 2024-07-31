"use client";
import { sobreNosMomentosBuridogsMock } from "@/mock/sobreNosMomentosBuridogsMock";
import { BURIDOGS_PIX_KEY } from "@/utils/consts";
import { generateImgURL } from "@/utils/methods";
import Image from "next/image";
import AliceCarousel from "react-alice-carousel";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

export function SobreNosContainer() {
    return (
        <section className="max-w-screen-xl px-8 mx-auto h-full flex flex-col">
            <div className="py-11 grow flex flex-col-reverse items-center lg:flex-row lg:items-center lg:justify-between lg:py-[56px]">
                <div className="w-full flex flex-col items-center md:items-start lg:max-w-[600px]">
                    <h1 className="text-gray-700 text-3xl leading-10 font-bold md:text-4xl">
                        <span className="text-primary-400 mr-1">Olá!</span> Somos o Buri Dogs!
                    </h1>
                    <strong className="py-5 text-gray-400 font-bold text-2xl">
                        Um grupo de proteção a cães abandonados do bairro Buritis em Belo Horizonte.
                    </strong>
                    <span className="text-gray-700 text-xl leading-8 font-medium mb-10 lg:text-start">
                        A ideia de formar um grupo de proteção surgiu quando a jornalista Fernanda
                        Castro notou o aumento dos cães abandonados pelas ruas do bairro Buritis.
                        “Um dia fotografei vários cães abandonados no fim da pista de Cooper do
                        Buritis, coloquei ração e água e divulguei em um grupo de discussão do
                        bairro. As pessoas ficaram sensibilizadas e sugeriram a criação do grupo
                        que, a partir daí, não parou mais”, relembra Fernanda. Tentamos focar nos
                        cuidados com os cães. Resgatamos da rua, levamos ao veterinário, compramos
                        remédios, providenciamos castrações e deixamos os animais prontos para
                        adoção. Em uma segunda etapa, divulgamos os cães que precisam de lar,
                        fazemos entrevista com os possíveis adotantes e entregamos os doguinhos para
                        seus novos donos. Um dos grandes problemas, no entanto, é o abrigo dos cães
                        até que consigam a adoção: “Esse é o nosso maior entrave, não temos como
                        pagar a hospedagem dos cães e nem sede física. Por isso, temos que contar
                        com a parceria de toda a comunidade do Buritis, ajudando com lar solidário
                        até que os animais sejam encaminhados”, destaca a administradora e
                        protetora, Christiane Simões.
                    </span>

                    <span className="text-gray-700 text-xl leading-8 font-medium mb-10 lg:text-start">
                        Além de lar solidário, a comunidade também pode ser apoiadora do grupo,
                        doando qualquer quantia para os animais (para isso, use o PIX/Email
                        <strong className="text-primary-400"> {`${BURIDOGS_PIX_KEY}`}</strong>, em
                        nome de <strong className="text-primary-400">Christiane Simões</strong>).
                        Outra forma de ajudar é comprando as rifas em prol dos animais ou destinando
                        ração, medicamentos ou qualquer produto que possa ser útil pros cães.
                    </span>
                </div>
                <Image
                    src={generateImgURL("sobre-nos-feira-adocao.jpg")}
                    alt={"Equipe Buri Dogs"}
                    width={280}
                    height={280}
                    className="w-[300px] h-[300px] rounded-3xl bg-primary-100 mb-10 lg:mb-0 lg:ml-10 lg:w-[300px] lg:h-[300px] xl:w-[450px] xl:h-[450px] object-cover object-top"
                />
            </div>
            <div className="grow flex flex-col items-center justify-center lg:py-[56px]">
                <h2 className="text-primary-400 text-3xl font-bold text-center lg:text-4xl">
                    Momentos que marcaram a nossa história
                </h2>
                <div className="w-full py-10 relative">
                    <AliceCarousel
                        mouseTracking
                        disableDotsControls
                        infinite
                        autoPlay
                        autoPlayInterval={4000}
                        responsive={{
                            0: {
                                items: 1,
                            },
                        }}
                        renderPrevButton={() => (
                            <div className="w-10 h-10 flex items-center justify-center float-left mt-4 rounded-[50%] bg-primary-400 cursor-pointer md:absolute md:top-[100px] md:left-0">
                                <FaArrowLeft color="white" />
                            </div>
                        )}
                        renderNextButton={() => (
                            <div className="w-10 h-10 flex items-center justify-center float-right mt-4 rounded-[50%] bg-primary-400 cursor-pointer md:absolute md:top-[100px] md:right-0">
                                <FaArrowRight color="white" />
                            </div>
                        )}
                        items={sobreNosMomentosBuridogsMock.map((momento) => (
                            <div
                                key={momento.ano}
                                className="w-full flex flex-col items-center lg:flex-row md:justify-evenly md:items-start md:pl-2"
                            >
                                {momento.imgSrc ? (
                                    <Image
                                        key={momento.imgSrc}
                                        src={generateImgURL(momento.imgSrc)}
                                        alt={momento.altText}
                                        width={280}
                                        height={280}
                                        className="w-[200px] h-[200px] md:w-[280px] md:h-[280px] rounded-[50%] object-cover"
                                    />
                                ) : (
                                    <div
                                        key={momento.descricao}
                                        className="w-[200px] h-[200px] md:w-[280px] md:h-[280px] rounded-[50%] bg-primary-100"
                                    />
                                )}
                                <div className="flex flex-col items-start">
                                    <span className="py-3 px-4 rounded-[40px] bg-gray-50 mb-5 mt-4 uppercase font-medium text-gray-400 transition duration-150 hover:bg-gray-100 hover:text-white">
                                        {momento.ano}
                                    </span>
                                    <div className="flex items-start md:max-w-lg lg:max-w-xl">
                                        <p className="text-gray-400 text-xl font-medium">
                                            {momento.descricao}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    />
                </div>
            </div>
        </section>
    );
}
