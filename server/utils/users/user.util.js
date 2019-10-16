import validator from 'validator';

import db from '../../models';

import Response from '../response.util';

import isEmpty from '../isEmpty.util';

import isRequired from '../isRequired.util';

const {
  User
} = db;
/**
 * User validation class
 */
class userValidation {
  /**
   * user signup validation
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @returns {Object} response
   */
  static async userSignup(req, res, next) {
    return userValidation.emailPasswordVerification(req.body, res, next);
  }

  /**
   * Check if user exist
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @returns {Object} response
   */
  static async userExist(req, res, next) {
    const {
      email,
    } = req.body;
    const checkuser = await User.findOne({
      where: {
        email: email.toLowerCase(),
      },
    });
    if (checkuser) {
      return Response(res, 422, `User with email: ${email} already exist!`);
    }
    return next();
  }

  /**
   * User sign in object empty check
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @returns {Object} response
   */
  static async isSigninFieldEmpty(req, res, next) {
    const requiredFields = isRequired(req.body, ['email', 'password']);
    if ((typeof requiredFields === 'object') && requiredFields.length > 0) {
      return Response(res, 422, requiredFields.map(err => err));
    }
    return userValidation.emailPasswordVerification(req.body, res, next);
  }

  /**
   * email and password helper
   * @param {Object} body
   * @param {Object} res
   * @param {Object} next
   * @returns {Object} response
   */
  static async emailPasswordVerification(body, res, next) {
    const { email, password } = body;
    const errObj = {};
    const checkemail = await validator.isEmail(email);
    if (!checkemail) errObj.email = `Email value ${email} is invalid`;
    const checkpassword = await validator.isLength(password, {
      min: 8,
    });
    if (!checkpassword) errObj.passwordLength = 'Password should be a minimum of 8 characters';
    const condition = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
    const alphanumericpassword = await condition.test(password);
    if (!alphanumericpassword) errObj.passwordType = 'Password should be alphanumeric';
    if (Object.keys(errObj).length === 0) {
      return isEmpty(body, res, next);
    }
    if (Object.keys(errObj).length !== 0) {
      return Response(res, 422, errObj);
    }
    return next();
  }

  static validateRole(req, res, next) {
    const { newrole } = req.body;
    if (!validator.isIn(newrole.toLowerCase(), ['user', 'admin', 'superadmin'])) {
      return Response(res, 400, 'Please insert a valid role.');
    }
    next();
  }

  /**
   * user not exist middleware
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @returns {Object} response
   */
  static async userNotExist(req, res, next) {
    const { email } = req.body;
    const errObj = {};
    const checkemail = validator.isEmail(email);
    if (!checkemail) errObj.email = `Email value ${email} is invalid!`;
    const trimEmail = validator.trim(email);
    const emptyEmail = validator.isEmpty(trimEmail);
    if (emptyEmail) errObj.email = 'Email is required';
    if (Object.keys(errObj).length !== 0) {
      return Response(res, 422, errObj);
    }
    const checkuser = await User.findOne({
      where: {
        email
      }
    });
    if (!checkuser) {
      const message = `User with email ${email} does not exist`;
      return Response(res, 404, message);
    }
    const {
      id,
      firstname,
    } = checkuser;
    req.user = {
      id,
      firstname,
    };
    return next();
  }

  /**
   *  check password
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @returns {Object} response
   */
  static async checkPassword(req, res, next) {
    const { password } = req.body;
    const errObj = {};
    const checkpassword = await validator.isLength(password, {
      min: 8,
    });
    if (!checkpassword) errObj.passwordLength = 'Password should be a minimum of 8 characters';
    const condition = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
    const alphanumericpassword = await condition.test(password);
    if (!alphanumericpassword) errObj.passwordType = 'Password should be alphanumeric';
    if (Object.keys(errObj).length !== 0) {
      return Response(res, 422, errObj);
    }
    return next();
  }

  static async validateProfile(req, res, next) {
    const { id } = req.user;
    const {
      firstname, lastname, username, bio
    } = req.body;
    const errors = {};

    if (firstname) {
      firstname.trim();
      if (!validator.isLength(firstname, { min: 2, max: 50 })) {
        errors.firstname = 'Your first name should be between 2 and 50 characters long';
      }
      if (!validator.isAlpha(firstname)) {
        errors.firstname = 'Your first name should contain only alphabets.';
      }
    }
    if (lastname) {
      lastname.trim();
      if (!validator.isLength(lastname, { min: 2, max: 50 })) {
        errors.lastname = 'Your last name should be between 2 and 50 characters long';
      }
      if (!validator.isAlpha(lastname)) {
        errors.lastname = 'Your last name should contain only alphabets.';
      }
    }
    if (bio) {
      const validBio = bio.replace(/([@#$%&=<>*/\\])/g, '').trim();
      if (!validator.isLength(bio, { min: 0, max: 1000 })) {
        errors.bio = 'Your bio should not be more than 1000 characters long';
      }
      req.body.bio = validBio;
    }

    if (Object.keys(errors).length > 0) return Response(res, 400, errors);

    try {
      if (username) {
        const findUserName = await User.findOne({ where: { username } });
        if (findUserName && findUserName.dataValues.id !== id) {
          return Response(res, 400, 'This username is already taken.');
        }
      }
    } catch (error) {
      return Response(res, 500, error.mesage);
    }
    return next();
  }

  /**
   * check username validation
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @returns {Object} response
   */
  static async checkUsername(req, res, next) {
    const {
      username
    } = req.body;
    const errObj = {};
    const requiredFields = isRequired(req.body, ['firstname', 'lastname', 'email', 'password', 'username']);
    if ((typeof requiredFields === 'object') && requiredFields.length > 0) {
      return Response(res, 422, requiredFields.map(err => err));
    }
    const validUsername = validator.isAlphanumeric(username);
    if (!validUsername) errObj.username = 'user name should only be alphanumeric';
    if (username) {
      const findUserName = await User.findOne({ where: { username } });
      if (findUserName) errObj.UsernameExist = 'username is already taken.';
    }
    if (Object.keys(errObj).length !== 0) {
      return Response(res, 422, errObj);
    }
    return next();
  }
}

export default userValidation;
