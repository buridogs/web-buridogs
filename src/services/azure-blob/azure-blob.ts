import { BlobServiceClient, BlockBlobClient, ContainerClient } from "@azure/storage-blob";

const accountName = process.env.NEXT_PUBLIC_AZURE_STORAGE_ACCOUNT_NAME;
const sasToken = process.env.NEXT_PUBLIC_AZURE_STORAGE_SAS_TOKEN;
if (!accountName) throw Error("Azure Storage accountName not found");
if (!sasToken) throw Error("Azure Storage accountKey not found");

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
    // Create blob client from container client
    const blockBlobClient: BlockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Upload buffer
    await blockBlobClient.uploadData(buffer);
}
