import { FaFacebook, FaInstagram, FaLink } from "react-icons/fa6";

interface RedesSociaisParceirosProps {
    redes?: Record<string, string>;
}

export function RedesSociaisParceiros({ redes }: RedesSociaisParceirosProps) {
    if (!redes) return null;

    return (
        <ul className="w-full flex justify-start items-center mt-2">
            {Object.entries(redes).map((r) => (
                <li
                    key={r[1]}
                    className="mr-2"
                >
                    <a
                        href={r[1]}
                        target="_blank"
                    >
                        {r[0] === "instagram" && (
                            <FaInstagram
                                size={22}
                                className="text-primary-400"
                            />
                        )}
                        {r[0] === "facebook" && (
                            <FaFacebook
                                size={22}
                                className="text-primary-400"
                            />
                        )}
                        {r[0] === "site" && (
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
