const router = require('express').Router();
const authMiddleware = __require('middlewares/auth')
const UserController = __require('controllers/UserController')

router.post('/user', UserController.store)
router.get('/users', authMiddleware, UserController.showAll)
router.get('/user/:user_id', authMiddleware, UserController.index)
router.delete('/user/:user_id', authMiddleware, UserController.delete)
router.put('/user/:user_id/newPassword', authMiddleware, UserController.updatePassword)

router.get('/user/:user_id/shops', authMiddleware, UserController.getUserShops)

module.exports = router
