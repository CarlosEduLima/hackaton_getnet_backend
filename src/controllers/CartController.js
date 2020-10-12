const Cart = require('../database/models/Cart');
const User = require('../database/models/User');
const Post = require('../database/models/Post');

module.exports = {
    async index(req, res) {
        const { user_id } = req.params;
        
        const cart = await Cart.findAll({
            attributes: ['post_id'],
            where: {
                user_id: user_id
            }
        });
        let posts = [];
        for (var i = 0; i < cart.length; i++) {
            posts.push(await Post.findOne({
                where: {
                    id: cart[i].post_id,
                },
                include:[{ association: 'post_likes' }, { association: 'imgs' }],
                order: [
                    ['created_at', 'DESC']
                ]

            }))
        }
        return res.status(200).json({ sucess: true, posts })
    },
    async store(req, res, next) {
        try{
            const { post_id, user_id } = req.params;
            const cart = await Cart.create({
                user_id,
                post_id
            });
            return res.status(200).json({ sucess: true, msg: 'Post adicionado no carrinho', cart })
        }catch(e){
            return next(e)
        }
       
    },

    async removePost(req, res, next) {
        try {
            const { post_id } = req.params;
            const cart = await Cart.findOne({ where: { post_id: post_id } });
            await cart.destroy()
            return res.status(200).json({ sucess: true, msg: 'Post removed' })
        } catch (e) {
            return next(e)
        }

    },
};