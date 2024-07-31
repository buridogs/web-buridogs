import { IAdocaoPOSTRequestForm } from "@/components/app/adocaoDetalhes/AdocaoDetalhesTypes";
import { formatDatetimePTBR } from "@/utils/methods";
import { renderAdocaoFormattedAnswer } from "../send-email-function-adocao-template";

/* eslint-disable no-useless-escape */
const commonAdocaoTemplateHTMLHeader = (date: string) => `<html lang=\"pt-BR\">
      <head>
      <meta charset=\"UTF-8\">
      <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">
      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
      <title>Formulário de Adoção</title>
      </head>

      <style>
        .im {
            width: 100%;
        }
      </style>

      <body style=\"font-family: 'Arial', sans-serif; margin: 8px; padding: 8px ; background-color: #ef7e0740;\">
        <div style = \"max-width: 600px; margin: 40px auto; background-color: #ffffff; padding: 20px; border-radius: 8px;
        box-shadow: 0 0 10px #0000001a;\">

          <h1 style=\"color: #EF7E07; text-align: center;\">Formulário de Adoção Preenchido</h1>
          <h2 style = \"color: #303E46; margin-bottom: 20px; font-size: 17px;\">📆 Data de envio: ${formatDatetimePTBR(date)}</h2>`;

export const commonTemplateHTMLFooter = `<p style=\"background-color: #303e4626; color: #131B20; text-align: center; max-width: 300px;
          font-size: 10px; border-radius: 8px; margin: 24px auto; padding: 8px 0px;\">
              Caso esse mail contenha algum erro,<br>
              entrar em contato com a equipe de desenvolvimento.
          </p>`;

