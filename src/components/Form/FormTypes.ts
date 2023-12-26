/* eslint-disable no-unused-vars */
export enum InputFormEnum {
    text = "text",
    textarea = "textarea",
    radio = "radio",
    checkbox = "checkbox",
}

export type OptionFormsType = {
    key: string;
    label: string;
    value: number | string;
};

export type FieldFormsType<T> = {
    key: keyof T;
    label: string;
    placeholder?: string;
    type: InputFormEnum;
    options?: OptionFormsType[];
};

export type GeneralFormsType<T> = {
    section: FieldFormsType<T>[];
};
