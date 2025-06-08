// controllers/product/releaseController.js
const { Release, Label, Genre, Track, Product, Artist } = require('../../models');

// GET /api/products/releases → list all releases with basic info
const getAllReleases = async (req, res) => {
  try {
    const releases = await Release.findAll({
      include: [
        { model: Label, as: 'label', attributes: ['label_id', 'name'] },
        { model: Genre, as: 'genre', attributes: ['genre_id', 'name'] },
        { model: Artist, as: 'artist', attributes: ['artist_id', 'artist_name'] }
      ],
      attributes: ['release_id', 'release_title', 'catalog_number', 'released_date']
    });
    res.status(200).json(releases);
  } catch (error) {
    console.error('Error fetching releases:', error);
    res.status(500).json({ message: 'Failed to retrieve releases' });
  }
};

// GET /api/products/releases/:id → single release with tracks and products
const getReleaseById = async (req, res) => {
  try {
    const release = await Release.findByPk(req.params.id, {
      include: [
        { model: Label, as: 'label', attributes: ['label_id', 'name'] },
        { model: Genre, as: 'genre', attributes: ['genre_id', 'name'] },
        { model: Artist, as: 'artist', attributes: ['artist_id', 'artist_name'] },
        {
          model: Track,
          as: 'tracks',
          attributes: ['track_id', 'title', 'track_number', 'duration_secs', 'side']
        },
        {
          model: Product,
          as: 'products',
          attributes: ['product_id', 'price', 'stock_qty']
        }
      ]
    });

    if (!release) return res.status(404).json({ message: 'Release not found' });

    res.status(200).json(release);
  } catch (error) {
    console.error(`Error fetching release ${req.params.id}:`, error);
    res.status(500).json({ message: 'Failed to retrieve release' });
  }
};

module.exports = {
  getAllReleases,
  getReleaseById
};
