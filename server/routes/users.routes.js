import express, { Router } from 'express';
import { UserController, BookmarkController } from '../controllers';
import { UserValidation, Authorization } from '../middleware';
import { tryCatch, UuidValidator } from '../utils';

const { updateUserRole, getUsers } = UserController;
const { getUserBookmark } = BookmarkController;
const { validId } = UuidValidator;
const { validateRole } = UserValidation;
const { signInAuth, superAdminAuth } = Authorization;
const router = new Router();

router.patch('/role/:id', [signInAuth, superAdminAuth, validId, validateRole], tryCatch(updateUserRole));
router.get('/bookmark', [signInAuth], tryCatch(getUserBookmark));
router.get('/', [signInAuth], tryCatch(getUsers));

export default router;
