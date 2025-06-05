'use strict';

const { User } = require('../models');
const daysFromNow = (days) => new Date(Date.now() + days * 86400000);

module.exports = {
  up: async (queryInterface, Sequelize) => {
  try {
    const user1 = {
      first_name: 'Liam',
      last_name: 'Murphy',
      email: 'liam.murphy@gmail.com',
      password_hash: 'hashed_password_placeholder',
      is_guest: false,
      user_role: 'customer',
      profile_url: 'https://cdn.example.com/avatars/liam.jpg',
      phone_number: '+353 87 123 4567',
      failed_login_attempts: 0,
      locked_until: null,
      created_at: daysFromNow(-50),
      last_login_at: daysFromNow(-1),
      country_code: 'IE'
    };

    const user2 = {
      first_name: 'Emma',
      last_name: 'Schmidt',
      email: 'emma.schmidt@yahoo.com',
      password_hash: 'hashed_password_placeholder',
      is_guest: false,
      user_role: 'customer',
      profile_url: 'https://cdn.example.com/avatars/emma.jpg',
      phone_number: '+49 157 234 5678',
      failed_login_attempts: 0,
      locked_until: null,
      created_at: daysFromNow(-50),
      last_login_at: daysFromNow(-6),
      country_code: 'DE'
    };

    // Add more users here...

    const users = [user1, user2];

      console.log('🔄 Seeding Users...');
      const result = await User.bulkCreate(users, {
        ignoreDuplicates: true
      });
      console.log(`✅ Seeded ${result.length} users successfully.`);

    } catch (error) {
      console.error('Error seeding users:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      const emailsToRemove = [
        'liam.murphy@gmail.com',
        'emma.schmidt@yahoo.com'
      ];
      console.log('🧹 Cleaning up seeded users...');
      await User.destroy({ where: { email: emailsToRemove } });
      console.log(`✅ Removed seeded users: ${emailsToRemove.join(', ')}`);
    } catch (error) {
      console.error('❌ Error cleaning up users:', error);
    }
  }
};