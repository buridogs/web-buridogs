import React, { useEffect, useState } from "react";
import { FieldFormsType } from "../Form/FormTypes";
import {
    AzureBlobStorageContainerNames,
    mountBlobStorageLink,
} from "@/services/azure-blob/azure-blob";
import { formatFileNameToUpload } from "@/utils/methods";

interface FileInputProps<T> {
    field: FieldFormsType<T>;
    inputProps: React.HTMLProps<HTMLInputElement>;
    defaultValue?: FileList | null;
}

const BYTE_SIZE = 1024;

export default function FileInput<T>({ field, inputProps, defaultValue }: FileInputProps<T>) {
    const [files, setFiles] = useState<FileList | null>(defaultValue ?? null);
    const [errors, setErrors] = useState<{ size: boolean; quantity: boolean }>({
        quantity: false,
        size: false,
    });

    useEffect(() => {
        if (files?.length) return;

        if (inputProps.value && !files?.length) {
            setFiles(inputProps.value as unknown as FileList);
            return;
        }

        const formValue = inputProps.name
            ? (document.querySelector(`input[name="${inputProps.name}"]`) as HTMLInputElement)
                  ?.files
            : null;
        if (formValue && formValue.length > 0 && !files?.length) {
            setFiles(formValue);
            return;
        }

        if (defaultValue && !files?.length) {
            setFiles(defaultValue);
            return;
        }
    }, [inputProps, files, defaultValue]);

    const formatFileSize = (fileSize: number) => {
        return Math.ceil(fileSize / BYTE_SIZE);
    };

    const formatFileName = () => {
        if (!files?.length || (files.length ?? 0) > (field.fileSettings?.filesQuantityLimit ?? 0))
            return "";

        return Array(files?.length)
            .fill(files?.length)
            .map((_cur, idx) => {
                const file = files.item(idx);

                const isImage = file?.type.startsWith("image/");
                const objectUrl = file ? URL.createObjectURL(file) : "";
                return (
                    <div
                        className="flex flex-col items-start"
                        key={idx}
                    >
                        {isImage ? (
                            <img
                                src={objectUrl}
                                alt={file?.name}
                                className="mt-1 ml-10 max-h-24 rounded"
                                onLoad={() => URL.revokeObjectURL(objectUrl)}
                            />
                        ) : (
                            <img
                                src={mountBlobStorageLink(
                                    field.fileSettings
                                        ?.domainContainerName as AzureBlobStorageContainerNames,
                                    files.item(idx)?.name ?? ""
                                )}
                                alt={file?.name}
                                className="mt-1 ml-10 max-h-24 rounded"
                            />
                        )}
                        <p className="font-sm text-gray-400 pl-2 mt-1">
                            •{" "}
                            {`${files?.item(idx)?.name} - ${formatFileSize(
                                files.item(idx)?.size ?? 0
                            )} KB`}
                        </p>
                    </div>
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

    if (!field.fileSettings?.domainContainerName) {
        return (
            <p className="text-red-400 text-sm font-semibold my-1">
                Erro ao carregar o container de imagens.
            </p>
        );
    }

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

                    // TODO: REVIEW IF NEED THIS
                    const newFiles = Array.from(evt.target.files ?? []).map((file) => {
                        const newFileName = formatFileNameToUpload(
                            field.fileSettings
                                ?.domainContainerName as AzureBlobStorageContainerNames,
                            file.name
                        );
                        const newFile = new File([file], newFileName, {
                            type: file.type,
                            lastModified: file.lastModified,
                        });
                        return newFile;
                    });
                    const dataTransfer = new DataTransfer();
                    newFiles.forEach((file) => dataTransfer.items.add(file));
                    const newFileList = dataTransfer.files;
                    setFiles(newFileList);
                    setErrors({ quantity: false, size: false });

                    if (inputProps.onChange) {
                        inputProps.onChange(evt);
                    }
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
