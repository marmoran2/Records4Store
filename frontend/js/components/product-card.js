function renderProductCard(product) {
  return `
    <div class="product-card card mb-4" style="width: 18rem;">
      <img src="../assets/images/album_artworks/artwork-${product.index}-600.webp" class="card-img-top" alt="${product.trackName} artwork">
      <div class="card-body">
        <h5 class="card-title">${product.trackName}</h5>
        <p class="card-text text-muted">${product.artistName}</p>
        <p class="card-text">${product.genre} · ${product.releaseYear}</p>
        <a href="product.html?index=${product.index}" class="btn btn-primary" data-transition="product">View</a>
      </div>
    </div>
  `;
}
