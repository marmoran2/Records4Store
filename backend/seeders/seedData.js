const fs = require('fs');
const path = require('path');
const db = require('../models');

const args = process.argv.slice(2);
const seedName = args[0];

if (!seedName) {
  console.error('❌ Please provide a seed name, e.g. node seeders/seedData.js cartItems');
  process.exit(1);
}

const modelMap = {
  cartItems: db.CartItem,
  orders: db.Order,
  orderLines: db.OrderLine,
  payments: db.Payment,
  paymentProviders: db.PaymentProvider,
  productViews: db.ProductView,
  orderConfirmations: db.OrderConfirmation,
  wishlists: db.Wishlist,
  sessions: db.Session,
  addresses: db.Address,
  users: db.User,
};

const runSeeder = async () => {
  const model = modelMap[seedName];
  if (!model) {
    console.error(`❌ No model found for seed: ${seedName}`);
    process.exit(1);
  }

  const filePath = path.join(__dirname, `../seed-data/${seedName}.json`);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Seed data file not found: ${filePath}`);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  console.log(`🔄 Seeding ${seedName}...`);
  try {
    await model.bulkCreate(data, { logging: console.log });
    console.log(`✅ Successfully seeded ${seedName}.`);
  } catch (error) {
    console.error(`❌ Error seeding ${seedName}:`, error);
  }
};


runSeeder();

async function undoSeeder(modelName) {
  try {
    console.log(`🔄 Undoing seed for ${modelName}...`);
    const Model = models[modelName];

    if (!Model) throw new Error(`Model '${modelName}' not found.`);

    // ⚠️ Custom delete logic — e.g., only test users or all
    if (modelName === 'CartItem') {
      await Model.destroy({ where: {} }); // or add filters
    }

    console.log(`✅ ${modelName} seed data removed.`);
  } catch (err) {
    console.error(`❌ Error undoing ${modelName}:`, err);
  }
}