const { Payment } = require('../models');

exports.getPaymentByOrder = async (req, res) => {
  try {
    const payment = await Payment.findOne({ where: { order_id: req.params.orderId } });
    if (!payment) return res.status(404).json({ error: 'No payment found for this order' });
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching payment', details: error.message });
  }
};

exports.createPayment = async (req, res) => {
  try {
    const payment = await Payment.create(req.body);
    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ error: 'Failed to process payment', details: error.message });
  }
};
