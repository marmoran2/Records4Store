// controllers/product/labelController.js
const { Label, Release } = require('../../models');

// GET /api/products/labels → list all labels
const getAllLabels = async (req, res) => {
  try {
    const labels = await Label.findAll({
      attributes: ['label_id', 'name', 'website', 'country']
    });
    res.status(200).json(labels);
  } catch (error) {
    console.error('❌ Error fetching labels:', error);
    res.status(500).json({ message: 'Failed to retrieve labels' });
  }
};

// GET /api/products/labels/:id → single label with its releases
const getLabelById = async (req, res) => {
  try {
    const label = await Label.findByPk(req.params.id, {
      include: {
        model: Release,
        as: 'releases',
        attributes: ['release_id', 'release_title', 'released_date', 'catalog_number']
      }
    });

    if (!label) return res.status(404).json({ message: 'Label not found' });

    res.status(200).json(label);
  } catch (error) {
    console.error(`❌ Error fetching label ${req.params.id}:`, error);
    res.status(500).json({ message: 'Failed to retrieve label' });
  }
};

module.exports = {
  getAllLabels,
  getLabelById
};
