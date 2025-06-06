// backend/controllers/orderConfirmationController.js
const { OrderConfirmation, Order } = require('../../models');

// Get all confirmations
const getAllConfirmations = async (req, res) => {
  try {
    const confirmations = await OrderConfirmation.findAll({
      include: [{ model: Order, as: 'order' }]
    });
    res.json(confirmations);
  } catch (error) {
    console.error('Error fetching confirmations:', error);
    res.status(500).json({ message: 'Server error retrieving confirmations' });
  }
};

// Get confirmation by order ID
const getConfirmationByOrderId = async (req, res) => {
  const { orderId } = req.params;
  try {
    const confirmation = await OrderConfirmation.findOne({
      where: { order_id: orderId },
      include: [{ model: Order, as: 'order' }]
    });
    if (!confirmation) {
      return res.status(404).json({ message: 'Confirmation not found for this order' });
    }
    res.json(confirmation);
  } catch (error) {
    console.error(`Error fetching confirmation for order ${orderId}:`, error);
    res.status(500).json({ message: 'Server error retrieving confirmation' });
  }
};

// Create a new confirmation
const createConfirmation = async (req, res) => {
  const { order_id, pdf_url, email_sent, issued_at } = req.body;
  try {
    const confirmation = await OrderConfirmation.create({
      order_id,
      pdf_url,
      email_sent,
      issued_at
    });
    res.status(201).json(confirmation);
  } catch (error) {
    console.error('Error creating confirmation:', error);
    res.status(500).json({ message: 'Server error creating confirmation' });
  }
};

module.exports = {
  getAllConfirmations,
  getConfirmationByOrderId,
  createConfirmation
};
