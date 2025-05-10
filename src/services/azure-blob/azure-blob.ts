import { formatFileNameToUpload } from "@/utils/methods";
import { BlobServiceClient, BlockBlobClient, ContainerClient } from "@azure/storage-blob";
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
const sasToken = process.env.NEXT_PUBLIC_AZURE_STORAGE_SAS_TOKEN_PARTNER;

if (!accountName) throw Error("Azure Storage accountName not found");
if (!sasToken) throw Error("Azure Storage accountKey not found");

if (!PARTNERS_AZURE_CONTAINER_NAME) throw Error("Azure Storage containerName not found - PARTNERS");
if (!DOGS_AZURE_CONTAINER_NAME) throw Error("Azure Storage containerName not found - DOGS");
if (!ADOPTION_FORM_AZURE_CONTAINER_NAME)
    throw Error("Azure Storage containerName not found - ADOPTION_FORM");

const blobServiceUri = `https://${accountName}.blob.core.windows.net?${sasToken}`;

// SAS tokens do not require an additional credential because
// the token is the credential
const credential = undefined;

export const blobServiceClient = new BlobServiceClient(blobServiceUri, credential);

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
        console.error("Error uploading blob:", error);
        toast.error("Error uploading blob");
        throw error;
    }
}

export async function deleteBlob(containerClientName: string, blobName: string): Promise<void> {
    try {
        const containerClient = blobServiceClient.getContainerClient(containerClientName);

        // Create blob client from container client
        const blockBlobClient: BlockBlobClient = containerClient.getBlockBlobClient(blobName);
        // Delete blob
        await blockBlobClient.delete();
    } catch (error) {
        console.error("Error deleting blob:", error);
        toast.error("Error deleting blob");
        throw error;
    }
}

export async function convertFileToBufferAndUpload(
    containerClientName: string,
    files?: FileList
): Promise<string[]> {
    const linksArquivosAzureBlob: string[] = [];

    if (!files) return linksArquivosAzureBlob;

    const containerClient = blobServiceClient.getContainerClient(containerClientName);

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
                const convertedFileName = formatFileNameToUpload(
                    mapContainerNameToEnum[containerClientName],
                    filename
                );
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

const mapContainerNameToEnum = {
    [PARTNERS_AZURE_CONTAINER_NAME]: AzureBlobStorageContainerNames.PARTNERS,
    [DOGS_AZURE_CONTAINER_NAME]: AzureBlobStorageContainerNames.DOGS,
    [ADOPTION_FORM_AZURE_CONTAINER_NAME]: AzureBlobStorageContainerNames.ADOPTION_FORM,
};

export function mountBlobStorageLink(
    containerName: AzureBlobStorageContainerNames,
    filename: string
) {
    const availablePaths = {
        [AzureBlobStorageContainerNames.PARTNERS]: PARTNERS_AZURE_CONTAINER_NAME,
        [AzureBlobStorageContainerNames.DOGS]: DOGS_AZURE_CONTAINER_NAME,
        [AzureBlobStorageContainerNames.ADOPTION_FORM]: ADOPTION_FORM_AZURE_CONTAINER_NAME,
    };

    const path = availablePaths[containerName] ?? DOGS_AZURE_CONTAINER_NAME;
    return `https://${process.env.NEXT_PUBLIC_AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${path}/${filename}`;
}
