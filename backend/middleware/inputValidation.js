// middleware/validateInput.js

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = {};

  if (!email || !email.includes('@')) errors.email = 'Valid email required.';
  if (!password || password.length < 6) errors.password = 'Password too short.';

  returnObjectOrNext(errors, res, next);
};

const validateRegister = (req, res, next) => {
  const { email, password, confirmPassword, first_name, last_name } = req.body;
  const errors = {};

  if (!email || !email.includes('@')) errors.email = 'Valid email required.';
  if (!password || password.length < 8) errors.password = 'Password must be 8+ characters.';
  if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match.';
  if (!first_name) errors.first_name = 'First name is required.';
  if (!last_name) errors.last_name = 'Last name is required.';

  returnObjectOrNext(errors, res, next);
};

const validateContactForm = (req, res, next) => {
  const { fullName, email, subject, message } = req.body;
  const errors = {};

  if (!fullName || fullName.length < 2) errors.fullName = 'Full name is required.';
  if (!email || !email.includes('@')) errors.email = 'Valid email required.';
  if (!subject) errors.subject = 'Subject is required.';
  if (!message || message.length < 10) errors.message = 'Message must be at least 10 characters.';

  returnObjectOrNext(errors, res, next);
};

const validateAddress = (req, res, next) => {
  const { line1, postcode, city, country_code } = req.body;
  const errors = {};

  if (!line1) errors.line1 = 'Address line 1 is required.';
  if (!postcode) errors.postcode = 'Postcode is required.';
  if (!city) errors.city = 'City is required.';
  if (!country_code || country_code.length !== 2) errors.country_code = 'Country code must be 2 letters.';

  returnObjectOrNext(errors, res, next);
};

const validatePasswordReset = (req, res, next) => {
  const { password, confirmPassword } = req.body;
  const errors = {};

  if (!password || password.length < 8) errors.password = 'Password must be at least 8 characters.';
  if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match.';

  returnObjectOrNext(errors, res, next);
};

// Shared helper
function returnObjectOrNext(errors, res, next) {
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }
  next();
}

const validateCheckout = (req, res, next) => {
  const { shipping_address_id, billing_address_id, payment_method } = req.body;
  const errors = {};

  if (!shipping_address_id) errors.shipping = 'Shipping address required.';
  if (!billing_address_id) errors.billing = 'Billing address required.';
  if (!['card', 'paypal', 'bank'].includes(payment_method))
    errors.payment_method = 'Invalid payment method.';

  returnObjectOrNext(errors, res, next);
};

const validateOrderLine = (req, res, next) => {
  const { product_id, quantity, unit_price } = req.body;
  const errors = {};

  if (!product_id || typeof product_id !== 'number') errors.product_id = 'Product ID is required.';
  if (!quantity || quantity <= 0) errors.quantity = 'Quantity must be greater than 0.';
  if (!unit_price || unit_price <= 0) errors.unit_price = 'Valid price required.';

  returnObjectOrNext(errors, res, next);
};

const validateProduct = (req, res, next) => {
  const { release_id, price, stock_qty } = req.body;
  const errors = {};

  if (!release_id) errors.release_id = 'Release ID is required.';
  if (!price || price <= 0) errors.price = 'Price must be greater than 0.';
  if (stock_qty == null || stock_qty < 0) errors.stock_qty = 'Stock quantity is required.';

  returnObjectOrNext(errors, res, next);
};

module.exports = {
  validateLogin,
  validateRegister,

  validateContactForm,

  validateAddress,
  validatePasswordReset,

  validateCheckout,
  validateOrderLine,

  validateProduct
};
