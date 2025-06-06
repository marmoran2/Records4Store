const { Order, User, Address, OrderLine, Payment, OrderConfirmation } = require('../../models');

// Get all orders with related info
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: User, as: 'user' },
        { model: Address, as: 'shipping_address' },
        { model: Address, as: 'billing_address' },
        { model: OrderLine, as: 'lines' },
        { model: Payment, as: 'payment' },
        { model: OrderConfirmation, as: 'confirmation' },
      ],
    });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({ message: 'Server error fetching orders.' });
  }
};

// Get a single order by ID
const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id, {
      include: [
        { model: User, as: 'user' },
        { model: Address, as: 'shipping_address' },
        { model: Address, as: 'billing_address' },
        { model: OrderLine, as: 'lines' },
        { model: Payment, as: 'payment' },
        { model: OrderConfirmation, as: 'confirmation' },
      ],
    });
    if (!order) return res.status(404).json({ message: 'Order not found.' });
    res.json(order);
  } catch (error) {
    console.error(`Error fetching order ${id}:`, error);
    res.status(500).json({ message: 'Server error fetching order.' });
  }
};

// Create a new order
const createOrder = async (req, res) => {
  const { user_id, shipping_address_id, billing_address_id } = req.body;
  try {
    const newOrder = await Order.create({
      user_id,
      shipping_address_id,
      billing_address_id,
    });
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server error creating order.' });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
};
