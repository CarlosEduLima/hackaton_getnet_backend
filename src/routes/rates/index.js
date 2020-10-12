const router = require('express').Router();
const authMiddleware = __require('middlewares/auth')
const RateController = __require('controllers/RateController');

router.post('/user/:user_id/shop/:shop_id/', authMiddleware, RateController.store);
router.get('/shop/:shop_id/rate', authMiddleware, RateController.index);

module.exports = router;