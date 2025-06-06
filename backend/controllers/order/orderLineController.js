// backend/controllers/orderLineController.js
const { OrderLine, Product } = require('../../models');

// Get all order lines
const getAllOrderLines = async (req, res) => {
  try {
    const lines = await OrderLine.findAll({ include: [{ model: Product }] });
    res.json(lines);
  } catch (error) {
    console.error('Error fetching order lines:', error);
    res.status(500).json({ message: 'Server error retrieving order lines' });
  }
};

// Get all lines for a specific order
const getLinesByOrderId = async (req, res) => {
  const { orderId } = req.params;
  try {
    const lines = await OrderLine.findAll({
      where: { order_id: orderId },
      include: [{ model: Product, as: 'product' }],
    });
    res.json(lines);
  } catch (error) {
    console.error(`Error fetching lines for order ${orderId}:`, error);
    res.status(500).json({ message: 'Server error retrieving order lines' });
  }
};

// Create a new order line
const createOrderLine = async (req, res) => {
  const { order_id, product_id, quantity, unit_price } = req.body;
  try {
    const line = await OrderLine.create({ order_id, product_id, quantity, unit_price });
    res.status(201).json(line);
  } catch (error) {
    console.error('Error creating order line:', error);
    res.status(500).json({ message: 'Server error creating order line' });
  }
};

module.exports = {
  getAllOrderLines,
  getLinesByOrderId,
  createOrderLine,
};
