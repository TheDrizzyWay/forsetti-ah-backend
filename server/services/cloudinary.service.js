import multer from 'multer';
import cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';
import { cloudinaryUrl } from '../config/variables';
import Response from '../utils/response.util';

cloudinary.config({
  cloudinary_name: cloudinaryUrl,
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'forsetti',
  allowedFormats: ['jpg', 'jpeg', 'png'],
  transformation: [{
    width: 500, height: 500, crop: 'limit',
  }],
});


const upload = multer({
  storage,
  limits: {
    fileSize: 500000,
    files: 1,
  }
}).single('image');

/**
 * @description Validates the file payload for uploading a profile picture
 * @param  {object} req - The request object
 * @param  {object} res - The response object
 * @param {object} next - The next middleware
 * @returns Status code and error message or the next function
 */

const imageUpload = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return Response(res, 400, err.message);
    }
    return next();
  });
};

export default imageUpload;
