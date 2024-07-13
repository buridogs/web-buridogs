import { IApadrinhamentoPOSTRequestForm } from "@/components/app/apadrinhamento/ApadrinhamentoTypes";
import { APADRINHAMENTO_FORMS_COM_NOME_ANIMAL_CONFIG } from "@/components/app/apadrinhamento/ApadrinhamentoUtils";
import { formatDatetimePTBR } from "@/utils/methods";

export const convertDataToTemplate = (adocaoData: IApadrinhamentoPOSTRequestForm) => {
    const keyToRemove: string[] = [];

    const keyLabels = APADRINHAMENTO_FORMS_COM_NOME_ANIMAL_CONFIG.reduce((acm, cur) => {
        if (!cur.section.length) return { ...acm };

        const hasMoreSection = cur.section.length > 1;
        if (hasMoreSection) {
            const innerSection = cur.section.reduce(
                (acumul, current) =>
                    keyToRemove.includes(current.key)
                        ? { ...acumul }
                        : { ...acumul, [current.key]: current.label },
                {}
            );
            return {
                ...acm,
                ...innerSection,
            };
        }

        const singleSectionData = cur.section[0];

        if (keyToRemove.includes(singleSectionData.key)) return { ...acm };

        return {
            ...acm,
            [singleSectionData.key]: singleSectionData.label,
        };
    }, {});

    console.log({keyLabels});

    const renderFormattedAwnser = (awnser: string | string[] | boolean) => {
        if (awnser === true) {
            return "Sim";
        } else if (awnser === false) {
            return "Não";
        } else if (Array.isArray(awnser)) {
            return awnser.join(", ");
        } else {
            return awnser;
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
          <h2 style = "color: #303E46; margin-bottom: 20px; font-size: 17px;">📆 Data de envio: ${formatDatetimePTBR(
              new Date().toISOString()
          )}</h2>        
          <h2 style = "color: #303E46; margin-bottom: 20px; font-size: 17px; ">🐶 Cachorro interessado para apadrinhamento: ${
              adocaoData.nomeCachorroAdocao
          }</h2> 
          <p style = "color: #303E46; line-height: 1.6; font-weight: bold; padding-left: 26px"> Abaixo estão os resultados do formulário de adoção:</p>

          <ul>
          ${Object.entries(keyLabels).reduce(
              (acm: any, kl: any) =>
                  acm +
                  `<li style = "margin: 10px;">
                      <strong>${
                          kl[1]
                      } : <span style = "border-bottom: 2px solid #303e464d;">${renderFormattedAwnser(
                      adocaoData[kl[0] as keyof IApadrinhamentoPOSTRequestForm] as string
                  )}<span></strong>                    
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
