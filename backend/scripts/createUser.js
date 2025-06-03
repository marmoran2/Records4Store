const { User } = require('../models');

(async () => {
  const user = await User.create({
    user_id: 3,           // Optional — let DB auto-increment if needed
    email: 'test@example.com',
    password: 'hashedpassword', // or whatever is valid
    username: 'testuser'
  });

  console.log('✅ Created user:', user.toJSON());
})();