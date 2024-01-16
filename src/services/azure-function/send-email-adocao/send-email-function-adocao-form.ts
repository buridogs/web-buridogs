import { IAdocaoPOSTRequestForm } from "@/components/app/adocaoDetalhes/AdocaoDetalhesTypes";
import { convertDataToTemplate } from "./send-email-function-adocao-template";

export async function sendEmailFunctionAdocaoForm(adocaoData: IAdocaoPOSTRequestForm) {
    const bodyTemplate = convertDataToTemplate(adocaoData);
    const response = await fetch(
        `https://serverless-email-buridogs.azurewebsites.net/api/SendEmailFunctionAdocaoForm?code=${process.env.NEXT_PUBLIC_AZURE_FUNCTION_KEY_SEND_EMAIL_FUNCTION_ADOCAO_FORM}`,
        {
            method: "POST",
            body: JSON.stringify({ Body: bodyTemplate }),
        }
    );

    if (!response?.ok) throw Error();
}
