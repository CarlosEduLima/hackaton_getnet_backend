const router = require('express').Router();
const multer = require('multer');
const uploadConfig = require('../../config/upload');
const upload = multer(uploadConfig);
const authMiddleware = __require('middlewares/auth')

const ShopController = __require('controllers/ShopController');
const ThumbnailController = __require('controllers/ThumbnailController');
const PhotoController = __require('controllers/PhotoController');
const ShopCategoryController = __require('controllers/ShopCategoryController');

router.get('/shops', authMiddleware, ShopController.index);
router.get('/shops/:shop_id', authMiddleware, ShopController.show);
router.post('/shops/:user_id', authMiddleware, ShopController.store);
router.delete('/shop/:shop_id/user/:user_id', authMiddleware, ShopController.delete);
router.put('/shop/:shop_id/user/:user_id', authMiddleware, ShopController.update);


router.put('/shop/:id/thumbnail', authMiddleware, upload.single('filename'), ThumbnailController.store);
router.put('/shop/:id/changethumbnail', authMiddleware, upload.single('filename'), ThumbnailController.update);

router.post('/shop/:shop_id/photo', authMiddleware, upload.single('filename'), PhotoController.store);
router.get('/shop/:shop_id/photos', authMiddleware, PhotoController.index);
router.put('/shop/photo/:photo_id', authMiddleware, PhotoController.updateLegend);
router.delete('/shop/photo/:photo_id', authMiddleware, PhotoController.delete);

router.post('/search_shop', ShopController.search_shop);

router.get('/shop/posts/:shop_id', authMiddleware, ShopController.shop_posts);

router.get('/categories', authMiddleware, ShopCategoryController.index);
module.exports = router;