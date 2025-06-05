'use strict';

const { Address, User } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      console.log('🔄 Seeding Addresses...');

      const users = await User.findAll({
        where: {
          email: [
            'liam.murphy@gmail.com',
            'emma.schmidt@yahoo.com'
          ]
        }
      });

      if (users.length !== 2) {
        throw new Error('❌ Expected 2 users but found: ' + users.length);
      }

      const [user1, user2] = users;

            const addresses = [
            {
                user_id: user1.user_id,
                line1: '12 St. Stephen’s Green',
                line2: 'Suite 3',
                city: 'Dublin',
                postcode: 'D02 AF30',
                country_code: 'Ireland',
                is_primary: true,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                user_id: user2.user_id,
                line1: 'Berliner Straße 99',
                line2: 'Apartment 5',
                city: 'Berlin',
                postcode: '10115',
                country_code: 'Deutschland',
                is_primary: true,
                created_at: new Date(),
                updated_at: new Date()
            }
            ];

      await Address.bulkCreate(addresses);
      console.log(`✅ Seeded ${addresses.length} addresses.`);
    } catch (error) {
      console.error('❌ Error seeding addresses:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      console.log('🧹 Cleaning up Addresses...');
      await Address.destroy({
        where: {
          line1: ['12 St. Stephen’s Green', 'Berliner Straße 99']
        }
      });
      console.log('✅ Addresses removed.');
    } catch (error) {
      console.error('❌ Error removing addresses:', error);
    }
  }
};
