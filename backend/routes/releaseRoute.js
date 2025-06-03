// routes/release.js
const express = require('express');
const router = express.Router();
const { Release, Label, Track, Artist, ReleaseArtist } = require('../models');

router.get('/:id', async (req, res) => {
  console.log(`➡️  /api/releases/${req.params.id} hit`);
  try {
    const release = await Release.findOne({
      where: { release_id: req.params.id },
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
          through: { model: ReleaseArtist },
          attributes: ['artist_id', 'artist_name']
        }
      ]
    });

    if (!release) {
      return res.status(404).json({ error: 'Release not found' });
    }

    res.json(release);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;