// controllers/user/userController.js
const { User, Address, Wishlist, ProductView, Session, Order } = require('../../models');
// GET /api/users → list all users (for admin/debug use)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: [
        'user_id', 'email', 'first_name', 'last_name',
        'phone_number', 'user_role', 'is_guest', 'created_at'
      ]
    });
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to retrieve users' });
  }
};

// GET /api/users/:id → full user profile + relations
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: {
        exclude: ['password_hash', 'failed_login_attempts', 'locked_until']
      },
      include: [
        { model: Address, as: 'addresses' },
        { model: Wishlist, as: 'wishlist' },
        { model: ProductView, as: 'views' },
        { model: Session, as: 'sessions' },
        { model: Order, as: 'orders' }
      ]
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    console.error(`Error fetching user ${req.params.id}:`, error);
    res.status(500).json({ message: 'Failed to retrieve user' });
  }
};
// POST /api/users → create guest or registered user (basic stub)
const createUser = async (req, res) => {
  const {
    email, password_hash, is_guest = true, first_name, last_name,
    phone_number, user_role = 'Customer'
  } = req.body;

  try {
    const user = await User.create({
      email,
      password_hash,
      is_guest,
      user_role,
      first_name,
      last_name,
      phone_number,
      created_at: new Date()
    });

    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Failed to create user' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser
};
