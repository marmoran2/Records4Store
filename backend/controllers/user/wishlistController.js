// controllers/user/wishlistController.js
const {
  Wishlist,
  Product,
  ProductImage,
  ProductView,
  Tag,
  Release,
  Label,
  Genre,
  Track,
  Artist
} = require('../../models');

const productIncludes = [
  {
    model: ProductImage,
    as: 'images',
    attributes: ['url', 'alt_text']
  },
  {
    model: Release,
    as: 'release',
    attributes: ['release_title', 'released_date'],
    include: [
      {
        model: Genre,
        as: 'genre',
        attributes: ['name']
      },
      {
        model: Artist,
        as: 'artist',
        attributes: ['artist_name']
      }
    ]
  }
];

// GET /api/users/:userId/wishlist → all wishlist items for a user
const getWishlistByUser = async (req, res) => {
  try {
    const items = await Wishlist.findAll({
      where: { user_id: req.params.userId },
      include: [{
        model: Product,
        as: 'product',
        include: productIncludes
      }],
      order: [['added_at', 'DESC']]
    });

    const enriched = items.map(item => {
      const product = item.product;

      const enrichedProduct = {
        ...product.toJSON(),
        index: product.product_id,
        id: product.product_id,
        trackName: product.release?.release_title || 'Untitled Track',
        artistName: product.release?.artist?.artist_name || 'Unknown Artist',
        genre: product.release?.genre?.name || 'Unknown Genre',
        releaseYear: product.release?.released_date
          ? new Date(product.release.released_date).getFullYear().toString()
          : '—',
        imageUrl: product.images?.[0]?.url
  ? `/images/releases/${product.images[0].url.replace('/assets/images/releases/', '')}`
  : '../assets/img/default.jpg',
      };

      return {
        ...item.toJSON(),
        product: enrichedProduct
      };
    });

    res.status(200).json(enriched);
  } catch (error) {
    console.error(`[WishlistController] Failed to get wishlist for user ${req.params.userId}:`, error);
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
    console.error(`Error adding to wishlist for user ${user_id}:`, error);
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
    console.error(`Error removing item from wishlist for user ${userId}:`, error);
    res.status(500).json({ message: 'Failed to remove item' });
  }
};

module.exports = {
  getWishlistByUser,
  addToWishlist,
  removeFromWishlist
};
