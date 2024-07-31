import React, { useState } from "react";
import { FieldFormsType } from "../Form/FormTypes";

interface FileInputProps<T> {
    field: FieldFormsType<T>;
    inputProps: React.HTMLProps<HTMLInputElement>;
}

const BYTE_SIZE = 1024;

export default function FileInput<T>({ field, inputProps }: FileInputProps<T>) {
    const [files, setFiles] = useState<FileList | null>(null);
    const [errors, setErrors] = useState<{ size: boolean; quantity: boolean }>({
        quantity: false,
        size: false,
    });

    const formatFileSize = (fileSize: number) => {
        return Math.ceil(fileSize / BYTE_SIZE);
    };

    const formatFileName = () => {
        if (!files?.length || (files.length ?? 0) > (field.fileSettings?.filesQuantityLimit ?? 0))
            return "";

        return Array(files?.length)
            .fill(files?.length)
            .map((_cur, idx) => {
                return (
                    <p
                        key={idx}
                        className="font-sm text-gray-400 pl-2 mt-1"
                    >
                        •{" "}
                        {`${files?.item(idx)?.name} - ${formatFileSize(
                            files.item(idx)?.size ?? 0
                        )} KB`}
                    </p>
                );
            });
    };

    const formatFileExtensions = (supportedFileExtensions?: string[]) => {
        if (!supportedFileExtensions) return "";
        return supportedFileExtensions.map((ext) => ext.split("/")[1]).join(", ");
    };

    const formatLabel = () => {
        if (files?.length) {
            if (Object.values(errors).some((error) => error))
                return "Erros encontrados. Verifique e adicione novamente";

            return "Arquivo(s) adicionado(s)! Clique para alterar";
        }

        return "Clique para adicionar imagens";
    };

    return (
        <div className="flex flex-col items-start w-full">
            <label
                htmlFor={field.key as string}
                className="flex flex-col w-full items-center py-5 px-5 md:px-0 cursor-pointer text-gray-400 text-sm rounded bg-primary-100 hover:bg-primary-700 hover:text-white transition duration-150"
            >
                <p className="font-semibold mb-1">{formatLabel()}</p>
                <p>{`Máximo de ${
                    field.fileSettings?.filesQuantityLimit
                } arquivos (até ${formatFileSize(
                    field.fileSettings?.filesSizeLimit ?? 0
                )} KB por arquivo). Extensões suportadas ${formatFileExtensions(
                    field.fileSettings?.supportedExtensions
                )}.`}</p>
            </label>
            <input
                id={field.key as string}
                hidden
                type="file"
                multiple
                accept={field.fileSettings?.supportedExtensions.join(",") ?? ""}
                className="w-[80%] py-2 px-2 border-2 border-gray-100 border-solid rounded mt-1 text-gray-500"
                {...inputProps}
                onChange={(evt) => {
                    setFiles(evt.target.files);
                    if (
                        (evt.target.files?.length ?? 0) >
                        (field.fileSettings?.filesQuantityLimit ?? 0)
                    ) {
                        setErrors((oldErrors) => ({ ...oldErrors, quantity: true }));
                        return;
                    }

                    if (
                        Array(files?.length)
                            .fill(files?.length)
                            .some(
                                (index) =>
                                    (files?.item(index)?.size ?? 0) >
                                    (field.fileSettings?.filesSizeLimit ?? 0)
                            )
                    ) {
                        setErrors((oldErrors) => ({ ...oldErrors, size: true }));
                        return;
                    }

                    inputProps.onChange!(evt);
                    setErrors({ quantity: false, size: false });
                }}
            />
            {errors.quantity && (
                <p className="text-red-400 text-sm font-semibold my-1">
                    Número de imagens ultrapassado.
                </p>
            )}
            {errors.size && (
                <p className="text-red-400 text-sm font-semibold my-1">
                    {`Tamanho máximo por arquivo ultrapassado (${
                        field.fileSettings?.filesSizeLimit ?? 0
                    } KB).`}
                </p>
            )}
            {Object.values(errors).every((error) => !error) && (files?.length ?? 0) > 0 && (
                <div className="flex flex-col items-start">
                    <p className="font-sm text-primary-400 font-medium mt-1">Imagens adicionadas</p>
                    <div className="flex flex-col items-start">{formatFileName()}</div>
                </div>
            )}
        </div>
    );
}
