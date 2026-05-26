const Mentor = require("../models/Mentor");

// Get all mentors
// Get all mentors (with optional filter by expertise/role)
const getMentors = async (req, res) => {
  try {
    const { role } = req.query;
    let query = {};

    // If the user is looking for a mentor for a specific scholarship type
    // e.g., /api/mentors?role=Reliance
    if (role) {
      query.role = { $regex: role, $options: 'i' };
    }

    const mentors = await Mentor.find(query);
    res.json(mentors);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get single mentor details
const getMentorById = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }
    res.json(mentor);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  getMentors,
  getMentorById,
};


