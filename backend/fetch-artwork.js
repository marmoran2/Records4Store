// fetch-artwork-discogs.js

const fs       = require('fs');
const path     = require('path');
const axios    = require('axios');
const archiver = require('archiver');
const sharp    = require('sharp');

const releases = [
  'Ectoplastic Reptant Freq Accident',
  'M-87 (Original Mix) Silent Servant',
  'Overseer DMX Krew',
  'Rocade Sud Funk Binary Digit',
  'Expect Nothing (2018 Mix) Exium',
  'Another Acid Mono Junk',
  '04 hiroaki iizuka - tera',
  'Oall Hates - Tranceporter',
  'Revolver Radial',
  'Combat SDB',
  'Tremmer The Subjective',
  '96.1 Mhz (2019 Mix) Exium',
  'Sedvs Peel – Still On',
  'In Roots Chontane',
  'Magma Stef Mendesidis',
  'Definition 1 (Original Mix) Force Reaction',
  'Pulse Shaper Maxx Rossi',
  'Player 002 A1',
  'Angels Trumpet (Ravedigger edit) SACRAMENTAL',
  'The Writer B PROXYMA (FR)',
  'Escape (Glaskin Remix) Dubfire',
  'PLACE 2 BE Ned Bennett',
  'beautiful (original mix) Cheap And deep',
  'A1 - Fuck The Police Unknown Artist',
  'D1e And Repeat (Sansibar Suelo Mix) Wachita China',
  'Julia Hertz',
  'Marco Carola - 7th Question [A1 Mix]',
  'Pre-Gig Selfie Funk Assault',
  'Access (Justin Bourne & Dynamic Intervention Remix) DJ Misjah & DJ Tim',
  'Assembly Mython, Karenz & Pesante',
  'Infinite Machine (Original Mix) Benjamin Damage',
  'Dopamine Rush (Original Mix) Chlär',
  'Keep Steppin\' Cult',
  'Expand Yourself (2008 Remaster) Paul Mac',
  'Ned Bennett - High Rider Ned Bennett',
  'Validation Machine (Original Mix) Cleric',
  'Rebell Invexis',
  'Saber Cleric',
  'Holding a Wolf by the Ears Progression (UK)',
  'Chase Your Mind Cyan85',
  'Voiceprint: Voice Two (2019 Remaster) Mike Parker',
  'The Art of Fire Anodyne',
  'Night Genesis Chlär',
  'Convenience Trap (Part 2) Surgeon',
  'Section (Part 2) Claro Intelecto',
  'Stimuli (Original Mix) Pesante',
  'Physical Education Tim Tama',
  '2005 Rumenige',
  'Stereotype 3 Robert Hood',
  'Cola Shout Sagae & Kawakami',
  'Urban Electro Urban Electro',
  'For The Music JKS',
  'Primal Fear Sedvs',
  '4 AM At The Crying Cactus Holy Ghost',
  'Electric Soul-X2 Electric Soul',
  'Club Lonely (Serious Danger Mix) Groove Connektion 2',
  'Number In Between Adam Beyer & Jesper Dahlbäck',
  'IPA (Original Mix) 2A - 7 - Ali Wilson, Matt Smallwood',
  'Soulless Arctor',
  'OUTPUT DCAST DYNAMICS',
  'No Hope (Crisis Mix) Detroit In Effect',
  'Time Warp Tonic Ebb',
  'Palicavonzvreca 07 (A1) Klisna Z Hodonina',
  'Give Your Body (Delta Funktionen 3AM Mix) Random XS',
  'Changa Rene Wise',
  'Engage SAAH',
  '(T-N) Versalife - Reality Distortion Field - Transcendent',
  'Model T Steve Stoll',
  'Subsonic - Lost In Space (Acid 1995)',
  'The Advent vs. Joey Beltram - B1 The Advent - Rock Bottom',
  'Heaven UDG'
];

const tmpDir = path.join(__dirname, 'artwork_tmp');
const metadata = [];
let successCount = 0;

// Download image into a Buffer
async function downloadBuffer(url) {
  const resp = await axios.get(url, { responseType: 'arraybuffer' });
  return Buffer.from(resp.data);
}

// Given a search term, fetch the first song result (to get track metadata), return it
async function fetchITunesData(term) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song&limit=1`;
  const res = await axios.get(url);
  const result = res.data.results[0];
  if (!result) throw new Error(`No iTunes song result for "${term}"`);
  return result;
}

// Process buffer into PNG and WebP at specified widths, using successCount for naming
async function processImage(buffer) {
  const widths = [600, 300];
  for (const w of widths) {
    const pngName = `artwork-${successCount}-${w}.png`;
    await sharp(buffer)
      .resize(w)
      .png()
      .toFile(path.join(tmpDir, pngName));

    const webpName = `artwork-${successCount}-${w}.webp`;
    await sharp(buffer)
      .resize(w)
      .webp()
      .toFile(path.join(tmpDir, webpName));
  }
}

async function main() {
  // Prepare temp folder
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

  console.log('Fetching artwork and metadata…');
  for (const term of releases) {
    try {
      // 1) Fetch track info (including artwork, metadata)
      const track = await fetchITunesData(term);
      const artUrl = track.artworkUrl100.replace(/100x100bb/, '600x600bb');
      // 2) Download art
      const buffer = await downloadBuffer(artUrl);

      // 3) Increment count and process images
      successCount += 1;
      await processImage(buffer);

      // 4) Collect metadata
      metadata.push({
        index: successCount,
        artistName: track.artistName,
        trackName: track.trackName,
        collectionName: track.collectionName,
        releaseYear: new Date(track.releaseDate).getFullYear(),
        trackTimeSeconds: Math.round(track.trackTimeMillis / 1000),
        recordLabel: track.collectionName,  
        genre: track.primaryGenreName
      });

      console.log(`✅ [${successCount}] ${track.artistName} - ${track.trackName}`);
    } catch (err) {
      console.warn(`❌ Failed "${term}": ${err.message}`);
    }
  }

  // Write metadata JSON
  fs.writeFileSync('metadata.json', JSON.stringify(metadata, null, 2));

  // Bundle into ZIP
  const output = fs.createWriteStream('album_artwork.zip');
  const archive = archiver('zip', { zlib: { level: 9 } });
  archive.pipe(output);
  archive.directory(tmpDir, false);
  await archive.finalize();

  console.log(`\nDone! ${successCount} artworks processed.`);
  console.log('→ album_artwork.zip');
  console.log('→ metadata.json');

  // Cleanup
  fs.rmSync(tmpDir, { recursive: true, force: true });
}

main().catch(console.error);