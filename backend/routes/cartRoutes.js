const express = require('express');
const router = express.Router();
const { CartItem, Product } = require('../models');

// TEMP: Mock user ID
const getUserId = (req) => 1;

// GET /api/cart — get all items for current user
router.get('/', async (req, res) => {
  try {
    const userId = getUserId(req);
    const items = await CartItem.findAll({
      where: { user_id: userId },
      include: [{ model: Product }],
      order: [['date_added', 'DESC']]
    });
    res.json(items);
  } catch (err) {
    console.error('❌ Error loading cart:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/cart/add
router.post('/add', async (req, res) => {
  const { product_id, quantity } = req.body;
  if (!product_id || !quantity) {
    return res.status(400).json({ error: 'Missing product_id or quantity' });
  }

  try {
    const userId = getUserId(req);

    // Check if already in cart
    const [item, created] = await CartItem.findOrCreate({
      where: { user_id: userId, product_id },
      defaults: {
        quantity,
        date_added: new Date()
      }
    });

    if (!created) {
      item.quantity += quantity;
      await item.save();
    }

    res.status(200).json(item);
  } catch (err) {
    console.error('❌ Error adding to cart:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/cart/update/:id — update quantity
router.put('/update/:id', async (req, res) => {
  try {
    const userId = getUserId(req);
    const { quantity } = req.body;

    const item = await CartItem.findOne({
      where: { cart_item_id: req.params.id, user_id: userId }
    });

    if (!item) return res.status(404).json({ error: 'Item not found' });

    item.quantity = quantity;
    await item.save();

    res.json(item);
  } catch (err) {
    console.error('❌ Error updating cart item:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/cart/remove/:id
router.delete('/remove/:id', async (req, res) => {
  try {
    const userId = getUserId(req);
    const deleted = await CartItem.destroy({
      where: { cart_item_id: req.params.id, user_id: userId }
    });

    if (!deleted) return res.status(404).json({ error: 'Item not found' });

    res.status(204).end();
  } catch (err) {
    console.error('❌ Error removing cart item:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;