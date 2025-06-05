const { Order, OrderConfirmation, OrderLine, Product } = require('../models');

// GET /api/orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: OrderConfirmation, as: 'confirmation' },
        {
          model: OrderLine,
          as: 'order_lines',
          include: [{ model: Product, as: 'product' }]
        }
      ]
    });
    res.json(orders);
  } catch (err) {
    console.error('❌ Error fetching orders:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET /api/orders/:id
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        { model: OrderConfirmation, as: 'confirmation' },
        {
          model: OrderLine,
          as: 'order_lines',
          include: [{ model: Product, as: 'product' }]
        }
      ]
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (err) {
    console.error(`❌ Error fetching order ${req.params.id}:`, err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST /api/orders
exports.createOrder = async (req, res) => {
  try {
    const {
      guest_email,
      shipping_address_id,
      billing_address_id,
      subtotal_amount,
      tax_amount,
      shipping_cost,
      total_amount,
      order_lines
    } = req.body;

    const order = await Order.create({
      guest_email,
      shipping_address_id,
      billing_address_id,
      subtotal_amount,
      tax_amount,
      shipping_cost,
      total_amount,
      order_status: 'pending',
      order_date: new Date()
    });

    if (order_lines && Array.isArray(order_lines)) {
      await Promise.all(order_lines.map(line =>
        OrderLine.create({
          order_id: order.order_id,
          product_id: line.product_id,
          quantity: line.quantity,
          unit_price: line.unit_price
        })
      ));
    }

    res.status(201).json({ message: 'Order created', order_id: order.order_id });
  } catch (err) {
    console.error('❌ Error creating order:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
