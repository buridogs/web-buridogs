import { AdocaoCatalogo } from "./AdocaoCatalogo/AdocaoCatalogo";
import { AdocaoEspecial } from "./AdocaoEspecial/AdocaoEspecial";
import { AdocaoInstrucoes } from "./AdocaoInstrucoes";

export function AdocaoContainer() {
    return (
        <main className="bg-white">
            <div className="max-w-screen-xl mx-auto px-8 py-11 flex flex-col item-center md:py-12">
                <AdocaoInstrucoes />
                <AdocaoEspecial />
                <AdocaoCatalogo />
            </div>
        </main>
    );
}
