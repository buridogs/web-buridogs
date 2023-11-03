import { IFinalFeliz } from "@/interfaces/finaisFelizesInterfaces";
import FinaisFelizesCard from "./FinaisFelizesCard";

interface FinaisFelizesCatalogoProps {
    finaisFelizes: IFinalFeliz[];
}

export default function FinaisFelizesCatalogo({ finaisFelizes }: FinaisFelizesCatalogoProps) {
    return (
        <div className="grid gap-6 grid-cols-1 justify-center py-10 md:grid-cols-2 xl:grid-cols-3 xl:gap-10">
            {finaisFelizes.map((fl) => (
                <FinaisFelizesCard
                    key={fl.id}
                    finalFeliz={fl}
                />
            ))}
        </div>
    );
}
