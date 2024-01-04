import { IVolunteersData } from "@/interfaces/volunteersInterfaces";
import { generateImgURL } from "@/utils/methods";
import Image from "next/image";
import Link from "next/link";

interface VolunteersCardProps {
    volunteer: IVolunteersData;
    isContributor?: boolean;
}

export function VolunteersCard({ volunteer, isContributor = false }: VolunteersCardProps) {
    const { name, contribution, imageURL, altImageURL, role, contact, contactURL } = volunteer;

    if (isContributor) {
        return (
            <div className="bg-white flex flex-col justify-center items-center px-3 py-4 shadow-md border-[1.5px] border-solid border-grey-100 rounded-lg">
                <Image
                    src={generateImgURL(imageURL)}
                    alt={altImageURL}
                    width={60}
                    height={60}
                    className="rounded-[50%] mb-2"
                    priority
                />
                <strong className="max-w-[80px] text-xs font-semibold text-center leading-5 text-gray-900">
                    {name}
                </strong>
                <p className="text-grey-100 text-xs">{role}</p>
                {contactURL && (
                    <p className="text-grey-100 text-xs underline hover:text-blue-100">
                        <Link
                            href={contactURL}
                            target="_blank"
                        >
                            {contact}
                        </Link>
                    </p>
                )}
            </div>
        );
    }

    return (
        <div className="bg-white flex flex-col justify-center items-center px-4 py-4 shadow-md border-[1.5px] border-solid border-primary-100 rounded-lg">
            <strong className="text-grey-100 text-sm mb-4 font-bold">{contribution}</strong>
            <Image
                src={generateImgURL(imageURL)}
                alt={altImageURL}
                width={80}
                height={80}
                className="rounded-[50%] mb-2"
                priority
            />
            <strong className="max-w-[80px] text-sm font-semibold text-center leading-5 text-gray-900">
                {name}
            </strong>
            <p className="text-grey-100 text-sm">{role}</p>
            {contactURL && (
                <p className="text-grey-100 text-sm underline hover:text-blue-100">
                    <Link
                        href={contactURL}
                        target="_blank"
                    >
                        {contact}
                    </Link>
                </p>
            )}
        </div>
    );
}
