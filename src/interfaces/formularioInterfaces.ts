import { FormRequestStatusEnum } from "@/services/api/modules/form-requests/types";

export enum FormStatusEnum {
    PENDENT = "PENDENT",
    SOLVED = "SOLVED",
    REJECTED = "REJECTED",
    IN_PROCESS = "IN_PROCESS",
}

export enum FormAvailableEnum {
    ADOPTION = "ADOCAO",
    SPONSORSHIP = "APADRINHAMENTO",
    CONTACT = "CONTATO",
}

interface IFormBase {
    id: string;
    createdAt: string;
    name: string;
    phone_number: string;
    form_type: FormAvailableEnum;
    status: FormRequestStatusEnum;
}

export interface IFormAdoption extends IFormBase {
    zip_code: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    facebook_url: string;
    instagram_url: string;
    first_adoption: boolean;
    reason_for_adoption: string;
    number_of_people_in_house: string;
    people_agree_with_adoption: boolean;
    has_children_or_elderly?: string[];
    lives_in_house_or_apartment: string;
    number_of_people_working: string;
    home_has_adoption_structure: string;
    has_other_animals: string;
    has_had_other_animals: string;
    aware_of_expenses: boolean;
    animal_place_description: string;
    return_adoption_situation: string;
    aware_of_responsibility_term: boolean;
    dog_name: string;
    images?: string[];
}

export interface IFormSponsorship extends IFormBase {
    email: string;
    dog_name?: string;
    contact_method_preference: string[];
    allow_receiving_news: boolean;
    sponsorship_method: string[];
}

export interface IFormContact extends IFormBase {
    email: string;
    message: string;
}

export type IFormUI = IFormAdoption | IFormSponsorship | IFormContact;
