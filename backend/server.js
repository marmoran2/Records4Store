const express = require('express');
const app = express();
require('dotenv').config();

const { sequelize } = require('./models');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use(express.json());

// Route mounting
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => res.send('API is live'));

app.listen(process.env.PORT || 3000, async () => {
  console.log(`Server running on port ${process.env.PORT}`);
  try {
    await sequelize.authenticate();
    console.log('DB connected');
  } catch (err) {
    console.error('DB connection failed:', err);
  }
});