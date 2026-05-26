const express = require("express");
const router = express.Router();
const { addScholarship, getAllScholarships, getScholarshipById } = require("../controllers/scholarshipController");

// POST /api/scholarships  → Add a new scholarship
router.post("/", addScholarship);

// GET  /api/scholarships  → Get all scholarships
router.get("/", getAllScholarships);

// GET  /api/scholarships/:id → Get single scholarship
router.get("/:id", getScholarshipById);

module.exports = router;
