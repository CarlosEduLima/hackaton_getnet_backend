const router = require('express').Router();
const authMiddleware = __require('middlewares/auth')

const ShopContactController = __require('controllers/ShopContactController');

router.get('/shop/:shop_id/contacts', authMiddleware, ShopContactController.index);
router.post('/shop/:shop_id/contact', authMiddleware, ShopContactController.store);
router.put('/shop/contact/:contact_id', authMiddleware, ShopContactController.update);
router.delete('/shop/contact/:contact_id',authMiddleware, ShopContactController.delete);


module.exports = router;