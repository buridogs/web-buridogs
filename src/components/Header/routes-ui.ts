export enum PublicRoutes {
    HOME = "/",
    ADOPTION = "/adocao",
    SPONSORSHIP = "/apadrinhamento",
    HAPPY_ENDINGS = "/finais-felizes",
    PARTNERS = "/parceiros",
    ABOUT_US = "/sobre-nos",
    CONTACT = "/contato",
    LOGIN = "/login",
    NAO_AUTORIZADO = "/unauthorized",
}

export enum PrivateRoutes {
    DASHBOARD = "/volunteer",
    REQUESTS_PENDING = "/volunteer/formularios-pendentes",
    MANAGE_DOGS = "/volunteer/gerenciar-cachorros",
    ADD_DOG = "/volunteer/gerenciar-cachorros/novo",
    MANAGE_PARTNERS = "/volunteer/gerenciar-parceiros",
    ADD_PARTNER = "/volunteer/gerenciar-parceiros/novo",
    MANAGE_USERS = "/volunteer/gerenciar-usuarios",
    ADD_USER = "/volunteer/gerenciar-usuarios/novo",
}
