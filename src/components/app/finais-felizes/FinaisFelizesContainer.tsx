"use client";

import FinaisFelizesInstrucoes from "./FinaisFelizesInstrucoes";
import FinaisFelizesCatalogo from "./FinaisFelizesCatalogo/FinaisFelizesCatalogo";
import { useDogs } from "@/hooks/dogs-hook";
import { DogStatusEnum } from "@/services/api/modules/dogs/types";
import { Spinner } from "@/components/Spinner/Spinner";

export default function FinaisFelizesContainer() {
    const { isLoading: dogsLoading, dogs } = useDogs();
    const finaisFelizes = dogs.filter((dog) => dog.status === DogStatusEnum.adotado);

    const renderContent = () => {
        if (dogsLoading) {
            return <Spinner />;
        }

        return (
            <div className="max-w-screen-xl mx-auto px-8 pb-11 flex flex-col item-center justify-center md:pb-12">
                <FinaisFelizesInstrucoes finaisFelizes={finaisFelizes} />
                <FinaisFelizesCatalogo finaisFelizes={finaisFelizes} />
            </div>
        );
    };

    return <main className="bg-white">{renderContent()}</main>;
}
