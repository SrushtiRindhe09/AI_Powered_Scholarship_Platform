const Scholarship = require("../models/Scholarship");

// @desc    Add a new scholarship
// @route   POST /api/scholarships
const addScholarship = async (req, res) => {
  try {
    const { title, provider, amount, category, maxIncome, state, field, deadline } = req.body;

    const scholarship = await Scholarship.create({
      title,
      provider,
      amount,
      category,
      maxIncome,
      state,
      field,
      deadline,
    });

    res.status(201).json(scholarship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all scholarships
// @route   GET /api/scholarships
// @desc    Get all scholarships (with Filtering & Search)
// @route   GET /api/scholarships
const getAllScholarships = async (req, res) => {
  try {
    const { category, state, field, maxIncome, search } = req.query;
    let query = {};

    // 1. Filter by Category (SC, ST, OBC, All)
    if (category && category !== 'All') {
      query.category = { $in: [category, 'All'] }; // Show specific + general ones
    }

    // 2. Filter by State
    if (state && state !== 'All India') {
      query.state = { $in: [state, 'All India'] }; // Show state-specific + national
    }

    // 3. Filter by Field of Study
    if (field && field !== 'All') {
      query.field = field;
    }

    // 4. Filter by Income (Show only what the user qualifies for)
    if (maxIncome) {
      query.maxIncome = { $gte: Number(maxIncome) }; 
    }

    // 5. Keyword Search (Title or Provider)
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { provider: { $regex: search, $options: 'i' } }
      ];
    }

    const scholarships = await Scholarship.find(query).sort({ deadline: 1 });
    res.json(scholarships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single scholarship by ID
// @route   GET /api/scholarships/:id
const getScholarshipById = async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);
    if (!scholarship) {
      return res.status(404).json({ message: "Scholarship not found" });
    }
    res.json(scholarship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addScholarship, getAllScholarships, getScholarshipById };
