const User = require("../models/User");
const Scholarship = require("../models/Scholarship");

// This line imports the logic from your service file
const { getRecommendations } = require("../services/recommendationEngine");

// @desc    Get personalized scholarship recommendations for a user
// @route   GET /api/recommend/:userId
const getRecommendationsForUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const scholarships = await Scholarship.find();

    // We simply call the imported function here
    const recommendations = getRecommendations(user, scholarships);

    res.json({
      user: user.name,
      totalScholarships: scholarships.length,
      recommendations,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export only the controller function
module.exports = { getRecommendationsForUser };