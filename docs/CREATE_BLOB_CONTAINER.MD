# Creating Azure Blob Storage Containers for Buridogs Application

This guide explains how to create and configure an Azure Blob Storage container for use with the Buridogs application, including setting up the proper permissions using Shared Access Signatures (SAS).

## Prerequisites

-   An Azure account with an active subscription
-   Access to Azure Portal or Azure CLI
-   Proper permissions to create storage resources

## Step 1: Create a Storage Account (if not already created)

1. Log in to the [Azure Portal](https://portal.azure.com)
2. In the search bar at the top, search for "Storage accounts"
3. Click on **+ Create** to create a new storage account
4. Fill in the required details:
    - **Subscription**: Select your Azure subscription
    - **Resource group**: Create new or select existing
    - **Storage account name**: Enter a unique name (e.g., `buridogsstorage`)
    - **Region**: Select the region closest to your users (e.g., East US)
    - **Performance**: Standard
    - **Redundancy**: Locally Redundant Storage (LRS) for development, Geo-Redundant Storage (GRS) for production
5. Click **Review + create**, then **Create**
6. Wait for the deployment to complete

## Step 2: Create a Blob Container

1. Navigate to the newly created storage account
2. In the left sidebar, under "Data storage", click on **Containers**
3. Click the **+ Container** button
4. Enter a name for your container (e.g., `partner-management`, `dog-profiles`, `adoption-forms`)
5. Set the **Public access level**:
    - For images that need to be publicly viewable: **Blob (anonymous read access for blobs only)**
    - For private data: **Private (no anonymous access)**
6. Click **Create**

## Step 3: Configure CORS (Cross-Origin Resource Sharing)

To allow the web application to access the blob storage:

1. In your storage account, click on **Resource sharing (CORS)** in the left sidebar
2. Add a new CORS rule with the following settings:
    - **Allowed origins**: Enter your application's domain (e.g., `https://buridogs.com`) or use `*` for development
    - **Allowed methods**: SELECT GET, HEAD, POST, PUT, DELETE
    - **Allowed headers**: `*`
    - **Exposed headers**: `*`
    - **Max age**: `86400` (24 hours)
3. Click **Save**

## Step 4: Generate a Shared Access Signature (SAS)

For secure, limited-time access to your storage:

1. Navigate to your storage account
2. In the left sidebar, under "Security + networking", click **Shared access signature**
3. Configure the SAS with these settings:

    - **Allowed services**: Blob
    - **Allowed resource types**: Container, Object
    - **Allowed permissions**: Read, Write, Delete, List, Add, Create
    - **Start and expiry date/time**: Set an appropriate validity period
    - **Allowed protocols**: HTTPS only (recommended)
    - **Signing key**: Key1

4. Click **Generate SAS and connection string**
5. Copy and securely store:
    - The **SAS token**
    - The **Blob service SAS URL**

## Step 5: Configure Next.js for Azure Blob Storage

Update your Next.js configuration to allow image domains:

1. Open `next.config.js` in your project
2. Update or add the `images` configuration:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
    // ...other config
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "buridogsstorage.blob.core.windows.net",
                port: "",
                pathname: "/**",
            },
        ],
    },
};
```

## Step 6: Update Environment Variables

Add the storage credentials to your environment variables:

1. Open or create `.env.local` file in your project root
2. Add the following variables:

```
AZURE_STORAGE_ACCOUNT_NAME=buridogsstorage
AZURE_STORAGE_ACCOUNT_KEY=your-account-key
AZURE_STORAGE_SAS_TOKEN=your-sas-token
```

3. Make sure to add these variables to your deployment environment as well

## Step 7: Using the Container in the Buridogs Application

In your application code:

1. Import the Azure Blob Storage service:

```typescript
import { mountBlobStorageLink } from "@/services/azure-blob/azure-blob";
```

2. Use the service to get image URLs:

```typescript
const imageUrl = mountBlobStorageLink(containerName, fileName);
```

3. Use it in your components:

```tsx
<img
    src={mountBlobStorageLink("partner-management", partner.imageSrc)}
    alt={partner.name}
    className="..."
/>
```

## Security Best Practices

-   Never commit SAS tokens or storage keys to version control
-   Generate different SAS tokens for different environments
-   Set appropriate expiration times for SAS tokens
-   Use the minimum necessary permissions for each SAS token
-   Regenerate SAS tokens periodically
-   Monitor access logs for suspicious activity

## Troubleshooting

-   **CORS errors**: Check that your CORS settings match your application's domain
-   **401 Unauthorized**: Verify your SAS token is valid and has not expired
-   **404 Not Found**: Check container and blob names for typos
-   **Next.js Image Optimization errors**: Ensure your `next.config.js` includes the correct hostname configuration

For more information, refer to the [Azure Blob Storage documentation](https://docs.microsoft.com/en-us/azure/storage/blobs/).
