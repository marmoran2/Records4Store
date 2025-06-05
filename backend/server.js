const express = require('express');
const app = express();
require('dotenv').config();

const { sequelize } = require('./models');

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use(express.json());
;
app.use('/api/orders', orderRoutes);
app.get('/', (req, res) => res.send('API is live'));
app.use('/api/products', productRoutes);

app.listen(process.env.PORT || 3000, async () => {
  console.log(`Server running on port ${process.env.PORT}`);
  try {
    await sequelize.authenticate();
    console.log('DB connected');
  } catch (err) {
    console.error('DB connection failed:', err);
  }
});