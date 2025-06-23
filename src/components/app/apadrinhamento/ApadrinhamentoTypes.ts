export interface IApadrinhamentoForm {
    nome: string;
    email: string;
    contato: string;
    nome_animal?: string;
    preferencia_contato: string[];
    quero_receber_contatos: boolean;
    apadrinhar_com: string[];
    escolher_quem_apadrinhar: string;
}

export interface IApadrinhamentoPOSTRequestForm extends IApadrinhamentoForm {}
