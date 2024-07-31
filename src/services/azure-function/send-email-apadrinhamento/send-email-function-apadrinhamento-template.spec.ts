import { IApadrinhamentoPOSTRequestForm } from "@/components/app/apadrinhamento/ApadrinhamentoTypes";
import { convertDataToTemplateApadrinhamento } from "./send-email-function-apadrinhamento-template";
import { templateApadrinhamentoHTMLEmailDynamicMock } from "./__mocks__/send-email-function-apadrinhamento-template.mock";

describe("send-email-function-apadrinhamento-template", () => {
    describe("convertDataToTemplate", () => {
        const customDate = new Date().toISOString();
        const inputData: IApadrinhamentoPOSTRequestForm = {
            nome: "John Doe",
            email: "johndoe@email.com",
            telefone_contato: "99 9999-9999",
            preferencia_contato: [],
            nome_animal: undefined,
            apadrinhar_com: ["dinheiro", "racao", "lar-temporario"],
            escolher_quem_apadrinhar: "nao",
            quero_receber_contatos: false
        };

        describe("'preferencia contato' tests", () => {

            it("should return the correct html when email 'preferencia contato', no animal selected, dinheiro/racao/lar-temporario for 'apadrinhar com' and didn\t mark 'quero receber informacoes'", () => {
                inputData.preferencia_contato = ["email"];
                const result = convertDataToTemplateApadrinhamento(inputData, customDate);
                expect(result).toBe(templateApadrinhamentoHTMLEmailDynamicMock(
                    customDate,
                    {
                        ...inputData
                    }
                ));
            });

            it("should return the correct html when whatsapp for 'preferencia contato', no animal selected, dinheiro/racao/lar-temporario for 'apadrinhar com' and didn\t mark 'quero receber informacoes'", () => {
                inputData.preferencia_contato = ["whatsapp"];
                const result = convertDataToTemplateApadrinhamento(inputData, customDate);
                expect(result).toBe(templateApadrinhamentoHTMLEmailDynamicMock(
                    customDate,
                    {
                        ...inputData
                    }
                ));
            });

            it("should return the correct html when telefone for 'preferencia contato', no animal selected, dinheiro/racao/lar-temporario for 'apadrinhar com' and didn\t mark 'quero receber informacoes'", () => {
                inputData.preferencia_contato = ["telefone"];
                const result = convertDataToTemplateApadrinhamento(inputData, customDate);
                expect(result).toBe(templateApadrinhamentoHTMLEmailDynamicMock(
                    customDate,
                    {
                        ...inputData
                    }
                ));
            });

            it("should return the correct html when email/whatsapp for 'preferencia contato', no animal selected, dinheiro/racao/lar-temporario for 'apadrinhar com' and didn\t mark 'quero receber informacoes'", () => {
                inputData.preferencia_contato = ["email", "whatsapp"];
                const result = convertDataToTemplateApadrinhamento(inputData, customDate);
                expect(result).toBe(templateApadrinhamentoHTMLEmailDynamicMock(
                    customDate,
                    {
                        ...inputData
                    }
                ));
            });

            it("should return the correct html when email/telefone for 'preferencia contato', no animal selected, dinheiro/racao/lar-temporario for 'apadrinhar com' and didn\t mark 'quero receber informacoes'", () => {
                inputData.preferencia_contato = ["email", "telefone"];
                const result = convertDataToTemplateApadrinhamento(inputData, customDate);
                expect(result).toBe(templateApadrinhamentoHTMLEmailDynamicMock(
                    customDate,
                    {
                        ...inputData
                    }
                ));
            });

            it("should return the correct html when whatsapp/telefone for 'preferencia contato', no animal selected, dinheiro/racao/lar-temporario for 'apadrinhar com' and didn\t mark 'quero receber informacoes'", () => {
                inputData.preferencia_contato = ["whatsapp", "telefone"];
                const result = convertDataToTemplateApadrinhamento(inputData, customDate);
                expect(result).toBe(templateApadrinhamentoHTMLEmailDynamicMock(
                    customDate,
                    {
                        ...inputData
                    }
                ));
            });

            it("should return the correct html when email/whatsapp/telefone for 'preferencia contato', no animal selected, dinheiro/racao/lar-temporario for 'apadrinhar com' and didn\t mark 'quero receber informacoes'", () => {
                inputData.preferencia_contato = ["email", "whatsapp", "telefone"];
                const result = convertDataToTemplateApadrinhamento(inputData, customDate);
                expect(result).toBe(templateApadrinhamentoHTMLEmailDynamicMock(
                    customDate,
                    {
                        ...inputData
                    }
                ));
            });
        });

        describe("'apadrinhar com' tests", () => {

            inputData.preferencia_contato = ["email"];
            it("should return the correct html when email for 'preferencia contato', no animal selected, dinheiro for 'apadrinhar com' and didn\t mark 'quero receber informacoes'", () => {
                inputData.apadrinhar_com = ["dinheiro"];
                const result = convertDataToTemplateApadrinhamento(inputData, customDate);
                expect(result).toBe(templateApadrinhamentoHTMLEmailDynamicMock(
                    customDate,
                    {
                        ...inputData
                    }
                ));
            });

            it("should return the correct html when email for 'preferencia contato'nimal selected, racao for 'apadrinhar com' and didn\t mark 'quero receber informacoes'", () => {
                inputData.apadrinhar_com = ["racao"];
                const result = convertDataToTemplateApadrinhamento(inputData, customDate);
                expect(result).toBe(templateApadrinhamentoHTMLEmailDynamicMock(
                    customDate,
                    {
                        ...inputData
                    }
                ));
            });

            it("should return the correct html when email for 'preferencia contato'nimal selected, lar-temporario for 'apadrinhar com' and didn\t mark 'quero receber informacoes'", () => {
                inputData.apadrinhar_com = ["lar-temporario"];
                const result = convertDataToTemplateApadrinhamento(inputData, customDate);
                expect(result).toBe(templateApadrinhamentoHTMLEmailDynamicMock(
                    customDate,
                    {
                        ...inputData
                    }
                ));
            });

            it("should return the correct html when email for 'preferencia contato'o animal selected, dinheiro/racao for 'apadrinhar com' and didn\t mark 'quero receber informacoes'", () => {
                inputData.apadrinhar_com = ["dinheiro", "racao"];
                const result = convertDataToTemplateApadrinhamento(inputData, customDate);
                expect(result).toBe(templateApadrinhamentoHTMLEmailDynamicMock(
                    customDate,
                    {
                        ...inputData
                    }
                ));
            });

            it("should return the correct html when email for 'preferencia contato'o animal selected, dinheiro/lar-temporario for 'apadrinhar com' and didn\t mark 'quero receber informacoes'", () => {
                inputData.apadrinhar_com = ["dinheiro", "lar-temporario"];
                const result = convertDataToTemplateApadrinhamento(inputData, customDate);
                expect(result).toBe(templateApadrinhamentoHTMLEmailDynamicMock(
                    customDate,
                    {
                        ...inputData
                    }
                ));
            });

            it("should return the correct html when email for 'preferencia contato'o animal selected, racao/lar-temporario for 'apadrinhar com' and didn\t mark 'quero receber informacoes'", () => {
                inputData.apadrinhar_com = ["racao", "lar-temporario"];
                const result = convertDataToTemplateApadrinhamento(inputData, customDate);
                expect(result).toBe(templateApadrinhamentoHTMLEmailDynamicMock(
                    customDate,
                    {
                        ...inputData
                    }
                ));
            });

            it("should return the correct html when email for 'preferencia contato', no animal selected, dinheiro/racao/lar-temporario for 'apadrinhar com' and didn\t mark 'quero receber informacoes'", () => {
                inputData.apadrinhar_com = ["dinheiro", "racao", "lar-temporario"];
                const result = convertDataToTemplateApadrinhamento(inputData, customDate);
                expect(result).toBe(templateApadrinhamentoHTMLEmailDynamicMock(
                    customDate,
                    {
                        ...inputData
                    }
                ));
            });
        });

        describe("'escolher quem apadrinhar' tests", () => {
            inputData.preferencia_contato = ["email"];
            inputData.apadrinhar_com = ["dinheiro"];
            it("should return the correct html when email for 'preferencia contato', no animal selected, dinheiro for 'apadrinhar com' and didn\t mark 'quero receber informacoes'", () => {
                const result = convertDataToTemplateApadrinhamento(inputData, customDate);
                expect(result).toBe(templateApadrinhamentoHTMLEmailDynamicMock(
                    customDate,
                    {
                        ...inputData
                    }
                ));
            });

            it("should return the correct html when email for 'preferencia contato', animal selected, dinheiro for 'apadrinhar com' and didn\t marked 'quero receber informacoes'", () => {
                inputData.nome_animal = "Toto";
                inputData.escolher_quem_apadrinhar = "sim";
                const result = convertDataToTemplateApadrinhamento(inputData, customDate);
                expect(result).toBe(templateApadrinhamentoHTMLEmailDynamicMock(
                    customDate,
                    {
                        ...inputData
                    }
                ));
            });
        });

        describe("'aceito receber contatos' tests", () => {
            inputData.preferencia_contato = ["email"];
            inputData.apadrinhar_com = ["dinheiro"];
            it("should return the correct html when email for 'preferencia contato', no animal selected, dinheiro for 'apadrinhar com' and didn\t mark 'quero receber informacoes'", () => {
                const result = convertDataToTemplateApadrinhamento(inputData, customDate);
                expect(result).toBe(templateApadrinhamentoHTMLEmailDynamicMock(customDate,inputData));
            });

            it("should return the correct html when email for 'preferencia contato', no animal selected, dinheiro for 'apadrinhar com' and marked 'quero receber informacoes'", () => {
                inputData.quero_receber_contatos = true;
                const result = convertDataToTemplateApadrinhamento(inputData, customDate);
                expect(result).toBe(templateApadrinhamentoHTMLEmailDynamicMock(
                    customDate,
                    {
                        ...inputData
                    }
                ));
            });
        });
    });
});