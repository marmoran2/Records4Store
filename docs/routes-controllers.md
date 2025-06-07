API Routes and Controllers Breakdown
Overview
The backend Express server (see server.js) registers three main route modules with base paths: User routes under /api/users, Product routes under /api/products, and Order/Cart routes under /api/orders

. Each route file defines the endpoints and binds them to controller functions that implement the logic. Below is a comprehensive breakdown of all API endpoints, organized by route, along with their functionality.
User Routes (/api/users)
These endpoints handle user accounts, authentication, and related actions. They are defined in routes/userRoutes.js and implemented by user controllers.
POST /api/users/ – Register a new user. Creates a new user account (or guest account) by inserting a User record. The controller expects user details (e.g. email, password hash, name, etc.) in the request body

. On success, it returns the newly created user object with a 201 status
. (In code, this is handled by userController.registerUser, which creates the user via User.create

.)
GET /api/users/ – List all users. Returns an array of all user accounts (for administrative or debugging use)
. The response includes basic fields (user ID, email, name, role, etc.) for each user
. This is implemented by userController.getAllUsers, which calls User.findAll with selected attributes

.
POST /api/users/login – User login. Authenticates a user with email and password. The controller (userController.loginUser) will verify credentials (likely comparing the password with stored hash) and establish a session or JWT token. On success, it may respond with an auth token or set a cookie (exact implementation depends on the auth strategy). (The code uses cookieParser and likely issues a token on login.)

GET /api/users/loggedIn – Get current logged-in user. Protected endpoint that returns the details of the currently authenticated user. It uses a JWT/verify middleware (verifyToken) to ensure the request has a valid token

. The controller (userController.getLoggedInUser) then finds the user (e.g. by ID from the token) and returns the user profile. This allows the frontend to validate persistent login state.
PUT /api/users/toggle/:id – Toggle user role. Toggles a user’s type/role by ID (for example, switching a user’s role between Customer and Admin). The controller (userController.toggleUserTypeById) would look up the user by id and flip a flag or enum (likely the user_role field) then save the change. This is intended for admin use to grant or revoke admin privileges. (The route is not marked protected in code, but likely should be admin-only.)

POST /api/users/request – Create a user request. Protected endpoint (requires a valid token)

 that allows a logged-in user to submit a request or feedback. The requestController.createRequest will handle the payload (for example, a support request, account upgrade request, etc.). In the current implementation, this likely records the request in some form (either in a database or sends an email/notification). This is part of the user domain logic for user-initiated requests. (The exact model or storage for requests isn’t shown in the code, but this endpoint is provided for future expansion.)
Product Routes (/api/products)
These endpoints provide read-only access to the product catalog and related metadata (artists, releases, tags, etc.), as well as logging product views. They are defined in routes/productRoutes.js and use controllers in the controllers/product/ directory.
GET /api/products/ – List all products. Returns an array of all products in the catalog. The response includes each product’s details along with associated data: images, views, tags, and release info

. The controller (productController.getAllProducts) uses eager loading to include related entities


 – for example, it includes all image URLs, any recorded views, the tags (genres/styles) linked to the product, and the release details (release title, date, label, genre, artist, etc.)


. Products are ordered by ID in the result

.
GET /api/products/:id – Get product by ID. Retrieves a single product’s full details. The controller (productController.getProductById) finds the product by primary key and includes the same rich related data as above


. If the product ID is not found, it returns 404 Not Found

. This allows the frontend product detail page to show all information (images, track list via release->tracks, etc.) in one request.
GET /api/products/images – List product images. Returns all product images in the system. Each image entry includes its image_id, URL, alt text, and is associated with its product (the product relationship is joined)

. The productImageController.getAllImages is used, calling ProductImage.findAll with an include for the Product (selecting product id and price)

.
GET /api/products/images/:id – Get image by ID. Fetches a specific product image by its ID. The result includes the image’s data and its related product info

. If no image exists with that ID, a 404 is returned

.
GET /api/products/artists – List artists. Returns all music artists in the database. For each artist, basic fields like artist_id, name, country, and website are provided

. (artistController.getAllArtists simply does Artist.findAll with selected attributes

.)
GET /api/products/artists/:id – Get artist by ID. Retrieves details for one artist, including that artist’s releases. The controller finds the artist by ID and includes their associated Releases (with fields like release title, date, catalog number)

. This allows the frontend to show an artist page with all their releases. If the artist ID doesn’t exist, 404 is returned

.
GET /api/products/releases – List releases. Returns all album releases with basic info. Each release object includes its title, release date, catalog number, and has embedded info about its label, genre, and artist (names and IDs)

