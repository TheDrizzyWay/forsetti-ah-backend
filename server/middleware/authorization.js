import { verifyToken, Response } from '../utils';

/**
 * Authorization class
 */
class Authorization {
/**
 * @description Check if a token exists in request header
 * @param {Object} req
 * @param {Object} res
 * @param {function} next
 * @returns {Object} response
 */
  static async signInAuth(req, res, next) {
    const { authorization } = req.headers;
    if (typeof authorization === 'undefined') {
      return Response(res, 401, 'Unauthorized - Header Not Set');
    }

    const token = authorization.split(' ')[1];
    if (!token) {
      return Response(res, 401, 'Access Denied. Please Log In.');
    }

    try {
      const decoded = await verifyToken(token);
      req.user = decoded;
      next();
    } catch (error) {
      return Response(res, 401, 'Error in verification. Please try again');
    }
  }

  /**
 * @description Checks if a token exists but allows permission regardless
 * @param {Object} req
 * @param {Object} res
 * @param {function} next
 * @returns {Object} response
 */
  static async partialAuth(req, res, next) {
    const { authorization } = req.headers;
    if (authorization) {
      const token = authorization.split(' ')[1];
      if (!token) return next();

      try {
        const decoded = await verifyToken(token);
        req.user = decoded;
        next();
      } catch (error) {
        return Response(res, 401, 'Error in verification. Please try again');
      }
    } else {
      next();
    }
  }

  /**
 * @description Checks if the user has a role of superadmin
 * @param {Object} req
 * @param {Object} res
 * @param {function} next
 * @returns {Object} response
 */
  static superAdminAuth(req, res, next) {
    const { roleId } = req.user;
    if (roleId !== 'a11f440b-eae3-4d28-990d-700c7b965709') {
      return Response(res, 403, 'Access Denied. For Superadmins only.');
    }
    return next();
  }
}

export default Authorization;
