import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import {
  facebookClientId, facebookClientSecret, backendUrl,
  twitterAppId, twitterAppSecret, googleClientId,
  googleClientSecret
} from '../config/variables';
import { UserController } from '../controllers';

const { socialCallback } = UserController;

const facebookSetup = {
  clientID: facebookClientId,
  clientSecret: facebookClientSecret,
  callbackURL: `${backendUrl}api/v1/auth/facebook/callback`,
  profileFields: ['id', 'emails', 'displayName', 'photos'],
};

const twitterSetup = {
  consumerKey: twitterAppId,
  consumerSecret: twitterAppSecret,
  callbackURL: `${backendUrl}api/v1/auth/twitter/callback`,
  includeEmail: true,
};

const googleSetup = {
  clientID: googleClientId,
  clientSecret: googleClientSecret,
  callbackURL: `${backendUrl}api/v1/auth/google/callback`
};

const facebookStrategy = new FacebookStrategy(facebookSetup, socialCallback);
const twitterStrategy = new TwitterStrategy(twitterSetup, socialCallback);
const googleStrategy = new GoogleStrategy(googleSetup, socialCallback);

export { facebookStrategy, twitterStrategy, googleStrategy };
