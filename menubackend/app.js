const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

// Routes
const menusRouter = require('./routes/menus');
const menuItemsRouter = require('./routes/menuItems');
const userRouter = require('./routes/user');

const app = express();

// MongoDB connection (online via MongoDB Atlas or fallback to local)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/restaurant-menu';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch((error) => {
  console.error('❌ MongoDB connection error:', error);
});

// Middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/menus', menusRouter);
app.use('/api/menu-items', menuItemsRouter);
app.use('/api/user', userRouter);

// Catch 404
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
