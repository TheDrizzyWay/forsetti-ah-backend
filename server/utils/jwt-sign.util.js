import jwt from 'jsonwebtoken';
import Response from './response.util';
import { jwtSecret } from '../config/variables';

/**
 * Generates a JWT token
 * @param {object} data
 * @param {string} expires
 * @returns {string} token
 */
const generateToken = async (data, expires) => {
  const token = await jwt.sign(data, jwtSecret, { expiresIn: expires });
  return token;
};

/**
 * verify token
 * @param {Object} token
 * @param {Object} res
 * @returns {object} userdata
 */
const verifyToken = async (token, res) => jwt.verify(token, jwtSecret, (err, decoded) => {
  if (err) {
    return Response(res, 401, err.message);
  }
  return decoded;
});


export {
  generateToken,
  verifyToken,
};
