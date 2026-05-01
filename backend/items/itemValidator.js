const ALLOWED_CATEGORIES = [
  "Electronics",
  "Cards",
  "Bags",
  "Books",
  "Keys",
  "Clothing",
  "Accessories",
  "Documents",
  "Other",
];

const containsUnsafeText = (value = "") => /<script|javascript:|onerror=|onload=/i.test(String(value));

const validateImage = (image = "") => {
  if (!image) return null;

  const lowerImage = String(image).toLowerCase();
  const allowed = [".jpg", ".jpeg", ".png", "image/jpeg", "image/png"];
  const isAllowed = allowed.some((item) => lowerImage.includes(item));

  return isAllowed ? null : "Image must be JPG or PNG";
};

const validateLostItemPayload = (payload) => {
  const errors = [];
  const requiredFields = ["title", "category", "description", "location", "dateLost"];

  requiredFields.forEach((field) => {
    if (!payload[field]) errors.push(`${field} is required`);
  });

  if (payload.category && !ALLOWED_CATEGORIES.includes(payload.category)) {
    errors.push("Category must be one of the allowed categories");
  }

  if (payload.dateLost && new Date(payload.dateLost) > new Date()) {
    errors.push("Date lost cannot be in the future");
  }

  ["title", "description", "location"].forEach((field) => {
    if (payload[field] && containsUnsafeText(payload[field])) {
      errors.push(`${field} contains unsafe content`);
    }
  });

  const imageError = validateImage(payload.image);
  if (imageError) errors.push(imageError);

  return errors;
};

const validateClaimPayload = (payload) => {
  const errors = [];

  if (!payload.verificationDetails) {
    errors.push("verificationDetails is required");
  }

  if (payload.verificationDetails && containsUnsafeText(payload.verificationDetails)) {
    errors.push("verificationDetails contains unsafe content");
  }

  const imageError = validateImage(payload.evidence);
  if (imageError) errors.push(imageError);

  return errors;
};

module.exports = {
  ALLOWED_CATEGORIES,
  validateLostItemPayload,
  validateClaimPayload,
  containsUnsafeText,
};
