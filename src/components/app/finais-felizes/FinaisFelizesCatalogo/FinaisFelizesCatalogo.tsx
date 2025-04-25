import FinaisFelizesCard from "./FinaisFelizesCard";
import { IDog } from "@/interfaces/dogInterfaces";

interface FinaisFelizesCatalogoProps {
    finaisFelizes: IDog[];
}

export default function FinaisFelizesCatalogo({ finaisFelizes }: FinaisFelizesCatalogoProps) {
    return (
        <div className="grid gap-6 grid-cols-1 justify-items-center py-10 md:grid-cols-2 xl:grid-cols-3 xl:gap-10">
            {finaisFelizes.map((fl) => (
                <FinaisFelizesCard
                    key={fl.id}
                    finalFeliz={fl}
                />
            ))}
        </div>
    );
}
