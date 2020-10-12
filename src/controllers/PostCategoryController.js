const PostCategory = require('../database/models/PostCategory')

module.exports = {
    async index(req, res, next) {
        try {
            const categories = await PostCategory.findAll();

            return res.status(200).json({ sucess: true, categories })
        } catch (e) {
            return next(e)
        }
    },
}