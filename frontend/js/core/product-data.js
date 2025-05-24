export function transformMetaToCarouselItem(product) {
    return {
      img: `../assets/images/album_artworks/artwork-${product.index}-300.webp`,
      title: product.trackName,
      link: `product.html?index=${product.index}" data-transition="product"`
    };
  }

// core/product-data.js
let productCache = null;

export async function loadProductMetadata() {
  if (productCache) return productCache;

  try {
    const res = await fetch('../assets/json/metadata.json');
    productCache = await res.json();
    return productCache;
  } catch (error) {
    console.error('Error fetching metadata:', error);
    throw error;
  }
}