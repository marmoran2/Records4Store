const express = require('express');
const router = express.Router();
const {
  Product,
  ProductImage,
  Category,
  Tag,
  Release,
  Label,
  Track
} = require('../models');

// GET all products with relationships
router.get('/', async (req, res) => {
  const products = await Product.findAll({
    include: [
      ProductImage,
      Category,
      Tag,
      {
        model: Release,
        include: [Label, Track]
      }
    ]
  });
  res.json(products);
});

// GET product by ID
router.get('/:id', async (req, res) => {
  const product = await Product.findByPk(req.params.id, {
    include: [
      ProductImage,
      Category,
      Tag,
      {
        model: Release,
        include: [Label, Track]
      }
    ]
  });
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

module.exports = router;