. The releaseController.getAllReleases achieves this via Release.findAll with includes for Label, Genre, and Artist

. This is useful for listing all records or for search results.
GET /api/products/releases/:id – Get release by ID. Retrieves a specific release (album) and all of its details: it includes the label, genre, artist, plus all tracks on that release and all product variants associated with the release


. For example, a release might be a particular album, and “products” could be the physical formats (12" vinyl, 7" vinyl, etc.) in stock for that release. Tracks (song list) are included with track number, title, duration, side (A/B) info

. A 404 is returned if the release ID is not found

.
GET /api/products/labels – List record labels. Returns all record labels (music labels) with basic information (label ID, name, website, country, etc.)

.
GET /api/products/labels/:id – Get label by ID. Returns one label and its associated releases. The controller includes all releases under that label (with each release’s id, title, date, catalog number)

. This allows viewing the catalog of a specific record label. If not found, 404 is returned

.
GET /api/products/tags – List tags. Returns all product tags. Tags represent descriptive categories (genres or styles beyond the main genre). Each tag has an ID and name

.
GET /api/products/tags/:id – Get tag by ID. Retrieves a specific tag and includes the products associated with that tag. The controller finds the tag and joins through the ProductTag relation to get products (providing each linked product’s id, price, and stock quantity)

. This could be used to show all products labeled with a given tag (e.g. “Limited Edition”). If the tag doesn’t exist, 404 is returned

.
GET /api/products/genres – List genres. Returns all music genres in the system (each with genre ID and name)

.
GET /api/products/genres/:id – Get genre by ID. Returns one genre and all releases associated with that genre. The releases are included with their ids, titles, and release dates

. (For example, getting genre “Rock” would list all releases in that genre.) If the genre ID is not found, 404 is returned

.
GET /api/products/views – List product views (admin). Returns all recorded product view events. This is mainly for debugging or admin analytics, since it returns every ProductView record logged

. Each view record includes the product that was viewed, the user who viewed it (if logged in), and session info (for guests)

. The data is ordered by the view timestamp (most recent first)

.
GET /api/products/:productId/views – Get views for a product. Retrieves all view records for a specific product (by that product’s ID)

. This shows how many times and by whom a particular product has been viewed. The response includes each view’s timestamp and, if available, the viewer’s user or session ID

.
POST /api/products/:productId/views – Log a product view. Creates a new ProductView entry to record that a given product was viewed

. The request can include user_id (if a logged-in user is viewing) or session_id (for guest user) in the body

. The controller (productViewController.logProductView) will capture the current timestamp and save the view record

. On success it returns the created view record with a 201 status

. This endpoint is intended to be called from the frontend whenever a product detail page is viewed, for analytics or “recently viewed” features.
Order & Cart Routes (/api/orders)
The orderRoutes.js module covers multiple related sets of endpoints all under the /api/orders path. These include shopping cart operations, order checkout, order line items, order confirmations, payments, and payment providers. Each category is handled by its respective controller in controllers/order/. (Note: In the current implementation, many of these endpoints share similar base URLs; they are logically grouped here for clarity.)
Cart Item Endpoints: Manage the shopping cart contents (either associated with a user or a guest session).
GET /api/orders/all – Returns all cart items in the system

. This is likely an admin/debug endpoint to view every cart entry (for all users/sessions).
GET /api/orders/ (no ID) – Gets the current user's cart items

. The controller (cartItemController.getCartItems) uses the context (user ID from auth or session ID from cookie) to find cart items belonging to the active session or user. It returns the list of items (product IDs, quantities, etc.) in that person’s cart.
POST /api/orders/ – Add item to cart

. Adds a product to the shopping cart. The request body likely includes a product ID (and possibly quantity), and the controller (cartItemController.addCartItem) will create a new CartItem record linking the product with the user/session

. The new cart item is returned in the response.
DELETE /api/orders/:cartItemId – Remove item from cart

. Removes the specified cart item (by its ID) from the cart. The controller (cartItemController.deleteCartItem) will delete that CartItem record. After this, the item will no longer appear in the user’s cart.
Order Endpoints: Handle order records (completed checkouts).
GET /api/orders/ – List all orders

. Returns all orders in the database. This might return only the orders of the logged-in user or, if used by an admin context, all orders from all users (the implementation isn’t explicitly filtered, so likely all orders). Each order includes details like order ID, user or guest info, totals, and status.
GET /api/orders/:id – Get order by ID

. Retrieves a specific order’s details by its ID. The orderController.getOrderById would find the Order and possibly include associated data (order lines, payment, etc., given the model relations

). If the order doesn’t exist or doesn’t belong to the requesting user (if access control is added later), it returns 404.
POST /api/orders/ – Create a new order

