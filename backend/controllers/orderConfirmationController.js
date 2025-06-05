const { OrderConfirmation } = require('../models');

exports.getConfirmationByOrder = async (req, res) => {
  try {
    const confirmation = await OrderConfirmation.findOne({ where: { order_id: req.params.orderId } });
    if (!confirmation) return res.status(404).json({ error: 'No confirmation found' });
    res.json(confirmation);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching confirmation', details: error.message });
  }
};

exports.sendConfirmationEmail = async (req, res) => {
  try {
    // Simulation logic for email sending here
    await OrderConfirmation.update({ email_sent: true }, { where: { order_id: req.params.orderId } });
    res.json({ message: 'Email marked as sent' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update confirmation', details: error.message });
  }
};