'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('shops', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'shop_categories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cnpj: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      owner_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      thumbnail_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      thumbnail_key: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      open_time: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      close_time: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      open_day: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      close_day: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      district: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      latitude: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      longitude: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cep: {
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
    return queryInterface.dropTable('shops');
  }
};