export const templateAdocaoHTMLEmailDynamicMock = (date: string, adocaoData: IAdocaoPOSTRequestForm) => `
    ${commonAdocaoTemplateHTMLHeader(date)}
          <h2 style = "color: #303E46; margin-bottom: 20px; font-size: 17px; ">🐶 Cachorro interessado: ${adocaoData.nomeCachorroAdocao}</h2>
          <p style = \"color: #303E46; line-height: 1.6; font-weight: bold; padding-left: 26px\"> Abaixo estão os resultados do formulário de adoção:</p>

          <ul>
           <li style = \"margin: 10px;\">
                       <strong>Nome responsável : <span style = "border-bottom: 2px solid #303e464d;">${adocaoData.nome}<span></strong>
                   </li>
 <li style = "margin: 10px;">
                       <strong>Celular (c/ WhatsApp, de preferência) : <span style = "border-bottom: 2px solid #303e464d;">${adocaoData.celular}<span></strong>
                   </li>
 <li style = "margin: 10px;">
                       <strong>CEP : <span style = "border-bottom: 2px solid #303e464d;">${adocaoData.endereco_cep}<span></strong>
                   </li>
 <li style = "margin: 10px;">
                       <strong>Logradouro : <span style = "border-bottom: 2px solid #303e464d;">${adocaoData.endereco_rua}<span></strong>
                   </li>
 <li style = "margin: 10px;">
                       <strong>Número : <span style = "border-bottom: 2px solid #303e464d;">${adocaoData.endereco_numero}<span></strong>
                   </li>
 <li style = "margin: 10px;">
                       <strong>Complemento : <span style = "border-bottom: 2px solid #303e464d;">${adocaoData.endereco_complemento}<span></strong>
                   </li>
 <li style = "margin: 10px;">
                       <strong>Bairro : <span style = "border-bottom: 2px solid #303e464d;">${adocaoData.endereco_bairro}<span></strong>
                   </li>
 <li style = "margin: 10px;">
                       <strong>Cidade : <span style = "border-bottom: 2px solid #303e464d;">${adocaoData.endereco_cidade}<span></strong>
                   </li>
 <li style = "margin: 10px;">
                       <strong>Estado : <span style = "border-bottom: 2px solid #303e464d;">${adocaoData.endereco_estado}<span></strong>
                   </li>
 <li style = "margin: 10px;">
                       <strong>Facebook Link : <span style = "border-bottom: 2px solid #303e464d;">${adocaoData.facebook_url}<span></strong>
                   </li>
 <li style = "margin: 10px;">
                       <strong>Instagram Link : <span style = "border-bottom: 2px solid #303e464d;">${adocaoData.instagram_url}<span></strong>
                   </li>
 <li style = "margin: 10px;">
                       <strong>Primeira adoção? : <span style = "border-bottom: 2px solid #303e464d;">${renderAdocaoFormattedAnswer(adocaoData.primeira_adocao)}<span></strong>
                   </li>
 <li style = "margin: 10px;">
                       <strong>Motivo adoção : <span style = "border-bottom: 2px solid #303e464d;">${adocaoData.motivo_adocao}<span></strong>
                   </li>
 <li style = "margin: 10px;">
                       <strong>Quantas pessoas moram? : <span style = "border-bottom: 2px solid #303e464d;">${adocaoData.quantidade_pessoas_moradia}<span></strong>
                   </li>
 <li style = "margin: 10px;">
                       <strong>As pessoas estão de acordo? : <span style = "border-bottom: 2px solid #303e464d;">${renderAdocaoFormattedAnswer(adocaoData.pessoas_de_acordo_adocao)}<span></strong>
                   </li>
 <li style = "margin: 10px;">
                       <strong>Há crianças ou idosos? : <span style = "border-bottom: 2px solid #303e464d;">${renderAdocaoFormattedAnswer(adocaoData.ha_criancas_idosos as string[])}<span></strong>
                   </li>
 <li style = "margin: 10px;">
                       <strong>Quantas pessoas trabalham? : <span style = "border-bottom: 2px solid #303e464d;">${adocaoData.quantidade_pessoas_trabalham}<span></strong>
                   </li>
 <li style = "margin: 10px;">
                       <strong>Mora em casa ou apartamento? : <span style = "border-bottom: 2px solid #303e464d;">${adocaoData.mora_casa_apt}<span></strong>
                   </li>
 <li style = "margin: 10px;">
                       <strong>O lugar tem estrutura para acolher o animal? : <span style = "border-bottom: 2px solid #303e464d;">${adocaoData.moradia_tem_estrutura_adocao}<span></strong>
                   </li>
 <li style = "margin: 10px;">
                       <strong>Você possui outros animais? Se sim, quantos? : <span style = "border-bottom: 2px solid #303e464d;">${adocaoData.ha_outros_animais}<span></strong>
                   </li>
 <li style = "margin: 10px;">
                       <strong>Já teve outros animais? : <span style = "border-bottom: 2px solid #303e464d;">${adocaoData.ja_teve_outros_animais}<span></strong>
                   </li>
 <li style = "margin: 10px;">
                       <strong>Você está ciente dos gastos? : <span style = "border-bottom: 2px solid #303e464d;">${renderAdocaoFormattedAnswer(adocaoData.esta_ciente_gastos)}<span></strong>
                   </li>
 <li style = "margin: 10px;">
                       <strong>Descreva o lugar que o animal ficará : <span style = "border-bottom: 2px solid #303e464d;">${adocaoData.descricao_lugar_animal}<span></strong>
                   </li>
 <li style = "margin: 10px;">
                       <strong>Pensa em devolver o animal em alguma situação? : <span style = "border-bottom: 2px solid #303e464d;">${adocaoData.situacao_devolucao_adocao}<span></strong>
                   </li>
 <li style = "margin: 10px;">
                       <strong>Está ciente em assinar o Termo de Responsabilidade? : <span style = "border-bottom: 2px solid #303e464d;">${renderAdocaoFormattedAnswer(adocaoData.consciente_termo_responsabilidade)}<span></strong>
                   </li>
 <li style = "margin: 10px;">
                       <strong>Adicione fotos do futuro lar do cãozinho. As imagens nos ajudarão a entender quão bem ele/ela estará 😄 : <span style = "border-bottom: 2px solid #303e464d;">undefined<span></strong>
                   </li>

                </ul>
            <div style = "width: 100%;">
             <p style="color:#EF7E07;font-size: 22px; font-weight:bold; margin-bottom:16px; text-align: center;">📷 1 imagens adicionadas</p>
             <img
                     src="${adocaoData.linksArquivosAzureBlob[0]}" 
                     alt="Imagem formulário"
                     style="display: flex; width:350px;height:350px;object-fit: cover; margin: 0px auto;"
                 />
           </div>
          ${commonTemplateHTMLFooter}
        </div>
      </body>
    </html>`;