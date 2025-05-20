document.addEventListener('DOMContentLoaded', async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const index = parseInt(urlParams.get('index'), 10);

  if (isNaN(index) || index < 1) {
    document.body.innerHTML = '<p class="text-center mt-5">Invalid product.</p>';
    return;
  }

  try {
    const res = await fetch('../assets/json/metadata.json');
    const products = await res.json();
    const product = products.find(p => p.index === index);

    if (!product) {
      document.body.innerHTML = '<p class="text-center mt-5">Product not found.</p>';
      return;
    }

    document.getElementById('trackName').textContent = product.trackName;
    document.getElementById('artistName').textContent = product.artistName;
    document.getElementById('collectionName').textContent = product.collectionName;
    document.getElementById('recordLabel').textContent = product.recordLabel;
    document.getElementById('genre').textContent = product.genre;
    document.getElementById('releaseYear').textContent = product.releaseYear;
    document.getElementById('trackLength').textContent = formatTime(product.trackTimeSeconds);

    const image = document.getElementById('productImage');
    image.src = `../assets/images/album_artworks/artwork-${product.index}-600.webp`;
    image.alt = `${product.artistName} - ${product.trackName}`;

    window.addEventListener('scroll', () => {
      image.style.transform = `translateY(${window.scrollY * 0.1}px)`;
    });

    const btn = document.querySelector('.btn-custom');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      btn.textContent = "Added!";
      btn.classList.add('added');
      setTimeout(() => {
        btn.textContent = "Add to Cart";
        btn.classList.remove('added');
      }, 1500);
    });

  } catch (err) {
    console.error('Failed to load product:', err);
    document.body.innerHTML = '<p class="text-center mt-5">Failed to load product data.</p>';
  }
  if (typeof setupPageTransitions === 'function') {
    setupPageTransitions();
  }
  

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
});

