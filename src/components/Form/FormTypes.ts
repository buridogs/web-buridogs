/* eslint-disable no-unused-vars */
export enum InputFormEnum {
    text = "text",
    textarea = "textarea",
    radio = "radio",
    checkbox = "checkbox",
    singleFile = "singleFile",
    multipleFiles = "multipleFiles",
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
    fileSettings?: {
        isMultiple?: boolean;
        filesQuantityLimit?: number;
        filesSizeLimit?: number;
        supportedExtensions: string[];
    };
};

export type GeneralFormsType<T> = {
    section: FieldFormsType<T>[];
};
