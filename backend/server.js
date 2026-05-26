const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/scholarships", require("./routes/scholarshipRoutes"));
app.use("/api/recommend", require("./routes/recommendRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/mentors", require("./routes/mentorRoutes"));

// Health check
app.get("/", (req, res) => {
  res.json({ message: "The Scholarship Hunter API is running 🎓" });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
