'use strict';

const { CartItem, Session, User, Product } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      console.log('🔄 Seeding CartItems...');

      // Get users and their sessions
      const users = await User.findAll({
        where: {
          email: [
            'liam.murphy@gmail.com',
            'emma.schmidt@yahoo.com'
          ]
        },
        include: [{ model: Session, as: 'sessions' }]
      });

      if (users.length !== 2) {
        throw new Error('❌ Expected 2 users but found: ' + users.length);
      }

      // Get some products to associate
      const products = await Product.findAll({ limit: 6 });

      if (products.length < 6) {
        throw new Error('❌ Not enough products to seed cart items.');
      }

      // Create sample cart items
      const cartItems = [
        {
          session_id: users[0].sessions?.[0]?.session_id || null,
          user_id: users[0].user_id,
          product_id: products[0].product_id,
          quantity: 2,
          date_added: new Date(Date.now() - 86400000 * 1) // 1 day ago
        },
        {
          session_id: users[1].sessions?.[0]?.session_id || null,
          user_id: users[1].user_id,
          product_id: products[1].product_id,
          quantity: 1,
          date_added: new Date(Date.now() - 86400000 * 2)
        },
        {
          session_id: users[0].sessions?.[0]?.session_id || null,
          user_id: users[0].user_id,
          product_id: products[2].product_id,
          quantity: 3,
          date_added: new Date(Date.now() - 86400000 * 3)
        },
      ];

      await CartItem.bulkCreate(cartItems);
      console.log(`✅ Seeded ${cartItems.length} cart items.`);
    } catch (error) {
      console.error('❌ Error seeding cart items:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      console.log('🧹 Removing all CartItems...');
      await CartItem.destroy({ where: {} });
      console.log('✅ All CartItems removed.');
    } catch (error) {
      console.error('❌ Error cleaning cart items:', error);
    }
  }
};