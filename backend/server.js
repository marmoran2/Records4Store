const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const { sequelize } = require('./models');
const setUserContext = require('./middleware/setUserContext');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

// ─── App Init ────────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ──────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api', setUserContext);

app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}));

// ─── Static Frontend Files ───────────────────────────
const frontendPath = path.join(__dirname, '../frontend'); // ⬅️ Entire frontend folder

// Serve static files from root of frontend (js, assets, etc.)
app.use(express.static(frontendPath));

// Serve additional specific folders
app.use('/js', express.static(path.join(frontendPath, 'js')));
app.use('/assets', express.static(path.join(frontendPath, 'assets')));
app.use('/scss', express.static(path.join(frontendPath, 'scss')));
app.use('/images/releases', express.static(path.join(__dirname, 'releases')));

// Index page (when navigating to http://localhost:3000/)
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'html/index.html'));
});

// ─── Route Mounts ──────────────────────────────────────
try {
  app.use('/api/products', require('./routes/productRoutes'));
} catch (err) {
  console.error('Failed to load productRoutes:', err.message);
}


try {
  app.use('/api/users', require('./routes/userRoutes'));
} catch (err) {
  console.error('Failed to load userRoutes:', err.message);
}

// ─── Error Handlers ──────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ─── Start Server & Test DB ──────────────────────────
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('DB connected');
  } catch (err) {
    console.error('DB connection failed:', err);
  }
});
