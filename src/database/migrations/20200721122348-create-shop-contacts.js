'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('shop_contacts', {
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
      contact_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      value: {
        type: Sequelize.STRING,
        allowNull: false,
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
    return queryInterface.dropTable('shop_contacts');
  }
};