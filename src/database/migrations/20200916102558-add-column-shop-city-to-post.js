'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('posts', 'shop_city',
      { 
        type: Sequelize.STRING,
        allowNull: true 
      });
  },

  down: (queryInterface) => {
      return queryInterface.removeColumn('posts', 'shop_city');
  }
};
