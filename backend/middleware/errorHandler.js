// Centralized error handling middleware

module.exports = (err, req, res, next) => {
  console.error('❌ Error:', err.message);

  // Sequelize validation error
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: 'Validation error', details: err.errors });
  }

  // Sequelize foreign key or constraint error
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({ error: 'Invalid reference or foreign key' });
  }

  // Sequelize unique constraint error
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({ error: 'Duplicate entry', details: err.errors });
  }

  // Not found manually thrown
  if (err.status === 404) {
    return res.status(404).json({ error: err.message || 'Not Found' });
  }

  // Generic server error
  return res.status(err.status || 500).json({
    error: 'Internal server error',
    message: err.message || 'An unexpected error occurred'
  });
};
