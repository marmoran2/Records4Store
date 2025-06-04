// backend/seeders/importReleases.js
const fs = require('fs');
const path = require('path');
const { Sequelize, sequelize, Artist, Label, Genre, Tag, Release, Product, ProductImage, Track, ProductTag } = require('../models');

const genres = ['ambient', 'breakbeat', 'electro', 'hard-house', 'hardcore', 'techno', 'trance', 'uk-garage'];

const getRandomFromArray = arr => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const randomDateFromYear = (year) => {
  const start = new Date(`${year}-01-01`).getTime();
  const end = new Date(`${year}-12-31`).getTime();
  return new Date(getRandomInt(start, end));
};

const generateSlugURL = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.com';

const seedReleases = async () => {
  try {
    for (const genreFolder of genres) {
      const genrePath = path.join(__dirname, '..', 'releases', genreFolder, `${genreFolder}.json`);
      const rawData = fs.readFileSync(genrePath, 'utf-8');
      const releases = JSON.parse(rawData);

      // Get or create Genre
      let genre = await Genre.findOne({ where: { name: genreFolder } });
      if (!genre) {
        genre = await Genre.create({ name: genreFolder });
      }

      for (const releaseData of releases) {
        // ARTIST
        const artistName = releaseData.artists;
        let artist = await Artist.findOne({ where: { artist_name: artistName } });
        if (!artist) {
          artist = await Artist.create({
            artist_name: artistName,
            country: releaseData.country || null,
            website: generateSlugURL(artistName),
            bio: ''
          });
        }

        // LABEL
        const labelName = releaseData.label;
        let label = await Label.findOne({ where: { name: labelName } });
        if (!label) {
          label = await Label.create({
            name: labelName,
            website: generateSlugURL(labelName),
            bio: ''
          });
        }

        // RELEASE
        // Check for existing release by ID
        const existingRelease = await Release.findByPk(releaseData.release_id);
        if (existingRelease) {
          console.log(`⚠️ Skipping duplicate release_id ${releaseData.release_id}`);
          continue;
        }

        const release = await Release.create({
          release_id: releaseData.release_id,
          label_id: label.label_id,
          genre_id: genre.genre_id,
          artist_id: artist.artist_id,
          catalog_number: releaseData.catno,
          release_title: releaseData.title,
          released_date: randomDateFromYear(releaseData.year)
        });

        // PRODUCT
        const product = await Product.create({
          release_id: release.release_id,
          size_inches: Math.random() < 0.8 ? '12' : '10',
          total_weight: getRandomInt(120, 250),
          total_dimensions: '12x12in',
          price: getRandomFromArray([5, 10, 20]),
          stock_qty: getRandomInt(1, 50),
          updated_at: new Date(Date.now() + getRandomInt(-20, 20) * 24 * 60 * 60 * 1000)
        });

        // TAGS (styles)
        for (const style of releaseData.styles || []) {
          let tag = await Tag.findOne({ where: { name: style } });
          if (!tag) tag = await Tag.create({ name: style });

          await ProductTag.findOrCreate({
            where: {
              product_id: product.product_id,
              tag_id: tag.tag_id
            }
          });
        }

        // TRACKS
        let trackNumber = 1;
        for (const track of releaseData.tracklist || []) {
          await Track.create({
            release_id: release.release_id,
            artist_id: artist.artist_id,
            track_number: trackNumber++,
            title: track.title,
            duration_secs: null,
            preview_url: '',
            side: track.position
          });
        }

        // PRODUCT IMAGE
        await ProductImage.create({
          product_id: product.product_id,
          url: `/assets/images/releases/${genreFolder}/${releaseData.artwork}`,
          alt_text: `${release.release_title} artwork`
        });
      }
    }

    console.log('✅ Releases seeded successfully.');
  } catch (err) {
    console.error('❌ Error seeding releases:', err);
  }
};

seedReleases();
