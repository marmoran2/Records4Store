// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/product/productController');
const artistController = require('../controllers/product/artistController');
const tagController = require('../controllers/product/tagController');
const genreController = require('../controllers/product/genreController');
const releaseController = require('../controllers/product/releaseController');
const labelController = require('../controllers/product/labelController');
const productImageController = require('../controllers/product/productImageController');
const productViewController = require('../controllers/product/productViewController');

// --------- PRODUCT Routes ------------

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// --------- ProductImage Routes ------------

router.get('/images', productImageController.getAllImages);
router.get('/images/:id', productImageController.getImageById);

// --------- ARTIST Routes ------------

router.get('/artists', artistController.getAllArtists);
router.get('/artists/:id', artistController.getArtistById);

// --------- RELEASE Routes ------------
router.get('/releases', releaseController.getAllReleases);
router.get('/releases/:id', releaseController.getReleaseById);

// --------- LABEL Routes ------------
router.get('/labels', labelController.getAllLabels);
router.get('/labels/:id', labelController.getLabelById);

// --------- TAG Routes ------------

router.get('/tags', tagController.getAllTags);
router.get('/tags/:id', tagController.getTagById);

// --------- GENRE Routes ------------

router.get('/genres', genreController.getAllGenres);
router.get('/genres/:id', genreController.getGenreById);

// ─── Product Views ────────────────────────────────

// Get all product views
router.get('/views', productViewController.getAllViews);

// Get all views for a specific product
router.get('/:productId/views', productViewController.getViewsByProduct);

// Log a view for a product
router.post('/:productId/views', productViewController.logProductView);

module.exports = router;
