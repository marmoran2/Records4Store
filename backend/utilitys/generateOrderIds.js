function generateOrderId() {
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0].replace(/-/g, '');
  const rand = Math.floor(100 + Math.random() * 900); // 100–999
  return `ORD-${dateStr}-${rand}`;
}

module.exports = generateOrderId;