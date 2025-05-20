✅ scss_structure_reference.md
md
Copy
Edit
# SCSS Architecture Reference — FINAL STRUCTURE

This document outlines the official SCSS structure, naming conventions, and usage standards for this project. It is intended for ChatGPT reference when assisting with styling, layout, or component development.

---

## 📁 Structure: 7-1 Pattern

sass/
│
├── abstracts/ // Design tokens and reusable logic
│ ├── _variables.scss // Central source of color, spacing, z-index, fonts
│ ├── _mixins.scss // Reusable mixins and functions
│ └── _typography.scss // Font stacks, sizes, weights, utilities
│
├── base/ // Global defaults and resets
│ ├── _reset.scss // Normalization/reset
│ ├── _transitions.scss // Common transition helpers
│ └── _typography.scss // Base element typography (body, headings)
│
├── components/ // Small, reusable UI components (BEM naming)
│ ├── _button.scss
│ ├── _card.scss
│ ├── _carousel.scss
│ ├── _form.scss
│ ├── _hero.scss
│ ├── _navbar.scss
│ ├── _page_bg.scss // Page-level background effects/animations
│ └── _product.scss // Product block layout and styling
│
├── layout/ // Sitewide layout structure
│ ├── _container.scss // Central container and layout constraints
│ ├── _footer.scss
│ ├── _grid.scss // Grid/flexbox layout helpers
│ └── _header.scss
│
├── pages/ // Page-specific overrides/minimal styles only
│ ├── _account.scss
│ ├── _cart.scss
│ ├── _catalog.scss
│ ├── _checkout.scss
│ ├── _home.scss
│ ├── _login.scss
│ ├── _product-page.scss
│ ├── _product-view.scss
│ └── _register.scss
│
└── main.scss // Entry point (uses all other files)

scss
Copy
Edit

---

## 🧠 SCSS Principles

### ✳️ Naming
- Follows **BEM** naming convention
- Class names use double underscore `__` for elements and double dash `--` for modifiers
- Avoids deep nesting

### ✳️ Architecture
- Favors **Bootstrap 5 utility-first** styles with lightweight custom overrides
- Bootstrap variables are overridden via `_variables.scss`
- Color system uses semantic tokens: `$color-primary`, `$color-secondary`, etc.

### ✳️ Imports
All SCSS partials are loaded in `main.scss` via:
```scss
@use "abstracts/variables" as *;
@use "abstracts/mixins" as *;
@use "base/reset";
@use "base/typography";
@use "base/transitions";
@use "layout/container";
@use "layout/grid";
@use "layout/header";
@use "layout/footer";
@use "components/navbar";
@use "components/card";
@use "components/product";
@use "components/button";
@use "components/page_bg";
@use "components/carousel";
@use "components/form";
@use "components/hero";
@use "pages/home";
@use "pages/product-page";
// ...others as needed
🎨 Design Tokens (_variables.scss)
Colors: Defined as both design tokens ($color-primary, etc.) and Bootstrap overrides ($primary, $secondary, etc.)

Z-index map used via map.get($z-index, ...)

Spacing, shadows, breakpoints centralized

Fonts default to Etna Sans

🧩 Component Notes
_product.scss
.product-container, .product-container__image, .product-details

Uses responsive flex layouts and structured spacing

Integrates with dynamic product metadata from JS

_hero.scss
.hero with max-height and overflow rules

.carousel-item img uses object-fit: cover

Hero caption supports positioned overlays

_navbar.scss
Sticky two-tier setup: #middleBar, #bottomBar

Responsive toggler logic integrated with JS

_page_bg.scss
Handles animated backgrounds (.page-move-bg)

Compatible with scroll/visibility triggers

_carousel.scss
.card-grid-carousel, .carousel-inner

Integrates with JS-based item injection

Responsive layout for horizontal scroll

_card.scss
.card-product, .card-body, .card-title

Hover transitions, image scaling, overlay options

✅ General Best Practices
Component-first SCSS design

Minimal styles in pages/, all shared UI lives in components/

Central tokens and Bootstrap overrides in _variables.scss

Typography split between _typography.scss (tokens) and base/_typography.scss (elements)

Favor @use and as * pattern for token access

DRY principle: Mixins over repetition

✅ This is the canonical SCSS structure. Do not change it unless explicitly discussed.
Use this as reference when prompting ChatGPT about any layout, SCSS, or frontend styling task.