const router = require('express').Router();
const multer = require('multer');
const uploadConfig = __require('config/upload');
const upload = multer(uploadConfig);
const authMiddleware = __require('middlewares/auth')

const PostController = __require('controllers/PostController');
const PostCategoryController = __require('controllers/PostCategoryController');

router.get('/posts', PostController.index);
router.get('/posts/post/:post_id', authMiddleware, PostController.show);
router.post('/post/:shop_id', authMiddleware, upload.single('filename'), PostController.store);
router.delete('/post/:post_id', authMiddleware, PostController.delete);

router.get('/post/categories', authMiddleware, PostCategoryController.index);

//router.get('/posts/search', authMiddleware, PostCategoryController.search);

module.exports = router;