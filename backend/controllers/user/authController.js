const { User, Session } = require('../../models');
const crypto = require('crypto');

// POST /login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required.' });
    }

    const user = await User.findOne({ where: { email } });

    if (!user || user.password_hash !== password) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const sessionId = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 2); // 2h

    await Session.create({
      session_id: sessionId,
      user_id: user.user_id,
      expires_at: expiresAt,
      user_agent: req.get('User-Agent'),
      ip_address: req.ip,
      is_valid: true
    });

    res.cookie('session_id', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      expires: expiresAt
    });

    res.json({ message: 'Login successful.', user_id: user.user_id, email: user.email });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
};

// POST /logout
const logout = async (req, res) => {
  const sessionId = req.cookies.session_id;

  if (!sessionId) {
    return res.status(400).json({ error: 'No session found.' });
  }

  try {
    await Session.destroy({ where: { session_id: sessionId } });
    res.clearCookie('session_id');
    res.json({ message: 'Logged out successfully.' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
};


module.exports = {
  login,
  logout
};
