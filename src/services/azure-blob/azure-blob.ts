import { formatFileNameToUpload } from "@/utils/methods";
import { BlobServiceClient, BlockBlobClient, ContainerClient } from "@azure/storage-blob";
import * as Sentry from "@sentry/nextjs";
import { toast } from "react-toastify";

export enum AzureBlobStorageContainerNames {
    PARTNERS = "partners",
    DOGS = "dogs",
    ADOPTION_FORM = "adoption-form",
}

export const PARTNERS_AZURE_CONTAINER_NAME =
    process.env.NEXT_PUBLIC_AZURE_STORAGE_PARTNERS_CONTAINER_NAME ?? "";
export const DOGS_AZURE_CONTAINER_NAME =
    process.env.NEXT_PUBLIC_AZURE_STORAGE_DOGS_CONTAINER_NAME ?? "";

export const ADOPTION_FORM_AZURE_CONTAINER_NAME =
    process.env.NEXT_PUBLIC_AZURE_STORAGE_ADOPTION_FORM_CONTAINER_NAME ?? "";

const accountName = process.env.NEXT_PUBLIC_AZURE_STORAGE_ACCOUNT_NAME;

if (!accountName) {
    Sentry.withScope((scope) => {
        scope.setContext("azure-blob | blobServiceClient", {
            containerName: "accountName",
        });
        Sentry.captureException(new Error("Azure Storage accountName not found"));
    });
    throw Error("Azure Storage accountName not found");
}

if (!PARTNERS_AZURE_CONTAINER_NAME) {
    Sentry.withScope((scope) => {
        scope.setContext("azure-blob | blobServiceClient", {
            containerName: "PARTNERS_AZURE_CONTAINER_NAME",
        });
        Sentry.captureException(new Error("Azure Storage containerName not found - PARTNERS"));
    });
    throw Error("Azure Storage containerName not found - PARTNERS");
}
if (!DOGS_AZURE_CONTAINER_NAME) {
    Sentry.withScope((scope) => {
        scope.setContext("azure-blob | blobServiceClient", {
            containerName: "DOGS_AZURE_CONTAINER_NAME",
        });
        Sentry.captureException(new Error("Azure Storage containerName not found - DOGS"));
    });
    throw Error("Azure Storage containerName not found - DOGS");
}
if (!ADOPTION_FORM_AZURE_CONTAINER_NAME) {
    Sentry.withScope((scope) => {
        scope.setContext("azure-blob | blobServiceClient", {
            containerName: "ADOPTION_FORM_AZURE_CONTAINER_NAME",
        });
        Sentry.captureException(new Error("Azure Storage containerName not found - ADOPTION_FORM"));
    });
    throw Error("Azure Storage containerName not found - ADOPTION_FORM");
}
// SAS tokens do not require an additional credential because
// the token is the credential
const credential = undefined;

export const availableContainerNames = {
    [AzureBlobStorageContainerNames.PARTNERS]: PARTNERS_AZURE_CONTAINER_NAME,
    [AzureBlobStorageContainerNames.DOGS]: DOGS_AZURE_CONTAINER_NAME,
    [AzureBlobStorageContainerNames.ADOPTION_FORM]: ADOPTION_FORM_AZURE_CONTAINER_NAME,
};

export const blobServiceClient = (containerName: AzureBlobStorageContainerNames) => {
    const sasToken = {
        [AzureBlobStorageContainerNames.DOGS]: process.env.NEXT_PUBLIC_AZURE_STORAGE_SAS_TOKEN_DOGS,
        [AzureBlobStorageContainerNames.PARTNERS]:
            process.env.NEXT_PUBLIC_AZURE_STORAGE_SAS_TOKEN_PARTNER,
        [AzureBlobStorageContainerNames.ADOPTION_FORM]:
            process.env.NEXT_PUBLIC_AZURE_STORAGE_SAS_TOKEN_ADOPTION,
    };

    if (!sasToken[containerName]) {
        Sentry.withScope((scope) => {
            scope.setContext("azure-blob | blobServiceClient", {
                containerName,
            });
            Sentry.captureException(
                new Error(`Azure Storage SAS token not found for container: ${containerName}`)
            );
        });
        throw Error(`Azure Storage SAS token not found for container: ${containerName}`);
    }

    const blobServiceUri = `https://${accountName}.blob.core.windows.net?${sasToken[containerName]}`;

    return new BlobServiceClient(blobServiceUri, credential);
};

export async function uploadBlobFromBuffer(
    containerClient: ContainerClient,
    blobName: string,
    buffer: Buffer
): Promise<void> {
    try {
        // Create blob client from container client
        const blockBlobClient: BlockBlobClient = containerClient.getBlockBlobClient(blobName);

        // Upload buffer
        await blockBlobClient.uploadData(buffer);
    } catch (error) {
        Sentry.withScope((scope) => {
            scope.setContext("azure-blob | uploadBlobFromBuffer", {
                blobName,
            });
            Sentry.captureException(error);
        });
        // eslint-disable-next-line no-console
        console.error("Error uploading blob:", error);
        toast.error("Error uploading blob");
        throw error;
    }
}

export async function deleteBlob(
    containerClientName: AzureBlobStorageContainerNames,
    blobName: string
): Promise<void> {
    try {
        const containerName = availableContainerNames[containerClientName];
        const containerClient =
            blobServiceClient(containerClientName).getContainerClient(containerName);

        // Create blob client from container client
        const blockBlobClient: BlockBlobClient = containerClient.getBlockBlobClient(blobName);
        // Delete blob
        await blockBlobClient.delete();
    } catch (error) {
        Sentry.withScope((scope) => {
            scope.setContext("azure-blob | deleteBlob", {
                blobName,
                containerClientName,
            });
            Sentry.captureException(error);
        });
        // eslint-disable-next-line no-console
        console.error("Error deleting blob:", error);
        toast.error("Error deleting blob");
        throw error;
    }
}

export async function convertFileToBufferAndUpload(
    containerClientName: AzureBlobStorageContainerNames,
    files?: FileList
): Promise<string[]> {
    const linksArquivosAzureBlob: string[] = [];

    if (!files) return linksArquivosAzureBlob;

    const containerName = availableContainerNames[containerClientName];
    const containerClient =
        blobServiceClient(containerClientName).getContainerClient(containerName);

    if (files.length > 0) {
        const bufferPromise = Array(files?.length)
            .fill(files?.length)
            .map((_arquivo, index) => {
                return files.item(index)?.arrayBuffer();
            });

        const bufferResponse = (await Promise.all([...bufferPromise])) as ArrayBuffer[];

        const uploadPromise = Array(files?.length)
            .fill(files?.length)
            .map((_arquivo, index) => {
                const filename = files.item(index)?.name ?? "";
                const convertedFileName = formatFileNameToUpload(containerClientName, filename);
                linksArquivosAzureBlob.push(convertedFileName);

                return uploadBlobFromBuffer(
                    containerClient,
                    convertedFileName,
                    Buffer.from(bufferResponse[index])
                );
            });

        await Promise.all([...uploadPromise]);
    }

    return linksArquivosAzureBlob;
}

export function mountBlobStorageLink(
    containerName: AzureBlobStorageContainerNames,
    filename: string
) {
    const path = availableContainerNames[containerName] ?? DOGS_AZURE_CONTAINER_NAME;
    return `https://${process.env.NEXT_PUBLIC_AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${path}/${filename}`;
}
