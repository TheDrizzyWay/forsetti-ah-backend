import isUUID from 'validator/lib/isUUID';
import { Response } from '../utils';

/**
 * @description Checks if an id is valid
 * @param {Object} req
 * @param {Object} res
 * @param {function} next
 * @returns {Object} response
 */

class UuidValidator {
  static validId(req, res, next) {
    const { id } = req.params;
    if (!isUUID(id, 4)) return Response(res, 400, 'Please enter a valid id.');
    return next();
  }

  static validArticleId(req, res, next) {
    const { articleId } = req.params;
    if (!isUUID(articleId, 4)) return Response(res, 400, 'Please enter a valid article id.');
    return next();
  }

  static validCommentId(req, res, next) {
    const { commentId } = req.params;
    if (!isUUID(commentId, 4)) return Response(res, 400, 'Please enter a valid comment id.');
    return next();
  }
}

export default UuidValidator;
