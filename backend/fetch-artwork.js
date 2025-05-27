const fs = require('fs');
const path = require('path');
const axios = require('axios');
const archiver = require('archiver');
const sharp = require('sharp');

const DISC_TOKEN = 'IOyzjbzOpxIfObmnfqwbvkPgtNtxRMYlebtpVxIp';
const USER_AGENT = 'Records4Store/1.0 +https://github.com/marmoran2';

const releases = [
  'Jeff Mills –- Waveform Transmission',
];

const tmpDir = path.join(__dirname, 'artwork_tmp');
const metadata = [];
let successCount = 0;

// Axios instance for Discogs
const discogs = axios.create({
  baseURL: 'https://api.discogs.com/',
  headers: {
    'User-Agent': USER_AGENT
  },
  params: {
    token: DISC_TOKEN
  },
  family: 4 // Force IPv4
});

async function downloadBuffer(url) {
  const res = await axios.get(url, {
    responseType: 'arraybuffer',
    family: 4
  });
  return Buffer.from(res.data);
}

async function processImage(buffer, index) {
  const widths = [600, 300];
  for (const w of widths) {
    const pngName = `artwork-${index}-${w}.png`;
    await sharp(buffer)
      .resize(w)
      .png()
      .toFile(path.join(tmpDir, pngName));

    const webpName = `artwork-${index}-${w}.webp`;
    await sharp(buffer)
      .resize(w)
      .webp()
      .toFile(path.join(tmpDir, webpName));
  }
}

async function searchDiscogs(term) {
  const res = await discogs.get('/database/search', {
    params: {
      q: term,
      type: 'release',
      format: 'Vinyl',
      per_page: 1
    }
  });

  if (!res.data.results.length) throw new Error('No Discogs match');
  return res.data.results[0];
}

async function getReleaseDetails(resourceUrl) {
  const res = await axios.get(resourceUrl, {
    headers: {
      'User-Agent': USER_AGENT
    },
    params: {
      token: DISC_TOKEN
    },
    family: 4
  });

  return res.data;
}

async function main() {
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

  console.log('🎧 Fetching release data from Discogs…\n');

  for (const term of releases) {
    try {
      const match = await searchDiscogs(term);
      const release = await getReleaseDetails(match.resource_url);
      const image = release.images?.find(img => img.type === 'primary') || release.images?.[0];
      if (!image) throw new Error('No artwork found');

      const buffer = await downloadBuffer(image.uri);
      successCount += 1;
      await processImage(buffer, successCount);

      metadata.push({
        index: successCount,
        title: release.title,
        artists: release.artists?.map(a => a.name).join(', '),
        year: release.year,
        genres: release.genres,
        styles: release.styles,
        label: release.labels?.[0]?.name,
        catalog_number: release.labels?.[0]?.catno,
        country: release.country,
        tracklist: release.tracklist?.map(t => ({
          position: t.position,
          title: t.title,
          duration: t.duration
        }))
      });

      console.log(`✅ [${successCount}] ${release.title}`);
      await new Promise(res => setTimeout(res, 1000));
    } catch (err) {
      console.warn(`❌ Failed "${term}": ${err.message}`);
      await new Promise(res => setTimeout(res, 1000));
    }
  }

  fs.writeFileSync('metadata.json', JSON.stringify(metadata, null, 2));

  const output = fs.createWriteStream('album_artwork.zip');
  const archive = archiver('zip', { zlib: { level: 9 } });
  archive.pipe(output);
  archive.directory(tmpDir, false);
  await archive.finalize();

  console.log(`\nDone! ${successCount} releases processed.`);
  console.log('→ album_artwork.zip');
  console.log('→ metadata.json');

  fs.rmSync(tmpDir, { recursive: true, force: true });
}

main().catch(console.error);
