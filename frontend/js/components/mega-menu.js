export function renderMegaMenu(categoriesData) {  
  const megaMenu = document.createElement('div');
  megaMenu.id = 'megaCategoryMenu';
  megaMenu.className = 'mega-menu';
  megaMenu.innerHTML = `
    <div class="mega-menu__content container py-4">
      <div class="row">
        <div class="col-md-4">
          <h6 class="text-uppercase">Genres</h6>
          <ul class="list-unstyled">
            ${categoriesData.genres.map(i => `<li><a href="#" class="dropdown-item genre-link" data-genre="${i}">${i}</a></li>`).join('')}
          </ul>
        </div>
        <div class="col-md-4">
          <h6 class="text-uppercase">Styles</h6>
          <ul class="list-unstyled">
            ${categoriesData.styles.map(i => `<li><a href="#" class="dropdown-item style-link" data-style="${i}">${i}</a></li>`).join('')}
          </ul>
        </div>
        <div class="col-md-4">
          <h6 class="text-uppercase">Era</h6>
          <ul class="list-unstyled">
            ${categoriesData.era.map(i => `<li><a href="#" class="dropdown-item era-link" data-era="${i}">${i}</a></li>`).join('')}
          </ul>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col">
          <div class="category-image-cards d-flex flex-wrap gap-3 justify-content-center">
            <div class="category-card">
              <img src="../assets/images/background.png" alt="Techno" />
              <span>Techno</span>
            </div>
                        <div class="category-card">
              <img src="../assets/images/background.png" alt="Techno" />
              <span>Breaks</span>
            </div>
                        <div class="category-card">
              <img src="../assets/images/background.png" alt="Techno" />
              <span>House</span>
            </div>
                        <div class="category-card">
              <img src="../assets/images/background.png" alt="Techno" />
              <span>Ambient</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  return megaMenu;
}
