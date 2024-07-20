# How to create a lambda to send emails on Azure Cloud

## 1. Creating a Lambda Function
 1. Go to the Azure cloud
 2. Search by "Function App" service
 3. Search by the `serverless-email-buridogs` function app and click it
 4. Click at "Create" button
 5. A side container will appear. Then, click at the option "HTTP trigger". After that, choose a name for the function
 6. After creating the function, add the code

## 2. Integrating with SendGrid tool
1. Once the function is created, go to the "Integration" tab inside the created function
2. In "Output" container, click on "Add out"
3. A side container will appear. Then, click at the dropdown "Binding Type" and then the option "Send Grid".
4. At the "SendGrid API Key App Setting", select the BURIDOGS_SENDGRID_KEY

Once the SendGrid integration is configured. You can get the token to add locally in the code base.

- Go to the "Code + Test" tab, within the created function
- Then, click on "Get function URL" button and copy the "default (Function key)" url option
- Split the URL and take code in the end of the URL
- Paste the token into the .env file to test along the development process
- For production process, you need to add into the YML file inside the `.github` folder.
