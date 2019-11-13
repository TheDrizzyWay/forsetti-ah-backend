import bcrypt from 'bcrypt';

/**
 * Generates a hashed password
 * @param {string} password
 * @returns {string} hash
 */
const passwordHash = async password => bcrypt.hash(password, 10);

export default passwordHash;
