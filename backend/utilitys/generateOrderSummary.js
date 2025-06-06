function generateOrderSummaryHTML(order) {
  const customerName = `${order.user?.first_name || 'Customer'} ${order.user?.last_name || ''}`;
  const shipping = order.shipping_address;
  const billing = order.billing_address;

  const orderLines = order.order_lines || [];

  const itemsHTML = orderLines.map(line => {
    const product = line.product;
    return `
      <tr>
        <td>${product?.title || 'Unknown'}</td>
        <td>${line.quantity}</td>
        <td>€${line.unit_price.toFixed(2)}</td>
        <td>€${(line.unit_price * line.quantity).toFixed(2)}</td>
      </tr>
    `;
  }).join('');

  const totalAmount = orderLines.reduce((sum, line) => sum + (line.unit_price * line.quantity), 0);

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px;">
      <h2>Thanks for your order, ${customerName}!</h2>
      <p>Your order <strong>#${order.order_id}</strong> has been successfully placed on ${new Date(order.placed_at).toLocaleDateString()}.</p>

      <h3>Order Summary</h3>
      <table border="1" cellpadding="8" cellspacing="0" style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHTML}
        </tbody>
      </table>

      <h3>Total: €${totalAmount.toFixed(2)}</h3>

      <h4>Shipping Address</h4>
      <p>
        ${shipping?.line1 || ''}<br>
        ${shipping?.line2 || ''}<br>
        ${shipping?.postcode || ''} ${shipping?.city || ''}<br>
        ${shipping?.country_code || ''}
      </p>

      <h4>Billing Address</h4>
      <p>
        ${billing?.line1 || ''}<br>
        ${billing?.line2 || ''}<br>
        ${billing?.postcode || ''} ${billing?.city || ''}<br>
        ${billing?.country_code || ''}
      </p>

      <p>If you have any questions, feel free to contact us at support@records4store.com.</p>
    </div>
  `;
}

module.exports = { generateOrderSummaryHTML };