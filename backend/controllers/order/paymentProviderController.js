// backend/controllers/paymentProviderController.js
const { PaymentProvider, Payment } = require('../../models');

// Get all payment providers
const getAllProviders = async (req, res) => {
  try {
    const providers = await PaymentProvider.findAll({
      include: [{ model: Payment, as: 'payments' }]
    });
    res.json(providers);
  } catch (error) {
    console.error('Error fetching payment providers:', error);
    res.status(500).json({ message: 'Server error retrieving providers' });
  }
};

// Get a single provider by ID
const getProviderById = async (req, res) => {
  const { providerId } = req.params;
  try {
    const provider = await PaymentProvider.findByPk(providerId, {
      include: [{ model: Payment, as: 'payments' }]
    });
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }
    res.json(provider);
  } catch (error) {
    console.error(`Error fetching provider ${providerId}:`, error);
    res.status(500).json({ message: 'Server error retrieving provider' });
  }
};

// Create a new provider
const createProvider = async (req, res) => {
  const { name, api_endpoint, support_email } = req.body;
  try {
    const newProvider = await PaymentProvider.create({ name, api_endpoint, support_email });
    res.status(201).json(newProvider);
  } catch (error) {
    console.error('Error creating provider:', error);
    res.status(500).json({ message: 'Server error creating provider' });
  }
};

module.exports = {
  getAllProviders,
  getProviderById,
  createProvider
};
