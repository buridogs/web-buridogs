import { LuSearch } from "react-icons/lu";

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    label?: string;
    shouldExpand?: boolean;
}

export default function SearchInput({
    value,
    onChange,
    placeholder = "Search...",
    label,
    shouldExpand,
}: SearchInputProps) {
    return (
        <div className={`w-full flex flex-col md:w-auto ${shouldExpand ? "flex-1" : ""}`}>
            {label && (
                <label
                    htmlFor="search"
                    className="text-sm text-gray-600 mb-1"
                >
                    {label}
                </label>
            )}
            <input
                id="search"
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="border text-gray-400 border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
            <LuSearch className="absolute right-3 top-3 text-gray-400" />
        </div>
    );
}
