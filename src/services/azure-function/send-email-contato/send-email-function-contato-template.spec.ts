import { IContatoFormData } from "@/components/app/contato/ContatoTypes";
import { convertDataToTemplateContato } from "./send-email-function-contato-template";
import { templateContatoHTMLEmailDynamicMock } from "./__mocks__/send-email-function-contato-template.mock";

describe("send-email-function-contato-template", () => {
    describe("convertDataToTemplate", () => {
        const customDate = new Date().toISOString();
        const inputData: IContatoFormData = {
            nome: "John Doe",
            email: "johndoe@email.com",
            contato: "99 9999-9999",
            mensagem: undefined,
        };

        describe("'mensagem' tests", () => {
            it("should return the correct html when nome, email and contato are filled out", () => {
                const result = convertDataToTemplateContato(inputData, customDate);
                expect(result).toBe(templateContatoHTMLEmailDynamicMock(customDate, inputData));
            });

            it("should return the correct html when nome, email, contato and mensagem are filled out", () => {
                inputData.mensagem = "Mensagem teste";
                const result = convertDataToTemplateContato(inputData, customDate);
                expect(result).toBe(templateContatoHTMLEmailDynamicMock(customDate, inputData));
            });
        });
    });
});