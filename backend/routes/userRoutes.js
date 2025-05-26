const express = require('express');
const router = express.Router();
const { User, Address, Wishlist, CartItem, ProductView } = require('../models');

// GET all users (admin/test only)
router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// GET user by ID
router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    include: [Address, Wishlist, CartItem, ProductView]
  });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// POST create guest or registered user
router.post('/', async (req, res) => {
  const { email, is_guest, first_name, last_name } = req.body;
  const user = await User.create({ email, is_guest, first_name, last_name });
  res.status(201).json(user);
});

module.exports = router;

router.get('/test', async (req, res) => {
  const users = await User.findAll({ include: ['addresses'] });
  res.json(users);
});