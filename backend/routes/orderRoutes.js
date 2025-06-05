// routes/orderRoutes.js

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// GET all orders
router.get('/', orderController.getAllOrders);

// GET specific order by ID (moved validation to controller)
router.get('/:id', orderController.getOrderById);

// POST a new order
router.post('/', orderController.createOrder);

module.exports = router;