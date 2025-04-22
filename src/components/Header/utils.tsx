import { User, UserRole } from "@/interfaces/authInterfaces";
import {
    FaDog,
    FaUsers,
    FaEnvelope,
    FaPaw,
    FaHandshake,
    FaHeartCircleCheck,
    FaHouse,
} from "react-icons/fa6";

export const headerMenuLink = [
    {
        label: "Adoção",
        path: "/adocao",
    },
    {
        label: "Apadrinhamento",
        path: "/apadrinhamento",
    },
    {
        label: "Finais Felizes",
        path: "/finais-felizes",
    },
    {
        label: "Parceiros",
        path: "/parceiros",
    },
    {
        label: "Sobre Nós",
        path: "/sobre-nos",
    },
    {
        label: "Contato",
        path: "/contato",
    },
];

export const getAuthenticatedLinks = (user: User | null) => {
    if (!user) return [];

    const links = [
        {
            title: "Dashboard",
            href: "/volunteer",
            icon: <FaHouse className="w-5 h-5" />,
        },
        {
            title: "Adoções Pendentes",
            href: "/adocoes-pendentes",
            icon: <FaDog className="w-5 h-5" />,
        },
        {
            title: "Apadrinhamentos Pendentes",
            href: "/apadrinhamentos-pendentes",
            icon: <FaUsers className="w-5 h-5" />,
        },
        {
            title: "Contatos Pendentes",
            href: "/contatos-pendentes",
            icon: <FaEnvelope className="w-5 h-5" />,
        },
        {
            title: "Gerenciar Cachorros",
            href: "/gerenciar-cachorros",
            icon: <FaPaw className="w-5 h-5" />,
        },
        {
            title: "Gerenciar Finais Felizes",
            href: "/gerenciar-finais-felizes",
            icon: <FaHeartCircleCheck className="w-5 h-5" />,
        },
        {
            title: "Gerenciar Parceiros",
            href: "/gerenciar-parceiros",
            icon: <FaHandshake className="w-5 h-5" />,
        },
    ];

    // Add admin-specific links
    if (user.role === UserRole.ADMIN) {
        links.push({
            // TODO: LOOK HERE
            title: "Admin",
            href: "/admin",
            icon: <FaUsers className="w-5 h-5" />,
        });
    }

    return links;
};
