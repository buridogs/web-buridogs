import { FormAvailableEnum, FormStatusEnum, IFormUI } from "@/interfaces/formularioInterfaces";

// Adoption forms
export const pendingAdocoesMock: IFormUI[] = [
    {
        id: "1",
        createdAt: "2025-04-01T14:32:00Z",
        name: "João Silva",
        phone_number: "(31) 98765-4321",
        dog_name: "Zazá",
        status: FormStatusEnum.PENDENT,
        email: "joao.silva@email.com",
        form_type: FormAvailableEnum.ADOPTION,
        zip_code: "30140-001",
        street: "Rua dos Aimorés",
        number: "123",
        complement: "Apto 301",
        neighborhood: "Funcionários",
        city: "Belo Horizonte",
        state: "Minas Gerais",
        facebook_url: "https://facebook.com/joaosilva",
        instagram_url: "https://instagram.com/joaosilva",
        first_adoption: true,
        reason_for_adoption:
            "Sempre quis ter um cão como companhia e agora tenho condições de cuidar.",
        number_of_people_in_house: "2 pessoas",
        people_agree_with_adoption: true,
        has_children_or_elderly: ["criancas"],
        lives_in_house_or_apartment: "Apartamento",
        number_of_people_working: "2 pessoas",
        home_has_adoption_structure: "O lugar tem estrutura",
        has_other_animals: "Não possui outros animais",
        has_had_other_animals: "Já tive",
        aware_of_expenses: true,
        animal_place_description:
            "Apartamento com varanda ampla e tela de proteção. O cão ficará na sala durante o dia e dormirá em uma cama própria.",
        return_adoption_situation: "Não penso em devolver o animal em nenhuma situação.",
        aware_of_responsibility_term: true,
        images: [
            "https://buridogsblob.blob.core.windows.net/adoption-form/casa-joao-1.jpg",
            "https://buridogsblob.blob.core.windows.net/adoption-form/casa-joao-2.jpg",
            "adocao-zaza-1.jpg",
        ],
    },
    {
        id: "2",
        createdAt: "2025-04-03T10:15:00Z",
        name: "Maria Oliveira",
        phone_number: "(31) 99876-5432",
        dog_name: "Thor",
        status: FormStatusEnum.IN_PROCESS,
        email: "maria.oliveira@email.com",
        form_type: FormAvailableEnum.ADOPTION,
        zip_code: "30130-170",
        street: "Rua da Bahia",
        number: "456",
        neighborhood: "Centro",
        city: "Belo Horizonte",
        state: "Minas Gerais",
        facebook_url: "https://facebook.com/mariaoliveira",
        instagram_url: "https://instagram.com/mariaoliveira",
        first_adoption: false,
        reason_for_adoption: "Já tenho experiência com cães e quero dar um lar para mais um.",
        number_of_people_in_house: "3 pessoas",
        people_agree_with_adoption: true,
        lives_in_house_or_apartment: "Casa",
        number_of_people_working: "2 pessoas",
        home_has_adoption_structure: "O lugar tem estrutura",
        has_other_animals: "Possui 1 cão e 1 gato",
        has_had_other_animals: "Já tive",
        aware_of_expenses: true,
        animal_place_description:
            "Casa com quintal grande, murado e com árvores para sombra. O cão terá acesso a toda a área externa e parte da casa.",
        return_adoption_situation: "Não considero devolver o animal em nenhuma hipótese.",
        aware_of_responsibility_term: true,
        images: [
            "https://buridogsblob.blob.core.windows.net/adoption-form/casa-maria-1.jpg",
            "https://buridogsblob.blob.core.windows.net/adoption-form/casa-maria-2.jpg",
            "https://buridogsblob.blob.core.windows.net/adoption-form/casa-maria-3.jpg",
            "adocao-thor-1.PNG",
        ],
    },
];

// Sponsorship forms
export const pendingApadrinhamentosMock: IFormUI[] = [
    {
        id: "1",
        createdAt: "2025-04-10T09:15:00Z",
        name: "Lucas Mendes",
        phone_number: "(31) 98888-7777",
        email: "lucas.mendes@email.com",
        dog_name: "Bolinha",
        form_type: FormAvailableEnum.SPONSORSHIP,
        contact_method_preference: ["whatsapp", "email"],
        allow_receiving_news: true,
        status: FormStatusEnum.PENDENT,
        sponsorship_method: ["monthly_donation", "supplies"],
    },
    {
        id: "2",
        createdAt: "2025-04-12T14:30:00Z",
        name: "Fernanda Costa",
        phone_number: "(31) 97777-6666",
        email: "fernanda.costa@email.com",
        form_type: FormAvailableEnum.SPONSORSHIP,
        contact_method_preference: ["email"],
        allow_receiving_news: true,
        status: FormStatusEnum.SOLVED,
        sponsorship_method: ["monthly_donation"],
    },
    {
        id: "3",
        createdAt: "2025-04-15T11:20:00Z",
        name: "Ricardo Gomes",
        phone_number: "(31) 96666-5555",
        email: "ricardo.gomes@email.com",
        dog_name: "Pretinha",
        form_type: FormAvailableEnum.SPONSORSHIP,
        contact_method_preference: ["whatsapp", "phone"],
        allow_receiving_news: false,
        status: FormStatusEnum.IN_PROCESS,
        sponsorship_method: ["supplies", "medicine"],
    },
];

// Contact forms
export const pendingContatosMock: IFormUI[] = [
    {
        id: "1",
        createdAt: "2025-04-18T10:05:00Z",
        name: "Camila Rodrigues",
        phone_number: "(31) 95555-4444",
        email: "camila.rodrigues@email.com",
        form_type: FormAvailableEnum.CONTACT,
        message:
            "Olá! Gostaria de saber como posso me tornar voluntário da ONG. Tenho disponibilidade aos finais de semana e muita vontade de ajudar!",
        status: FormStatusEnum.PENDENT,
    },
    {
        id: "2",
        createdAt: "2025-04-19T15:45:00Z",
        name: "Bruno Alves",
        phone_number: "(31) 94444-3333",
        email: "bruno.alves@email.com",
        form_type: FormAvailableEnum.CONTACT,
        message:
            "Estou organizando um evento beneficente e gostaria de incluir a BuriDogs como uma das instituições beneficiadas. Como podemos conversar sobre isso?",
        status: FormStatusEnum.PENDENT,
    },
    {
        id: "3",
        createdAt: "2025-04-20T09:30:00Z",
        name: "Mariana Santos",
        phone_number: "(31) 93333-2222",
        email: "mariana.santos@email.com",
        form_type: FormAvailableEnum.CONTACT,
        message:
            "Encontrei um cachorro abandonado próximo à minha casa. Vocês fazem resgates ou podem me orientar sobre como proceder?",
        status: FormStatusEnum.SOLVED,
    },
];

// Combined mock data for all form types
export const allFormsMock: IFormUI[] = [
    ...pendingAdocoesMock,
    ...pendingApadrinhamentosMock,
    ...pendingContatosMock,
];
