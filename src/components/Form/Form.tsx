import { FieldErrors, UseFormRegister, FieldValues, Path } from "react-hook-form";
import { GeneralFormsType, FieldFormsType, InputFormEnum, OptionFormsType } from "./FormTypes";
import { Spinner } from "../Spinner/Spinner";
import React, { SyntheticEvent, useState } from "react";
import FileInput from "../FileInput/FileInput";

interface FormProps<T extends FieldValues> {
    handleSubmit: () => Promise<void>;
    formFields: GeneralFormsType<T>[];
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
    submitLabel: string;
    disabledSubmit?: boolean;
}

export default function Form<T extends FieldValues>({
    handleSubmit,
    formFields,
    register,
    errors,
    submitLabel,
    disabledSubmit,
}: FormProps<T>) {
    const [isLoading, setIsLoading] = useState(false);

    const renderInputs = (
        inputType: InputFormEnum,
        field: FieldFormsType<T>,
        options?: OptionFormsType[]
    ) => {
        switch (inputType) {
            case InputFormEnum.text:
            default:
                return (
                    <input
                        id={field.key as string}
                        placeholder={field.placeholder ?? ""}
                        className="w-[80%] py-2 px-2 border-2 border-grey-100 border-solid rounded mt-1 text-gray-500"
                        {...register(field.key as Path<T>)}
                    />
                );
            case InputFormEnum.textarea:
                return (
                    <textarea
                        id={field.key as string}
                        placeholder={field.placeholder ?? ""}
                        className="w-[80%] py-2 px-2 border-2 border-grey-100 border-solid rounded mt-1 text-gray-500"
                        {...register(field.key as Path<T>)}
                        rows={4}
                    />
                );
            case InputFormEnum.multipleFiles:
            case InputFormEnum.singleFile:
                return (
                    <FileInput
                        field={field}
                        inputProps={register(field.key as Path<T>)}
                    />
                );
            case InputFormEnum.checkbox:
                return (
                    <>
                        {options?.map((opt) => (
                            <div
                                key={opt?.key}
                                className="w-full flex items-center justify-start cursor-pointer mt-1"
                            >
                                <input
                                    id={opt?.key}
                                    type="checkbox"
                                    value={opt?.value}
                                    className="h-4 w-4 mr-2 rounded-sm cursor-pointer accent-primary-400"
                                    {...register(field.key as Path<T>)}
                                />
                                <label
                                    htmlFor={opt?.key}
                                    className="w-full text-sm text-grey-100 font-normal cursor-pointer"
                                >
                                    {opt?.label}
                                </label>
                            </div>
                        ))}
                    </>
                );
            case InputFormEnum.radio:
                return (
                    <>
                        {options?.map((opt) => (
                            <div
                                key={opt?.key}
                                className="w-full flex items-center justify-start cursor-pointer"
                            >
                                <input
                                    id={opt?.key}
                                    type="radio"
                                    value={opt?.value}
                                    className="mr-2 cursor-pointer"
                                    {...register(field.key as Path<T>)}
                                />
                                <label
                                    htmlFor={opt?.key}
                                    className="w-full text-sm text-grey-100 font-normal cursor-pointer"
                                >
                                    {opt?.label}
                                </label>
                            </div>
                        ))}
                    </>
                );
        }
    };

    async function onSubmit(event?: SyntheticEvent) {
        if (!event?.target) return null;

        event.preventDefault();

        setIsLoading(true);
        await handleSubmit();
        setIsLoading(false);
    }

    return (
        <form
            onSubmit={onSubmit}
            className="w-full flex flex-col items-end"
        >
            {formFields.map((adocaoKey) => (
                <div
                    key={adocaoKey.section[0].key as string}
                    className="w-full flex flex-col items-center justify-around md:flex-row"
                >
                    {adocaoKey.section.map((field) => (
                        <div
                            key={field.key as string}
                            className="w-full flex flex-col items-start mt-4"
                        >
                            <label
                                htmlFor={field.key as string}
                                className="text-sm text-grey-100 font-medium"
                            >
                                {field.label}
                            </label>
                            {renderInputs(field.type, field, field.options)}
                            <p className="text-sm font-semibold text-red-400 mt-0.5">
                                {errors[field.key]?.message as string}
                            </p>
                        </div>
                    ))}
                </div>
            ))}

            <label
                htmlFor="submit"
                className={` uppercase font-medium py-2 px-4 rounded-3xl border-solid border-2 mt-8 ${
                    disabledSubmit
                        ? "cursor-not-allowed bg-grey-50 border-grey-50 text-grey-100"
                        : "text-primary-400 border-primary-400 cursor-pointer hover:bg-primary-100 hover:text-white hover:border-primary-100"
                } transition duration-150 `}
            >
                {isLoading ? <Spinner /> : submitLabel}
            </label>
            <input
                id="submit"
                type="submit"
                disabled={disabledSubmit}
                hidden
            />
        </form>
    );
}
