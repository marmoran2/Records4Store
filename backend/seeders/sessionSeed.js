'use strict';

const { Session, User } = require('../models');
const crypto = require('crypto');

// Helper to generate secure random session IDs
const generateSessionId = () => crypto.randomBytes(24).toString('hex');

// Helper to get expiry date (e.g., 7 days from now)
const daysFromNow = (days) => new Date(Date.now() + days * 86400000);

// Sample user agents and IPs
const sampleUserAgents = [
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
];

const sampleIPs = [
  '192.168.1.10',
  '88.198.50.213'
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      console.log('🔄 Seeding Sessions...');

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

      const sessions = users.map((user, index) => ({
        session_id: generateSessionId(),
        user_id: user.user_id,
        expires_at: daysFromNow(7),
        user_agent: sampleUserAgents[index % sampleUserAgents.length],
        ip_address: sampleIPs[index % sampleIPs.length],
        is_valid: true
      }));

      await Session.bulkCreate(sessions);
      console.log(`✅ Seeded ${sessions.length} sessions.`);
    } catch (error) {
      console.error('❌ Error seeding sessions:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      console.log('🧹 Cleaning up Sessions...');
      await Session.destroy({
        where: {
          user_id: { [Sequelize.Op.in]: [1, 2] }
        }
      });
      console.log('✅ Sessions removed.');
    } catch (error) {
      console.error('❌ Error cleaning sessions:', error);
    }
  }
};
