// controllers/product/productViewController.js
const { ProductView, Product, User, Session } = require('../../models');

// GET /api/products/views → list all views (optional admin/debug)
const getAllViews = async (req, res) => {
  try {
    const views = await ProductView.findAll({
      include: [
        { model: Product, as: 'product', attributes: ['product_id', 'price'] },
        { model: User, as: 'user', attributes: ['user_id', 'email'] },
        { model: Session, as: 'session', attributes: ['session_id'] }
      ],
      order: [['viewed_at', 'DESC']]
    });
    res.status(200).json(views);
  } catch (error) {
    console.error('Error fetching product views:', error);
    res.status(500).json({ message: 'Failed to retrieve views' });
  }
};

// POST /api/products/:productId/views → log a view
const logProductView = async (req, res) => {
  const { productId } = req.params;
  const { user_id, session_id } = req.body;

  try {
    const view = await ProductView.create({
      product_id: productId,
      user_id: user_id || null,
      session_id: session_id || null,
      viewed_at: new Date()
    });
    res.status(201).json(view);
  } catch (error) {
    console.error('Error logging view:', error);
    res.status(500).json({ message: 'Failed to log view' });
  }
};

// GET /api/products/:productId/views → views for a specific product
const getViewsByProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const views = await ProductView.findAll({
      where: { product_id: productId },
      order: [['viewed_at', 'DESC']],
      include: [
        { model: User, as: 'user', attributes: ['user_id', 'email'] },
        { model: Session, as: 'session', attributes: ['session_id'] }
      ]
    });
    res.status(200).json(views);
  } catch (error) {
    console.error(`Error fetching views for product ${productId}:`, error);
    res.status(500).json({ message: 'Failed to retrieve views' });
  }
};

module.exports = {
  getAllViews,
  getViewsByProduct,
  logProductView
};
