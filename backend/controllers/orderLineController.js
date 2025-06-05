const { OrderLine, Product, Order } = require('../models');

exports.getLinesByOrderId = async (req, res) => {
  try {
    const lines = await OrderLine.findAll({
      where: { order_id: req.params.order_id },
      include: [{ model: Product, as: 'product' }]
    });

    if (!lines.length) return res.status(404).json({ error: 'No order lines found' });
    res.json(lines);
  } catch (err) {
    console.error('❌ Error fetching order lines:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
