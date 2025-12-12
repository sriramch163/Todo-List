const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  task: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 500
  },
  time: { 
    type: String,
    validate: {
      validator: function(v) {
        return !v || /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
      },
      message: 'Time must be in HH:MM format'
    }
  },
  category: { 
    type: String, 
    default: "General",
    enum: ["General", "Work", "Personal", "Urgent"]
  },
  priority: { 
    type: String, 
    default: "Medium",
    enum: ["Low", "Medium", "High"]
  },
  completed: { 
    type: Boolean, 
    default: false 
  }
}, {
  timestamps: true
});

// Index for better query performance
todoSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Todo', todoSchema);