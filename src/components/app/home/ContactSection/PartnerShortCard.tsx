interface PartnerShortCardProps {
    name: string;
    address: string;
    contactData: string;
}

export function PartnerShortCard({ name, address, contactData }: PartnerShortCardProps) {
    return (
        <li className="flex flex-col items-center lg:items-start">
            <div className="w-[195px] h-[195px] rounded-[50%] bg-grey-100" />
            <strong className="mt-6">{name}</strong>
            <span>{address}</span>
            <span>{contactData}</span>
        </li>
    );
}
