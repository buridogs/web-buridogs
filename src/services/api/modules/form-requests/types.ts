export interface IFormRequest {
    id: string;
    detailsForm: Record<string, any>;
    dog?: FormRequestDog;
    requestType: FormRequestTypeEnum;
    requestStatus: string;
    createdAt: string;
    updatedAt: string;
}

type FormRequestDog = {
    id: string;
    name: string;
    dogStatus: string;
    assets: {
        urlLink: string;
    }[];
};

export type CreateFormRequestDto = {
    detailsForm: Record<string, any>;
    dogId?: string;
    requestType: FormRequestTypeEnum;
};

export type UpdateFormRequestDto = Pick<IFormRequest, "requestStatus">;

export enum FormRequestTypeEnum {
    adoption = "dog_adoption",
    sponsorship = "pet_sponsorship",
    contact = "contact",
}

export enum FormRequestStatusEnum {
    pending = "pendent",
    solved = "solved",
    in_progress = "in_progress",
    rejected = "rejected",
}
