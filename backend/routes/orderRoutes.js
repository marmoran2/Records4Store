const express = require('express');
const router = express.Router();
const {
  Order,
  OrderLine,
  Payment,
  OrderConfirmation,
  Address,
  Product
} = require('../models');

// GET all orders
router.get('/', async (req, res) => {
  const orders = await Order.findAll({
    include: [
      { model: OrderLine, include: [Product] },
      Payment,
      OrderConfirmation,
      { model: Address, as: 'shippingAddress' },
      { model: Address, as: 'billingAddress' }
    ]
  });
  res.json(orders);
});

// GET order by ID
router.get('/:id', async (req, res) => {
  const order = await Order.findByPk(req.params.id, {
    include: [
      { model: OrderLine, include: [Product] },
      Payment,
      OrderConfirmation,
      { model: Address, as: 'shippingAddress' },
      { model: Address, as: 'billingAddress' }
    ]
  });
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

// POST create order (simplified example)
router.post('/', async (req, res) => {
  const {
    user_id,
    guest_email,
    shipping_address_id,
    billing_address_id,
    orderLines
  } = req.body;

  const order = await Order.create({
    user_id,
    guest_email,
    shipping_address_id,
    billing_address_id,
    order_status: 'pending',
    order_date: new Date()
  });

  for (const item of orderLines) {
    await OrderLine.create({
      order_id: order.order_id,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.unit_price
    });
  }

  res.status(201).json({ message: 'Order created', order_id: order.order_id });
});

module.exports = router;