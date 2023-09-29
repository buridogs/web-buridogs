import { FaArrowRightLong } from "react-icons/fa6";

interface ButtonProps {
    label: string;
}

export function Button({ label }: ButtonProps) {
    return (
        <button className="flex items-center border-2 border-solid border-white text-white rounded-[40px] py-2 px-4 transition duration-150 hover:bg-primary-700 hover:border-primary-700 lg:text-lg">
            {label}
            <FaArrowRightLong
                color="text-white"
                size={22}
                className="ml-3"
            />
        </button>
    );
}
