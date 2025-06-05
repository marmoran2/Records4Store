const { Payment, PaymentProvider, Order } = require('../models');

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      include: [
        { model: PaymentProvider, as: 'provider' },
        { model: Order, as: 'order' }
      ]
    });
    res.json(payments);
  } catch (err) {
    console.error('❌ Error fetching payments:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getPaymentByOrderId = async (req, res) => {
  try {
    const payment = await Payment.findOne({
      where: { order_id: req.params.order_id },
      include: [
        { model: PaymentProvider, as: 'provider' },
        { model: Order, as: 'order' }
      ]
    });

    if (!payment) return res.status(404).json({ error: 'Payment not found' });
    res.json(payment);
  } catch (err) {
    console.error('❌ Error fetching payment:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
