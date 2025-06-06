// scripts/clearDB.js

const { sequelize } = require('../../models');

(async () => {
  try {
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true });

    // Get all model names dynamically
    const models = Object.values(sequelize.models);

    for (const model of models) {
      await model.truncate({ cascade: true });
    }

    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { raw: true });
    console.log('✅ All tables truncated successfully.');
  } catch (err) {
    console.error('❌ Failed to truncate tables:', err);
  } finally {
    await sequelize.close();
  }
})();