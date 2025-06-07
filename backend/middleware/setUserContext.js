const { Session, User } = require('../models');
const { Op } = require('sequelize');

module.exports = async (req, res, next) => {
  res.locals.user = null;

  const sessionId = req.cookies?.session_id;

  if (!sessionId) {
    console.debug('[setUserContext] ❌ No session_id cookie');
    return next();
  }

  try {
    const session = await Session.findOne({
      where: {
        session_id: sessionId,
        is_valid: true,
        expires_at: { [Op.gt]: new Date() }
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['user_id', 'email', 'is_guest', 'user_role']
        }
      ]
    });

    if (!session) {
      console.debug(`[setUserContext] ❌ No matching session for ID ${sessionId}`);
      return next();
    }

    if (!session.user) {
      console.debug(`[setUserContext] ❌ Session found, but no associated user. Check alias.`);
      return next();
    }

    res.locals.user = {
      id: session.user.user_id,
      email: session.user.email,
      isGuest: session.user.is_guest,
      role: session.user.user_role || 'Customer'
    };

    console.debug('[setUserContext] ✅ User context set:', res.locals.user);

  } catch (err) {
    console.error('❌ setUserContext error:', err.message);
  }

  return next();
};