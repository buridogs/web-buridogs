import { FaArrowRightLong } from "react-icons/fa6";

interface ButtonProps {
    label: string;
    customTextColor?: string;
    customBorderColor?: string;
    customBackgroundColor?: string;
    customCss?: string;
}

export function Button({
    label,
    customBackgroundColor,
    customBorderColor,
    customTextColor,
    customCss,
}: ButtonProps) {
    return (
        <button
            className={`
            ${customCss}
            flex items-center justify-center border-2 border-solid ${
                customBorderColor || "border-white"
            } ${customTextColor || "text-white"} 
            ${customBackgroundColor || "bg-transparent"}
            uppercase
            font-medium
            md:max-w-[300px]
            rounded-[40px] py-3 px-4 transition duration-150 hover:bg-primary-700 hover:border-primary-700 hover:text-white lg:text-lg`}
        >
            {label}
            <FaArrowRightLong
                color="text-white"
                size={22}
                className="ml-3"
            />
        </button>
    );
}
