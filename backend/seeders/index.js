const sequelize = require('../models').sequelize;

const seedUsers = require('./userSeed');
const seedProducts = require('./productSeed');
const seedOrders = require('./orderSeed');

(async () => {
  try {
    await sequelize.sync({ force: true }); // clears DB
    console.log('Seeding...');

    await seedUsers();
    await seedProducts();
    await seedOrders();

    console.log('Seeding complete.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
})();