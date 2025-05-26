const { Product, ProductImage, Release, Label } = require('../models');

module.exports = async () => {
  const label = await Label.create({
    name: 'Test Label',
    country: 'Ireland',
    founded_year: 2000
  });

  const release = await Release.create({
    label_id: label.label_id,
    catalog_number: 'TL001',
    release_title: 'First Drop',
    release_year: '2020'
  });

  const product = await Product.create({
    release_id: release.release_id,
    price: 1999,
    stock_qty: 10,
    size_inches: '12'
  });
  console.log('Product created:', product.product_id);

  await ProductImage.create({
    product_id: product.product_id,
    url: 'https://via.placeholder.com/300',
    is_thumbnail: true
  });
};

