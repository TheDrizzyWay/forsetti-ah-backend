import tryCatch from './trycatch.util';
import { generateToken, verifyToken } from './jwt-sign.util';
import passwordHash from './password-hash.util';
import logger from './logger.util';
import sendMail from './mail.util';
import Response from './response.util';
import mailTemplate from './mail-template/mail-template.util';
import commentValidator from './comments/comments.util';
import newArticleMail from './notifications/article-mail.util';
import newFollowerMail from './notifications/follows-mail.util';
import newCommentMail from './notifications/comment-mail.util';
import Rating from './rating.util';
import verifyHighlightedText from './articles/highlightvalidate.util';
import deleteImage from './articles/deleteImage.util';
import commentIdValidator from './commentidvalidator.util';
import readTime from './readTime.util';
import findUser from './find-user.util';
import isEmpty from './isEmpty.util';
import isRequired from './isRequired.util';

const { checkComments, validateCommentType, checkUser } = commentValidator;
const { verifyText } = verifyHighlightedText;

export {
  tryCatch,
  generateToken,
  verifyToken,
  passwordHash,
  logger,
  sendMail,
  Response,
  mailTemplate,
  checkComments,
  validateCommentType,
  newArticleMail,
  newFollowerMail,
  newCommentMail,
  Rating,
  verifyText,
  deleteImage,
  commentIdValidator,
  checkUser,
  readTime,
  findUser,
  isEmpty,
  isRequired
};
