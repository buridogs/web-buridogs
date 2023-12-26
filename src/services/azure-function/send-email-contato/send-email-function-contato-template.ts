import { IContatoFormData } from "@/components/app/contato/ContatoTypes";
import { CONTATO_FORMS_CONFIG } from "@/components/app/contato/ContatoUtils";

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

    return `<html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Send Email Function Contato</title>
    </head>
    <body>
        <h1>👋 Formulário de Contato 👋</h1>
        <h2>📆 Data de envio: ${new Date()}</h2>
        <ul>
        ${Object.entries(keyLabels).reduce(
            (acm: any, kl: any) =>
                acm +
                `<li>
                    <strong>${kl[1]}</strong>
                    <p class="answer">
                        ${renderFormattedAwnser(
                            contatoData[kl[0] as keyof IContatoFormData] as string
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
