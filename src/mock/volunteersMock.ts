import { IVolunteersSections, VolunteerSituationEnum } from "@/interfaces/volunteersInterfaces";

export const volunteersWithHisSection: IVolunteersSections[] = [
    {
        situation: VolunteerSituationEnum.origin,
        volunteers: [
            {
                contribution: "Idealizador do Software",
                imageURL: "voluntario-diogo.png",
                altImageURL: "Voluntário Diogo Almazan",
                name: "Diogo de P. Almazan",
                role: "Engenheiro de Software",
                contact: "@diogo_dpa",
                contactURL: "https://www.instagram.com/diogo_dpa/",
            },
        ],
    },
    {
        situation: VolunteerSituationEnum.deliveries,
        situationDescription: "Responsáveis pela 1ª entrega",
        volunteers: [
            {
                imageURL: "voluntario-joao.png",
                altImageURL: "Voluntário João C. Lot Junior",
                name: "João C. Lot Junior",
                role: "Desenvolvedor",
                contact: "@joaolotjr",
                contactURL: "https://www.instagram.com/joaolotjr/",
            },
            {
                imageURL: "voluntario-karina.jpeg",
                altImageURL: "Voluntária Karina Pochini",
                name: "Karina Pochini",
                role: "Analista financeira",
                contact: "@karinapochini",
                contactURL: "https://www.instagram.com/karinapochini/",
            },
            {
                imageURL: "voluntario-maria.jpeg",
                altImageURL: "Voluntária Maria Emília Bergo",
                name: "Maria Emília Bergo",
                role: "Designer",
                contact: "@mareh_bergo",
                contactURL: "https://www.instagram.com/mareh_bergo/",
            },
        ],
    },
];
