import { IContatoFormData } from "@/components/app/contato/ContatoTypes";
import { convertDataToTemplateContato } from "./send-email-function-contato";

export async function sendEmailFunctionContato(contatoData: IContatoFormData) {
    const bodyTemplate = convertDataToTemplateContato(contatoData);
    const response = await fetch(
        `https://serverless-email-buridogs.azurewebsites.net/api/SendEmailFunction?code=${process.env.NEXT_PUBLIC_AZURE_FUNCTION_KEY_SEND_EMAIL_FUNCTION}`,
        {
            method: "POST",
            body: JSON.stringify({ Body: bodyTemplate }),
        }
    );

    if (!response?.ok) throw Error();
}
