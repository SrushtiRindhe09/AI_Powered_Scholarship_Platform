// src/services/recommendationEngine.js

const getRecommendations = (user, scholarships) => {
  return scholarships
    .filter((scholarship) => {
      // 1. Income Check (Hard Filter)
      if (user.familyIncome > scholarship.maxIncome) return false;

      // 2. State Check (Hard Filter)
      if (
        scholarship.state !== "All India" &&
        scholarship.state !== user.state
      ) {
        return false;
      }

      // 3. Category Check (Hard Filter)
      if (
        scholarship.category !== "All" &&
        scholarship.category !== user.category
      ) {
        return false;
      }

      return true;
    })
    .map((scholarship) => {
      // SCORING LOGIC
      let score = 0;
      if (scholarship.category === user.category) score += 3;
      if (scholarship.state === user.state) score += 3;
      if (scholarship.field === user.field) score += 4;

      return { ...scholarship._doc, matchScore: score };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
};

module.exports = { getRecommendations };