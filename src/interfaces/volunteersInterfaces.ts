/* eslint-disable no-unused-vars */
export enum VolunteerSituationEnum {
    origin = "origin",
    deliveries = "deliveries",
}

export interface IVolunteersData {
    contribution?: string;
    imageURL: string;
    altImageURL: string;
    name: string;
    role: string;
    contact?: string;
    contactURL?: string;
    isInactive?: boolean;
}

export interface IVolunteersSections {
    situation: VolunteerSituationEnum;
    situationDescription?: string;
    volunteers: IVolunteersData[];
}
