// controllers/product/tagController.js
const { Tag, Product } = require('../../models');

// GET /api/products/tags → list all tags
const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.findAll({
      attributes: ['tag_id', 'name']
    });
    res.status(200).json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ message: 'Failed to retrieve tags' });
  }
};

// GET /api/products/tags/:id → tag with linked products (optional)
const getTagById = async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: {
        model: Product,
        as: 'products',
        attributes: ['product_id', 'price', 'stock_qty'],
        through: { attributes: [] }
      }
    });

    if (!tag) return res.status(404).json({ message: 'Tag not found' });

    res.status(200).json(tag);
  } catch (error) {
    console.error(` Error fetching tag ${req.params.id}:`, error);
    res.status(500).json({ message: 'Failed to retrieve tag' });
  }
};

module.exports = {
  getAllTags,
  getTagById
};
