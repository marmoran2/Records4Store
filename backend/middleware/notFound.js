module.exports = (req, res, next) => {
  const error = new Error(`🔍 Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
};