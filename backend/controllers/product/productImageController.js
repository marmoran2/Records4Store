// controllers/product/productImageController.js
const { ProductImage, Product } = require('../../models');

// GET /api/products/images → all product images
const getAllImages = async (req, res) => {
  try {
    const images = await ProductImage.findAll({
      include: {
        model: Product,
        as: 'product',
        attributes: ['product_id', 'price']
      }
    });
    res.status(200).json(images);
  } catch (error) {
    console.error('❌ Error fetching product images:', error);
    res.status(500).json({ message: 'Failed to retrieve images' });
  }
};

// GET /api/products/images/:id → one image by image_id
const getImageById = async (req, res) => {
  try {
    const image = await ProductImage.findByPk(req.params.id, {
      include: {
        model: Product,
        as: 'product',
        attributes: ['product_id', 'price']
      }
    });

    if (!image) return res.status(404).json({ message: 'Image not found' });

    res.status(200).json(image);
  } catch (error) {
    console.error(`Error fetching image ${req.params.id}:`, error);
    res.status(500).json({ message: 'Failed to retrieve image' });
  }
};

module.exports = {
  getAllImages,
  getImageById
};
