import { finaisFelizes } from "@/mock/finaisFelizesMock";

import FinaisFelizesInstrucoes from "./FinaisFelizesInstrucoes";
import FinaisFelizesCatalogo from "./FinaisFelizesCatalogo/FinaisFelizesCatalogo";

export default function FinaisFelizesContainer() {
    return (
        <main className="bg-white">
            <div className="max-w-screen-xl mx-auto px-8 pb-11 flex flex-col item-center md:pb-12">
                <FinaisFelizesInstrucoes finaisFelizes={finaisFelizes} />
                <FinaisFelizesCatalogo finaisFelizes={finaisFelizes} />
            </div>
        </main>
    );
}
