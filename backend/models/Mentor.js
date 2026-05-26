const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String, // will just hold seed name for dicebear API
  },
  role: {
    type: String,
  },
  rating: {
    type: Number,
    default: 5.0,
  },
  sessions: {
    type: Number,
    default: 0,
  },
  bio: {
    type: String,
  },
  availability: {
    type: [String], // e.g. ["Sat 10:00 AM", "Sun 2:30 PM"]
    default: []
  }
});

module.exports = mongoose.model('Mentor', mentorSchema);
