// controllers/user/addressController.js
const { Address, User } = require('../../models');

// GET /api/users/:userId/addresses → list all addresses for a user
const getAddressesByUser = async (req, res) => {
  try {
    const addresses = await Address.findAll({
      where: { user_id: req.params.userId },
      order: [['is_primary', 'DESC'], ['created_at', 'DESC']]
    });
    res.status(200).json(addresses);
  } catch (error) {
    console.error(`Error fetching addresses for user ${req.params.userId}:`, error);
    res.status(500).json({ message: 'Failed to retrieve addresses' });
  }
};

// GET /api/addresses/:id → fetch a single address by ID
const getAddressById = async (req, res) => {
  try {
    const address = await Address.findByPk(req.params.id, {
      include: {
        model: User,
        as: 'user',
        attributes: ['user_id', 'email']
      }
    });

    if (!address) return res.status(404).json({ message: 'Address not found' });

    res.status(200).json(address);
  } catch (error) {
    console.error(`Error fetching address ${req.params.id}:`, error);
    res.status(500).json({ message: 'Failed to retrieve address' });
  }
};

// POST /api/users/:userId/addresses → create new address
const createAddress = async (req, res) => {
  const { line1, line2, postcode, city, country_code, is_primary = false } = req.body;

  try {
    const newAddress = await Address.create({
      user_id: req.params.userId,
      line1,
      line2,
      postcode,
      city,
      country_code,
      is_primary,
      created_at: new Date()
    });

    res.status(201).json(newAddress);
  } catch (error) {
    console.error(`Error creating address for user ${req.params.userId}:`, error);
    res.status(500).json({ message: 'Failed to create address' });
  }
};

// DELETE /api/addresses/:id → remove address by ID
const deleteAddress = async (req, res) => {
  try {
    const deleted = await Address.destroy({ where: { address_id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Address not found' });

    res.status(200).json({ message: 'Address deleted' });
  } catch (error) {
    console.error(`Error deleting address ${req.params.id}:`, error);
    res.status(500).json({ message: 'Failed to delete address' });
  }
};

module.exports = {
  getAddressesByUser,
  getAddressById,
  createAddress,
  deleteAddress
};
