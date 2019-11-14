import db from '../models';
import { Response, passwordHash } from '../utils';

const { User, Role } = db;

/**
 * User Controller
 * @package User
 */
class UserController {
  /**
     * @description updates the role of a user
     * @param {object} req
     * @param {object} res
     * @returns {object} User Profile Object
     */
  static async updateUserRole(req, res) {
    const userId = req.params.id;
    const { newrole } = req.body;
    const foundUser = await User.findByPk(userId);

    if (!foundUser) return Response(res, 404, 'This user was not found.');

    const newRoleId = await Role.findOne({ where: { type: newrole } });
    const updatedUser = await User.update({ roleId: newRoleId.dataValues.id }, {
      returning: true,
      where: { id: userId },
    });

    const {
      dataValues: {
        id, firstname, lastname, updatedAt
      }
    } = updatedUser[1][0];
    const result = {
      id,
      firstname,
      lastname,
      role: newrole,
      updatedAt
    };

    return Response(res, 200, `The user role has been changed to ${newrole}.`, [result]);
  }

  /**
     * @description Get list of users functionality
     * @param {object} req
     * @param {object} res
     * @returns {object} List users functionality
     */
  static async getUsers(req, res) {
    const users = await User.findAndCountAll({
      attributes: {
        exclude: ['password', 'istokenreset', 'subscribed']
      }
    });
    return Response(res, 200, 'Successfully retrieved users', users);
  }

  /**
   * @description returns tokens and profile from social service
   * @param {string} accessToken
   * @param {string} refreshToken
   * @param {object} profile
   * @param {function} done
   * @returns {object} User Profile Object
   */
  static async socialCallback(accessToken, refreshToken, profile, done) {
    const {
      id,
      displayName,
      emails,
      provider,
      photos,
    } = profile;

    if (!emails) {
      const userWithNoEmail = { noEmail: true };
      return done(null, userWithNoEmail);
    }

    const userEmail = emails[0].value;
    const names = displayName.split(' ');
    const hashedPassword = await passwordHash(id);
    const profileImage = photos[0].value;
    const username = `${names[0]}_${id}`;

    const [user] = await User.findOrCreate({
      where: { email: userEmail },
      defaults: {
        firstname: names[0],
        lastname: names[1],
        password: hashedPassword,
        email: userEmail,
        social: provider,
        image: profileImage,
        username
      },
    });
    return done(null, user.dataValues);
  }
}

export default UserController;
