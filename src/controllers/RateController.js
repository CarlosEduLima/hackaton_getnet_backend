const Rate = require('../database/models/Rate');
const Sequelize = require('sequelize');
//const Op = Sequelize.Op;

module.exports = {
    async index(req, res) {
        const { shop_id } = req.params;
        const shopAvg = await Rate.findAll({
            attributes: [
                [Sequelize.fn('AVG', Sequelize.col('rate')), 'ratingAverage']
            ],
            where: {
                shop_id: shop_id
            },
        })
        const users = await Rate.findAll({
            attributes: [
                [Sequelize.fn('COUNT', Sequelize.col('rate')), 'numConsumers']
            ],
            where: {
                shop_id: shop_id
            }
        })
        const query = {
            avg: shopAvg[0],
            users: users[0]
        }
        return res.json({sucess:true, query});


    },

    async store(req, res, next) {
        try {
            const { shop_id } = req.params;
            const { user_id } = req.params;
            const { rate } = req.body;

            /*const rated = Rate.findOne({where:{user_id: user_id, shop_id: shop_id}})
            if(rated)
                return res.status(401).json({sucess: false, msg:'Você já avaliou esta loja'})*/
            await Rate.create({
                rate,
                shop_id,
                user_id
            });
    
            return res.status(200).json({sucess: true, msg:'Rated'});
        }catch(e){
            return next(e)
        }
      
    }
};