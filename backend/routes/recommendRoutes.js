const express = require("express");
const router = express.Router();
const { getRecommendationsForUser } = require("../controllers/recommendController");

// GET /api/recommend/:userId → Get ranked scholarship recommendations
router.get("/:userId", getRecommendationsForUser);

module.exports = router;
