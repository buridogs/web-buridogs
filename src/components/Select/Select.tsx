interface SelectProps {
    id: string;
    options: { value: string; label: string }[];
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    error?: boolean;
    disabled?: boolean;
    shouldDisplayPlaceholder?: boolean;
    isVerticalLabel?: boolean;
}

export default function Select({
    id,
    options,
    value,
    onChange,
    label,
    placeholder,
    error,
    disabled = false,
    shouldDisplayPlaceholder = false,
    isVerticalLabel = false,
}: SelectProps) {
    return (
        <div className={`flex ${isVerticalLabel ? "flex-col" : "items-center"}`}>
            {label && (
                <label
                    htmlFor={id}
                    className={`text-gray-700 ${isVerticalLabel ? "mb-1" : "mr-2"}`}
                >
                    {label}:
                </label>
            )}
            <select
                id={id}
                className={`border text-primary-400 rounded-md p-2 ${
                    error ? "border-red-500" : "border-gray-300"
                } ${disabled ? "bg-gray-200 cursor-not-allowed" : "bg-white"}`}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
            >
                {shouldDisplayPlaceholder && (
                    <option
                        value=""
                        disabled
                    >
                        {placeholder || "Selecione uma opção"}
                    </option>
                )}
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <span className="text-red-500 text-sm mt-1">Campo obrigatório</span>}
        </div>
    );
}
