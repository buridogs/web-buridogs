export interface IAdocaoForm {
    nome: string;
    endereco_cep: string;
    endereco_rua: string;
    endereco_numero: string;
    endereco_complemento?: string;
    endereco_bairro: string;
    endereco_cidade: string;
    endereco_estado: string;
    facebook_url: string;
    instagram_url: string;
    primeira_adocao: boolean;
    motivo_adocao: string;
    quantidade_pessoas_moradia: string;
    pessoas_de_acordo_adocao: boolean;
    ha_criancas_idosos?: (string | undefined)[] | undefined;
    mora_casa_apt: string;
    quantidade_pessoas_trabalham: string;
    moradia_tem_estrutura_adocao: string;
    ha_outros_animais: string;
    ja_teve_outros_animais: string;
    esta_ciente_gastos: boolean;
    descricao_lugar_animal: string;
    situacao_devolucao_adocao: string;
    consciente_termo_responsabilidade: boolean;
}
