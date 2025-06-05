📦 Model: CartItem
Fields:
 - cart_item_id: INTEGER
 - session_id: STRING
 - user_id: INTEGER
 - product_id: INTEGER
 - quantity: INTEGER
 - date_added: DATE
Associations:
 - BelongsTo → Product
 - BelongsTo → User
 - BelongsTo → Session
---

📦 Model: Order
Fields:
 - order_id: BIGINT
 - user_id: INTEGER
 - guest_email: STRING
 - shipping_address_id: INTEGER
 - billing_address_id: INTEGER
 - order_status: ENUM
 - subtotal_amount: DECIMAL
 - tax_amount: DECIMAL
 - shipping_cost: DECIMAL
 - total_amount: DECIMAL
 - order_date: DATE
Associations:
 - BelongsTo → User
 - BelongsTo → Address
 - BelongsTo → Address
 - HasMany → OrderLine
 - HasOne → Payment
 - HasOne → OrderConfirmation
---

📦 Model: OrderConfirmation
Fields:
 - confirmation_id: INTEGER
 - order_id: BIGINT
 - pdf_url: STRING
 - email_sent: BOOLEAN
 - issued_at: DATE
Associations:
 - BelongsTo → Order
---

📦 Model: OrderLine
Fields:
 - order_line_id: INTEGER
 - order_id: BIGINT
 - product_id: INTEGER
 - quantity: INTEGER
 - unit_price: DECIMAL
Associations:
 - BelongsTo → Order
 - BelongsTo → Product
---

📦 Model: Payment
Fields:
 - payment_id: BIGINT
 - order_id: BIGINT
 - provider_id: INTEGER
 - method: ENUM
 - amount: DECIMAL
 - status: ENUM
 - processed_at: DATE
 - provider_ref: STRING
Associations:
 - BelongsTo → Order
 - BelongsTo → PaymentProvider
---

📦 Model: PaymentProvider
Fields:
 - provider_id: INTEGER
 - name: STRING
 - api_endpoint: STRING
 - support_email: STRING
Associations:
 - HasMany → Payment
---

📦 Model: Artist
Fields:
 - artist_id: INTEGER
 - artist_name: STRING
 - bio: TEXT
 - country: STRING
 - website: STRING
Associations:
 - HasMany → Release
---

📦 Model: Genre
Fields:
 - genre_id: INTEGER
 - name: STRING
Associations:
 - HasMany → Release
---

📦 Model: Label
Fields:
 - label_id: INTEGER
 - name: STRING
 - bio: TEXT
 - website: STRING
 - country: STRING
Associations:
 - HasMany → Release
---

📦 Model: Product
Fields:
 - product_id: INTEGER
 - release_id: INTEGER
 - size_inches: ENUM
 - total_weight: DECIMAL
 - total_dimensions: STRING
 - price: DECIMAL
 - stock_qty: INTEGER
 - updated_at: DATE
Associations:
 - BelongsTo → Release
 - HasMany → ProductImage
 - HasMany → ProductView
 - BelongsToMany → Tag
---

📦 Model: ProductImage
Fields:
 - image_id: INTEGER
 - product_id: INTEGER
 - url: STRING
 - alt_text: STRING
Associations:
 - BelongsTo → Product
---

📦 Model: ProductTag
Fields:
 - product_id: INTEGER
 - tag_id: INTEGER
---

📦 Model: Release
Fields:
 - release_id: INTEGER
 - label_id: INTEGER
 - genre_id: INTEGER
 - catalog_number: STRING
 - release_title: STRING
 - released_date: DATE
 - artist_id: INTEGER
Associations:
 - BelongsTo → Label
 - BelongsTo → Genre
 - HasMany → Track
 - HasMany → Product
 - BelongsTo → Artist
---

📦 Model: Tag
Fields:
 - tag_id: INTEGER
 - name: STRING
Associations:
 - BelongsToMany → Product
---

📦 Model: Track
Fields:
 - track_id: INTEGER
 - release_id: INTEGER
 - artist_id: INTEGER
 - track_number: SMALLINT
 - title: STRING
 - duration_secs: INTEGER
 - preview_url: STRING
 - side: STRING
Associations:
 - BelongsTo → Release
 - BelongsTo → Artist
---

📦 Model: Address
Fields:
 - address_id: INTEGER
 - user_id: INTEGER
 - line1: STRING
 - line2: STRING
 - postcode: STRING
 - city: STRING
 - country_code: STRING
 - is_primary: BOOLEAN
 - created_at: DATE
Associations:
 - BelongsTo → User
 - HasMany → Order
 - HasMany → Order
---

📦 Model: ProductView
Fields:
 - view_id: INTEGER
 - product_id: INTEGER
 - user_id: INTEGER
 - session_id: STRING
 - viewed_at: DATE
Associations:
 - BelongsTo → Product
 - BelongsTo → User
 - BelongsTo → Session
---

📦 Model: Session
Fields:
 - session_id: STRING
 - user_id: INTEGER
 - expires_at: DATE
 - user_agent: STRING
 - ip_address: STRING
 - is_valid: BOOLEAN
Associations:
 - BelongsTo → User
 - HasMany → CartItem
 - HasMany → ProductView
---

📦 Model: User
Fields:
 - user_id: INTEGER
 - email: STRING
 - password_hash: STRING
 - is_guest: BOOLEAN
 - user_role: ENUM
 - first_name: STRING
 - last_name: STRING
 - profile_url: STRING
 - phone_number: STRING
 - failed_login_attempts: INTEGER
 - locked_until: DATE
 - created_at: DATE
 - last_login_at: DATE
Associations:
 - HasMany → Address
 - HasMany → Wishlist
 - HasMany → ProductView
 - HasMany → Session
 - HasMany → Order
---

📦 Model: Wishlist
Fields:
 - wishlist_item_id: INTEGER
 - user_id: INTEGER
 - product_id: INTEGER
 - added_at: DATE
 - updated_at: DATE
Associations:
 - BelongsTo → User
 - BelongsTo → Product
---
