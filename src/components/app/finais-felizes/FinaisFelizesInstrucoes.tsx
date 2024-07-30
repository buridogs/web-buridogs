import { IFinalFeliz } from "@/interfaces/finaisFelizesInterfaces";

interface FinaisFelizesInstrucoesProps {
    finaisFelizes: IFinalFeliz[];
}

export default function FinaisFelizesInstrucoes({ finaisFelizes }: FinaisFelizesInstrucoesProps) {
    return (
        <div className="flex flex-col items-start lg:items-center">
            <h1 className="text-primary-400 text-3xl leading-10 font-bold md:text-4xl mt-8">
                São mais de {finaisFelizes.length} cachorros com{" "}
                <strong className="text-primary-100">Finais Felizes</strong>
            </h1>
            <span className="text-gray-100 text-lg font-medium py-4">
                Conseguimos alcançar essa incrível marca nesses anos de trajetória, graças ao
                <strong className="ml-[6px]">apoio de nossos parceiros e buriamigos</strong>. <br />
                <br />
                Ao longo dessa jornada, foram muitos os animais que tiveram suas histórias
                transformadas. Para cada um que ajudamos, nós{" "}
                <strong className="ml-[4px]">contamos um pouquinho da sua história.</strong>{" "}
                Confira!
            </span>
            <p className="text-gray-400 text-base font-bold lg:text-left">
                Nosso objetivo é aumentar cada vez mais essa lista!
            </p>
        </div>
    );
}
