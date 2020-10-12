'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('post_categories', [
      {
        category_name: "Bebidas",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        category_name: "Remedios",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        category_name: "Peças automotivas",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        category_name: "Eletrodomésticos",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        category_name: "Materiais para construção",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        category_name: "Cosmeticos",
        created_at: new Date(),
        updated_at: new Date()
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('post_categories', null, {});
  }
};
