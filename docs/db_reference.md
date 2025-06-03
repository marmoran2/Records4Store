Reference.md

Database Schema Overview

This schema supports a full-featured e-commerce system for selling vinyl records, designed with clear relational boundaries:

User domain: session tracking, user accounts, guest support

Order domain: carts, payments, shipping/billing, order lines

Product domain: metadata, tagging, viewing, images

Catalog domain: releases, artists, labels, genres, tracks

All entities follow 3NF or better. Composite and foreign key constraints are correctly implemented for referential integrity.

User Domain

USER

PK: user_id

Nullable fields for guests

user_role: ENUM ('customer', 'admin')

Tracks login and lockout info

SESSION

PK: session_id

FK: user_id → USER

Tracks session metadata and validity

ADDRESS

PK: address_id

FK: user_id → USER

is_primary boolean flag per user

CARTITEM

PK: cart_item_id

FK: user_id → USER, session_id → SESSION, product_id → PRODUCT

Supports guest and user cart logic

WISHLIST

PK: wishlist_item_id

FK: user_id → USER, product_id → PRODUCT

UNIQUE(user_id, product_id) recommended to avoid duplicates

Order Domain

ORDER

PK: order_id

FK: user_id, shipping_address_id, billing_address_id

guest_email allows guest checkouts

ORDER_LINE

PK: order_line_id

FK: order_id, product_id

Represents 1:M line items per order

PAYMENT_PROVIDER

PK: provider_id

Stores external gateway metadata

PAYMENT

PK: payment_id

FK: order_id, provider_id

status: ENUM('pending', 'success', 'failed', 'error')

ORDER_CONFIRMATION

PK: confirmation_id

order_id is UNIQUE (1:1 mapping)

PDF invoice handling

Product Domain

PRODUCT

PK: product_id

FK: release_id → RELEASE

Physical properties (size_inches, dimensions, weight, stock_qty)

PRODUCT_IMAGE

PK: image_id

FK: product_id

Stores image URLs and alt text

PRODUCT_VIEW

PK: view_id

FK: product_id, user_id, session_id

Tracks viewed items for analytics

PRODUCT_TAG (Junction Table)

Composite PK: (product_id, tag_id)

FK: product_id → PRODUCT, tag_id → TAG

Many-to-many relationship

TAG

PK: tag_id

name is UNIQUE NOT NULL

Catalog Domain

RELEASE

PK: release_id

FK: label_id, genre_id

Links to tracks, product

GENRE

PK: genre_id

name is unique per genre

LABEL

PK: label_id

Stores label metadata

ARTIST

PK: artist_id

Artist profile data

TRACK

PK: track_id

FK: artist_id, release_id

side, track_number, duration_secs used for display

Notes & Recommendations

Composite keys must be defined with PRIMARY KEY (col1, col2)

KEY or INDEX alone does not enforce uniqueness

Every FK should match data types with the PK it references

Ensure ENUM values are strictly controlled (e.g., payment and user roles)

Enforce consistent use of NOT NULL and DEFAULT values for reliability

This schema supports both relational integrity and extensibility for product tagging, viewing, guest logic, and cart/session handling.