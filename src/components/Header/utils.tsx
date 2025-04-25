import { User, UserRole } from "@/interfaces/authInterfaces";
import { FaUsers, FaEnvelope, FaPaw, FaHandshake, FaHouse } from "react-icons/fa6";
import { PrivateRoutes, PublicRoutes } from "./routes-ui";

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
            title: "Solicitações Pendentes",
            href: PrivateRoutes.REQUESTS_PENDING,
            icon: <FaEnvelope className="w-5 h-5" />,
        },
        {
            title: "Gerenciar Cachorros",
            href: PrivateRoutes.MANAGE_DOGS,
            icon: <FaPaw className="w-5 h-5" />,
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
