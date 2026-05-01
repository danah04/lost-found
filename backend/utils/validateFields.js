const validateFields = (body, requiredFields) => {
  const missingFields = [];

  requiredFields.forEach((field) => {
    if (
      body[field] === undefined ||
      body[field] === null ||
      body[field].toString().trim() === ""
    ) {
      missingFields.push(field);
    }
  });

  return missingFields;
};

module.exports = validateFields;
