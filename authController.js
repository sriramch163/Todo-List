const bcrypt = require('bcryptjs');
const User = require('./User');

const authController = {
  // Render login page
  getLogin: (req, res) => {
    res.render('login');
  },

  // Render register page
  getRegister: (req, res) => {
    res.render('register');
  },

  // Handle user registration
  postRegister: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Validation
      if (!username || !password) {
        return res.render('register', { error: 'Username and password are required' });
      }

      if (username.length < 3) {
        return res.render('register', { error: 'Username must be at least 3 characters' });
      }

      if (password.length < 6) {
        return res.render('register', { error: 'Password must be at least 6 characters' });
      }

      // Check if user exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.render('register', { error: 'Username already exists' });
      }

      // Hash password and create user
      const hashedPassword = await bcrypt.hash(password, 12);
      await User.create({ username, password: hashedPassword });
      
      res.redirect('/login');
    } catch (error) {
      console.error('Registration error:', error);
      res.render('register', { error: 'Registration failed. Please try again.' });
    }
  },

  // Handle user login
  postLogin: async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.render('login', { error: 'Username and password are required' });
      }

      const user = await User.findOne({ username });
      if (!user) {
        return res.render('login', { error: 'Invalid credentials' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.render('login', { error: 'Invalid credentials' });
      }

      // Set session
      req.session.userId = user._id;
      req.session.username = user.username;
      
      res.redirect('/todos');
    } catch (error) {
      console.error('Login error:', error);
      res.render('login', { error: 'Login failed. Please try again.' });
    }
  },

  // Handle logout
  postLogout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Logout error:', err);
      }
      res.redirect('/login');
    });
  }
};

module.exports = authController;