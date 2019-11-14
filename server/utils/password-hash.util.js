import bcrypt from 'bcryptjs';

/**
 * Generates a hashed password
 * @param {string} password
 * @returns {string} hash
 */
const passwordHash = async password => bcrypt.hashSync(password, 10);

export default passwordHash;
