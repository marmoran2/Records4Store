🔐 User (Account & Auth)
Base path: /api/users

Method	URL	Description
POST	http://localhost:3000/api/users/	Register a user (send body with user info)
POST	http://localhost:3000/api/users/login	Login with email/password
GET	http://localhost:3000/api/users/loggedIn	Get logged-in user details (requires auth token)
GET	http://localhost:3000/api/users/	List all users (admin/debug)
PUT	http://localhost:3000/api/users/toggle/:id	Toggle user role (admin-only)
POST	http://localhost:3000/api/users/request	Submit user request (requires token)

🛒 Product (Catalog & Views)
Base path: /api/products

Method	URL	Description
GET	http://localhost:3000/api/products/	List all products
GET	http://localhost:3000/api/products/:id	Get a single product by ID
GET	http://localhost:3000/api/products/images	Get all product images
GET	http://localhost:3000/api/products/images/:id	Get a product image by ID
GET	http://localhost:3000/api/products/artists	List all artists
GET	http://localhost:3000/api/products/artists/:id	Get artist by ID
GET	http://localhost:3000/api/products/releases	List all releases
GET	http://localhost:3000/api/products/releases/:id	Get release by ID
GET	http://localhost:3000/api/products/labels	List all labels
GET	http://localhost:3000/api/products/labels/:id	Get label by ID
GET	http://localhost:3000/api/products/tags	List all tags
GET	http://localhost:3000/api/products/tags/:id	Get tag and its products
GET	http://localhost:3000/api/products/genres	List all genres
GET	http://localhost:3000/api/products/genres/:id	Get genre and its releases
GET	http://localhost:3000/api/products/views	List all product views (debug/admin)
GET	http://localhost:3000/api/products/:productId/views	Get all views for a product
POST	http://localhost:3000/api/products/:productId/views	Log a product view (send user_id or session_id)

📦 Order & Checkout
Base path: /api/orders

🛒 Cart
Method	URL	Description
GET	http://localhost:3000/api/orders/	Get current user's cart items
GET	http://localhost:3000/api/orders/all	Get all cart items (admin/debug)
POST	http://localhost:3000/api/orders/	Add product to cart (send product & quantity)
DELETE	http://localhost:3000/api/orders/:cartItemId	Remove item from cart by cartItemId

📄 Order
Method	URL	Description
GET	http://localhost:3000/api/orders/	List all orders
GET	http://localhost:3000/api/orders/:id	Get specific order
POST	http://localhost:3000/api/orders/	Create a new order (checkout step)

📋 Order Line Items
Method	URL	Description
GET	http://localhost:3000/api/orders/order/:orderId	Get all order lines for order
POST	http://localhost:3000/api/orders/	Add new order line (send order_id, product_id, etc.)

✅ Order Confirmation
Method	URL	Description
GET	http://localhost:3000/api/orders/order/:orderId	Get order confirmation by order ID
POST	http://localhost:3000/api/orders/	Create order confirmation

💳 Payment
Method	URL	Description
GET	http://localhost:3000/api/orders/order/:orderId	Get payment for order
POST	http://localhost:3000/api/orders/	Create payment record

🏦 Payment Providers
Method	URL	Description
GET	http://localhost:3000/api/orders/	List all payment providers
GET	http://localhost:3000/api/orders/:providerId	Get provider by ID
