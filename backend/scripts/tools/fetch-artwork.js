const axios = require('axios');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const DISCOGS_TOKEN = process.env.API_KEY;
const INPUT_FILE = 'releases_converted.json';
const RELEASES_DIR = 'releases';

// Ensure base directory exists
if (!fs.existsSync(RELEASES_DIR)) fs.mkdirSync(RELEASES_DIR);

// Read Discogs releases with genre info
const releaseEntries = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf-8'));

// Prepopulate index map from existing genre folders
const genreIndexMap = {};
const genreFolders = fs.readdirSync(RELEASES_DIR).filter(folder =>
  fs.statSync(path.join(RELEASES_DIR, folder)).isDirectory()
);

for (const genre of genreFolders) {
  const genreJsonPath = path.join(RELEASES_DIR, genre, `${genre}.json`);
  if (fs.existsSync(genreJsonPath)) {
    const existing = JSON.parse(fs.readFileSync(genreJsonPath, 'utf8'));
    genreIndexMap[genre] = existing.length + 1;
  } else {
    genreIndexMap[genre] = 1;
  }
}

// Fetch + format function
const fetchReleaseData = async (entry) => {
  const { release_id, genre } = entry;
  const url = `https://api.discogs.com/releases/${release_id}`;
  const safeGenre = genre?.toLowerCase().replace(/\s+/g, '-') || 'uncategorized';
  const genreDir = path.join(RELEASES_DIR, safeGenre);

  // Skip if folder or base file not present
  if (!fs.existsSync(genreDir)) {
    console.warn(`[${release_id}] Genre folder missing: ${safeGenre}`);
    return false;
  }

  try {
    const res = await axios.get(url, {
      headers: {
        'User-Agent': 'DiscogsFetcher/1.0',
        'Authorization': `Discogs token=${DISCOGS_TOKEN}`
      }
    });

    const data = res.data;
    const artworkURL = data.images?.[0]?.uri;
    if (!artworkURL) {
      console.warn(`[${release_id}] No artwork. Skipping.`);
      return false;
    }

    // Prepare index for genre
    const index = genreIndexMap[safeGenre] || 1;
    const artworkFilename = `${safeGenre}${index}-albumartwork.webp`;
    const imagePath = path.join(genreDir, artworkFilename);

    // Download and convert image
    try {
      const imgRes = await axios.get(artworkURL, {
        responseType: 'arraybuffer',
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Referer': 'https://www.discogs.com'
        }
      });

      await sharp(imgRes.data).toFormat('webp').toFile(imagePath);
      console.log(`[${safeGenre} ${index}] Saved artwork to ${imagePath}`);
    } catch (err) {
      console.warn(`[${safeGenre} ${index}] Image download failed: ${err.message}`);
      return false;
    }

    // Build final entry
    const formatted = {
      index,
      release_id,
      title: data.title,
      year: data.year,
      artists: data.artists_sort,
      label: data.labels?.[0]?.name || '',
      catno: data.labels?.[0]?.catno || '',
      country: data.country,
      genres: data.genres || [],
      styles: data.styles || [],
      tracklist: (data.tracklist || []).map(t => ({
        position: t.position,
        title: t.title,
        duration: t.duration
      })),
      artwork: artworkFilename
    };

    // Append to JSON
    const genreJsonPath = path.join(genreDir, `${safeGenre}.json`);
    const existing = fs.existsSync(genreJsonPath)
      ? JSON.parse(fs.readFileSync(genreJsonPath, 'utf8'))
      : [];

    existing.push(formatted);
    fs.writeFileSync(genreJsonPath, JSON.stringify(existing, null, 2));

    genreIndexMap[safeGenre]++; // Bump index
    return true;

  } catch (err) {
    console.error(`[${release_id}] Metadata fetch failed: ${err.message}`);
    return false;
  }
};

// Main loop
(async () => {
  for (let i = 0; i < releaseEntries.length; i++) {
    await fetchReleaseData(releaseEntries[i]);
    await new Promise(res => setTimeout(res, 3000));
  }
  console.log('✅ All releases processed.');
})();
