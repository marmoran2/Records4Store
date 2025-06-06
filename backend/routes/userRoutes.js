const express = require('express');
const router = express.Router();
const userController = require('../controllers/user/userController');
const addressController = require('../controllers/user/addressController');
const sessionController = require('../controllers/user/sessionController');
const wishlistController = require('../controllers/user/wishlistController');
const authController = require('../controllers/user/authController');

// --------- USER ------------
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);

// ─── AUTH ─────────────────────────────

router.post('/login', authController.login);
router.post('/logout', authController.logout);

// ─── ADDRESS ─────────────────────────────
router.get('/:userId/addresses', addressController.getAddressesByUser);
router.post('/:userId/addresses', addressController.createAddress);
router.get('/addresses/:id', addressController.getAddressById);
router.delete('/addresses/:id', addressController.deleteAddress);

// ─── SESSION ─────────────────────────────
router.get('/:userId/sessions', sessionController.getSessionsByUser);
router.post('/:userId/sessions', sessionController.createSession);
router.get('/sessions/:id', sessionController.getSessionById);
router.patch('/sessions/:id', sessionController.invalidateSession);

// ─── WISHLIST ──────────────────────────────────────
router.get('/:userId/wishlist', wishlistController.getWishlistByUser);
router.post('/:userId/wishlist', wishlistController.addToWishlist);
router.delete('/:userId/wishlist/:productId', wishlistController.removeFromWishlist);

module.exports = router;