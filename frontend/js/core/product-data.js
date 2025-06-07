let productCache = null;

export async function loadProductMetadata() {
  if (productCache) return productCache;

  try {
    const res = await fetch('/api/products');
    const raw = await res.json();

    productCache = raw.map(p => ({
      index: p.product_id,
      trackName: p.release?.release_title || '',
      artistName: p.release?.artist?.artist_name || '',
      recordLabel: p.release?.label?.name || '',
      collectionName: p.release?.catalog_number || '',
      releaseYear: p.release?.released_date ? new Date(p.release.released_date).getFullYear() : '',
      genre: p.release?.genre?.name || '',
      country: p.release?.country || '',
      style: Array.isArray(p.release?.styles) ? p.release.styles[0] : '',
      imageUrl: p.images?.[0]?.url ? `/images/releases/${p.images[0].url.replace('/assets/images/releases/', '')}` : ''
    }));

    return productCache;
  } catch (error) {
    console.error('Error fetching product data:', error);
    throw error;
  }
}