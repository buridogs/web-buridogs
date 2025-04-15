import { User, UserRole } from "@/interfaces/authInterfaces";

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
            label: "Área Voluntário",
            path: "/volunteer",
        },
    ];

    // Add admin-specific links
    if (user.role === UserRole.ADMIN) {
        links.push({
            label: "Admin",
            path: "/admin",
        });
    }

    return links;
};
