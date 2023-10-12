import { FaLocationDot, FaPhone } from "react-icons/fa6";

interface ParceiroCardProps {
    name: string;
    address: string;
    contactData: string;
    category: string;
}
export function ParceiroCard({ name, address, category, contactData }: ParceiroCardProps) {
    return (
        <li className="flex items-center lg:items-start">
            <div className="w-[150px] h-[150px] rounded-[50%] bg-grey-100 md:w-[150px] md:h-[150px]" />
            <div className="flex flex-col items-start justify-start ml-8">
                <p className="text-primary-400 text-md font-bold">{category}</p>
                <strong className="text-grey-400 font-bold text-2xl my-2">{name}</strong>
                <span className="flex items-center text-grey-400 font-medium">
                    <FaLocationDot className="text-primary-400 mr-3" />
                    {address}
                </span>
                <span className="flex items-center text-grey-400 font-medium mt-2">
                    <FaPhone className="text-primary-400 mr-3" /> {contactData}
                </span>
            </div>
        </li>
    );
}
