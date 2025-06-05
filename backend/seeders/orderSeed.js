'use strict';

const { Order, User, Address } = require('../models');
const { Op } = require('sequelize');

const generateRandomDecimal = (min, max) =>
  (Math.random() * (max - min) + min).toFixed(2);

const getRandomDateWithinDays = (days) => {
  const now = new Date();
  const offset = Math.floor(Math.random() * days);
  return new Date(now.getTime() - offset * 86400000);
};

module.exports = {
  up: async () => {
    try {
      console.log('🔄 Seeding Orders...');

      const users = await User.findAll({
        where: {
          email: {
            [Op.in]: [
              'liam.murphy@gmail.com',
              'emma.schmidt@yahoo.com'
            ]
          }
        }
      });

      if (users.length !== 2) {
        throw new Error(`❌ Expected 2 users but found: ${users.length}`);
      }

      const addresses = await Address.findAll({
        where: {
          user_id: {
            [Op.in]: users.map(u => u.user_id)
          }
        }
      });

      if (addresses.length < 2) {
        throw new Error('❌ At least 2 addresses required.');
      }

      const orders = [];

      for (const user of users) {
        const shipping = addresses.find(a => a.user_id === user.user_id && a.is_primary);
        const billing = addresses.find(a => a.user_id === user.user_id && !a.is_primary) || shipping;

        const subtotal = parseFloat(generateRandomDecimal(10, 100));
        const tax = parseFloat((subtotal * 0.21).toFixed(2));
        const shippingCost = parseFloat(generateRandomDecimal(3, 10));
        const total = (subtotal + tax + shippingCost).toFixed(2);

        orders.push({
          user_id: user.user_id,
          guest_email: null,
          shipping_address_id: shipping.address_id,
          billing_address_id: billing.address_id,
          order_status: 'pending',
          subtotal_amount: subtotal,
          tax_amount: tax,
          shipping_cost: shippingCost,
          total_amount: total,
          order_date: getRandomDateWithinDays(30)
        });
      }

      await Order.bulkCreate(orders);
      console.log(`✅ Seeded ${orders.length} orders.`);
    } catch (error) {
      console.error('❌ Error seeding orders:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      console.log('🧹 Cleaning up Orders...');
      await Order.destroy({
        where: {
          user_id: {
            [Op.in]: [1, 2]
          }
        }
      });
      console.log('✅ Orders removed.');
    } catch (error) {
      console.error('❌ Error cleaning orders:', error);
    }
  }
};
