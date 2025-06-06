module.exports = (req, res, next) => {
  res.locals.user = null;

  if (req.session && req.session.user) {
    res.locals.user = {
      id: req.session.user.user_id,
      email: req.session.user.email,
      isGuest: req.session.user.is_guest,
      role: req.session.user.user_role || 'Customer'
    };
  } else if (req.session && req.session.guestId) {
    res.locals.user = {
      id: null,
      email: null,
      isGuest: true,
      guestSession: req.session.guestId
    };
  }

  next();
};