const validateRequiredFields = (body, requiredFields) => {
  const missingFields = [];

  requiredFields.forEach((field) => {
    if (
      body[field] === undefined ||
      body[field] === null ||
      body[field] === ""
    ) {
      missingFields.push(field);
    }
  });

  return missingFields;
};

module.exports = validateRequiredFields;
