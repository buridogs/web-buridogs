import { IAdocaoForm, IAdocaoPOSTRequestForm } from "@/components/app/adocaoDetalhes/AdocaoDetalhesTypes";
import { ADOCAO_FORMS_CONFIG } from "@/components/app/adocaoDetalhes/AdocaoDetalhesUtils";
import { formatDatetimePTBR } from "@/utils/methods";
import { formatKeysAccordingToLabelsAndValues } from "../azure-function-utils/formatKeysAccordingToLabelsAndValues";

export const convertDataToTemplateAdocao = (adocaoData: IAdocaoPOSTRequestForm, customDate?: string) => {
    const keysToRemove = ["arquivos"];

    const keyLabels = formatKeysAccordingToLabelsAndValues<IAdocaoForm>(ADOCAO_FORMS_CONFIG, keysToRemove);

    

    return `
    <html lang="pt-BR">
      <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Formulário de Adoção</title>
      </head>

      <style>
        .im {
            width: 100%;
        }
      </style>

      <body style="font-family: 'Arial', sans-serif; margin: 8px; padding: 8px ; background-color: #ef7e0740;">
        <div style = "max-width: 600px; margin: 40px auto; background-color: #ffffff; padding: 20px; border-radius: 8px;
        box-shadow: 0 0 10px #0000001a;">

          <h1 style="color: #EF7E07; text-align: center;">Formulário de Adoção Preenchido</h1>
          <h2 style = "color: #303E46; margin-bottom: 20px; font-size: 17px;">📆 Data de envio: ${formatDatetimePTBR(
            customDate ??  
            new Date().toISOString()
          )}</h2>
          <h2 style = "color: #303E46; margin-bottom: 20px; font-size: 17px; ">🐶 Cachorro interessado: ${
              adocaoData.nomeCachorroAdocao
          }</h2>
          <p style = "color: #303E46; line-height: 1.6; font-weight: bold; padding-left: 26px"> Abaixo estão os resultados do formulário de adoção:</p>

          <ul>
          ${Object.entries(keyLabels).reduce(
              (acm, kl) =>
                  acm +
                  ` <li style = "margin: 10px;">
                       <strong>${
                          kl[1]
                      } : <span style = "border-bottom: 2px solid #303e464d;">${renderAdocaoFormattedAnswer(
                      adocaoData[kl[0] as keyof IAdocaoPOSTRequestForm] as string
                  )}<span></strong>
                   </li>\n`,
              ""
          )}
                </ul>
            <div style = "width: 100%;">
             <p style="color:#EF7E07;font-size: 22px; font-weight:bold; margin-bottom:16px; text-align: center;">📷 ${
                adocaoData.linksArquivosAzureBlob.length
            } imagens adicionadas</p>
            ${adocaoData.linksArquivosAzureBlob.map(
                (linkImagem) => ` <img
                     src="${linkImagem}" 
                     alt="Imagem formulário"
                     style="display: flex; width:350px;height:350px;object-fit: cover; margin: 0px auto;"
                 />`
            )}
           </div>
          <p style="background-color: #303e4626; color: #131B20; text-align: center; max-width: 300px;
          font-size: 10px; border-radius: 8px; margin: 24px auto; padding: 8px 0px;">
              Caso esse mail contenha algum erro,<br>
              entrar em contato com a equipe de desenvolvimento.
          </p>
        </div>
      </body>
    </html>`;
};

export const renderAdocaoFormattedAnswer = (answer: string | string[] | boolean) => {
    if (answer === true) {
        return "Sim";
    } else if (answer === false) {
        return "Não";
    } else if (Array.isArray(answer)) {
        return answer.join(", ");
    } else {
        return answer;
    }
};