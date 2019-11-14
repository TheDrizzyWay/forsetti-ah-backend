import { Router } from 'express';
import { ProfileController } from '../controllers';
import { tryCatch } from '../utils';
import { UserValidation, Authorization, UuidValidator } from '../middleware';
import imageUpload from '../services/cloudinary.service';

const {
  followUser,
  unfollowUser,
  updateProfile,
  getProfileById,
  getFollowers,
  getNotifications,
  getFollowee
} = ProfileController;
const { validId } = UuidValidator;
const { validateProfile } = UserValidation;
const { signInAuth } = Authorization;
const router = new Router();

router.post('/:username/follow', [signInAuth], tryCatch(followUser));
router.delete('/:username/follow', [signInAuth], tryCatch(unfollowUser));
router.get('/followers', [signInAuth], tryCatch(getFollowers));
router.get('/followee', [signInAuth], tryCatch(getFollowee));
router.get('/notifications', [signInAuth], tryCatch(getNotifications));
router.get('/:id', [signInAuth, validId], tryCatch(getProfileById));
router.patch('/', [signInAuth, imageUpload, validateProfile], tryCatch(updateProfile));

export default router;
