import dotenv from 'dotenv';

dotenv.config();

export const frontendUrl = process.env.FRONTEND_URL;
export const backendUrl = process.env.BACKEND_URL;
export const jwtSecret = process.env.JWT_SECRET;
export const facebookClientId = process.env.FACEBOOK_CLIENT_ID;
export const facebookClientSecret = process.env.FACEBOOK_CLIENT_SECRET;
export const twitterAppId = process.env.TWITTER_APP_ID;
export const twitterAppSecret = process.env.TWITTER_APP_SECRET;
export const googleClientId = process.env.GOOGLE_CLIENT_ID;
export const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
export const cloudinaryUrl = process.env.CLOUDINARY_URL;
