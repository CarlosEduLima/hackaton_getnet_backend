const router = require('express').Router();
const authMiddleware = __require('middlewares/auth')
const LikeController = __require('controllers/LikeController');

router.post('/like/post/:post_id/user/:user_id', authMiddleware, LikeController.like);

module.exports = router;