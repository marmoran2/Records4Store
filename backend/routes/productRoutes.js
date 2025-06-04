const express = require('express');
const router = express.Router();

const {
  Product,
  ProductImage,
  ProductView,
  Tag,
  ProductTag,
  Release,
  Label,
  Track,
  Artist,
  Genre
} = require('../models');

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

// GET all products
router.get('/', async (req, res) => {
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
});

// GET product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: productIncludes
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(`❌ Error fetching product ${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to retrieve product' });
  }
});

module.exports = router;