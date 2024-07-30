import { IApadrinhamentoPOSTRequestForm } from "@/components/app/apadrinhamento/ApadrinhamentoTypes";
import { convertDataToTemplateApadrinhamento } from "./send-email-function-apadrinhamento-template";

export async function sendEmailFunctionApadrinhamentoForm(apadrinhamentoData: IApadrinhamentoPOSTRequestForm) {
    const bodyTemplate = convertDataToTemplateApadrinhamento(apadrinhamentoData);
    const response = await fetch(
        `https://serverless-email-buridogs.azurewebsites.net/api/SendEmailFunctionApadrinhamentoForm?code=${process.env.NEXT_PUBLIC_AZURE_FUNCTION_KEY_SEND_EMAIL_FUNCTION_APADRINHAMENTO_FORM}`,
        {
            method: "POST",
            body: JSON.stringify({ Body: bodyTemplate }),
        }
    );

    if (!response?.ok) throw Error();
}