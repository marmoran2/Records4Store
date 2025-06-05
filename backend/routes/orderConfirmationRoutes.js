const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderConfirmationController');

router.get('/', controller.getAllConfirmations);
router.get('/:order_id', controller.getConfirmationByOrderId);

module.exports = router;
