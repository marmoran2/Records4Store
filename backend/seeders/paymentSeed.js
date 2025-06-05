'use strict';

const { Payment, Order, PaymentProvider } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      console.log('🔄 Seeding Payments...');

      // Fetch a few existing orders and payment providers
      const orders = await Order.findAll({ limit: 3 });
      const providers = await PaymentProvider.findAll();

      if (orders.length === 0 || providers.length === 0) {
        throw new Error('❌ Missing required orders or payment providers');
      }

      const paymentData = [
        {
          order_id: orders[0].order_id,
          provider_id: providers.find(p => p.name === 'Stripe')?.provider_id || providers[0].provider_id,
          method: 'card',
          amount: orders[0].total_amount,
          status: 'success',
          processed_at: new Date(),
          provider_ref: 'STRP_REF_' + Date.now()
        },
        {
          order_id: orders[1].order_id,
          provider_id: providers.find(p => p.name === 'PayPal')?.provider_id || providers[1].provider_id,
          method: 'paypal',
          amount: orders[1].total_amount,
          status: 'success',
          processed_at: new Date(),
          provider_ref: 'PYPAL_' + Date.now()
        },
        {
          order_id: orders[2].order_id,
          provider_id: providers.find(p => p.name === 'Adyen')?.provider_id || providers[2].provider_id,
          method: 'bank',
          amount: orders[2].total_amount,
          status: 'pending',
          processed_at: null,
          provider_ref: null
        }
      ];

      await Payment.bulkCreate(paymentData);
      console.log(`✅ Seeded ${paymentData.length} payments.`);
    } catch (error) {
      console.error('❌ Error seeding payments:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      console.log('🧹 Cleaning up Payments...');
      await Payment.destroy({
        where: {
          status: ['success', 'pending']
        }
      });
      console.log('✅ Payments removed.');
    } catch (error) {
      console.error('❌ Error cleaning payments:', error);
    }
  }
};
