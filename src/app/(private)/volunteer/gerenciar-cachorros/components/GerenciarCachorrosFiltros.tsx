import Select from "@/components/Select/Select";
import Toggle from "@/components/Toggle/Toggle";
import { LuSearch } from "react-icons/lu";

interface GerenciarCachorrosFiltrosProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    selectedGenero: string;
    setSelectedGenero: (value: string) => void;
    selectedIdade: string;
    setSelectedIdade: (value: string) => void;
    selectedPorte: string;
    setSelectedPorte: (value: string) => void;
    isHappyEndingMode?: boolean;
    setIsHappyEndingMode?: (value: boolean) => void;
    // handleSearch: () => void;
    handleClearFilters: () => void;
}

export default function GerenciarCachorrosFiltros({
    searchTerm,
    setSearchTerm,
    selectedGenero,
    setSelectedGenero,
    selectedIdade,
    setSelectedIdade,
    selectedPorte,
    setSelectedPorte,
    isHappyEndingMode,
    setIsHappyEndingMode,
    handleClearFilters,
}: GerenciarCachorrosFiltrosProps) {
    return (
        <div className="bg-gray-200 p-4 rounded-lg shadow mb-6">
            <h2 className="text-gray-700 font-medium text-lg mb-4">Filtros</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="flex flex-col">
                    <label
                        htmlFor="search"
                        className="text-sm text-gray-600 mb-1"
                    >
                        Nome do cachorro
                    </label>
                    <div className="relative">
                        <input
                            id="search"
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 pr-10"
                            placeholder="Buscar..."
                        />
                        <LuSearch className="absolute right-3 top-3 text-gray-400" />
                    </div>
                </div>

                <Select
                    id="genero"
                    options={[
                        { value: "", label: "Todos" },
                        { value: "macho", label: "Macho" },
                        { value: "femea", label: "Fêmea" },
                    ]}
                    value={selectedGenero}
                    onChange={(value) => setSelectedGenero(value)}
                    label="Gênero"
                    isVerticalLabel
                />

                <Select
                    id="idade"
                    options={[
                        { value: "", label: "Todos" },
                        { value: "filhote", label: "Filhote" },
                        { value: "adulto", label: "Adulto" },
                        { value: "idoso", label: "Idoso" },
                    ]}
                    value={selectedIdade}
                    onChange={(value) => setSelectedIdade(value)}
                    label="Idade"
                    isVerticalLabel
                />

                <Select
                    id="porte"
                    options={[
                        // TODO: CHECK THESE VALUES
                        { value: "", label: "Todos" },
                        { value: "pequeno-porte", label: "Pequeno" },
                        { value: "medio-porte", label: "Medio" },
                        { value: "grande-porte", label: "Grande" },
                    ]}
                    value={selectedPorte}
                    onChange={(value) => setSelectedPorte(value)}
                    label="Porte"
                    isVerticalLabel
                />
                <Toggle
                    id="happy-ending"
                    label="Apenas finais felizes"
                    isChecked={isHappyEndingMode ?? false}
                    onChange={(checked) => {
                        if (setIsHappyEndingMode) {
                            setIsHappyEndingMode(checked);
                        }
                    }}
                    isVerticalLabel
                />
                {(selectedGenero || selectedIdade || selectedPorte || searchTerm) && (
                    <div className="flex center gap-2">
                        <button
                            onClick={handleClearFilters}
                            className="bg-red-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                        >
                            Limpar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