. Creates an Order record (placing an order). This is called during checkout to convert a cart into an order. The controller (orderController.createOrder) will take order details from the request (such as user info, shipping address, payment info or cart items) and save a new Order entry. It likely also processes the cart items into order line items and resets the cart (the exact flow depends on implementation). On success, it returns the created order (with a 201 status).
Order Line Endpoints: Manage individual items within orders (order lines represent a product quantity within a specific order).
GET /api/orders/ – List all order lines

. Returns every OrderLine record across all orders. Each order line typically has product details and quantity/price. (This would normally be an admin or internal endpoint, since it’s all orders’ lines.) The controller (orderLineController.getAllOrderLines) includes the Product model so product info is attached to each line

.
GET /api/orders/order/:orderId – List lines for an order

. Returns all line items for the specified order ID. This will list the products and quantities that were part of that single order

. For example, if order #123 has 3 items, this returns those 3 line entries. Useful for retrieving the contents of an order (could also be achieved by getting the order with its lines, but this provides a direct endpoint).
POST /api/orders/ – Create a new order line

. Adds an OrderLine entry. This would typically be used internally when creating an order (to add each product), but it’s exposed as an endpoint. It expects order_id, product_id, quantity, and unit price in the body and creates a new line record

. The new OrderLine is returned with status 201

.
Order Confirmation Endpoints: Handle order confirmation records (e.g. an email or PDF receipt confirmation for an order).
GET /api/orders/ – List all order confirmations

. Returns all OrderConfirmation entries. Each confirmation links to an Order and may contain a PDF URL or email-sent flag. (orderConfirmationController.getAllConfirmations includes the associated Order data)

.
GET /api/orders/order/:orderId – Get confirmation by order

. Retrieves the confirmation record for a specific order (by orderId)

. This would return details like whether a confirmation email was sent, the PDF invoice URL, and timestamp. If no confirmation exists for that order, a 404 is returned

.
POST /api/orders/ – Create order confirmation

. Creates a new OrderConfirmation record. The request body should include the order_id and confirmation details (PDF link, issued date, etc.)

. The controller saves the record and returns it with a 201 status

. Typically, this would be triggered after an order is successfully placed, to record that a confirmation was generated/sent.
Payment Endpoints: Manage payment transactions for orders.
GET /api/orders/ – List all payments

. Returns all Payment records in the system. Each payment is usually linked to an order and a provider. The controller (paymentController.getAllPayments) includes the associated Order and PaymentProvider for context

. This could be used by admins to see all transactions.
GET /api/orders/order/:orderId – Get payment by order

. Retrieves the payment record for a given order (since typically one order has one payment). The controller finds the Payment where order_id matches, and includes order and provider info

. If no payment is found for that order (e.g., order not paid yet), it returns 404

.
POST /api/orders/ – Create a payment record

. Records a new payment. The request should provide details like order_id, provider_id (which payment provider was used), method (e.g. card, PayPal), amount, status, etc.

. The paymentController.createPayment will create a Payment entry with those details

 and return it with status 201

. This might be called when an order is paid or to log an incoming payment from an external service.
Payment Provider Endpoints: Manage payment providers (such as different payment gateways or methods the store supports).
GET /api/orders/ – List all payment providers

. Returns all PaymentProvider entries (e.g., entries for PayPal, Stripe, etc.). Each provider includes its id, name, API endpoint, support email, and related payments if any

. This helps admins see configured payment methods.
GET /api/orders/:providerId – Get provider by ID

. Retrieves details of a specific payment provider (by its ID) including all payments made through that provider (the controller includes associated payments in the result)

. Returns 404 if the provider ID is invalid

.
(The controller also has a createProvider method to add new providers

, but routes/orderRoutes.js does not define a POST endpoint for providers in the current code. All provider management may be intended via database seeding or future implementation.)
Each of the above controllers uses Sequelize models (see modelsref.md for the data structure) to perform database operations. For example, cart items and product views can belong to either a user or a session (allowing guest users to shop)


, and orders are linked to users (or have a guest email) and contain order lines, payments, and confirmations

. The controllers often include related models so that responses are rich in data (e.g. product endpoints including images, tags, etc.). Overall, this Routes/Controllers setup defines a RESTful API for the e-commerce application: Users can register/login and have profiles; Products and catalog info can be read; a Cart can be built and then turned into an Order; each order has associated OrderLines, a Confirmation, and a Payment recorded, with support for multiple payment providers. All endpoints and their functionality as described above reflect the intended behavior of the Records4Store backend API, based on the routes and controllers in the repository.