Frontend Reference for Records4Store

This document outlines the structure, purpose, and interconnection of the frontend system for the Records4Store project. It is intended to be provided to ChatGPT or other developers when working on integration, expansion, or comparison with backend logic.

📁 Structure Overview

frontend/
├── assets/
│   ├── images/               # Static assets for UI and product artwork
│   └── json/                 # metadata.json, users.json (mock backend data)
├── css/
│   └── main.css              # Compiled SCSS
├── html/                     # All individual frontend pages
│   ├── index.html            # Home
│   ├── product.html          # Product Detail
│   ├── search.html           # Global Search Results
│   ├── cart.html             # Shopping Cart
│   ├── wishlist.html         # Wishlist
│   ├── login.html            # Login Page
│   ├── register.html         # 3-step Registration Flow
│   ├── account.html          # Account Details
│   ├── account-settings.html# Account Settings
│   ├── orders.html           # Order History
│   ├── checkout.html         # 3-step Checkout Flow
│   ├── contact.html          # Contact Form
│   ├── faq.html              # FAQ Section
│   ├── error.html            # Error Display
├── js/
│   ├── animation/            # page-transitions.js, scroll-animate.js
│   ├── components/           # navbar.js, footer.js, carousels.js, product-card.js, etc.
│   ├── core/                 # bootstrap.js, main.js, product-data.js
│   ├── middleware/           # (currently unused)
│   └── pages/                # page-specific JS (cart.js, product-page.js, etc.)
├── scss/
│   ├── abstracts/            # _variables.scss, _mixins.scss
│   ├── base/                 # _reset.scss, _typography.scss
│   ├── layout/               # _grid.scss, _container.scss
│   ├── pages/, components/   # (ignored in this reference)
│   └── main.scss             # Root SCSS file
└── Docs/
    └── Various reference files

🧭 Pages and Systems

🏠 Home (index.html)

Carousels are populated by metadata.json using core/product-data.js and components/carousels.js

Navbar and footer are injected dynamically

Page transitions and animations from animation/page-transitions.js

🔎 Global Search (search.html)

Query string parsed via JS (pages/search.js)

Results filtered client-side from metadata.json

Supports dynamic filtering by genre, label, country, style, year

💿 Product Detail (product.html)

Product loaded via index from metadata.json

Wishlist toggle, Add to Cart button, Tracklist rendered

🛒 Cart (cart.html)

Populated from localStorage using services/cartService.js

Product details loaded from metadata.json

Updates totals, quantity adjustments, item removal

❤️ Wishlist (wishlist.html)

Shows saved products using localStorage.wishlist

Shared layout with product-card rendering

👤 Login (login.html)

Static form (email/password)

Validated via form-validation.js

User added to localStorage.authUser (simulated login)

🧾 Register (register.html)

3-step progressive form (email > details > confirm)

Transitions managed by JS (single page)

Validates fields, password strength

🧑 Account (account.html)

Reads from localStorage.authUser

Fetches full user data from users.json

Displays user summary + details

⚙️ Account Settings (account-settings.html)

Placeholder for managing password, marketing prefs, etc.

📦 Orders (orders.html)

Reads from localStorage.orders

Shows order history: order ID, date, total, item list

💳 Checkout (checkout.html)

3-step process: delivery > payment > confirmation

Uses localStorage.cartItems and builds final order summary

Fake user session from login

❓ FAQ (faq.html)

FAQs loaded dynamically from faqs.json

Collapsible accordion UI

📬 Contact (contact.html)

Static contact form with validation

On submit, logs or saves simulated message

❌ Error Page (error.html)

Query param (?code=404) loads from errors.json

Displays error message, icon, and button to go back

🧠 JS & Logic Overview

ES Modules: Most JS files use type="module" and import/export functions

No Classes: Uses functions, async/await, vanilla DOM APIs with minimal jQuery

Shared Modules:

core/bootstrap.js: Initializes tooltips, etc.

core/product-data.js: Loads product metadata

components/navbar.js / footer.js: Inject dynamic layout

components/carousels.js: Load carousels from product data

components/product-card.js: Renders a product tile

Storage:

services/cartService.js: Manages cart localStorage

services/wishlistService.js: Manages wishlist

Data Source:

All content is dynamically loaded from assets/json/metadata.json and users.json

🧱 HTML + Bootstrap Usage

Bootstrap 5.3 via CDN (JS and CSS)

Custom SCSS compiled into main.css

Layout:

page-container, cart-page, checkout-flow, auth-container etc.

Responsive grids using .row, .col-md-*

Buttons: .btn, .btn-primary, .btn-outline-danger

Forms: .form-control, .form-group, .invalid-feedback

Icons:

Google Material Icons

Bootstrap Icons

🔗 Integration Planning (For Backend)

Product: Use product ID or index to reference products between frontend and backend

User: Replace localStorage.authUser with real user session/cookie

Orders: Replace localStorage.orders with order submission route (via API)

Cart/Wishlist: Migrate from localStorage to backend-stored state

Form Submissions: Replace JS log/simulate methods with API POST/PUT

📝 Next Steps

Finalize backend routes and APIs (routes/product.js, routes/order.js, etc.)

Replace JSON/localStorage usage with fetch calls to API endpoints

Sync frontend logic (form handling, cart actions, login/register) to backend flows

Gradually integrate data persistence, validation, and authentication middleware