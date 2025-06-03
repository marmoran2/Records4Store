const { Release } = require('./models');

(async () => {
  try {
    const releases = await Release.findAll({ attributes: ['release_id'], limit: 10 });
    releases.forEach(r => console.log('✅ release_id:', r.release_id));
  } catch (err) {
    console.error('DB error:', err);
  }
})();
