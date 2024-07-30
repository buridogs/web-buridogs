import { IApadrinhamentoForm, IApadrinhamentoPOSTRequestForm } from "@/components/app/apadrinhamento/ApadrinhamentoTypes";
import { APADRINHAMENTO_FORMS_COM_CAMPOS_COMPLEMENTARES_CONFIG } from "@/components/app/apadrinhamento/ApadrinhamentoUtils";
import { formatDatetimePTBR } from "@/utils/methods";
import { formatKeysAccordingToLabelsAndValues } from "../azure-function-utils/formatKeysAccordingToLabelsAndValues";

// TODO: Improve logic - Class?
export const convertDataToTemplateApadrinhamento = (
    apadrinhamentoData: IApadrinhamentoPOSTRequestForm,
    customDate?: string
) => {
    const keysToRemove: string[] = apadrinhamentoData.escolher_quem_apadrinhar === "sim" ? 
        ["escolher_quem_apadrinhar"] : 
        ["escolher_quem_apadrinhar", "nome_animal"];

    const keyLabels = formatKeysAccordingToLabelsAndValues<IApadrinhamentoForm>(
        APADRINHAMENTO_FORMS_COM_CAMPOS_COMPLEMENTARES_CONFIG, 
        keysToRemove
    );

    const renderFormattedAnswer = (key: string, answer: string | string[] | boolean) => {
        if (answer === true) {
            return "Sim";
        } else if (answer === false) {
            return "Não";
        } else if (Array.isArray(answer)) {
            return formatAnswerAccordingToKey(key, answer);
        } else {
            return answer;
        }
    };

    return `
    <html lang="pt-BR">
      <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Formulário de Apadrinhamento</title>
      </head>

      <style>
        .im {
            width: 100%;
        }
      </style>

      <body style="font-family: 'Arial', sans-serif; margin: 8px; padding: 8px ; background-color: #ef7e0740;">
        <div style = "max-width: 600px; margin: 40px auto; background-color: #ffffff; padding: 20px; border-radius: 8px;
        box-shadow: 0 0 10px #0000001a;">

          <h1 style="color: #EF7E07; text-align: center;">Formulário de Apadrinhamento Preenchido</h1>
          <h2 style = "color: #303E46; margin-bottom: 20px; font-size: 17px;">📆 Data de envio: ${
            formatDatetimePTBR(
                customDate ?? new Date().toISOString()
            )}</h2>
          ${
            apadrinhamentoData.escolher_quem_apadrinhar === "sim" ? 
                `<h2 style = "color: #303E46; margin-bottom: 20px; font-size: 17px; ">🐶 Cachorro interessado para apadrinhamento: ${
                    apadrinhamentoData.nome_animal
                }</h2>` : 
                `<h2 style = "color: #303E46; margin-bottom: 20px; font-size: 17px; "> 🙌 ${
                    formatAnswerAccordingToKey("escolher_quem_apadrinhar", apadrinhamentoData.escolher_quem_apadrinhar)
                }</h2>`
          }
          <p style = "color: #303E46; line-height: 1.6; font-weight: bold; padding-left: 26px"> Abaixo estão os resultados do formulário de adoção:</p>

          <ul>
          ${Object.entries(keyLabels).reduce(
              (acm, kl) =>
                  acm +
                  `<li style = "margin: 10px;">
                      <strong>${kl[1]} : <span style = "border-bottom: 2px solid #303e464d;">${
                        renderFormattedAnswer(
                            kl[0],
                            apadrinhamentoData[kl[0] as keyof IApadrinhamentoPOSTRequestForm] as string
                        )
                      }<span></strong>
                  </li>\n`,
              ""
          )}
          </ul>
          <p style="background-color: #303e4626; color: #131B20; text-align: center; max-width: 300px;
          font-size: 10px; border-radius: 8px; margin: 24px auto; padding: 8px 0px;">
              Caso esse mail contenha algum erro,<br>
              entrar em contato com a equipe de desenvolvimento.
          </p>
        </div>
      </body>
    </html>`;
};

export function formatAnswerAccordingToKey(key: string, answers: string | string[]){
    const mappedValuesApadrinharCom: Record<string, string> = {
        ["dinheiro"]: "Dinheiro",
        ["racao"]: "Ração",
        ["lar-temporario"]: "Lar Temporário",
    };
    const mappedValuesEscolherQuemApadrinhar: Record<string, string> = {
        ["sim"]: "Quero escolher um animal para ajudar",
        ["nao"]: "Quero ajudar quem estiver precisando",
    };
    const mappedValuesPreferenciaContato: Record<string, string> = {
        ["email"]: "E-mail",
        ["whatsapp"]: "Whatsapp",
        ["telefone"]: "Telefone",
    };
    switch (key) {
        case "apadrinhar_com": {
            if (!Array.isArray(answers)) return null;
            const formattedValue = answers.map(answer => mappedValuesApadrinharCom[answer]);
            return formattedValue.length === 1 ? formattedValue : formattedValue.join(", ");
        }
        case "escolher_quem_apadrinhar":
            if (Array.isArray(answers)) return null;
            return mappedValuesEscolherQuemApadrinhar[answers];
        case "preferencia_contato": {
            if (!Array.isArray(answers)) return null;
            const formattedValue = answers.map(answer => mappedValuesPreferenciaContato[answer]);
            return formattedValue.length === 1 ? formattedValue : formattedValue.join(", ");
        }
        default:
            return null;
    }
}