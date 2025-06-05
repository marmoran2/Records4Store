'use strict';

const { PaymentProvider } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      console.log('🔄 Seeding Payment Providers...');

      const providers = [
        {
          name: 'Stripe',
          api_endpoint: 'https://api.stripe.com/v1',
          support_email: 'support@stripe.com'
        },
        {
          name: 'PayPal',
          api_endpoint: 'https://api.paypal.com',
          support_email: 'support@paypal.com'
        },
        {
          name: 'Adyen',
          api_endpoint: 'https://checkout.adyen.com/v68',
          support_email: 'support@adyen.com'
        }
      ];

      await PaymentProvider.bulkCreate(providers);
      console.log(`✅ Seeded ${providers.length} payment providers.`);
    } catch (error) {
      console.error('❌ Error seeding payment providers:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      console.log('🧹 Cleaning up Payment Providers...');
      await PaymentProvider.destroy({
        where: {
          name: ['Stripe', 'PayPal', 'Adyen']
        }
      });
      console.log('✅ Payment Providers removed.');
    } catch (error) {
      console.error('❌ Error cleaning up payment providers:', error);
    }
  }
};
