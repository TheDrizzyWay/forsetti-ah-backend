import { Router } from 'express';
import {
  ArticleController,
  CommentController,
  ClapController,
  BookmarkController,
} from '../controllers';
import {
  Authorization, UuidValidator, ArticleValidation, CommentValidation
} from '../middleware';
import imageUpload from '../services/cloudinary.service';
import { tryCatch, verifyText, deleteImage } from '../utils';

const {
  createComments, threadedComment, deleteComment, editComment
} = CommentController;
const { createOrRemoveBookmark } = BookmarkController;
const {
  validCreateArticle, updateArticle, checkArticleExist,
  checkAuthor, shareArticleCheck, paramsValidate,
  checkQueryParams, checkSpecialChars
} = ArticleValidation;
const { checkComments, validateCommentType, checkUser } = CommentValidation;
const {
  createArticle, editArticle, getOneArticle,
  shareArticle, deleteArticle, getAllTags,
  getTopArticle, searchArticles, getAllArticles
} = ArticleController;
const { validArticleId, validCommentId, validId } = UuidValidator;
const { signInAuth } = Authorization;

const router = new Router();

router.get('/search', [checkQueryParams, checkSpecialChars], tryCatch(searchArticles));
router.get('/topfeed', tryCatch(getTopArticle));
router.get('/tags', tryCatch(getAllTags));

router.get('/:slug', tryCatch(getOneArticle));
router.post('/', [signInAuth, imageUpload, validCreateArticle], tryCatch(createArticle));
router.get('/', [paramsValidate], tryCatch(getAllArticles));
router.put('/:slug', [signInAuth, imageUpload, checkArticleExist, checkAuthor, updateArticle], tryCatch(editArticle));
router.delete('/:slug', [signInAuth, checkArticleExist, checkAuthor, deleteImage], tryCatch(deleteArticle));

router.post('/:slug/comment', [signInAuth, checkComments, verifyText, validateCommentType], tryCatch(createComments));
router.post('/:slug/comment/:commentid/thread', [signInAuth, checkComments, validateCommentType], tryCatch(threadedComment));
router.delete('/:slug/comment/:commentId', [signInAuth, validCommentId], tryCatch(deleteComment));
router.put('/:slug/comment/:id', [signInAuth, validId, checkComments, checkUser], tryCatch(editComment));

router.post('/:articleId/claps', [signInAuth, validArticleId], tryCatch(ClapController.createClap));
router.post('/:articleId/bookmark', [signInAuth, validArticleId], tryCatch(createOrRemoveBookmark));
router.post('/:slug/share', [signInAuth, shareArticleCheck, checkArticleExist], tryCatch(shareArticle));

export default router;
