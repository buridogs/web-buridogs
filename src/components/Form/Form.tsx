import { FieldErrors, UseFormRegister, FieldValues, Path } from "react-hook-form";
import { GeneralFormsType, FieldFormsType, InputFormEnum, OptionFormsType } from "./FormTypes";
import { Spinner } from "../Spinner/Spinner";
import React, { SyntheticEvent, useState } from "react";
import FileInput from "../FileInput/FileInput";
import { toast } from "react-toastify";

interface FormProps<T extends FieldValues> {
    handleSubmit: () => Promise<void>;
    formFields: GeneralFormsType<T>[];
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
    submitLabel: string;
    disabledSubmit?: boolean;
    defaultValues: Partial<Record<InputFormEnum, string | FileList | number | boolean>>;
}

export default function Form<T extends FieldValues>({
    handleSubmit,
    formFields,
    register,
    errors,
    submitLabel,
    disabledSubmit,
    defaultValues,
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
                        disabled={field.disabled}
                        className="w-full py-2 px-2 border-2 border-gray-100 border-solid rounded mt-1 text-gray-500 placeholder-primary-100 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-300"
                        {...register(field.key as Path<T>)}
                    />
                );
            case InputFormEnum.textarea:
                return (
                    <textarea
                        id={field.key as string}
                        placeholder={field.placeholder ?? ""}
                        disabled={field.disabled}
                        className="w-full py-2 px-2 border-2 border-gray-100 border-solid rounded mt-1 text-gray-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-300"
                        {...register(field.key as Path<T>)}
                        rows={4}
                    />
                );
            case InputFormEnum.multipleFiles:
            case InputFormEnum.singleFile: {
                if (
                    !defaultValues[field.type] ||
                    !(defaultValues[field.type] instanceof FileList)
                ) {
                    toast.error("Erro ao carregar arquivo. Tipo inválido. Tente novamente.");
                    return;
                }

                return (
                    <FileInput
                        field={field}
                        inputProps={{ ...register(field.key as Path<T>) }}
                        defaultValue={defaultValues[field.type] as FileList}
                    />
                );
            }
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
                                    disabled={field.disabled}
                                    className="h-4 w-4 mr-2 rounded-sm cursor-pointer accent-primary-400 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-300"
                                    {...register(field.key as Path<T>)}
                                />
                                <label
                                    htmlFor={opt?.key}
                                    className="w-full text-sm text-gray-100 font-normal cursor-pointer"
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
                                    disabled={field.disabled}
                                    className="mr-2 cursor-pointer accent-primary-400 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-300"
                                    {...register(field.key as Path<T>)}
                                />
                                <label
                                    htmlFor={opt?.key}
                                    className="w-full text-sm text-gray-100 font-normal cursor-pointer"
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
                    key={adocaoKey.section.leftSide[0].key as string}
                    className="w-full flex flex-col items-start justify-around md:flex-row"
                >
                    {!!adocaoKey.section.leftSide.length && (
                        <div className="w-full flex flex-col items-start mt-4 md:mr-6">
                            {adocaoKey.section.leftSide.map((field) => (
                                <div
                                    key={field.key as string}
                                    className="w-full flex flex-col items-start mt-4"
                                >
                                    <label
                                        htmlFor={field.key as string}
                                        className="text-sm text-gray-100 font-medium"
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
                    )}
                    {!!adocaoKey.section.rightSide.length && (
                        <div className="w-full flex flex-col items-start mt-4 md:ml-6">
                            {adocaoKey.section.rightSide.map((field) => (
                                <div
                                    key={field.key as string}
                                    className="w-full flex flex-col items-start mt-4"
                                >
                                    <label
                                        htmlFor={field.key as string}
                                        className="text-sm text-gray-100 font-medium"
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
                    )}
                </div>
            ))}

            <label
                htmlFor="submit"
                className={` uppercase font-medium py-2 px-4 rounded-3xl border-solid border-2 mt-8 ${
                    disabledSubmit
                        ? "cursor-not-allowed bg-gray-50 border-gray-50 text-gray-100"
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
