import { IContatoFormData } from "@/components/app/contato/ContatoTypes";
import { CONTATO_FORMS_CONFIG } from "@/components/app/contato/ContatoUtils";
import { formatDatetimePTBR } from "@/utils/methods";

export const convertDataToTemplateContato = (contatoData: IContatoFormData) => {
    const keyLabels = CONTATO_FORMS_CONFIG.reduce((acm, cur) => {
        if (!cur.section.length) return { ...acm };

        const hasMoreSection = cur.section.length > 1;
        if (hasMoreSection) {
            const innerSection = cur.section.reduce(
                (acumul, current) => ({ ...acumul, [current.key]: current.label }),
                {}
            );
            return {
                ...acm,
                ...innerSection,
            };
        }

        const singleSectionData = cur.section[0];

        return {
            ...acm,
            [singleSectionData.key]: singleSectionData.label,
        };
    }, {});

    const renderFormattedAwnser = (awnser: string | string[]) => {
        return awnser;
    };

    return `
    <html lang="pt-BR">
      <head>    
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Formulário de Contato</title>      
      </head>

      <body >

        <div >

          <h1 >Formulário de Contato</h1>    
          <h2 >📆 Data de envio: ${formatDatetimePTBR(new Date().toISOString())}</h2>        
          <p > Abaixo estão os dados do formulario de contato:</p>

          <ul>
          ${Object.entries(keyLabels).reduce(
              (acm: any, kl: any) =>
                  acm +
                  `<li >
                      <strong>${kl[1]} : <span ;>${renderFormattedAwnser(
                          contatoData[kl[0] as keyof IContatoFormData] as string
                      )}<span></strong>
                  </li>\n`,
              ""
          )}
          </ul>

          <p >
            Caso esse mail contenha algum erro,<br>
            entrar em contato com a equipe de desenvolvimento.
          </p>
        </div>
      </body>
    </html>`;
};
