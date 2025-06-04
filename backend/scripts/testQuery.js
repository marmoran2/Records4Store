const db = require('../models');

(async () => {
  console.log(Object.keys(db));

  const users = await db.User.findAll({ include: ['wishlist'] });
  console.log(JSON.stringify(users, null, 2));
})();