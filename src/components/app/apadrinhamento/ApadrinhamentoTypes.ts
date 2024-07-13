export interface IApadrinhamentoForm {
    nome: string;
    email: string;
    telefone_contato: string;
    nome_animal: string;
    preferencia_contato: string;
    apadrinhar_com: string;
}

export interface IApadrinhamentoPOSTRequestForm extends IApadrinhamentoForm {}