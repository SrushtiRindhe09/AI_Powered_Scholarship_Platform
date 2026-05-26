const express = require("express");
const router = express.Router();
const { getMentors, getMentorById } = require("../controllers/mentorController");

router.route("/").get(getMentors);
router.route("/:id").get(getMentorById);

module.exports = router;
