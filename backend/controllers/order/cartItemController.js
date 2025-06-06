// backend/controllers/cartItemController.js
const { CartItem, Product, User, Session } = require('../../models');

// Get all cart items (admin/debugging)
const getAllCartItems = async (req, res) => {
  try {
    const items = await CartItem.findAll({
      include: [
        { model: Product, as: 'product' },
        { model: User, as: 'user' },
        { model: Session, as: 'session' }
      ]
    });
    res.json(items);
  } catch (error) {
    console.error('Error fetching all cart items:', error);
    res.status(500).json({ message: 'Server error retrieving cart items' });
  }
};

// Get cart items by user_id or session_id
const getCartItems = async (req, res) => {
  const { userId, sessionId } = req.query;
  try {
    const whereClause = userId
      ? { user_id: userId }
      : sessionId
      ? { session_id: sessionId }
      : null;

    if (!whereClause) return res.status(400).json({ message: 'Missing userId or sessionId' });

    const items = await CartItem.findAll({
      where: whereClause,
      include: [{ model: Product, as: 'product' }]
    });
    res.json(items);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ message: 'Server error retrieving cart items' });
  }
};

// Add item to cart
const addCartItem = async (req, res) => {
  const { session_id, user_id, product_id, quantity } = req.body;
  try {
    const item = await CartItem.create({
      session_id,
      user_id,
      product_id,
      quantity,
      date_added: new Date()
    });
    res.status(201).json(item);
  } catch (error) {
    console.error('Error adding cart item:', error);
    res.status(500).json({ message: 'Server error adding item to cart' });
  }
};

// Delete item from cart
const deleteCartItem = async (req, res) => {
  const { cartItemId } = req.params;
  try {
    const deleted = await CartItem.destroy({ where: { cart_item_id: cartItemId } });
    if (!deleted) return res.status(404).json({ message: 'Cart item not found' });
    res.json({ message: 'Cart item removed' });
  } catch (error) {
    console.error('Error deleting cart item:', error);
    res.status(500).json({ message: 'Server error deleting cart item' });
  }
};

module.exports = {
  getAllCartItems,
  getCartItems,
  addCartItem,
  deleteCartItem
};
