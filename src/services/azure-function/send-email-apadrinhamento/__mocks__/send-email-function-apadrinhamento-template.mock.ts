import { formatDatetimePTBR } from "@/utils/methods";
import { formatAnswerAccordingToKey } from "../send-email-function-apadrinhamento-template";
import { IApadrinhamentoPOSTRequestForm } from "@/components/app/apadrinhamento/ApadrinhamentoTypes";

/* eslint-disable no-useless-escape */
const commonTemplateHTMLHeader = (date: string) => `<html lang=\"pt-BR\">
      <head>
      <meta charset=\"UTF-8\">
      <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">
      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
      <title>Formulário de Apadrinhamento</title>
      </head>

      <style>
        .im {
            width: 100%;
        }
      </style>

      <body style=\"font-family: 'Arial', sans-serif; margin: 8px; padding: 8px ; background-color: #ef7e0740;\">
        <div style = \"max-width: 600px; margin: 40px auto; background-color: #ffffff; padding: 20px; border-radius: 8px;
        box-shadow: 0 0 10px #0000001a;\">

          <h1 style=\"color: #EF7E07; text-align: center;\">Formulário de Apadrinhamento Preenchido</h1>
          <h2 style = \"color: #303E46; margin-bottom: 20px; font-size: 17px;\">📆 Data de envio: ${formatDatetimePTBR(date)}</h2>`;

export const commonTemplateHTMLFooter = `<p style=\"background-color: #303e4626; color: #131B20; text-align: center; max-width: 300px;
          font-size: 10px; border-radius: 8px; margin: 24px auto; padding: 8px 0px;\">
              Caso esse mail contenha algum erro,<br>
              entrar em contato com a equipe de desenvolvimento.
          </p>`;

const apadrinharComTemplateOptions = (apadrinharCom: string[]) => {
    return `<li style = \"margin: 10px;\">
                      <strong>Apadrinhar com : <span style = \"border-bottom: 2px solid #303e464d;\">${formatAnswerAccordingToKey("apadrinhar_com", apadrinharCom)}<span></strong>
                  </li>`;
};

const preferenciaContatoTemplateOptions = (preferenciaContato: string[]) => {
    return `<li style = \"margin: 10px;\">
                      <strong>Como prefere que a gente entre em contato com você? : <span style = \"border-bottom: 2px solid #303e464d;\">${formatAnswerAccordingToKey("preferencia_contato", preferenciaContato)}<span></strong>
                  </li>`;
};

const escolherQuemApadrinharTemplateOptions = (apadrinhamentoData: IApadrinhamentoPOSTRequestForm) => {
  if (apadrinhamentoData.escolher_quem_apadrinhar === "sim") return `<h2 style = "color: #303E46; margin-bottom: 20px; font-size: 17px; ">🐶 Cachorro interessado para apadrinhamento: ${
                    apadrinhamentoData.nome_animal
                }</h2>`;
        
    return "<h2 style = \"color: #303E46; margin-bottom: 20px; font-size: 17px; \"> 🙌 Quero ajudar quem estiver precisando</h2>";
};

const shouldRenderNomeAnimalTemplate = (apadrinhamentoData: IApadrinhamentoPOSTRequestForm) => {
  if (apadrinhamentoData.escolher_quem_apadrinhar === "sim") return `<li style = "margin: 10px;">
                      <strong>Nome do animal que quer apadrinhar : <span style = "border-bottom: 2px solid #303e464d;">Toto<span></strong>
                  </li>
${apadrinharComTemplateOptions(apadrinhamentoData.apadrinhar_com)}`;
        
    return `${apadrinharComTemplateOptions(apadrinhamentoData.apadrinhar_com)}`;
};

const escolherQueroReceberTemplateOptions = (apadrinhamentoData: IApadrinhamentoPOSTRequestForm) => {
    return `<li style = "margin: 10px;">
                      <strong>Aceita receber contatos e informações sobre o projeto Buridogs? : <span style = "border-bottom: 2px solid #303e464d;">${
                        apadrinhamentoData.quero_receber_contatos ? 
                          "Sim" : 
                          "Não"
                        }<span></strong>
                  </li>
`;
};

export const templateApadrinhamentoHTMLEmailDynamicMock = (date: string, apadrinhamentoData: IApadrinhamentoPOSTRequestForm) => `
    ${commonTemplateHTMLHeader(date)}
          ${escolherQuemApadrinharTemplateOptions(apadrinhamentoData)}
          <p style = \"color: #303E46; line-height: 1.6; font-weight: bold; padding-left: 26px\"> Abaixo estão os resultados do formulário de adoção:</p>

          <ul>
          ${preferenciaContatoTemplateOptions(apadrinhamentoData.preferencia_contato)}
<li style = \"margin: 10px;\">
                      <strong>Nome completo : <span style = \"border-bottom: 2px solid #303e464d;\">John Doe<span></strong>
                  </li>
<li style = \"margin: 10px;\">
                      <strong>E-mail : <span style = \"border-bottom: 2px solid #303e464d;\">johndoe@email.com<span></strong>
                  </li>
<li style = \"margin: 10px;\">
                      <strong>Telefone para contato : <span style = \"border-bottom: 2px solid #303e464d;\">99 9999-9999<span></strong>
                  </li>
${shouldRenderNomeAnimalTemplate(apadrinhamentoData)}
${escolherQueroReceberTemplateOptions(apadrinhamentoData)}
          </ul>
          ${commonTemplateHTMLFooter}
        </div>
      </body>
    </html>`;