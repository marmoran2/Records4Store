// backend/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order/orderController');
const confirmationController = require('../controllers/order/orderConfirmationController');
const orderLineController = require('../controllers/order/orderLineController');
const paymentProviderController = require('../controllers/order/paymentProviderController');
const paymentController = require('../controllers/order/paymentController');
const cartItemController = require('../controllers/order/cartItemController');


// ---- CART ITEM ROUTES ----
router.get('/all', cartItemController.getAllCartItems);
router.get('/', cartItemController.getCartItems);

router.post('/', cartItemController.addCartItem);

router.delete('/:cartItemId', cartItemController.deleteCartItem);

// ---- ORDER ROUTES ----

router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);

router.post('/', orderController.createOrder);

// -- ORDER LINE ROUTES ----

router.get('/', orderLineController.getAllOrderLines);
router.get('/order/:orderId', orderLineController.getLinesByOrderId);

router.post('/', orderLineController.createOrderLine);

// ---- ORDER CONFIRMATION ROUTES ----

router.get('/', confirmationController.getAllConfirmations);
router.get('/order/:orderId', confirmationController.getConfirmationByOrderId);

router.post('/', confirmationController.createConfirmation);

// ---- PAYMENT ROUTES ----

router.get('/', paymentController.getAllPayments);
router.get('/order/:orderId', paymentController.getPaymentByOrderId);

router.post('/', paymentController.createPayment);

// ---- PAYMENT PROVIDER ROUTES ----

router.get('/', paymentProviderController.getAllProviders);
router.get('/:providerId', paymentProviderController.getProviderById);

router.post('/', paymentProviderController.createProvider);

module.exports = router;