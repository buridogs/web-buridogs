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

    return `<html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Send Email Function Template</title>
    </head>
    <body>
        <h1>🐶 Formulário de adoção preenchido 🐶</h1>
        <h2>🔎 Cachorro interessado: ${adocaoData.nomeCachorroAdocao}</h2>
        <h2>📆 Data de envio: ${formatDatetimePTBR(new Date().toISOString())}</h2>
        <ul>
        ${Object.entries(keyLabels).reduce(
            (acm: any, kl: any) =>
                acm +
                `<li>
                    <strong>${kl[1]}</strong>
                    <p class="answer">
                        ${renderFormattedAwnser(
                            adocaoData[kl[0] as keyof IAdocaoPOSTRequestForm] as string
                        )}
                    </p>
                </li>\n`,
            ""
        )}
        </ul>
    </body>
    <style>
        .answer {
            margin-left: 8px;
        }
    </style>
    </html>`;
};
