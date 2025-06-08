// controllers/product/genreController.js
const { Genre, Release } = require('../../models');

// GET /api/products/genres → list all genres
const getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.findAll({
      attributes: ['genre_id', 'name']
    });
    res.status(200).json(genres);
  } catch (error) {
    console.error('Error fetching genres:', error);
    res.status(500).json({ message: 'Failed to retrieve genres' });
  }
};

// GET /api/products/genres/:id → genre with its releases (optional)
const getGenreById = async (req, res) => {
  try {
    const genre = await Genre.findByPk(req.params.id, {
      include: {
        model: Release,
        as: 'releases',
        attributes: ['release_id', 'release_title', 'released_date']
      }
    });

    if (!genre) return res.status(404).json({ message: 'Genre not found' });

    res.status(200).json(genre);
  } catch (error) {
    console.error(`Error fetching genre ${req.params.id}:`, error);
    res.status(500).json({ message: 'Failed to retrieve genre' });
  }
};

module.exports = {
  getAllGenres,
  getGenreById
};
