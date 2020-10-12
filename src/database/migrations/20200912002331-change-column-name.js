'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.renameColumn('posts', 'branch', 'brand');
  },

  down: (queryInterface) => {
    return queryInterface.renameColumn('posts', 'brand', 'branch');
  }
};