function renderFooter() {
    // Prevent multiple inserts
    if (document.querySelector('footer')) return;
  
    const footer = document.createElement('footer');
    footer.className = 'footer text-white pt-5 pb-4';
    footer.style.backgroundColor = '#111';
  
    footer.innerHTML = `
      <div class="container">
        <div class="row gy-4">
          <div class="col-md-4">
            <a href="/" class="d-block mb-3">
              <img src="../assets/images/logo_.png" alt="Logo" style="max-width: 150px;" />
            </a>
            <p class="text-muted small">Discover vinyl records hand-picked from underground and emerging artists.</p>
            <form class="mt-3">
              <label class="form-label text-uppercase text-white-50">Newsletter</label>
              <div class="input-group">
                <input type="email" class="form-control" placeholder="Your email" />
                <button class="btn btn-primary" type="submit">Subscribe</button>
              </div>
            </form>
          </div>
  
          <div class="col-md-2">
            <h6 class="text-uppercase fw-bold">Help</h6>
            <ul class="list-unstyled small">
              <li><a href="#" class="text-muted">FAQ</a></li>
              <li><a href="#" class="text-muted">Returns</a></li>
              <li><a href="#" class="text-muted">Delivery</a></li>
              <li><a href="#" class="text-muted">Contact</a></li>
            </ul>
          </div>
  
          <div class="col-md-2">
            <h6 class="text-uppercase fw-bold">Shop</h6>
            <ul class="list-unstyled small">
              <li><a href="#" class="text-muted">New Releases</a></li>
              <li><a href="#" class="text-muted">Pre-Orders</a></li>
              <li><a href="#" class="text-muted">On Sale</a></li>
              <li><a href="#" class="text-muted">Genres</a></li>
            </ul>
          </div>
  
          <div class="col-md-4">
            <h6 class="text-uppercase fw-bold">Connect</h6>
            <p class="small text-muted">Follow us for new drops, exclusives & restocks.</p>
            <div class="d-flex gap-3">
              <a href="#" class="text-white fs-4"><i class="bi bi-instagram"></i></a>
              <a href="#" class="text-white fs-4"><i class="bi bi-facebook"></i></a>
              <a href="#" class="text-white fs-4"><i class="bi bi-twitter-x"></i></a>
              <a href="#" class="text-white fs-4"><i class="bi bi-tiktok"></i></a>
            </div>
          </div>
        </div>
  
        <hr class="border-secondary mt-5" />
        <div class="d-flex flex-column flex-md-row justify-content-between text-muted small">
          <div>&copy; ${new Date().getFullYear()} 4 To The Floor Records</div>
          <div>
            <a href="#" class="text-muted me-3">Privacy Policy</a>
            <a href="#" class="text-muted">Terms & Conditions</a>
          </div>
        </div>
      </div>
    `;
  
    document.body.appendChild(footer);
  }
  
  // Call it safely
  document.addEventListener('DOMContentLoaded', renderFooter);