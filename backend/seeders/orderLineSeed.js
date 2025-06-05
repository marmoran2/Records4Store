'use strict';

const { Order, OrderLine, Product } = require('../models');

const getRandomQty = () => Math.floor(Math.random() * 3) + 1;

module.exports = {
  up: async () => {
    try {
      console.log('🔄 Seeding OrderLines...');

      const orders = await Order.findAll({ limit: 5 });
      const products = await Product.findAll({ limit: 20 });

      if (!orders.length || products.length < 5) {
        throw new Error('❌ Not enough orders or products to seed.');
      }

      const lines = [];

      for (const order of orders) {
        const sampleProducts = products
          .sort(() => 0.5 - Math.random())
          .slice(0, 2);

        for (const product of sampleProducts) {
          const qty = getRandomQty();
          const price = parseFloat(product.price);
          lines.push({
            order_id: order.order_id,
            product_id: product.product_id,
            quantity: qty,
            unit_price: price,
            line_total: (qty * price).toFixed(2)
          });
        }
      }

      await OrderLine.bulkCreate(lines);
      console.log(`✅ Seeded ${lines.length} order lines.`);
    } catch (error) {
      console.error('❌ Error seeding order lines:', error);
    }
  },

  down: async () => {
    try {
      console.log('🧹 Cleaning up OrderLines...');
      await OrderLine.destroy({ where: {} });
      console.log('✅ OrderLines removed.');
    } catch (error) {
      console.error('❌ Error cleaning order lines:', error);
    }
  }
};
