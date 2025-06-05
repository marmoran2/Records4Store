const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderLineController');

router.get('/:order_id', controller.getLinesByOrderId);

module.exports = router;
