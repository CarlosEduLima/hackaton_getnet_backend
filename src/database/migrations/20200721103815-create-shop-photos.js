'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('shop_photos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      shop_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'shops', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      image_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image_key: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      legend: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('shop_photos');
  }
};