const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

const DISCOGS_TOKEN = process.env.API_KEY;
if (!DISCOGS_TOKEN) {
  console.error('❌ API key not set. Please set the DISCOGS_TOKEN environment variable.');
  process.exit(1);
}
const INPUT_FILE = 'track_list.txt'; // One line per track name
const OUTPUT_FILE = 'resolved_master_ids.txt';

const searchDiscogs = async (query) => {
  try {
    const response = await axios.get('https://api.discogs.com/database/search', {
      headers: {
        'User-Agent': 'DiscogsTrackResolver/1.0',
        'Authorization': `Discogs token=${DISCOGS_TOKEN}`
      },
      params: {
        q: query,
        type: 'release'
      }
    });
    const result = response.data.results?.[0];
    return result?.master_id || null;
  } catch (err) {
    console.warn(`❌ Error fetching "${query}": ${err.message}`);
    return null;
  }
};

(async () => {
  const queries = fs.readFileSync(INPUT_FILE, 'utf-8')
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean);

  const output = [];

  for (const query of queries) {
    console.log(`🔍 Searching: ${query}`);
    const masterId = await searchDiscogs(query);
    if (masterId) {
      output.push(`${query} – ${masterId}`);
    } else {
      output.push(`${query} – NOT FOUND`);
    }
    await new Promise(r => setTimeout(r, 1000)); // avoid rate limiting
  }

  fs.writeFileSync(OUTPUT_FILE, output.join('\n'), 'utf8');
  console.log(`✅ Done. Saved to ${OUTPUT_FILE}`);
})();