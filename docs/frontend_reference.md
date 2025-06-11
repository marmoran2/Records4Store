# Frontend Project Reference — Vinyl Record Store

This is a college-level project to design and deploy the **frontend** of an e-commerce website for a vinyl record store. The project uses a **full Bootstrap 5.3 deployment** with custom SCSS architecture based on the 7-1 pattern. Bootstrap classes are used where helpful, but styling is largely driven by custom SCSS components and variables.

## Project Goals

- Build a clean, modular frontend that will be used later with a backend (e.g., Node.js + MongoDB or similar).
- Pages should be visually complete and fully responsive, with placeholder logic for dynamic content populated via JSON or JS.
- Dynamic pages such as product listings and templates should be easily refactored to pull live data from backend APIs when ready.
- UI/UX should follow modern standards, using component-based design with BEM naming and mobile-first layout logic.

## Pages Included in Frontend Deployment

### General UI Pages
- **Home**: Featured releases (product cards), carousel of highlighted records or news.
- **Product Template Page**: Displays individual product based on JS metadata (image, genre, label, year, etc.). Includes buttons to add to cart and wishlist.
- **New Releases Page**: Carousel layout of recent additions (defined later in backend).
- **Product Grid Listings Page**: Dynamic grid of products filtered by genre, price, year/era, and other categories.

### Auth Pages
- **Login Page**
- **Register Page 1**: Enter email.
- **Register Page 2**: Personal details (name, password).
- **Register Page 3**: Confirmation + simulated email verification.
- **Forgot Password Page**: Enter email to receive reset link.
- **Password Recovery Sent Page**
- **Password Reset Page**: New password form.

### Cart and Checkout Pages
- **Cart Page**: List of selected products with price and quantity.
- **Checkout 1**: Order review.
- **Checkout 2**: Enter shipping details.
- **Checkout 3**: Payment processing placeholder.
- **Checkout 4**: Order confirmation summary.

### Informational Pages
- **Contact Us Page**
- **FAQ Page**
- **News Homepage**
- **News Post Template Page**: Structured similarly to product template, populated dynamically.

### Search and Account Pages
- **Search Page**: Custom search and search term display.
- **Wishlist Page**
- **Account Page - View Details**
- **Account Page - Edit Info**

## SCSS/JS Notes

- SCSS is structured using the 7-1 pattern, with `main.scss` importing all partials.
- SCSS uses BEM naming and centralized design tokens via `_variables.scss`.
- JS dynamically populates carousels and product pages using static JSON metadata for now.
- Pages rely on reusable components: navbar, product card, carousel, hero, etc.
- Scripts are modularized under `components/`, `core/`, and `pages/`.

## Integration Prep

- Dynamic content (products, user data) is simulated via JS but built in a way to be replaced with backend data later.
- URLs, classes, and JS structure are designed to facilitate future backend integration with minimal refactoring.
- Auth and checkout flows simulate real processes but will connect to APIs during backend development.

## Usage

This file should be provided to ChatGPT when opening a new conversation, to inform the assistant of:
- The full scope of the project
- Existing page structure
- Intent for dynamic backend compatibility
- SCSS/JS modular structure

ChatGPT should respond within the constraints and logic described above when assisting with any frontend feature, component, layout, or integration request.
