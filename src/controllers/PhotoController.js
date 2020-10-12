const ShopPhoto = require('../database/models/ShopPhoto');
const Shop = require('../database/models/Shop');
const { findOne } = require('../database/models/Shop');

module.exports = {
    async index(req, res, next) {
        try {
            const { shop_id } = req.params;
            const shop = await Shop.findOne({where:{id: shop_id}})
            if(!shop)
                return res.status(400).json({ sucess: false, msg:'estabelecimento não encontrado' })

            const shopPhotos = await ShopPhoto.findAll({
                where: { shop_id },
            });

            const user = shop.user_id
            return res.status(200).json({ sucess: true, shopPhotos, user})
        } catch (e) {
            return next(e)
        }
    },
    async store(req, res, next) {
        try {
            const { shop_id } = req.params;
            const { key, location: url = "" } = req.file;
            const { legend } = req.body;
            const shop = await Shop.findOne({ where: { id: shop_id } });
            if (!shop)
                return res.status(404).send({ success: false, message: 'Estabelecimento inexistente' });
            const photo = await ShopPhoto.create({
                shop_id,
                image_url: url,
                image_key: key,
                legend
            })
            return res.status(200).json({ sucess: true, msg: 'Photo added', photo})
        } catch (e) {
            return next(e)
        }
    },
    async updateLegend(req, res, next) {
        try {
            const { photo_id } = req.params
            const { legend } = req.body
            const photo = await ShopPhoto.findOne({ where: { id: photo_id } })
            if (!photo)
                return res.status(400).json({ success: false, msg: 'photo não encontrada' })

            await photo.update({ legend })

            return res.json({ success: true, message: "legend uptaded" })
        } catch (e) {
            return next(e)
        }
    },
    async delete(req, res, next) {
        try {
            const { photo_id } = req.params
            const photo = await findOne({ where: { id: photo_id } })
            await photo.destroy()
            return res.status(200).json({ sucess: true, msg: 'photo deleted' })
        } catch (e) {
            return next(e)
        }
    }
};