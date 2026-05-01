const Item = require("./Item");
const FoundItem = require("../models/FoundItem");

const normalize = (value = "") => String(value).toLowerCase().trim();

const calculateMatchScore = (lostItem, foundItem) => {
  let score = 0;

  if (normalize(lostItem.category) === normalize(foundItem.category)) score += 40;
  if (normalize(lostItem.location) === normalize(foundItem.location)) score += 25;

  const lostWords = new Set(`${lostItem.title} ${lostItem.description}`.toLowerCase().split(/\W+/).filter(Boolean));
  const foundWords = new Set(`${foundItem.title} ${foundItem.description}`.toLowerCase().split(/\W+/).filter(Boolean));
  const overlap = [...lostWords].filter((word) => foundWords.has(word)).length;
  score += Math.min(overlap * 5, 25);

  const lostDate = new Date(lostItem.dateLost || lostItem.createdAt);
  const foundDate = new Date(foundItem.dateFound || foundItem.createdAt);
  const dayDiff = Math.abs(foundDate - lostDate) / (1000 * 60 * 60 * 24);
  if (dayDiff <= 7) score += 10;

  return Math.min(score, 100);
};

const getSuggestedFoundMatches = async (lostItemId, limit = 5) => {
  const lostItem = await Item.findById(lostItemId);
  if (!lostItem) return [];

  const foundItems = await FoundItem.find({ status: { $in: ["pending", "matched"] } }).limit(50);

  return foundItems
    .map((foundItem) => ({
      item: foundItem,
      matchScore: calculateMatchScore(lostItem, foundItem),
    }))
    .filter((match) => match.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, limit);
};

const getSuggestedLostMatches = async (foundItemId, limit = 5) => {
  const foundItem = await FoundItem.findById(foundItemId);
  if (!foundItem) return [];

  const lostItems = await Item.find({ status: { $in: ["pending", "active", "matched"] } }).limit(50);

  return lostItems
    .map((lostItem) => ({
      item: lostItem,
      matchScore: calculateMatchScore(lostItem, foundItem),
    }))
    .filter((match) => match.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, limit);
};

module.exports = {
  calculateMatchScore,
  getSuggestedFoundMatches,
  getSuggestedLostMatches,
};
