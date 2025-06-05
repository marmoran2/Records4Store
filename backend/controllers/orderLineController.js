const { OrderLine } = require('../models');

exports.getLinesByOrderId = async (req, res) => {
  try {
    const lines = await OrderLine.findAll({ where: { order_id: req.params.orderId } });
    res.json(lines);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order lines', details: error.message });
  }
};

exports.addOrderLine = async (req, res) => {
  try {
    const newLine = await OrderLine.create(req.body);
    res.status(201).json(newLine);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create order line', details: error.message });
  }
};
