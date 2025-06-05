'use strict';

const { ProductView } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      console.log('🔄 Seeding Product Views...');

      const views = [
        {
          session_id: 'a50178998d221297e468e75f408ac0b29eaf6335aa8d5c5b',
          product_id: 3,
          user_id: 1,
          viewed_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3) // 3 days ago
        },
        {
          session_id: 'a50178998d221297e468e75f408ac0b29eaf6335aa8d5c5b',
          product_id: 5,
          user_id: 1,
          viewed_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2) // 2 days ago
        },
        {
          session_id: 'f8cc97342bf48d56d9b7dfc1472bee18a019929ba37c3907',
          product_id: 8,
          user_id: 2,
          viewed_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1) // 1 day ago
        },
        {
          session_id: 'f8cc97342bf48d56d9b7dfc1472bee18a019929ba37c3907',
          product_id: 12,
          user_id: 2,
          viewed_at: new Date() // now
        },
        {
          session_id: 'f8cc97342bf48d56d9b7dfc1472bee18a019929ba37c3907',
          product_id: 20,
          user_id: 2,
          viewed_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4) // 4 days ago
        }
      ];

      await ProductView.bulkCreate(views);
      console.log(`✅ Seeded ${views.length} product views.`);
    } catch (error) {
      console.error('❌ Error seeding product views:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      console.log('🧹 Removing all Product Views...');
      await ProductView.destroy({ where: {} });
      console.log('✅ Product Views cleaned up.');
    } catch (error) {
      console.error('❌ Error removing product views:', error);
    }
  }
};
