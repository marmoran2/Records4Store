// controllers/productController.js
const {
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

// Common includes for products
const productIncludes = [
  {
    model: ProductImage,
    as: 'images',
    attributes: ['image_id', 'url', 'alt_text']
  },
  {
    model: ProductView,
    as: 'views'
  },
  {
    model: Tag,
    as: 'tags',
    through: { attributes: [] },
    attributes: ['tag_id', 'name']
  },
  {
    model: Release,
    as: 'release',
    attributes: ['release_id', 'catalog_number', 'release_title', 'released_date'],
    include: [
      {
        model: Label,
        as: 'label',
        attributes: ['label_id', 'name']
      },
      {
        model: Genre,
        as: 'genre',
        attributes: ['genre_id', 'name']
      },
      {
        model: Track,
        as: 'tracks',
        attributes: ['track_id', 'title', 'track_number', 'duration_secs', 'side'],
        include: {
          model: Artist,
          as: 'artist',
          attributes: ['artist_id', 'artist_name']
        }
      },
      {
        model: Artist,
        as: 'artist',
        attributes: ['artist_id', 'artist_name']
      }
    ]
  }
];

// GET /api/products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: productIncludes,
      order: [['product_id', 'ASC']]
    });

    res.status(200).json(products);
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
};

// GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: productIncludes
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(`Error fetching product ${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to retrieve product' });
  }
};

module.exports = {
  getAllProducts,
  getProductById
};
