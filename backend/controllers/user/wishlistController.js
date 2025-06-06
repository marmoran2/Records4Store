// controllers/user/wishlistController.js
const { Wishlist, Product, User } = require('../../models');

// GET /api/users/:userId/wishlist → all wishlist items for a user
const getWishlistByUser = async (req, res) => {
  try {
    const items = await Wishlist.findAll({
      where: { user_id: req.params.userId },
      include: [{ model: Product, as: 'product' }],
      order: [['added_at', 'DESC']]
    });
    res.status(200).json(items);
  } catch (error) {
    console.error(`❌ Error fetching wishlist for user ${req.params.userId}:`, error);
    res.status(500).json({ message: 'Failed to retrieve wishlist' });
  }
};

// POST /api/users/:userId/wishlist → add a product to wishlist
const addToWishlist = async (req, res) => {
  const { product_id } = req.body;
  const user_id = req.params.userId;

  try {
    const existing = await Wishlist.findOne({ where: { user_id, product_id } });
    if (existing) return res.status(409).json({ message: 'Item already in wishlist' });

    const item = await Wishlist.create({
      user_id,
      product_id,
      added_at: new Date()
    });

    res.status(201).json(item);
  } catch (error) {
    console.error(`❌ Error adding to wishlist for user ${user_id}:`, error);
    res.status(500).json({ message: 'Failed to add to wishlist' });
  }
};

// DELETE /api/users/:userId/wishlist/:productId → remove item
const removeFromWishlist = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const deleted = await Wishlist.destroy({
      where: { user_id: userId, product_id: productId }
    });

    if (!deleted) return res.status(404).json({ message: 'Item not found in wishlist' });

    res.status(200).json({ message: 'Item removed from wishlist' });
  } catch (error) {
    console.error(`❌ Error removing item from wishlist for user ${userId}:`, error);
    res.status(500).json({ message: 'Failed to remove item' });
  }
};

module.exports = {
  getWishlistByUser,
  addToWishlist,
  removeFromWishlist
};
