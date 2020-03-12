module.exports = {
  title: "awesome-london",
  description:
    "Um guia básico para brasileiros chegando na terra da rainha 👑🇬🇧!",
  locales: {
    "/": {
      lang: "pt-BR"
    }
  },
  plugins: [
    ["@vuepress/google-analytics", { ga: "UA-150975956-2" }],
    ["mermaidjs"]
  ],
  themeConfig: {
    nav: [{ text: "Home", link: "/" }, { text: "Sobre", link: "/sobre/" }],
    sidebar: [
      ["/", "Introdução"],
      ["/visto/", "Visto"],
      ["/imovel/", "Imóvel"],
      ["/saude/", "Saúde"],
      ["/bancos/", "Bancos"],
      ["/telefone/", "Telefone"],
      ["/transporte/", "Transporte"],
      ["/carteira-de-motorista/", "Carteira de Motorista"],
      ["/freelancing/", "Freelancing"],
      ["/pets/", "Pets"]
    ],
    displayAllHeaders: true,
    repo: "Irio/awesome-london",
    docsDir: "docs",
    editLinks: true,
    editLinkText: "Edite esta página",
    lastUpdated: "Última atualização"
  },
  markdown: {
    linkify: true
  }
};
