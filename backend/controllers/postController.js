const CommunityPost = require("../models/CommunityPost");

// @desc    Get all posts (with filtering by type)
// @route   GET /api/posts
const getPosts = async (req, res) => {
  try {
    const { type } = req.query; // 'success', 'question', or 'news'
    let query = {};

    if (type) {
      query.type = type;
    }

    // Sort by latest first, or by 'likes' if it's a "Top Questions" section
    const posts = await CommunityPost.find(query).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Create a new post
// @route   POST /api/posts
const createPost = async (req, res) => {
  try {
    const { author, role, title, content, type } = req.body;
    
    if (!content || !title) {
      return res.status(400).json({ message: "Title and Content are required" });
    }

    const post = new CommunityPost({
      author: author || "Scholarship App User",
      role: role || "Applicant",
      title,
      content,
      type: type || "question", // Default to question
    });

    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Like a post
// @route   PUT /api/posts/:id/like
const likePost = async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.likes += 1;
    await post.save();
    res.json({ likes: post.likes });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  getPosts,
  createPost,
  likePost
};