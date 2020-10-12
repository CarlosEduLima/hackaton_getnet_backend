'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('shop_categories', [
      {
        name: "Supermercado",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Loja de Informática",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Oficina Mecânica",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Oficina de Automóveis",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Concessionária",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Pet Shop",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Agropecuária",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Merceraria",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Panificadora",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Hidráulica",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Materias para Construção",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Salão de Beleza",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Loja de Roupas",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Lava Jato",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Videogames",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Posto de Gasolina",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Lava Jato",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Farmácia",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Hotel",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Loja de Celulares",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Assistência Técnica",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Restaurante",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Lanchonete",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Distribuidora de Bebidas",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Armarinho",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Loja de Utilidades",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Artigos para Festa",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Enxovais",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Home Center",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Serviço de Software",
        created_at: new Date(),
        updated_at: new Date()
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('shop_categories', null, {});
  }
};
