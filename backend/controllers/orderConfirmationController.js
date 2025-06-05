const { OrderConfirmation, Order } = require('../models');

exports.getAllConfirmations = async (req, res) => {
  try {
    const confirmations = await OrderConfirmation.findAll({ include: { model: Order, as: 'order' } });
    res.json(confirmations);
  } catch (err) {
    console.error('❌ Error fetching confirmations:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getConfirmationByOrderId = async (req, res) => {
  try {
    const confirmation = await OrderConfirmation.findOne({
      where: { order_id: req.params.order_id },
      include: { model: Order, as: 'order' }
    });

    if (!confirmation) return res.status(404).json({ error: 'Confirmation not found' });
    res.json(confirmation);
  } catch (err) {
    console.error('❌ Error fetching confirmation:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};