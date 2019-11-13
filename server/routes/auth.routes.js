import { Router } from 'express';
import passport from 'passport';
import { UserController, AuthController } from '../controllers';
import { UserValidation } from '../middleware';
import tryCatch from '../utils/trycatch.util';

const {
  userSignup,
  userExist,
  isSigninFieldEmpty,
  checkPassword,
  userNotExist,
  checkUsername
} = UserValidation;

const { socialRedirect } = UserController;

const router = new Router();

router.post('/signup', [checkUsername, userSignup, userExist], tryCatch(AuthController.signup));
router.post('/login', [isSigninFieldEmpty], tryCatch(AuthController.signinUser));

router.post('/forgotpassword', [userNotExist], tryCatch(UserController.forgotPassword));
router.put('/resetpassword', [checkPassword], tryCatch(UserController.resetPassword));

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { session: false }), socialRedirect);

router.get('/twitter', passport.authenticate('twitter'));
router.get('/twitter/callback', passport.authenticate('twitter', { session: false }), socialRedirect);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), socialRedirect);

export default router;
