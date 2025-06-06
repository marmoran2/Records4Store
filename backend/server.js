const express = require('express');
const app = express();
require('dotenv').config();
const { sequelize } = require('./models');
const cookieParser = require('cookie-parser');
const setUserContext = require('./middleware/setUserContext');

app.use(express.urlencoded({ extended: true }));
app.use(cors());

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(setUserContext);

// Route Imports
  try {
    const productRoutes = require('./routes/productRoutes');
    app.use('/api/products', productRoutes);
  } catch (err) {
    console.error('❌ Failed to load productRoutes:', err.message);
  }
      try {
        const orderRoutes = require('./routes/orderRoutes');
        app.use('/api/orders', orderRoutes);
      } catch (err) {
        console.error('❌ Failed to load orderRoutes:', err.message);
      }
          try {
                const userRoutes = require('./routes/userRoutes');
                app.use('/api/users', userRoutes);
              } catch (err) {
                console.error('❌ Failed to load userRoutes:', err.message);
              }

app.get('/', (req, res) => res.send('Records4Store API is live'));
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

const notFound = require('./middleware/notFound');
app.use(notFound);

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

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

