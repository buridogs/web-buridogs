import { IPartnerUI } from "@/interfaces/parceirosInterfaces";
import { PartnerCategoryEnum } from "@/services/api/modules/partners/types";

export const parceiros: IPartnerUI[] = [
    {
        id: "1",
        nome: "Petvita Clínica Veterinária (Dra Silene Rodrigues)",
        endereco: "Rua Engenheiro Godofredo dos Santos, 43, Estoril - BH",
        contato: "(31) 98813-5319",
        imagemSrc: "parceiro-petvita.png",
        descricao: "",
        linkURL: "",
        categoria: PartnerCategoryEnum.veterinary,
        redesSociais: [
            {
                socialMedia: "instagram",
                urlLink: "https://www.instagram.com/petvitaclinicaveterinaria/",
            },
        ],
    },
    {
        id: "2",
        nome: "Clínica Veterinária Life Pet (Dras Stephanie Raíssa e Nikoly Larissa)",
        endereco: "Rua San Salvador, 260, loja 15, Estrela Dalva - BH",
        contato: "(31) 3271-1250 / (31) 97574-0376",
        imagemSrc: "parceiro-life-pet.jpeg",
        descricao: "",
        linkURL: "",
        categoria: PartnerCategoryEnum.veterinary,
        redesSociais: [
            {
                socialMedia: "instagram",
                urlLink: "https://www.instagram.com/lifepetclinica/",
            },
        ],
    },
    {
        id: "3",
        nome: "Hospital Veterinário Arnaldo",
        endereco: "Rua Professor Otílio Macedo, 12, Olhos D'Água - BH",
        contato: "(31) 4009-0987 / (31) 99391-1177",
        imagemSrc: "parceiro-hosp-vet-arnaldo.png",
        descricao: "",
        linkURL: "",
        categoria: PartnerCategoryEnum.veterinary,
        redesSociais: [
            {
                socialMedia: "instagram",
                urlLink: "https://www.instagram.com/hospitalveterinarioarnaldo/",
            },
        ],
    },
    {
        id: "4",
        nome: "Pet Shop Palmeiras",
        endereco: "Av. Dom João VI, 1449, Palmeiras - BH",
        contato: "(31) 98454-4421",
        imagemSrc: "parceiro-pet-palmeiras.png",
        descricao: "",
        linkURL: "",
        categoria: PartnerCategoryEnum.petShop,
        redesSociais: [
            {
                socialMedia: "instagram",
                urlLink: "https://www.instagram.com/petshop_palmeiras/",
            },
        ],
    },
    {
        id: "5",
        nome: "Pet 92",
        endereco: "Rua Úrsula Paulino, 1368, Betânia - BH",
        contato: "(31) 3386-8767",
        imagemSrc: "parceiro-pet92.png",
        descricao: "",
        linkURL: "",
        categoria: PartnerCategoryEnum.petShop,
        redesSociais: [
            {
                socialMedia: "instagram",
                urlLink: "https://www.instagram.com/pet92brasil/",
            },
        ],
    },
    {
        id: "6",
        nome: "Beagá Pet",
        endereco: "Rua Nilo Antônio Gazire, 15, Estoril - BH",
        contato: "(31) 3309-1074",
        imagemSrc: "parceiro-beaga-pet.png",
        descricao: "",
        linkURL: "",
        categoria: PartnerCategoryEnum.petShop,
        redesSociais: [
            {
                socialMedia: "instagram",
                urlLink: "https://www.instagram.com/beagapet/",
            },
        ],
    },
    {
        id: "7",
        nome: "Toys e Pets Pet Shop",
        endereco: "Av. Professor Mário Werneck, 815, Buritis - BH",
        contato: "(31) 3377-3351",
        imagemSrc: "parceiro-toys-pets.png",
        descricao: "",
        linkURL: "",
        categoria: PartnerCategoryEnum.petShop,
        redesSociais: [
            {
                socialMedia: "instagram",
                urlLink: "https://www.instagram.com/toysepets/",
            },
        ],
    },
    {
        id: "8",
        nome: "Jair Rações",
        endereco: "Rua Luiz Cosme, 455, Havaí - BH",
        contato: "(31) 3313-9478",
        imagemSrc: "parceiro-jair-racoes.png",
        descricao: "",
        linkURL: "",
        categoria: PartnerCategoryEnum.petShop,
        redesSociais: [
            {
                socialMedia: "instagram",
                urlLink: "https://www.instagram.com/jairracoes/",
            },
        ],
    },
    {
        id: "9",
        nome: "Criativa Moda",
        endereco: "Av. Professor Mario Werneck, 2721, Loja 02, Buritis - BH",
        contato: "(31) 98652-3080",
        imagemSrc: "parceiro-criativa-moda.png",
        descricao: "",
        linkURL: "",
        categoria: PartnerCategoryEnum.clothing,
        redesSociais: [
            {
                socialMedia: "instagram",
                urlLink: "https://www.instagram.com/criativamodabh/",
            },
        ],
    },
    {
        id: "10",
        nome: "Athenas Modas",
        endereco: "Av. Aggeo Pio Sobrinho, 275, loja 07, Buritis - BH",
        contato: "(31) 99290-6666",
        imagemSrc: "parceiro-athenas-modas.png",
        descricao: "",
        linkURL: "",
        categoria: PartnerCategoryEnum.clothing,
        redesSociais: [
            {
                socialMedia: "instagram",
                urlLink: "https://www.instagram.com/athenasmodasbh/",
            },
        ],
    },
    {
        id: "11",
        nome: "Gerais Proteção Veicular",
        endereco: "Rua Nilo Aparecida Pinto, 165, Planalto - BH",
        contato: "(31) 3566-1424",
        imagemSrc: "parceiro-gerais-protecao.svg",
        descricao: "",
        linkURL: "",
        categoria: PartnerCategoryEnum.vehicleProtection,
        redesSociais: [
            {
                socialMedia: "instagram",
                urlLink: "https://www.instagram.com/geraisprotecao/",
            },
            {
                socialMedia: "facebook",
                urlLink: "https://www.facebook.com/gerais.protecao",
            },
            {
                socialMedia: "website",
                urlLink: "https://geraisprotecao.com/",
            },
        ],
    },
];
