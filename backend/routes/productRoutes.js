const express = require('express');
const router = express.Router();

const {
  Product,
  ProductImage,
  ProductView,
  Category,
  Tag,
  Release,
  Label,
  Track,
  Artist
} = require('../models');

const productIncludes = [
  {
    model: ProductImage,
    attributes: ['image_id', 'product_id', 'url']
  },
  ProductView,
  {
    model: Category,
    attributes: ['category_id', 'name']
  },
  {
    model: Tag,
    attributes: ['tag_id', 'name']
  },
  {
    model: Release,
    attributes: [
      'release_id',
      'label_id',
      'catalog_number',
      'release_title',
      'release_year',
      'released_date'
    ],
    include: [
      {
        model: Label,
        attributes: ['label_id', 'name']
      },
      {
        model: Track,
        attributes: ['track_id', 'title', 'track_number', 'duration_secs', 'artist_id'],
        include: [
          {
            model: Artist,
            attributes: ['artist_id', 'artist_name']
          }
        ]
      },
      {
        model: Artist,
        through: { attributes: [] },
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
