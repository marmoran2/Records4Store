const express = require('express');
const router = express.Router();

const userController = require('../controllers/user/userController');
const addressController = require('../controllers/user/addressController');
const sessionController = require('../controllers/user/sessionController');
const wishlistController = require('../controllers/user/wishlistController');
const authController = require('../controllers/user/authController');

// Middleware
const setUserContext = require('../middleware/setUserContext');
const requireLogin = require('../middleware/requireLogin');
const requireGuestOrUserSession = require('../middleware/requireGuestOrUserSession');

router.get('/session', setUserContext, (req, res) => {
  const user = res.locals.user;

  if (user) {
    res.json(user);
  } else {
    res.status(401).json({ error: 'Not logged in' });
  }
});

// ─── USER CONTEXT ─────────────────────────────────────
// Must be set on every request needing session/user context
router.use(setUserContext);

// ─── USER ─────────────────────────────────────────────
router.get('/', requireLogin, userController.getAllUsers);
router.get('/:id', requireLogin, userController.getUserById);
router.post('/', userController.createUser); // registration

// ─── AUTH ─────────────────────────────────────────────
router.post('/login', authController.login);     // Session created here
router.post('/logout', authController.logout);   // Session invalidated

// ─── SESSION ──────────────────────────────────────────
router.get('/:userId/sessions', requireLogin, sessionController.getSessionsByUser);
router.post('/:userId/sessions', requireLogin, sessionController.createSession);
router.get('/sessions/:id', requireLogin, sessionController.getSessionById);
router.patch('/sessions/:id', requireLogin, sessionController.invalidateSession);


// ─── ADDRESS ──────────────────────────────────────────
router.get('/:userId/addresses', requireLogin, addressController.getAddressesByUser);
router.post('/:userId/addresses', requireLogin, addressController.createAddress);
router.get('/addresses/:id', requireLogin, addressController.getAddressById);
router.delete('/addresses/:id', requireLogin, addressController.deleteAddress);

// ─── WISHLIST ─────────────────────────────────────────
router.get('/:userId/wishlist', requireGuestOrUserSession, wishlistController.getWishlistByUser);
router.post('/:userId/wishlist', requireGuestOrUserSession, wishlistController.addToWishlist);
router.delete('/:userId/wishlist/:productId', requireGuestOrUserSession, wishlistController.removeFromWishlist);

module.exports = router;
