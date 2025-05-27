const axios = require('axios');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const DISCOGS_TOKEN = process.env.API_KEY;
const INPUT_FILE = 'release_ids_only.json';
const OUTPUT_FILE = 'formatted-output.json';
const ARTWORK_DIR = 'artwork';

if (!fs.existsSync(ARTWORK_DIR)) fs.mkdirSync(ARTWORK_DIR);

const releaseIds = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf-8')).slice(0, 5);
const results = [];

const fetchReleaseData = async (releaseId, index) => {
  const url = `https://api.discogs.com/releases/${releaseId}`;
  console.log(`[${index}] Fetching release ID: ${releaseId}`);

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
      console.warn(`[${index}] No artwork found. Skipping release.`);
      return false;
    }

    // Download and convert to .webp
    try {
      const imgRes = await axios.get(artworkURL, {
        responseType: 'arraybuffer',
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Referer': 'https://www.discogs.com'
        }
      });

      const imageWebpPath = path.join(ARTWORK_DIR, `${index}-productartwork.webp`);
      await sharp(imgRes.data).toFormat('webp').toFile(imageWebpPath);
      console.log(`[${index}] Artwork saved to ${imageWebpPath}`);
    } catch (err) {
      console.warn(`[${index}] Artwork download failed: ${err.message}`);
      return false;
    }

    const formatted = {
      index,
      release_id: releaseId,
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
      artwork: `${index}-productartwork.webp`
    };

    results.push(formatted);
    return true;

  } catch (err) {
    console.error(`[${index}] Metadata fetch failed: ${err.message}`);
    return false;
  }
};

(async () => {
  let writeIndex = 1;

  for (let i = 0; i < releaseIds.length; i++) {
    const success = await fetchReleaseData(releaseIds[i], writeIndex);
    writeIndex++; // Always increment index regardless of success to preserve sequence
    await new Promise(r => setTimeout(r, 3000));
  }

  // Minified line-level JSON to keep file compact
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));
  console.log(`✅ Done. Saved ${results.length} formatted entries to ${OUTPUT_FILE}`);
})();