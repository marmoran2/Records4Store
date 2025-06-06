const { Product, Release, Artist, sequelize } = require('../models');

(async () => {
  const products = await Product.findAll({
    include: {
      model: Release,
      include: [{ model: Artist, through: { attributes: [] } }]
    }
  });

  let issues = 0;

  for (const p of products) {
    const problems = [];

    if (!p.release_id) problems.push('Missing release_id');
    if (!p.price) problems.push('Missing price');
    if (!p.stock_qty && p.stock_qty !== 0) problems.push('Missing stock_qty');
    if (!p.size_inches) problems.push('Missing size_inches');

    if (!p.Release) problems.push('Missing Release');
    else {
      if (!p.Release.release_title) problems.push('Missing release_title');
      if (!p.Release.catalog_number) problems.push('Missing catalog_number');
    }

    if (!p.Release.Artists || p.Release.Artists.length === 0) {
      problems.push('No associated artists');
    }

    if (problems.length > 0) {
      console.log(`❌ Product ID ${p.product_id}:`, problems.join(', '));
      issues++;
    }
  }

  console.log(`\nValidation complete: ${issues} issue(s) found out of ${products.length} products.`);
  await sequelize.close();
})();

