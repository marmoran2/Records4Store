Below is a concise “reference.md”–style summary of your schema, organized into User, Order, Product and cross‐domain tables. You can feed this to ChatGPT later to restore context quickly.

Database Reference
1. User Domain
SESSION

PK: session_id (varchar)

FK: user_id → USER

Metadata: created_at, expires_at, ip_address, user_agent, is_valid, device_type, device_name

USER

PK: user_id (int)

Attributes: email, password_hash, is_guest, first_name, last_name, email_verified_at, profile_photo_url, phone_number, user_role, failed_login_attempts, locked_until, created_at, last_login_at

ADDRESS

PK: address_id (int)

FK: user_id → USER

Attributes: line1, line2, city, postcode, country_code, is_primary, created_at

2. Order Domain
ORDER

PK: order_id (bigint)

FK: user_id → USER (nullable), shipping_address_id, billing_address_id → ADDRESS

Guest fallback: guest_email

Attributes: order_status, subtotal_amount, tax_amount, shipping_amount, discount_amount (if used), total_amount, order_date, updated_at

ORDER_LINE

PK: order_line_id (int)

FK: order_id → ORDER, product_id → PRODUCT

Attributes: quantity, unit_price (snapshot)

PAYMENT_PROVIDER

PK: provider_id (int)

Attributes: name, api_endpoint, support_email

PAYMENT

PK: payment_id (bigint)

FK: order_id → ORDER, provider_id → PAYMENT_PROVIDER

Attributes: method, amount, status, processed_at, provider_ref

ORDER_CONFIRMATION

PK: confirmation_id (int)

FK: order_id → ORDER

Attributes: pdf_url, email_sent, issued_at

3. Product Domain
LABEL

PK: label_id (int)

Attributes: name, bio, website, country, founded_year

RELEASE

PK: release_id (int)

FK: label_id → LABEL

Attributes: catalog_number, release_title, release_year, released_date

ARTIST

PK: artist_id (int)

Attributes: name, bio, country, website

RELEASE_ARTIST

PK (composite): (release_id, artist_id)

FKs: to RELEASE and ARTIST

TRACK

PK: track_id (int)

FKs: release_id → RELEASE, artist_id → ARTIST

Attributes: track_number, title, duration_secs, preview_url, side, plate_number

CATEGORY

PK: category_id (int)

Self-FK: parent_id → CATEGORY

Attributes: name, type (genre/era/style/etc.), slug, description, sort_order, visible

PRODUCT_CATEGORY

PK (composite): (product_id, category_id)

FKs: → PRODUCT, → CATEGORY

TAG

PK: tag_id (int)

Attributes: name

PRODUCT_TAG

PK (composite): (product_id, tag_id)

FKs: → PRODUCT, → TAG

PRODUCT

PK: product_id (int)

FKs: release_id → RELEASE

Attributes: barcode, size_inches, total_weight, total_dimensions, price, stock_quantity, stock_updated_at, updated_at

PRODUCT_IMAGE

PK: image_id (int)

FK: product_id → PRODUCT

Attributes: url, alt_text, sort_order, is_thumbnail

4. Cross-Domain & Analytics
CART_ITEM

PK: cart_item_id (int)

FKs: user_id → USER

Optional FK (guest/anon): session_id → SESSION

Attributes: product_id, quantity, date_added

WISHLIST

PK: wishlist_item_id (int)

FKs: user_id → USER, product_id → PRODUCT

Attributes: added_at

PRODUCT_VIEW

PK: view_id (bigint)

FKs: user_id → USER (nullable), product_id → PRODUCT, session_id → SESSION

Attributes: viewed_at

Usage notes

CartItem is your working cart; on checkout you copy its rows into ORDER_LINE (with unit_price) then delete them.

Guest flows: use guest_email on ORDER or session_id on CART_ITEM.

Snapshots: addresses and prices are stored in ORDERS & ORDER_LINE so you have an immutable record.

Keep this as a single reference document; you can paste it into a new chat to restore your schema context instantly.