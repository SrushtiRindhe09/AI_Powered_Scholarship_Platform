const API_BASE = "/api";

// Create or update user profile
export const createUserProfile = async (profileData) => {
  const response = await fetch(`${API_BASE}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to save profile");
  }

  return response.json();
};

// Get personalized recommendations for a user
export const getRecommendations = async (userId) => {
  const response = await fetch(`${API_BASE}/recommend/${userId}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch recommendations");
  }

  return response.json();
};

// Get all scholarships (for manual browsing)
export const fetchAllScholarships = async () => {
  const response = await fetch(`${API_BASE}/scholarships`);

  if (!response.ok) {
    throw new Error("Failed to fetch scholarships");
  }

  return response.json();
};

// Get single scholarship by ID
export const fetchScholarshipById = async (id) => {
  const response = await fetch(`${API_BASE}/scholarships/${id}`);
  if (!response.ok) throw new Error("Failed to fetch scholarship details");
  return response.json();
};

// Get all mentors
export const fetchMentors = async () => {
  const response = await fetch(`${API_BASE}/mentors`);
  if (!response.ok) throw new Error("Failed to fetch mentors");
  return response.json();
};

// Get mentor by ID
export const fetchMentorById = async (id) => {
  const response = await fetch(`${API_BASE}/mentors/${id}`);
  if (!response.ok) throw new Error("Failed to fetch mentor details");
  return response.json();
};

// Get community posts
export const fetchCommunityPosts = async () => {
  const response = await fetch(`${API_BASE}/posts`);
  if (!response.ok) throw new Error("Failed to fetch community posts");
  return response.json();
};

// Create a community post
export const createCommunityPost = async (postData) => {
  const response = await fetch(`${API_BASE}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  });
  if (!response.ok) throw new Error("Failed to publish post");
  return response.json();
};

// Auth: Signup
export const authSignup = async (credentials) => {
  const response = await fetch(`${API_BASE}/users/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Signup failed");
  }
  return response.json();
};

// Auth: Login
export const authLogin = async (credentials) => {
  const response = await fetch(`${API_BASE}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }
  return response.json();
};
