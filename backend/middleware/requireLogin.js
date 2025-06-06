const { Session, User } = require('../models');

module.exports = async function requireLogin(req, res, next) {
  try {
    const sessionId = req.cookies.session_id;
    if (!sessionId) {
      return res.status(401).json({ error: 'Authentication required. No session ID.' });
    }

    const session = await Session.findOne({
      where: {
        session_id: sessionId,
        is_valid: true
      },
      include: {
        model: User,
        as: 'user'
      }
    });

    if (!session) {
      return res.status(401).json({ error: 'Invalid or expired session.' });
    }

    if (new Date() > new Date(session.expires_at)) {
      await Session.destroy({ where: { session_id: sessionId } }); // cleanup
      return res.status(401).json({ error: 'Session expired.' });
    }

    // Attach user/session info to request
    req.session = session;
    req.user = session.user;
    next();
  } catch (err) {
    console.error('Session auth error:', err);
    res.status(500).json({ error: 'Internal session check error.' });
  }
};

