import db from '../models';
import {
  passwordHash, generateToken, Response, sendMail, mailTemplate
} from '../utils';

const { User } = db;

/**
 * Auth Controller
 * @package Auth
 */
class AuthController {
  /**
   * Sign up a user
   * @param {object} req
   * @param {object} res
   * @returns {object} responseObject
   */
  static async signup(req, res) {
    const {
      firstname, lastname, email, username, password
    } = req.body;

    const hashedPassword = await passwordHash(password);
    const { id } = await User.create({
      firstname,
      lastname,
      email,
      username,
      password: hashedPassword,
    });

    const token = await generateToken({ id }, '30d');
    const userInfo = {
      token,
      user: {
        firstname, lastname, email, username
      }
    };

    const body = `<p>Thanks for joining and we hope you read stories that change your life forever!</p>
    Warm regards.`;

    const mailOption = {
      email,
      subject: 'Welcome to Author\'s Haven',
      message: mailTemplate(`Hello ${firstname} ${lastname},`, body)
    };
    sendMail(mailOption);
    return Response(res, 201, 'User registered successfully', [userInfo]);
  }

  /**
   * @description Sign in User
   * @param {object} req
   * @param {object} res
   * @returns {object} res
   */
  static async signinUser(req, res) {
    const { email, password } = req.body;

    const userResponse = await User.findOne({
      where: { email },
    });

    if (userResponse && userResponse.isPasswordValid(password)) {
      const {
        id, firstname, lastname, roleId, username
      } = userResponse;
      const token = await generateToken({ id, roleId }, '30d');
      const data = {
        token,
        user: {
          id,
          firstname,
          lastname,
          username,
          email: userResponse.email,
        }
      };

      Response(res, 200, 'Signed in successfully', data);
    } else {
      Response(res, 400, 'Invalid Credentials');
    }
  }
}

export default AuthController;
