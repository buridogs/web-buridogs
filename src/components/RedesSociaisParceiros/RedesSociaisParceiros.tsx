import { SocialMediaUI } from "@/interfaces/parceirosInterfaces";
import { PartnetSocialMediaEnum } from "@/services/api/modules/partners/types";
import { FaFacebook, FaInstagram, FaLink } from "react-icons/fa6";

interface RedesSociaisParceirosProps {
    redes?: SocialMediaUI[];
}

export function RedesSociaisParceiros({ redes }: RedesSociaisParceirosProps) {
    if (!redes) return null;

    return (
        <ul className="w-full flex justify-start items-center mt-2">
            {redes.map((r) => (
                <li
                    key={r.urlLink}
                    className="mr-2"
                >
                    <a
                        href={r.urlLink}
                        target="_blank"
                    >
                        {r.socialMedia === PartnetSocialMediaEnum.instagram && (
                            <FaInstagram
                                size={22}
                                className="text-primary-400"
                            />
                        )}
                        {r.socialMedia === PartnetSocialMediaEnum.facebook && (
                            <FaFacebook
                                size={22}
                                className="text-primary-400"
                            />
                        )}
                        {r.socialMedia === PartnetSocialMediaEnum.website && (
                            <FaLink
                                size={22}
                                className="text-primary-400"
                            />
                        )}
                    </a>
                </li>
            ))}
        </ul>
    );
}
