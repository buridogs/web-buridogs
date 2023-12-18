import { IAdocaoPOSTRequestForm } from "@/components/app/adocaoDetalhes/AdocaoDetalhesTypes";
import { convertDataToTemplate } from "./send-email-function-template";

export async function sendEmailFunction(adocaoData: IAdocaoPOSTRequestForm) {
    const bodyTemplate = convertDataToTemplate(adocaoData);
    const response = await fetch(
        `https://serverless-email-buridogs.azurewebsites.net/api/SendEmailFunction?code=${process.env.NEXT_PUBLIC_AZURE_FUNCTION_KEY_SEND_EMAIL_FUNCTION}`,
        {
            method: "POST",
            body: JSON.stringify({ Body: bodyTemplate }),
        }
    );

    if (!response?.ok) throw Error();
}
