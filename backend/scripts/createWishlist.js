
const { Wishlist, Product, sequelize } = require('../models');

(async () => {
  try {
    const user_id = 1;
    const productIds = [2, 5, 9, 16, 25, 30, 38, 49, 55, 68]; // 10 total

    for (const product_id of productIds) {
      const product = await Product.findByPk(product_id);
      if (!product) {
        console.warn(`⚠️ Product ${product_id} not found. Skipping.`);
        continue;
      }

      const [item, created] = await Wishlist.findOrCreate({
        where: { user_id, product_id },
        defaults: {
        }
      });

      console.log(`✅ Wishlist item: Product ${product_id}`);
    }

    await sequelize.close();
  } catch (err) {
    console.error('❌ Error creating wishlist:', err);
    await sequelize.close();
    process.exit(1);
  }
})();
