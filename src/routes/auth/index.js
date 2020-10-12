const router = require('express').Router();
const AuthController = __require('controllers/AuthController');

router.get('/auth', AuthController.checkToken);
router.post('/auth', AuthController.authenticate);


module.exports = router;