const Todo = require('./Todo');

const todoController = {
  // Render todos page
  getTodos: async (req, res) => {
    try {
      const todos = await Todo.find({ userId: req.session.userId })
        .sort({ createdAt: -1 });
      
      const username = req.session.username || 'User';
      res.render('todos', { todos, username });
    } catch (error) {
      console.error('Error loading todos:', error);
      res.status(500).render('error', { message: 'Failed to load todos' });
    }
  },

  // Get todos as JSON (API endpoint)
  getApiTodos: async (req, res) => {
    try {
      const todos = await Todo.find({ userId: req.session.userId })
        .sort({ createdAt: -1 });
      
      res.json({ success: true, todos });
    } catch (error) {
      console.error('Error fetching todos:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch todos' });
    }
  },

  // Create new todo
  createTodo: async (req, res) => {
    try {
      const { task, time, category, priority } = req.body;
      
      if (!task || task.trim() === '') {
        return res.redirect('/todos');
      }

      const todo = new Todo({
        userId: req.session.userId,
        task: task.trim(),
        time: time || '',
        category: category || 'General',
        priority: priority || 'Medium'
      });

      await todo.save();
      res.redirect('/todos');
    } catch (error) {
      console.error('Error creating todo:', error);
      res.redirect('/todos');
    }
  },

  // Toggle todo completion
  toggleTodo: async (req, res) => {
    try {
      const todo = await Todo.findOne({ 
        _id: req.params.id, 
        userId: req.session.userId 
      });
      
      if (!todo) {
        if (req.xhr) {
          return res.status(404).json({ success: false, error: 'Todo not found' });
        }
        return res.redirect('/todos');
      }

      todo.completed = !todo.completed;
      await todo.save();

      if (req.xhr) {
        return res.json({ success: true, completed: todo.completed });
      }

      res.redirect('/todos');
    } catch (error) {
      console.error('Error toggling todo:', error);
      if (req.xhr) {
        return res.status(500).json({ success: false, error: 'Failed to toggle todo' });
      }
      res.redirect('/todos');
    }
  },

  // Update todo
  updateTodo: async (req, res) => {
    try {
      const { task, time, category, priority } = req.body;
      
      const todo = await Todo.findOneAndUpdate(
        { _id: req.params.id, userId: req.session.userId },
        { task, time, category, priority },
        { new: true, runValidators: true }
      );

      if (!todo) {
        if (req.xhr) {
          return res.status(404).json({ success: false, error: 'Todo not found' });
        }
        return res.redirect('/todos');
      }

      if (req.xhr) {
        return res.json({ success: true, todo });
      }

      res.redirect('/todos');
    } catch (error) {
      console.error('Error updating todo:', error);
      if (req.xhr) {
        return res.status(500).json({ success: false, error: 'Failed to update todo' });
      }
      res.redirect('/todos');
    }
  },

  // Delete todo
  deleteTodo: async (req, res) => {
    try {
      const todo = await Todo.findOneAndDelete({ 
        _id: req.params.id, 
        userId: req.session.userId 
      });

      if (!todo) {
        if (req.xhr) {
          return res.status(404).json({ success: false, error: 'Todo not found' });
        }
        return res.redirect('/todos');
      }

      if (req.xhr) {
        return res.json({ success: true });
      }

      res.redirect('/todos');
    } catch (error) {
      console.error('Error deleting todo:', error);
      if (req.xhr) {
        return res.status(500).json({ success: false, error: 'Failed to delete todo' });
      }
      res.redirect('/todos');
    }
  }
};

module.exports = todoController;