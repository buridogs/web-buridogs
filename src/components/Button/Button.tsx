import { ReactNode, ButtonHTMLAttributes } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    customTextColor?: string;
    customBorderColor?: string;
    customBackgroundColor?: string;
    customCss?: string;
    icon?: ReactNode;
}

export function Button({
    label,
    customBackgroundColor,
    customBorderColor,
    customTextColor,
    customCss,
    icon,
    ...rest
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
            {...rest}
        >
            {label}
            {icon ?? (
                <FaArrowRightLong
                    color="text-white"
                    size={22}
                    className="ml-3"
                />
            )}
        </button>
    );
}
