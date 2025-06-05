const express = require('express');
const app = express();
require('dotenv').config();

const { sequelize } = require('./models');

// Middleware
app.use(express.json());

// Route Imports
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const orderConfirmationRoutes = require('./routes/orderConfirmationRoutes');
const orderLineRoutes = require('./routes/orderLineRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// Route Mounting
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/confirmations', orderConfirmationRoutes);
app.use('/api/order-lines', orderLineRoutes);
app.use('/api/payments', paymentRoutes);

// Root & 404
app.get('/', (req, res) => res.send('Records4Store API is live'));
app.use('*', (req, res) => res.status(404).json({ error: 'Route not found' }));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('✅ DB connected');
  } catch (err) {
    console.error('❌ DB connection failed:', err);
  }
});