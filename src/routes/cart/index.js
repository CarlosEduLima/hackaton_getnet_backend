const router = require('express').Router();
const authMiddleware = __require('middlewares/auth')
const CartController = __require('controllers/CartController');

router.get('/user/:user_id/cart', authMiddleware, CartController.index);
router.post('/cart/post/:post_id/user/:user_id',authMiddleware, CartController.store);
router.delete('/cart/:post_id', authMiddleware, CartController.removePost);


module.exports = router;