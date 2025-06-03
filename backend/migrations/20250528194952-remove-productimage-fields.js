'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.removeColumn('Products', 'barcode'),
      queryInterface.removeColumn('ProductImages', 'alt_text'),
      queryInterface.removeColumn('ProductImages', 'sort_order'),
      queryInterface.removeColumn('ProductImages', 'is_thumbnail')
    ]);
  },

  async down(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.addColumn('Products', 'barcode', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('ProductImages', 'alt_text', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('ProductImages', 'sort_order', {
        type: Sequelize.INTEGER
      }),
      queryInterface.addColumn('ProductImages', 'is_thumbnail', {
        type: Sequelize.BOOLEAN
      })
    ]);
  }
};