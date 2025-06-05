const express = require('express');
const router = express.Router();
const controller = require('../controllers/paymentController');

router.get('/', controller.getAllPayments);
router.get('/:order_id', controller.getPaymentByOrderId);

module.exports = router;