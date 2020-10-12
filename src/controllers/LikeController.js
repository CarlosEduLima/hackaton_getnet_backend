const Like = require('../database/models/Like');
const User = require('../database/models/User')
const Sequelize = require('sequelize');
module.exports = {

    async like(req, res, next) {
        try{
            const { post_id, user_id } = req.params;

            const liked = await Like.findOne({
                where: {
                    post_id: post_id,
                    user_id: user_id 
                }
            });
            if (liked) {
                await liked.destroy();
                const countLikes = await Like.findAll({
                    attributes: [
                        [Sequelize.fn('COUNT', Sequelize.col('post_id')), 'numLikes']
                    ],
                    where: {
                        post_id: post_id
                    }
                })
                const count = {
                    numLikes: countLikes[0],
                }
                return res.status(200).json({ sucess: true, msg: 'Deslike', count })
            } else {
                const like = await Like.create({
                    post_id,
                    user_id,
                });
                const countLikes = await Like.findAll({
                    attributes: [
                        [Sequelize.fn('COUNT', Sequelize.col('post_id')), 'numLikes']
                    ],
                    where: {
                        post_id: post_id
                    }
                })
                const count = {
                    numLikes: countLikes[0],
                }
                return res.status(200).json({ sucess: true, msg: 'Post liked', count })
            }
        }catch(e){
            return next(e)
        }
     
    },
};