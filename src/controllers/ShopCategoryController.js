const ShopCategory = require('../database/models/ShopCategory')

module.exports = {
    async index(req, res, next) {
        try {
            const categories = await ShopCategory.findAll();

            return res.status(200).json({ sucess: true, categories })
        } catch (e) {
            return next(e)
        }

    },
}