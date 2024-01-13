import { IAdocaoPOSTRequestForm } from "@/components/app/adocaoDetalhes/AdocaoDetalhesTypes";
import { ADOCAO_FORMS_CONFIG } from "@/components/app/adocaoDetalhes/AdocaoDetalhesUtils";
import { formatDatetimePTBR } from "@/utils/methods";

export const convertDataToTemplate = (adocaoData: IAdocaoPOSTRequestForm) => {
    const keyLabels = ADOCAO_FORMS_CONFIG.reduce((acm, cur) => {
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
    <title>Formulário de Adoção</title>      
    </head>
    
    <body >
      <div >

        <h1 >Formulário de Adoção Preenchido</h1>    
        <h2 >📆 Data de envio: ${formatDatetimePTBR(new Date().toISOString())}</h2>        
        <h2 >🐶 Cachorro interessado: ${adocaoData.nomeCachorroAdocao}</h2> 
        <p > Abaixo estão os resultados do formulário de adoção:</p>

        <ul>
        ${Object.entries(keyLabels).reduce(
            (acm: any, kl: any) =>
                acm +
                `<li >
                    <strong>${kl[1]} : <span >${renderFormattedAwnser(
                        adocaoData[kl[0] as keyof IAdocaoPOSTRequestForm] as string
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