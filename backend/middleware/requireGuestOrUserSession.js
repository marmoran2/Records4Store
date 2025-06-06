const { Session, User } = require('../models');

module.exports = async function requireGuestOrUserSession(req, res, next) {
  try {
    const sessionId = req.cookies.session_id;
    if (!sessionId) {
      return res.status(401).json({ error: 'Session required. No session ID.' });
    }

    const session = await Session.findOne({
      where: {
        session_id: sessionId,
        is_valid: true
      },
      include: {
        model: User,
        as: 'user' // may be null (guest)
      }
    });

    if (!session) {
      return res.status(401).json({ error: 'Invalid or expired session.' });
    }

    if (new Date() > new Date(session.expires_at)) {
      await Session.destroy({ where: { session_id: sessionId } });
      return res.status(401).json({ error: 'Session expired.' });
    }

    req.session = session;
    req.user = session.user || null; // may be guest
    next();
  } catch (err) {
    console.error('Guest/User session auth error:', err);
    res.status(500).json({ error: 'Internal session error.' });
  }
};
