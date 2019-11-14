import db from '../models';
import { frontendUrl } from '../config/variables';
import {
  passwordHash, generateToken, Response, sendMail, mailTemplate, verifyToken, findUser
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

    const userResponse = await findUser({ email });

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

  /**
   * forgot password
   * @param {object} req
   * @param {object} res
   * @returns {object} response
   */
  static async forgotPassword(req, res) {
    const { email } = req.body;
    const { id, firstname } = req.user;

    const token = await generateToken({ id, email }, '15m');
    await User.update({
      istokenreset: false,
    }, {
      where: { email }
    });

    const mailmessage = ` <p>Hello ${firstname} </p>
                  <p>
                      You are recieving this mail because of you requested a password reset, if not you please ignore
                  </p>
                  <p>
                    follow this link to reset your password
                        <a href='${frontendUrl}/auth/resetpassword?token=${token}'>reset password</a>
                  </p>
                  <p>
                    <b style = 'color:black;'>Note</b> this link would expire in 15 minutes
                  </p>`;
    const mailOption = {
      email,
      subject: 'Authors Haven Reset Password',
      message: mailTemplate('Authors Haven Reset Password', mailmessage)
    };

    await sendMail(mailOption);
    const message = `A reset password link has been sent to ${email}. Please check your mail`;
    return Response(res, 200, message);
  }

  /**
   * reset password
   * @param {object} req
   * @param {object} res
   * @returns {object} response
   */
  static async resetPassword(req, res) {
    const { token } = req.query;
    const { password } = req.body;

    const { id, email } = await verifyToken(token, res);
    const checkuser = await findUser({ id, email });

    if (!checkuser) {
      const message = 'User does not exist';
      return Response(res, 404, message);
    }
    const { istokenreset } = checkuser;
    if (istokenreset === true) {
      const message = 'Token has already been used';
      return Response(res, 409, message);
    }
    const hashedPassword = await passwordHash(password);
    const updatepassword = await User.update({
      password: hashedPassword,
      istokenreset: true,
    }, {
      where: {
        email,
      }
    });
    if (updatepassword) {
      const message = `${email} user password has been changed`;
      return Response(res, 201, message);
    }
  }

  /**
   * @description redirects user to the frontend
   * @param {object} req
   * @param {object} res
   * @returns {string} - Frontend url
   */
  static async socialRedirect(req, res) {
    if (req.user.noEmail) {
      return res.redirect(`${frontendUrl}/auth/social?error=${400}`);
    }

    const {
      id, email, firstname, lastname, username
    } = req.user;
    const token = await generateToken({ id, email }, '30d');
    return res.redirect(`${frontendUrl}/auth/social?token=${token}&userid=${id}&firstname=${firstname}&lastname=${lastname}&username=${username}&email=${email}`);
  }
}

export default AuthController;
