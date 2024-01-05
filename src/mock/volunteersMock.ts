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
        situationDescription: "1ª entrega",
        volunteers: [
            {
                imageURL: "voluntario-joao.png",
                altImageURL: "Voluntário João C. Lot Junior",
                name: "João C. Lot Junior",
                role: "Desenvolvedor",
                contact: "@joaolotjr",
                contactURL: "https://www.instagram.com/joaolotjr/",
            },
        ],
    },
];
