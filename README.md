# TodoPro - Professional Task Management Application

A modern, full-featured Node.js todo list application with user authentication, MongoDB storage, and a beautiful glass-morphism UI with dark/light theme support.

## ✨ Features

### Core Functionality
- 🔐 **Secure Authentication** - User registration and login with bcrypt password hashing
- 📝 **Task Management** - Create, read, update, and delete todos
- ✅ **Task Status** - Mark todos as completed/incomplete
- 👤 **User Isolation** - Each user has their own private todo list
- 🏷️ **Task Organization** - Categories (General, Work, Personal, Urgent) and priorities (Low, Medium, High)
- ⏰ **Time Tracking** - Optional time assignment for tasks

### User Experience
- 🎨 **Modern UI** - Glass-morphism design with smooth animations
- 🌓 **Theme Support** - Light and dark mode toggle
- 📱 **Responsive Design** - Works on desktop and mobile devices
- ⚡ **Real-time Updates** - AJAX-powered interactions for smooth UX
- 🔍 **Search & Filter** - Find and organize tasks efficiently

## 🏗️ Architecture

The application follows a professional MVC (Model-View-Controller) architecture:

```
├── server.js              # Main application entry point
├── config.js              # Database and session configuration
├── routes.js              # Centralized route definitions
├── auth.js                # Authentication middleware
├── authController.js      # Authentication logic
├── todoController.js      # Todo management logic
├── User.js                # User data model
├── Todo.js                # Todo data model
├── .env.example           # Environment variables template
├── .gitignore            # Git ignore rules
├── views/                 # EJS templates
│   ├── login.ejs
│   ├── register.ejs
│   ├── todos.ejs
│   └── error.ejs
└── public/                # Static assets
    ├── styles.css         # Modern CSS with theme support
    └── app.js             # Client-side JavaScript
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14.0.0 or higher)
- **MongoDB** (running locally or remote connection)
- **npm** (v6.0.0 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todo-list-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB**
   ```bash
   # On Windows
   net start MongoDB
   
   # On macOS/Linux
   sudo systemctl start mongod
   ```

5. **Run the application**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Environment
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/todolist

# Session Security
SESSION_SECRET=your-super-secret-session-key-change-this-in-production

# Server
PORT=3000
```

### Database Configuration

The application automatically creates the required collections:
- **users** - Stores user accounts with hashed passwords
- **todos** - Stores todo items with user associations

## 📖 Usage Guide

### Getting Started
1. **Register** a new account or **login** with existing credentials
2. **Add tasks** using the input form with optional time, category, and priority
3. **Manage tasks** by marking complete/incomplete, editing, or deleting
4. **Organize** tasks using categories and priorities
5. **Search** through tasks using the search bar
6. **Switch themes** using the light/dark toggle
7. **Logout** when finished

### Task Management
- **Create**: Fill in task details and click "Add"
- **Complete**: Click the checkbox to mark as done
- **Edit**: Click "Edit" button and modify task details
- **Delete**: Click "Delete" button (with confirmation)
- **Filter**: Use dropdown menus to filter by status or sort by date/priority

## 🛠️ Development

### Project Structure

- **Modular Architecture**: Separated concerns with dedicated files for models, controllers, and routes
- **MVC Pattern**: Clean separation between Models (User.js, Todo.js), Views (EJS templates), and Controllers (authController.js, todoController.js)
- **Middleware**: Centralized authentication and error handling middleware
- **Configuration**: Environment-based configuration with dotenv support
- **Validation**: Input validation on both client and server side with proper error handling
- **Error Handling**: Comprehensive error handling with user-friendly error pages
- **Security**: Password hashing, session management, input sanitization, and secure headers
- **Code Organization**: Professional file structure following Node.js best practices

### Available Scripts

```bash
npm start      # Start production server
npm run dev    # Start development server with auto-reload
npm test       # Run tests (to be implemented)
npm run lint   # Code linting (to be implemented)
```

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds for secure password storage
- **Session Management**: Secure session configuration with httpOnly cookies
- **Input Validation**: Server-side validation for all user inputs
- **Authentication Middleware**: Protected routes requiring valid sessions
- **Error Handling**: Secure error messages without sensitive information exposure

## 🎨 UI/UX Features

- **Glass Morphism**: Modern frosted glass effect with backdrop blur
- **Theme System**: Seamless light/dark mode switching with localStorage persistence
- **Responsive Design**: Mobile-first approach with flexible layouts
- **Smooth Animations**: CSS transitions and hover effects
- **Accessibility**: Proper ARIA labels and keyboard navigation support

## 📊 Database Schema

### User Model
```javascript
{
  username: String (required, unique, 3-30 chars),
  password: String (required, hashed, min 6 chars),
  timestamps: true
}
```

### Todo Model
```javascript
{
  userId: ObjectId (required, ref: User),
  task: String (required, max 500 chars),
  time: String (optional, HH:MM format),
  category: String (enum: General, Work, Personal, Urgent),
  priority: String (enum: Low, Medium, High),
  completed: Boolean (default: false),
  timestamps: true
}
```

## 🚀 Deployment

### Production Checklist
- [ ] Set `NODE_ENV=production`
- [ ] Configure secure `SESSION_SECRET`
- [ ] Set up MongoDB Atlas or production database
- [ ] Configure HTTPS
- [ ] Set up process manager (PM2)
- [ ] Configure reverse proxy (Nginx)
- [ ] Set up monitoring and logging

### Environment Setup
```bash
# Install PM2 for process management
npm install -g pm2

# Start application with PM2
pm2 start server.js --name "todoapp"

# Monitor application
pm2 monit
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Modern UI inspired by glass morphism design trends
- Built with love using Node.js and MongoDB
- Special thanks to the open-source community

---

**Made with ❤️ by [Your Name]**