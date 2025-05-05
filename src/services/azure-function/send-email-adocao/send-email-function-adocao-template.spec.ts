import { IAdocaoPOSTRequestForm } from "@/components/app/adocaoDetalhes/AdocaoDetalhesTypes";
import { convertDataToTemplateAdocao } from "./send-email-function-adocao-template";
import { templateAdocaoHTMLEmailDynamicMock } from "./__mocks__/send-email-function-adocao-template.mock";

describe("send-email-function-adocao-template", () => {
    describe("convertDataToTemplate", () => {
        const customDate = new Date().toISOString();
        const inputData: IAdocaoPOSTRequestForm = {
            nome: "John Doe",
            contato: "99 9999-9999",
            endereco_bairro: "Centro",
            endereco_cep: "99999999",
            endereco_cidade: "Belo Horizonte",
            endereco_estado: "Minas Gerais",
            endereco_numero: "200",
            endereco_rua: "Rua Teste",
            endereco_complemento: "Esquina",
            descricao_lugar_animal: "Teste",
            consciente_termo_responsabilidade: false,
            esta_ciente_gastos: false,
            arquivos: undefined,
            facebook_url: "https://google.com",
            ha_outros_animais: "sim",
            instagram_url: "https://google.com",
            ja_teve_outros_animais: "sim",
            linksArquivosAzureBlob: ["https://google.com"],
            mora_casa_apt: "casa",
            moradia_tem_estrutura_adocao: "Tem estrutura",
            motivo_adocao: "Quero companhia",
            nomeCachorroAdocao: "Toto",
            pessoas_de_acordo_adocao: true,
            primeira_adocao: true,
            quantidade_pessoas_moradia: "2",
            quantidade_pessoas_trabalham: "2",
            situacao_devolucao_adocao: "Não penso",
            ha_criancas_idosos: ["Há crianças"],
        };

        describe("'primeira adocao' tests", () => {
            it("should return the correct html when 'primeira_adocao' is true", () => {
                inputData.primeira_adocao = true;
                const result = convertDataToTemplateAdocao(inputData, customDate);
                expect(result).toBe(templateAdocaoHTMLEmailDynamicMock(customDate, inputData));
            });

            it("should return the correct html when 'primeira_adocao' is false", () => {
                inputData.primeira_adocao = false;
                const result = convertDataToTemplateAdocao(inputData, customDate);
                expect(result).toBe(templateAdocaoHTMLEmailDynamicMock(customDate, inputData));
            });
        });

        describe("'pessoas estao de acordo' tests", () => {
            it("should return the correct html when 'pessoas estao de acordo' is true", () => {
                inputData.pessoas_de_acordo_adocao = true;
                const result = convertDataToTemplateAdocao(inputData, customDate);
                expect(result).toBe(templateAdocaoHTMLEmailDynamicMock(customDate, inputData));
            });

            it("should return the correct html when 'pessoas estao de acordo' is false", () => {
                inputData.pessoas_de_acordo_adocao = false;
                const result = convertDataToTemplateAdocao(inputData, customDate);
                expect(result).toBe(templateAdocaoHTMLEmailDynamicMock(customDate, inputData));
            });
        });

        describe("'ha crianças ou idosos' tests", () => {
            it("should return the correct html when 'ha crianças ou idosos' has both values", () => {
                inputData.ha_criancas_idosos = ["criancas", "idosos"];
                const result = convertDataToTemplateAdocao(inputData, customDate);
                expect(result).toBe(templateAdocaoHTMLEmailDynamicMock(customDate, inputData));
            });

            it("should return the correct html when 'ha crianças ou idosos' has only 'criancas'", () => {
                inputData.ha_criancas_idosos = ["criancas"];
                const result = convertDataToTemplateAdocao(inputData, customDate);
                expect(result).toBe(templateAdocaoHTMLEmailDynamicMock(customDate, inputData));
            });

            it("should return the correct html when 'ha crianças ou idosos' has only 'idosos'", () => {
                inputData.ha_criancas_idosos = ["idosos"];
                const result = convertDataToTemplateAdocao(inputData, customDate);
                expect(result).toBe(templateAdocaoHTMLEmailDynamicMock(customDate, inputData));
            });

            it("should return the correct html when 'ha crianças ou idosos' doesnt have any value", () => {
                inputData.ha_criancas_idosos = [];
                const result = convertDataToTemplateAdocao(inputData, customDate);
                expect(result).toBe(templateAdocaoHTMLEmailDynamicMock(customDate, inputData));
            });
        });

        describe("'mora em casa ou apt' tests", () => {
            it("should return the correct html when 'mora em casa ou apt' is casa", () => {
                inputData.mora_casa_apt = "casa";
                const result = convertDataToTemplateAdocao(inputData, customDate);
                expect(result).toBe(templateAdocaoHTMLEmailDynamicMock(customDate, inputData));
            });

            it("should return the correct html when 'mora em casa ou apt' is apt", () => {
                inputData.mora_casa_apt = "apt";
                const result = convertDataToTemplateAdocao(inputData, customDate);
                expect(result).toBe(templateAdocaoHTMLEmailDynamicMock(customDate, inputData));
            });
        });

        describe("'o lugar tem estrutura' tests", () => {
            it("should return the correct html when 'o lugar tem estrutura' is sim", () => {
                inputData.moradia_tem_estrutura_adocao = "Tem estrutura";
                const result = convertDataToTemplateAdocao(inputData, customDate);
                expect(result).toBe(templateAdocaoHTMLEmailDynamicMock(customDate, inputData));
            });

            it("should return the correct html when 'o lugar tem estrutura' is nao", () => {
                inputData.moradia_tem_estrutura_adocao = "Não tem";
                const result = convertDataToTemplateAdocao(inputData, customDate);
                expect(result).toBe(templateAdocaoHTMLEmailDynamicMock(customDate, inputData));
            });
        });

        describe("'ja teve outros animais' tests", () => {
            it("should return the correct html when 'ja teve outros animais' is sim", () => {
                inputData.ja_teve_outros_animais = "sim";
                const result = convertDataToTemplateAdocao(inputData, customDate);
                expect(result).toBe(templateAdocaoHTMLEmailDynamicMock(customDate, inputData));
            });

            it("should return the correct html when 'ja teve outros animais' is nao", () => {
                inputData.ja_teve_outros_animais = "nao";
                const result = convertDataToTemplateAdocao(inputData, customDate);
                expect(result).toBe(templateAdocaoHTMLEmailDynamicMock(customDate, inputData));
            });
        });

        describe("'esta ciente dos gastos' tests", () => {
            it("should return the correct html when 'esta ciente dos gastos' is true", () => {
                inputData.esta_ciente_gastos = true;
                const result = convertDataToTemplateAdocao(inputData, customDate);
                expect(result).toBe(templateAdocaoHTMLEmailDynamicMock(customDate, inputData));
            });

            it("should return the correct html when 'esta ciente dos gastos' is false", () => {
                inputData.esta_ciente_gastos = false;
                const result = convertDataToTemplateAdocao(inputData, customDate);
                expect(result).toBe(templateAdocaoHTMLEmailDynamicMock(customDate, inputData));
            });
        });

        describe("'esta consciente do termo de responsabilidade' tests", () => {
            it("should return the correct html when 'esta consciente do termo de responsabilidade' is true", () => {
                inputData.consciente_termo_responsabilidade = true;
                const result = convertDataToTemplateAdocao(inputData, customDate);
                expect(result).toBe(templateAdocaoHTMLEmailDynamicMock(customDate, inputData));
            });

            it("should return the correct html when 'esta consciente do termo de responsabilidade' is false", () => {
                inputData.consciente_termo_responsabilidade = false;
                const result = convertDataToTemplateAdocao(inputData, customDate);
                expect(result).toBe(templateAdocaoHTMLEmailDynamicMock(customDate, inputData));
            });
        });
    });
});
