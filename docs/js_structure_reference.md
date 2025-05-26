# JavaScript Structure Reference — Vinyl Record Store Frontend

The JavaScript architecture is modular and page-aware. It separates reusable logic (carousels, product cards), shared UI components (navbar, footer), and page-specific controllers (product-page, product-grid). Data is sourced from a static `metadata.json` file and components are injected dynamically.

## FILES AND RELATIONSHIPS

### core/bootstrap.js
Initializes Bootstrap 5.3 JS components:
- Tooltips, Popovers, Toasts
Used globally. Called in `core/main.js`.

### core/main.js
Main entry point. Called on all major pages like `index.html`.
- Runs `initBootstrap()` from `bootstrap.js`
- Calls `fillHeroCarousel()` and `loadCarouselSection()` from `components/carousels.js`
- Supports a global `setupPageTransitions()` if defined
Used for homepage functionality and base setup.

### core/product-data.js
- `loadProductMetadata()`: Loads and parses `metadata.json`
- `transformMetaToCarouselItem(product)`: Prepares product data for carousel display
Imported in `carousels.js`, `product-grid.js`, and possibly others.

### components/navbar.js
Dynamically builds and injects:
- `middleBar` (top navigation with logo/search/account icons)
- `bottomBar` (Bootstrap nav with dropdowns from `productNav`)
Also:
- Scroll-based collapse behavior
- Manual bootstrap dropdown initialization
- Injects “Catalog” items via `fillCatalogMenu()` using local array (redundant with `category-items.js`)
Called via `<script>` on most pages to insert full nav and behaviors.

### components/footer.js
Injects a fully styled Bootstrap-based footer:
- Newsletter form, links, social icons, copyright
Prevents multiple inserts. Loaded on all pages via `<script defer>`.

### components/carousels.js
- `fillHeroCarousel()`: Static banner rotation (hero section)
- `fillCarousel(id, items, perSlide)`: Creates a card-based carousel with given data
- `loadCarouselSection(id, start, end)`: Loads items from `metadata.json` and injects into specified carousel using `fillCarousel()`
Used by `main.js` to build homepage carousels (`#featuredCarousel`, `#upcomingCarousel`).

### pages/product-page.js
Populates `product.html` dynamically:
- Uses URL query param `?index=X`
- Loads product from metadata and fills UI (title, image, details)
- Adds parallax scroll effect and button feedback for cart
Includes fallback rendering for invalid/missing index.

### pages/product-grid.js
Controls product listing page with filters:
- Loads metadata.json
- Populates genre/year filters from available data
- Filters based on selected options
- Uses `renderProductCard(product)` from `product-card.js`
Includes graceful empty state handling and reset button.

### components/product-card.js
Exports `renderProductCard(product)`:
- Returns a Bootstrap `.card` with product image, title, genre/year, and link
Used in `product-grid.js` and potentially other dynamic product views.

### components/category-items.js
Defines a static array of catalog filters (Genres, Period, Style, etc.)
Injects them into `#catalog-menu` if it exists.
This logic overlaps with part of `navbar.js` and could be consolidated.

## SYSTEM ARCHITECTURE OVERVIEW

- Metadata for all products lives in `assets/json/metadata.json`.
- Shared logic (product formatting, rendering) is centralized in `product-data.js` and `product-card.js`.
- Reusable UI like navbar, footer, and carousels are dynamically inserted.
- `main.js` acts as global entry for common features; page-specific scripts extend functionality.
- Scripts are modular and loaded per page using `type="module"` or `defer`.
- Bootstrap and jQuery are loaded globally via CDN; Bootstrap dropdowns require re-init due to dynamic HTML injection.

This setup is structured to make backend transition easy — replacing JSON fetches with API calls will require minimal changes.

