// controllers/product/artistController.js
const { Artist, Release } = require('../../models');

// GET /api/products/artists → all artists
const getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.findAll({
      attributes: ['artist_id', 'artist_name', 'country', 'website']
    });
    res.status(200).json(artists);
  } catch (error) {
    console.error('Error fetching artists:', error);
    res.status(500).json({ message: 'Failed to retrieve artists' });
  }
};

// GET /api/products/artists/:id → single artist with releases
const getArtistById = async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id, {
      include: [{
        model: Release,
        as: 'releases',
        attributes: ['release_id', 'release_title', 'released_date', 'catalog_number']
      }]
    });

    if (!artist) return res.status(404).json({ message: 'Artist not found' });

    res.status(200).json(artist);
  } catch (error) {
    console.error(`Error fetching artist ${req.params.id}:`, error);
    res.status(500).json({ message: 'Failed to retrieve artist' });
  }
};

module.exports = {
  getAllArtists,
  getArtistById
};
