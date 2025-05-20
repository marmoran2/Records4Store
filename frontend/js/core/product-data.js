export async function loadProductMetadata() {
    const res = await fetch('../assets/json/metadata.json');
    if (!res.ok) throw new Error(`Failed to fetch metadata.json`);
    return await res.json();
  }
  
 export function transformMetaToCarouselItem(product) {
    return {
      img: `../assets/images/album_artworks/artwork-${product.index}-300.webp`,
      title: product.trackName,
      link: `product.html?index=${product.index}" data-transition="product"`
    };
  }