function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString('en-IE', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
}

function formatDateTime(date) {
  const d = new Date(date);
  return d.toLocaleString('en-IE', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

module.exports = { formatDate, formatDateTime };