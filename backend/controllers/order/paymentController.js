// backend/controllers/paymentController.js
const { Payment, Order, PaymentProvider } = require('../../models');

// Get all payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      include: [
        { model: Order, as: 'order' },
        { model: PaymentProvider, as: 'provider' }
      ]
    });
    res.json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ message: 'Server error retrieving payments' });
  }
};

// Get payment by order ID
const getPaymentByOrderId = async (req, res) => {
  const { orderId } = req.params;
  try {
    const payment = await Payment.findOne({
      where: { order_id: orderId },
      include: [
        { model: Order, as: 'order' },
        { model: PaymentProvider, as: 'provider' }
      ]
    });
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found for this order' });
    }
    res.json(payment);
  } catch (error) {
    console.error(`Error fetching payment for order ${orderId}:`, error);
    res.status(500).json({ message: 'Server error retrieving payment' });
  }
};

// Create a new payment
const createPayment = async (req, res) => {
  const {
    order_id,
    provider_id,
    method,
    amount,
    status = 'pending',
    processed_at,
    provider_ref
  } = req.body;

  try {
    const payment = await Payment.create({
      order_id,
      provider_id,
      method,
      amount,
      status,
      processed_at,
      provider_ref
    });
    res.status(201).json(payment);
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ message: 'Server error creating payment' });
  }
};

module.exports = {
  getAllPayments,
  getPaymentByOrderId,
  createPayment
};
