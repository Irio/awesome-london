module.exports = {
  title: "awesome-london",
  description:
    "Um guia básico para brasileiros chegando na terra da rainha 👑🇬🇧!",
  plugins: [["@vuepress/google-analytics", { ga: "UA-150975956-2" }]],
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Sobre", link: "/sobre/" }
    ],
    sidebar: [
      ["/", "Introdução"],
      ["/visto/", "Visto"],
      ["/imovel/", "Imóvel"],
      ["/saude/", "Saúde"],
      ["/bancos/", "Bancos"],
      ["/telefone/", "Telefone"],
    ],
    displayAllHeaders: true
  }
};
