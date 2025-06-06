const fs = require('fs');
const path = require('path');
const {
  sequelize,
  Product,
  Release,
  Label,
  Artist,
  Track,
  Tag,
  Category,
  ProductImage,
  ReleaseArtist
} = require('../models');

const GENRES_DIR = path.join(__dirname, 'releases');
const SIZES = ['7', '12'];
const PRICE_OPTIONS = [7.99, 9.99, 11.99, 13.99, 15.99];

function getRandomPrice() {
  return PRICE_OPTIONS[Math.floor(Math.random() * PRICE_OPTIONS.length)];
}

function getRandomSize() {
  return Math.random() < 0.8 ? '12' : '7';
}

function parseDuration(duration) {
  if (!duration || !duration.includes(':')) return null;
  const [min, sec] = duration.split(':').map(Number);
  return (isNaN(min) || isNaN(sec)) ? null : (min * 60 + sec);
}

async function importGenreData() {
  const genres = fs.readdirSync(GENRES_DIR).filter(f => fs.statSync(path.join(GENRES_DIR, f)).isDirectory());

  for (const genre of genres) {
    const genrePath = path.join(GENRES_DIR, genre);
    const jsonFile = fs.readdirSync(genrePath).find(f => f.endsWith('.json'));
    const data = JSON.parse(fs.readFileSync(path.join(genrePath, jsonFile), 'utf-8'));

    const [category] = await Category.findOrCreate({ where: { name: genre } });

    for (const entry of data) {
      const [label] = await Label.findOrCreate({ where: { name: entry.label.trim() } });

      const [artist] = await Artist.findOrCreate({ where: { artist_name: entry.artists.trim() } });

      const [release] = await Release.findOrCreate({
        where: { release_id: entry.release_id },
        defaults: {
          release_id: entry.release_id,
          label_id: label.id,
          catalog_number: entry.catno,
          release_title: entry.title,
          release_year: String(entry.year),
          country: entry.country || null,
          released_date: null
        }
      });

      await ReleaseArtist.findOrCreate({
        where: { release_id: release.release_id, artist_id: artist.artist_id }
      });

      if (Array.isArray(entry.tracklist)) {
        let trackNum = 1;
        for (const t of entry.tracklist) {
          if (!t.title) continue;
          await Track.findOrCreate({
            where: {
              release_id: release.release_id,
              title: t.title
            },
            defaults: {
              track_number: trackNum++,
              duration_secs: parseDuration(t.duration),
              preview_url: null,
              artist_id: artist.artist_id
            }
          });
        }
      }

      const [product] = await Product.findOrCreate({
        where: { release_id: release.release_id },
        defaults: {
          release_id: release.release_id,
          price: Math.round(getRandomPrice()),
          size_inches: getRandomSize(),
          stock_qty: Math.floor(Math.random() * 50 + 1),
          total_weight: null,
          total_dimensions: null,
          stock_updated_at: new Date(),
          updated_at: new Date()
        }
      });

      const weight = product.size_inches === '12' ? 300 : 150;
      const dimensions = product.size_inches === '12' ? 31 : 18;
      await product.update({
        total_weight: weight,
        total_dimensions: dimensions
      });

      await ProductImage.findOrCreate({
        where: {
          product_id: product.product_id,
          url: `${genre}/${entry.artwork}`
        }
      });

      await product.addCategory(category);

      for (const style of entry.styles || []) {
        const [tag] = await Tag.findOrCreate({ where: { name: style } });
        await product.addTag(tag);
      }
    }

    console.log(`✅ Imported genre: ${genre}`);
  }

  console.log('✅ All genres imported.');
  await sequelize.close();
}

importGenreData().catch(console.error);