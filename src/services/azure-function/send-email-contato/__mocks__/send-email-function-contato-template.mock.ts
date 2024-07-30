import { IContatoFormData } from "@/components/app/contato/ContatoTypes";
import { formatDatetimePTBR } from "@/utils/methods";

/* eslint-disable no-useless-escape */
const commonTemplateHTMLHeader = (date: string) => `<html lang=\"pt-BR\">
      <head>
      <meta charset=\"UTF-8\">
      <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">
      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
      <title>Formulário de Contato</title>
      </head>

      <body style=\"font-family: 'Arial', sans-serif; margin: 8px; padding: 8px ; background-color: #ef7e0740;\">
        <div style = \"max-width: 600px; margin: 40px auto; background-color: #ffffff; padding: 20px; border-radius: 8px;
        box-shadow: 0 0 10px #0000001a;\">

          <h1 style=\"color: #EF7E07; text-align: center;\">Formulário de Contato</h1>
          <h2 style = \"color: #303E46; margin-bottom: 20px; font-size: 17px;\">📆 Data de envio: ${formatDatetimePTBR(date)}</h2>`;

export const commonTemplateHTMLFooter = `<p style=\"background-color: #303e4626; color: #131B20; text-align: center; max-width: 300px;
          font-size: 10px; border-radius: 8px; margin: 24px auto; padding: 8px 0px;\">
              Caso esse mail contenha algum erro,<br>
              entrar em contato com a equipe de desenvolvimento.
          </p>`;

export const templateContatoHTMLEmailDynamicMock = (date: string, contatoData: IContatoFormData) => `
    ${commonTemplateHTMLHeader(date)}
          <p style = \"color: #303E46; line-height: 1.6; font-weight: bold; padding-left: 26px\"> Abaixo estão os dados do formulário de contato:</p>

          <ul>
          <li style = \"margin: 10px;\">
                      <strong>Nome Completo : <span style = \"border-bottom: 2px solid #303e464d;\">${contatoData.nome}<span></strong>
                  </li>
<li style = \"margin: 10px;\">
                      <strong>E-mail : <span style = \"border-bottom: 2px solid #303e464d;\">${contatoData.email}<span></strong>
                  </li>
<li style = \"margin: 10px;\">
                      <strong>Contato : <span style = \"border-bottom: 2px solid #303e464d;\">${contatoData.contato}<span></strong>
                  </li>
<li style = \"margin: 10px;\">
                      <strong>Mensagem : <span style = \"border-bottom: 2px solid #303e464d;\">${contatoData.mensagem}<span></strong>
                  </li>

          </ul>
          ${commonTemplateHTMLFooter}
        </div>
      </body>
    </html>`;