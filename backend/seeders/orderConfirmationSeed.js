'use strict';

const { OrderConfirmation, Order } = require('../models');

const generateCode = () => Math.random().toString(36).substring(2, 12).toUpperCase();

module.exports = {
  up: async () => {
    try {
      console.log('🔄 Seeding OrderConfirmations...');

      const orders = await Order.findAll({ limit: 5 });

      if (!orders.length) {
        throw new Error('❌ No orders found.');
      }

      const confirmations = orders.map(order => ({
        order_id: order.order_id,
        confirmation_code: `CONF-${generateCode()}`,
        confirmed_at: order.order_date,
        issued_at: order.order_date,
        email_sent: false
      }));

      await OrderConfirmation.bulkCreate(confirmations);
      console.log(`✅ Seeded ${confirmations.length} order confirmations.`);
    } catch (error) {
      console.error('❌ Error seeding confirmations:', error);
    }
  },

  down: async () => {
    try {
      console.log('🧹 Cleaning up OrderConfirmations...');
      await OrderConfirmation.destroy({ where: {} });
      console.log('✅ OrderConfirmations removed.');
    } catch (error) {
      console.error('❌ Error cleaning confirmations:', error);
    }
  }
};
