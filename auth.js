const requireAuth = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }
  
  // For API requests, return JSON error
  if (req.xhr || req.headers.accept.indexOf('json') > -1) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  // For regular requests, redirect to login
  res.redirect('/login');
};

const redirectIfAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return res.redirect('/todos');
  }
  next();
};

module.exports = {
  requireAuth,
  redirectIfAuthenticated
};