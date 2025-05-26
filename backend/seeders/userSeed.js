const { User, Address } = require('../models');

module.exports = async () => {
  const user = await User.create({
    email: 'demo@example.com',
    is_guest: false,
    first_name: 'Maurice',
    last_name: 'Moran'
  });
  
    console.log('User created:', user.user_id);

  await Address.create({
    user_id: user.user_id,
    line1: '123 Demo St',
    city: 'Dublin',
    postcode: 'D01',
    country_code: 'IE',
    is_primary: true
  });
    console.log('Address created for user:', user.user_id);
};
