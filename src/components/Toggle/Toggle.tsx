import { useEffect, useState } from "react";

interface ToggleProps {
    id: string;
    label: string;
    isChecked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    isVerticalLabel?: boolean;
}

export default function Toggle({
    id,
    label,
    isChecked,
    onChange,
    disabled = false,
    isVerticalLabel = false,
}: ToggleProps) {
    const [checked, setChecked] = useState(isChecked);

    useEffect(() => {
        setChecked(isChecked);
    }, [isChecked]);

    const handleChange = () => {
        if (disabled) return;

        const newValue = !checked;
        setChecked(newValue);
        onChange(newValue);
    };

    return (
        <div className={`flex ${isVerticalLabel ? "flex-col" : "items-center"}`}>
            {label && (
                <label
                    htmlFor={id}
                    className={`mr-2 text-sm font-medium ${
                        disabled ? "text-gray-400" : "text-gray-700"
                    } cursor-pointer`}
                >
                    {label}
                </label>
            )}

            <div
                onClick={handleChange}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    checked ? "bg-primary-700" : "bg-gray-300"
                } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        checked ? "translate-x-6" : "translate-x-1"
                    }`}
                />
            </div>
        </div>
    );
}
