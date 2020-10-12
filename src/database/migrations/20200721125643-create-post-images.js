'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('post_images', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      post_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'posts', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      image_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      image_key: {
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
    return queryInterface.dropTable('post_images');
  }
};