import { IApadrinhamentoPOSTRequestForm } from "@/components/app/apadrinhamento/ApadrinhamentoTypes";
import { APADRINHAMENTO_FORMS_COM_CAMPOS_COMPLEMENTARES_CONFIG } from "@/components/app/apadrinhamento/ApadrinhamentoUtils";
import { formatDatetimePTBR } from "@/utils/methods";

export const convertDataToTemplate = (adocaoData: IApadrinhamentoPOSTRequestForm) => {
    const keyToRemove: string[] = adocaoData.escolher_quem_apadrinhar === "sim" ? ["escolher_quem_apadrinhar"] : ["escolher_quem_apadrinhar", "nome_animal"];

    const keyLabels = APADRINHAMENTO_FORMS_COM_CAMPOS_COMPLEMENTARES_CONFIG.reduce((acm, cur) => {
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

    const renderFormattedAwnser = (key: string, awnser: string | string[] | boolean) => {
        if (awnser === true) {
            return "Sim";
        } else if (awnser === false) {
            return "Não";
        } else if (Array.isArray(awnser)) {
            return formatAnswerAccordingToKey(key, awnser);
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
          ${
            adocaoData.escolher_quem_apadrinhar === "sim" ? `
                <h2 style = "color: #303E46; margin-bottom: 20px; font-size: 17px; ">🐶 Cachorro interessado para apadrinhamento: ${
                    adocaoData.nome_animal
                }</h2> 
            ` : `
                <h2 style = "color: #303E46; margin-bottom: 20px; font-size: 17px; "> 🙌 ${
                    formatAnswerAccordingToKey("escolher_quem_apadrinhar", adocaoData.escolher_quem_apadrinhar)
                }</h2> 
            `
          }
          <p style = "color: #303E46; line-height: 1.6; font-weight: bold; padding-left: 26px"> Abaixo estão os resultados do formulário de adoção:</p>

          <ul>
          ${Object.entries<Record<string, string | string[] | number>>(keyLabels).reduce(
              (acm, kl) =>
                  acm +
                  `<li style = "margin: 10px;">
                      <strong>${
                          kl[1]
                      } : <span style = "border-bottom: 2px solid #303e464d;">${renderFormattedAwnser(
                       kl[0],
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

function formatAnswerAccordingToKey(key: string, answers: string | string[]){
    const mappedValuesApadrinharCom: Record<string, string> = {
        ["dinheiro"]: "Dinheiro",
        ["racao"]: "Ração",
        ["lar_temporario"]: "Lar Temporário",
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