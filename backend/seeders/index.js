const sequelize = require('../models').sequelize;

const seedUsers = require('./userseed');
const seedProducts = require('./productseed');
const seedOrders = require('./orderseed');

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