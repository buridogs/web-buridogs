import { IApadrinhamentoPOSTRequestForm } from "@/components/app/apadrinhamento/ApadrinhamentoTypes";
import { convertDataToTemplate } from "./send-email-function-apadrinhamento-template";

export async function sendEmailFunctionApadrinhamentoForm(adocaoData: IApadrinhamentoPOSTRequestForm) {
    const bodyTemplate = convertDataToTemplate(adocaoData);
    console.log({bodyTemplate});
    // const response = await fetch(
    //     `https://serverless-email-buridogs.azurewebsites.net/api/SendEmailFunctionAdocaoForm?code=${process.env.NEXT_PUBLIC_AZURE_FUNCTION_KEY_SEND_EMAIL_FUNCTION_ADOCAO_FORM}`,
    //     {
    //         method: "POST",
    //         body: JSON.stringify({ Body: bodyTemplate }),
    //     }
    // );

    // if (!response?.ok) throw Error();
}