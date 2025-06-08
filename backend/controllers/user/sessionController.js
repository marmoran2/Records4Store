// controllers/user/sessionController.js
const { Session, User, CartItem, ProductView } = require('../../models');

// GET /api/users/:userId/sessions → all sessions for a user
const getSessionsByUser = async (req, res) => {
  try {
    const sessions = await Session.findAll({
      where: { user_id: req.params.userId },
      include: [
        { model: CartItem, as: 'cart_items' },
        { model: ProductView, as: 'views' }
      ],
      order: [['expires_at', 'DESC']]
    });
    res.status(200).json(sessions);
  } catch (error) {
    console.error(`Error fetching sessions for user ${req.params.userId}:`, error);
    res.status(500).json({ message: 'Failed to retrieve sessions' });
  }
};

// GET /api/users/sessions/:id → get a single session by ID
const getSessionById = async (req, res) => {
  try {
    const session = await Session.findByPk(req.params.id, {
      include: [
        { model: User, as: 'user', attributes: ['user_id', 'email'] },
        { model: CartItem, as: 'cart_items' },
        { model: ProductView, as: 'views' }
      ]
    });

    if (!session) return res.status(404).json({ message: 'Session not found' });

    res.status(200).json(session);
  } catch (error) {
    console.error(`Error fetching session ${req.params.id}:`, error);
    res.status(500).json({ message: 'Failed to retrieve session' });
  }
};

// POST /api/users/:userId/sessions → create a new session
const createSession = async (req, res) => {
  const { session_id, expires_at, user_agent, ip_address } = req.body;
  const user_id = req.params.userId;

  try {
    const session = await Session.create({
      session_id,
      user_id: user_id || null,
      expires_at,
      user_agent,
      ip_address,
      is_valid: true
    });

    res.status(201).json(session);
  } catch (error) {
    console.error(` Error creating session for user ${user_id}:`, error);
    res.status(500).json({ message: 'Failed to create session' });
  }
};

// PATCH /api/users/sessions/:id → invalidate a session
const invalidateSession = async (req, res) => {
  try {
    const [updated] = await Session.update(
      { is_valid: false },
      { where: { session_id: req.params.id } }
    );

    if (!updated) return res.status(404).json({ message: 'Session not found' });

    res.status(200).json({ message: 'Session invalidated' });
  } catch (error) {
    console.error(`❌ Error invalidating session ${req.params.id}:`, error);
    res.status(500).json({ message: 'Failed to invalidate session' });
  }
};

module.exports = {
  getSessionsByUser,
  getSessionById,
  createSession,
  invalidateSession
};
