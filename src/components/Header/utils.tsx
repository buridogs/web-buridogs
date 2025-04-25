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

// TODO: CHANGE THIS TO A CONSTANT FILE
export enum PublicRoutes {
    HOME = "/",
    ADOPTION = "/adocao",
    SPONSORSHIP = "/apadrinhamento",
    HAPPY_ENDINGS = "/finais-felizes",
    PARTNERS = "/parceiros",
    ABOUT_US = "/sobre-nos",
    CONTACT = "/contato",
    LOGIN = "/login",
    NAO_AUTORIZADO = "/unathorized",
}

export enum PrivateRoutes {
    DASHBOARD = "/volunteer",
    ADOPTION_PENDING = "/volunteer/formularios-pendentes?formulario=adocao",
    SPONSORSHIP_PENDING = "/volunteer/formularios-pendentes?formulario=apadrinhamento",
    CONTACT_PENDING = "/volunteer/formularios-pendentes?formulario=contato",
    MANAGE_DOGS = "/volunteer/gerenciar-cachorros",
    MANAGE_HAPPY_ENDINGS = "/volunteer/gerenciar-finais-felizes",
    MANAGE_PARTNERS = "/volunteer/gerenciar-parceiros",
    MANAGE_USERS = "/volunteer/usuarios",
}

export const headerMenuLink = [
    {
        label: "Adoção",
        path: PublicRoutes.ADOPTION,
    },
    {
        label: "Apadrinhamento",
        path: PublicRoutes.SPONSORSHIP,
    },
    {
        label: "Finais Felizes",
        path: PublicRoutes.HAPPY_ENDINGS,
    },
    {
        label: "Parceiros",
        path: PublicRoutes.PARTNERS,
    },
    {
        label: "Sobre Nós",
        path: PublicRoutes.ABOUT_US,
    },
    {
        label: "Contato",
        path: PublicRoutes.CONTACT,
    },
];

export const getAuthenticatedLinks = (user: User | null) => {
    if (!user) return [];

    const links = [
        {
            title: "Dashboard",
            href: PrivateRoutes.DASHBOARD,
            icon: <FaHouse className="w-5 h-5" />,
        },
        {
            title: "Adoções Pendentes",
            href: PrivateRoutes.ADOPTION_PENDING,
            icon: <FaDog className="w-5 h-5" />,
        },
        {
            title: "Apadrinhamentos Pendentes",
            href: PrivateRoutes.SPONSORSHIP_PENDING,
            icon: <FaUsers className="w-5 h-5" />,
        },
        {
            title: "Contatos Pendentes",
            href: PrivateRoutes.CONTACT_PENDING,
            icon: <FaEnvelope className="w-5 h-5" />,
        },
        {
            title: "Gerenciar Cachorros",
            href: PrivateRoutes.MANAGE_DOGS,
            icon: <FaPaw className="w-5 h-5" />,
        },
        {
            title: "Gerenciar Finais Felizes",
            href: PrivateRoutes.MANAGE_HAPPY_ENDINGS,
            icon: <FaHeartCircleCheck className="w-5 h-5" />,
        },
        {
            title: "Gerenciar Parceiros",
            href: PrivateRoutes.MANAGE_PARTNERS,
            icon: <FaHandshake className="w-5 h-5" />,
        },
    ];

    // Add admin-specific links
    if (user.role === UserRole.ADMIN) {
        links.push({
            title: "Gerenciar Usuários",
            href: PrivateRoutes.MANAGE_USERS,
            icon: <FaUsers className="w-5 h-5" />,
        });
    }

    return links;
};
