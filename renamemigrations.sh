#!/bin/bash

declare -a files=(
  "create-user.js"
  "create-genre.js"
  "create-label.js"
  "create-artist.js"
  "create-tag.js"
  "create-payment-provider.js"
  "create-release.js"
  "create-product.js"
  "create-product-image.js"
  "create-product-tag.js"
  "create-track.js"
  "create-session.js"
  "create-address.js"
  "create-wishlist.js"
  "create-product-view.js"
  "create-cartitem.js"
  "create-order.js"
  "create-order-line.js"
  "create-payment.js"
  "create-order-confirmation.js"
)

# Set the base directory
cd backend/migrations || exit 1

# Start counter
i=1

# Loop and rename
for filename in "${files[@]}"; do
  padded=$(printf "%02d" $i)
  existing=$(ls *"$filename" 2>/dev/null)

  if [ -n "$existing" ]; then
    mv "$existing" "${padded}-${filename}"
    echo "Renamed $existing → ${padded}-${filename}"
    ((i++))
  else
    echo "❌ File not found: $filename"
  fi
done