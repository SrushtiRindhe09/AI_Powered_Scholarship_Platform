const express = require("express");
const router = express.Router();
const { createUser, getUserById, signupUser, loginUser } = require("../controllers/userController");

// POST /api/users      → Create a new user (profile update)
router.post("/", createUser);

// POST /api/users/signup → Signup new user
router.post("/signup", signupUser);

// POST /api/users/login  → Login existing user
router.post("/login", loginUser);

// GET  /api/users/:id  → Get user by ID
router.get("/:id", getUserById);

module.exports = router;
