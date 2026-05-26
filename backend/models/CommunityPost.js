const mongoose = require('mongoose');

const communityPostSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'Member',
  },
  title: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    // ADD 'news' TO THIS ARRAY BELOW
    enum: ['question', 'success', 'general', 'news'], 
    default: 'general',
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('CommunityPost', communityPostSchema);