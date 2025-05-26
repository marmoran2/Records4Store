const { Order, OrderLine } = require('../models');

module.exports = async () => {
  const order = await Order.create({
    user_id: 1,
    shipping_address_id: 1,
    billing_address_id: 1,
    guest_email: null,
    order_status: 'paid',
    order_date: new Date(),
    total_amount: 1999
  });

  console.log('Order created:', order.order_id);

  await OrderLine.create({
    order_id: order.order_id,
    product_id: 1,
    quantity: 1,
    unit_price: 1999
  });
};

