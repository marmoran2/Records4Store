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
            ${categoriesData.genres.map(i => {
              const lower = i.toLowerCase();
              return `<li><a href="#" class="dropdown-item genre-link" data-genre="${lower}">${lower}</a></li>`;
            }).join('')}
          </ul>
        </div>
        <div class="col-md-4">
          <h6 class="text-uppercase">Styles</h6>
          <ul class="list-unstyled">
            ${categoriesData.styles.map(i => {
              const lower = i.toLowerCase();
              return `<li><a href="#" class="dropdown-item style-link" data-style="${lower}">${lower}</a></li>`;
            }).join('')}
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
            ${['Techno', 'Breaks', 'House', 'Ambient'].map(name => `
              <div class="category-card">
                <img src="../assets/images/background.png" alt="${name}" />
                <span>${name}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
  return megaMenu;
}