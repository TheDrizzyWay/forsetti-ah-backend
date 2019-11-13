/**
 * @desciption - Specify a key of an array that is required in another array
 *
 * @param {Object} obj
 * @param {Array} items
 * @returns {Array} Array of required items
 */
const isRequired = (obj, items) => {
  const required = [];
  items.forEach((item) => {
    if (!Object.keys(obj).includes(item)) {
      required.push({ [item]: `${item} field is required` });
    }
  });
  return required;
};

export default isRequired;
