const { CartItem, Product, sequelize } = require('../models');

(async () => {
  try {
    const user_id = 2;
    const productIds = [3, 7, 12, 22]; // Pick 7 from 1–80
    const quantity = 1;

    for (const product_id of productIds) {
      const product = await Product.findByPk(product_id);
      if (!product) {
        console.warn(`⚠️ Product ${product_id} not found. Skipping.`);
        continue;
      }

      const [item, created] = await CartItem.findOrCreate({
        where: { user_id, product_id },
        defaults: {
          quantity,
          date_added: new Date()
        }
      });

      if (!created) {
        item.quantity += quantity;
        await item.save();
      }

      console.log(`✅ Added to cart: Product ${product_id}`);
    }

    await sequelize.close();
  } catch (err) {
    console.error('❌ Error creating cart items:', err);
    await sequelize.close();
    process.exit(1);
  }
})();